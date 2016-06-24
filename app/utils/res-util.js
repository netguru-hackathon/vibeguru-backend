const responses = {
  DEFAULT_ERROR: 'Error',
  DEFAULT_SUCCESS: 'Success',

  USER_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  WRONG_PASSWORD: 'Wrong password',
  USERNAME_TOO_SHORT: 'Username has to be at least 3 characters long',
  PASSWORD_TOO_SHORT: 'Password has to be at least 6 characters long',
  WRONG_EMAIL_FORMAT: 'Invalid email format',
  USER_NOT_AUTHENTICATED: 'Authorization error. User not found.',
  NO_COORDINATES: 'No coordinates provided'
};

module.exports = {
  error: (res, key, code) => {
    key = key || 'DEFAULT_ERROR';
    code = code || 400;

    return res.status(code).send(responses[key] || key);
  },

  success: (res, data, code) => {
    data = data || { success: true };
    code = code || 200;

    return res.status(code).send(data);
  },
};
