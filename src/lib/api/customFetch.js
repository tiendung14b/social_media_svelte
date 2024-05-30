import { goto } from '$app/navigation';
import { refreshToken } from '$lib/api/auth.js';

const errorCode = {
	INVALID_CREDENTIALS: 'Tài khoản hoặc mật khẩu không chính xác.',
	INVALID_PAYLOAD: 'Email không hợp lệ.',
	RECORD_NOT_UNIQUE: {
    email: 'Email đã tồn tại.',
    username: "Username đã tồn tại.",
	}
}

const isTokenExpired = (response) => {
  return response.errors && response.errors[0].extensions.code === 'TOKEN_EXPIRED';
}

const isTokenInvalid = (response) => {
  return response.errors && response.errors[0].extensions.code === 'INVALID_CREDENTIALS';
}

const handleTokenExpired = async (response) => {
  console.log('Token expired, refreshing token');
  await refreshToken()
}

const handleTokenInvalid = (response) => {
  goto('/login');
  return {
    error: true,
    code: response.errors[0].extensions.code,
    msg: errorCode[response.errors[0].extensions.code]
  };
}

const baseURL = 'http://localhost:8055/';


// const post = async (url, options) => {
//   try {
//     let res = (await fetch(baseURL + url, options)).json()
//     if (isTokenExpired(res)) {
//       await handleTokenExpired(res);
//     } else if (isTokenInvalid(res)) {
//       return handleTokenInvalid(res);
//     }
//     if (res.errors) {
//       throw res.errors[0];
//     }
//     return res.data;
//   } catch (err) {
//     console.log(err)
//   }
// }

const post = async (url, options) => {
  try {
    url = baseURL + url;
    let res = await fetch(url, options);
    let response = await res.json();
    if (response.errors && response.errors[0].extensions.code === 'TOKEN_EXPIRED') {
      console.log('Token expired, refreshing token');
      await refreshToken()
    }
    res = await fetch(url, options);
    response = await res.json();
    if (response.errors) {
      goto('/login');
      return {
        error: true,
        code: response.errors[0].extensions.code,
        msg: errorCode[response.errors[0].extensions.code]
      };
    }
    return response.data;
  } catch (err) {
    console.log('bug ne');
  }
}

const customGraphQLFetch = async (query, options) => {
  options.body = JSON.stringify(query);
  options.method = 'POST';
  try {
    const res = await fetch('http://localhost:8055/graphql/system', {
      ...options,
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.message);
  
  }
}

export {
  post,
  customGraphQLFetch
}