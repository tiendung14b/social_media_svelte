import instanceAxios from '$lib/api/instanceAxios.js';
import { localUser } from '$lib/stores/localUser.js';

const baseUrl = 'items/posts'

const createPost = async (data) => {
  try {
    const res = await instanceAxios.post(baseUrl, data)
    return res
  } catch (err) {
    throw err
  }
}

const getPostByAuthor = async (author) => {
  try {
    const res = await instanceAxios.get(`${baseUrl}/filter?author=${author}`)
    return res
  } catch (err) {
    throw err
  }
}

export {
  createPost,
  getPostByAuthor
}