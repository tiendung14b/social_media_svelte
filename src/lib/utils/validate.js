const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateUsername = (username) => {
  if (username.length < 3 || username.length > 20) return false;
  let res = true;
  String(username).toLowerCase().split('').forEach((char) => {
    // check if username has any special characters except for underscore, and numbers, spaces, do not use regex
    if (!"abcdefghijklmnopqrstuvwxyz0123456789_".includes(char)) {
      res = false;
    }
  });
  return res;
}

export {
  validateEmail,
  validateUsername
}