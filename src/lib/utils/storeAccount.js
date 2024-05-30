const save = (user) => {
  let users = JSON.parse(localStorage.getItem("localUser"))
  if (!users) users = {}
  users.current = user
  if (!users.list) users.list = []
  if (!users.list.includes(user?.id)) users.list.push(user)
  localStorage.setItem("localUser", JSON.stringify(users))
}

const remove = () => {
  let users = JSON.parse(localStorage.getItem('localUser'))
  if (!users) users = {}
  users.current = null
  localStorage.setItem('localUser', JSON.stringify(users))
}

const getUserToken = () => {
  return JSON.parse(localStorage.getItem("localUser"))?.current
}

export {
  save,
  getUserToken, 
  remove
}