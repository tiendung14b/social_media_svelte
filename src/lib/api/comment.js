import instanceAxios from "./instanceAxios";

const baseUrl = 'items/comment'

const createComment = async (data) => {
  try {
    const res = await instanceAxios.post(baseUrl + `?fields=*.*&sort=-date_created`, data)
    return res
  }
  catch (err) {
    throw err
  }
}

const getCommentsByPost = async (post) => {
  try {
    let res = await instanceAxios.get(`${baseUrl}?fields=*.*&filter={"post": "${post}"}&sort=-date_created`)
    return res
  } catch (err) {
    throw err
  }
}

export {
  createComment,
  getCommentsByPost
}
