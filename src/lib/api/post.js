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

const getAllPosts = async (limit = 10, offset = 0) => {
  const options = `?limit=${limit}&offset=${offset}&fields=*.*.*&sort=-date_created`
  try {
    const res = await instanceAxios.get(baseUrl + options)
    return res.map(post => {
      return {
        ...post,
        images: JSON.parse(post.images)
      }
    })
  } catch (err) {
    throw err
  }
}

const getNewestPosts = async (limit = 1) => {
  const options = `?limit=${limit}&fields=*.*.*&sort=-date_created`
  try {
    const res = await instanceAxios.get(baseUrl + options)
    return res.map(post => {
      return {
        ...post,
        images: JSON.parse(post.images)
      }
    })
  } catch (err) {
    throw err
  }
}

const getPostsByAuthor = async (author) => {
  try {
    const fields = '*,author.*,comments.author.id, comments.author.first_name, comments.author.last_name, comments.author.profileImageUrl,comments.text'
    // let res = await instanceAxios.get(`${baseUrl}?fields=*.*.*&filter={"author": "${author}"}&sort=-date_created`)
    let res = await instanceAxios.get(`${baseUrl}?fields[]=${fields}&filter={"author": "${author}"}&sort=-date_created`)
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