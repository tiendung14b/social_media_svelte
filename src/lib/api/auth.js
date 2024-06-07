import { goto } from '$app/navigation';
import { save, getUserToken, remove } from '$lib/utils/storeAccount.js'
import { localUser } from '$lib/stores/localUser.js'
import instanceAxios from './instanceAxios';

const errorCode = {
	INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không chính xác.',
	INVALID_PAYLOAD: 'Email không hợp lệ.',
	RECORD_NOT_UNIQUE: {
		email: 'Email đã tồn tại.'
	}
}

const login = async ({ email, password }) => {
	try {
		const res = await instanceAxios.post('auth/login', {
			email,
			password
		}, {
			noRequiredAuth: true
		})
		const user = res
		save(user)
		return user
	} catch (err) {
		throw err
	}
}

const refreshToken = async () => {
	if (!getUserToken()) {
		goto('/login')
	}
	const res = await fetch(`http://localhost:8055/auth/refresh`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			refresh_token: getUserToken().refresh_token,
			mode: 'json'
		})
	})
	const response = await res.json()
	if (response.errors[0].extensions.code === 'INVALID_CREDENTIALS') {
		remove()
		goto('/login')
	}
	const user = response.data
	save(user)
	return user
}

const logout = async () => {
	const refeshToken = getUserToken().refresh_token
	remove()
	localUser.set(null)
	await instanceAxios.post('auth/logout', {
		refresh_token: refeshToken
	}, {
		noRequiredAuth: true
	})
	goto('/login')
}

const signup = async ({ email, password }) => {
	const res = await fetch(`http://localhost:8055/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password,
			role: '090af77a-6b12-484e-b755-71f8f71a1390'
		})
	})
	const response = await res.json()
	if (response.errors) {
		const error = response.errors[0].extensions
		if (error.code === 'RECORD_NOT_UNIQUE') {
			return {
				error: true,
				msg: errorCode.RECORD_NOT_UNIQUE[error.field]
			}
		}
		return {
			error: true,
			msg: errorCode[error.code]
		}
	}
	const user = response.data
	save(user)
	return user
}

export {
	login,
	refreshToken,
	logout,
	signup
}