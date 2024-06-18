import axios from "axios";
import { localUser } from '$lib/stores/localUser.js'
import { getUserToken, remove } from '$lib/utils/storeAccount.js';
import { goto } from "$app/navigation";

const DEV = true;

const errorCode = {
  TOKEN_EXPIRED: {
    code: 'TOKEN_EXPIRED',
    msg: 'Phiên đăng nhập đã hết, vui lòng đăng nhập lại.'
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    msg: 'Tài khoản hoặc mật khẩu không chính xác.'
  },
  INVALID_PAYLOAD: {
    code: 'INVALID_PAYLOAD',
    msg: 'Email không hợp lệ.'
  },
  RECORD_NOT_UNIQUE: {
    code: 'RECORD_NOT_UNIQUE',
    email: {
      msg: 'Email đã tồn tại.' 
    },
    username: {
      msg: 'Username đã tồn tại.'
    }
  }
}

const instanceAxios = axios.create({
  baseURL: DEV ? 'http://localhost:8055' : 'https://training01.appdemo.dev/',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instanceAxios.interceptors.request.use(function (req) {
  const token = getUserToken()?.access_token;
  if (!token && !req.noRequiredAuth) goto('/login');
  if (!req.noRequiredAuth) req.headers.Authorization = `Bearer ${token}`; 
  req.headers = {
    ...req.headers,
    'Content-Type': 'application/json',
  }
  return req;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instanceAxios.interceptors.response.use(function (response) {
  return response.data.data || response.data;
}, function (error) {
  console.error(error.response);
  const data = error.response?.data.errors[0].extensions;
  if (!data) return Promise.reject(error);
  const res = { error: true, code: data.code }
  if (error.response.status === 401) {
    if (data.code === 'INVALID_CREDENTIALS') {
      console.log(errorCode[data.code].msg);
      return Promise.reject({...res, msg: errorCode[data.code].msg});
    } else if (data.code === 'TOKEN_EXPIRED') {
      localUser.set(null);
      remove();
      goto('/login');
      return Promise.reject({...res, msg: errorCode[data.code].msg});
    }
  } else if (error.response.status === 403) {
    goto('/login')
  } else if (error.response.status === 400) {
    if (data.code === 'RECORD_NOT_UNIQUE') {
      return Promise.reject({...res, msg: errorCode[data.code][data.field].msg})
    } else if (data.code === 'INVALID_PAYLOAD') {
      return Promise.reject({...res, msg: errorCode[data.code].msg})
    }
  }
  return Promise.reject(error);
});

export default instanceAxios;