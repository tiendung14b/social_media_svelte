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

const getAllPosts = async () => {
  try {
    const res = await instanceAxios.get(baseUrl)
    return res
  } catch (err) {
    throw err
  }
}

const getPostsByAuthor = async (author) => {
  try {
    let res = await instanceAxios.get(`${baseUrl}?fields=*.*&filter={"author": "${author}"}&sort=-date_created`)
    res = res.map(post => {
      return {
        ...post,
        images: JSON.parse(post.images)
      }
    })
    return res
  } catch (err) {
    throw err
  }
}

export {
  createPost,
  getPostsByAuthor,
  getAllPosts
}