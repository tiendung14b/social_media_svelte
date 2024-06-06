import instanceAxios from '$lib/api/instanceAxios.js';

const baseUrl = 'items/follow'

const follow = async (data) => {
  try {
    const res = await instanceAxios.post(baseUrl, data)
    return res
  }
  catch (err) {
    throw err
  }
}

const unfollow = async (id) => {
  try {
    const res = await instanceAxios.delete(baseUrl + '/' + id)
    return res
  }
  catch (err) {
    throw err
  }
} 

const getFollowers = async (author) => {
  try {
    let res = await instanceAxios.get(`${baseUrl}?fields=*.*&filter={"author": "${author}"}`)
    return res
  } catch (err) {
    throw err
  }
}

const getFollowing = async (author) => {
  try {
    let res = await instanceAxios.get(`${baseUrl}?fields=*.*&filter={"follower": "${author}"}`)
    return res
  } catch (err) {
    throw err
  }
}

export {
  follow,
  unfollow,
  getFollowers,
  getFollowing
}