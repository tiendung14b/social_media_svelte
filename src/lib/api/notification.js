import instanceAxios from '$lib/api/instanceAxios.js';
import { localUser } from '$lib/stores/localUser.js';


const baseUrl = 'notifications'

const getAllNotifications = async (limit = 10, offset = 0, user_id) => {
  const options = `?filter={"recipient": {"_eq": "${user_id}"}}?limit=${limit}&offset=${offset}&fields=*.*.*&sort=-date_created`
  try {
    const res = await instanceAxios.get(baseUrl + options)
    return res
  } catch (err) {
    throw err
  }
}

export {
  getAllNotifications
}

