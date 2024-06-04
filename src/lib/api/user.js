import { getUserToken } from '$lib/utils/storeAccount.js';
import { localUser } from '$lib/stores/localUser.js';
import instanceAxios from './instanceAxios.js';
import { goto } from '$app/navigation';

const errorCode = {
  INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không chính xác.',
  INVALID_PAYLOAD: 'Email không hợp lệ.',
  RECORD_NOT_UNIQUE: {
    email: 'Email đã tồn tại.',
    username: "Username đã tồn tại.",
  }
}

const getCurrentUser = async () => {
  try {
    const res = await instanceAxios.get('users/me')
    return res
  }
  catch (err) {
    throw err
  }
}

const getUserById = async (id) => {
  try {
    const res = await instanceAxios.get(`users/${id}`)
    return res
  }
  catch (err) {
    throw err
  }
}

const getUserByUsername = async (username) => {
  try {
    const res = await instanceAxios.get(`users/?filter={"username":"${username}"}`)
    return res[0]
  }
  catch (err) {
    throw err
  }
}

const updateCurrentUser = async (data) => {
  try {
    if (!getUserToken().access_token) {
      return goto('/login')
    }
    const res = await instanceAxios.patch('users/me', data)
    localUser.set(res)
    return res
  } catch (err) {
    throw err
  }
}

export {
  getCurrentUser,
  updateCurrentUser,
  getUserById,
  getUserByUsername,
}