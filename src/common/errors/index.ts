const httpErrors = require('throw-http-errors');

const isCustomError = (error: any) => {
  if (
    Object.keys(httpErrors).includes(error.name) ||
    (error.status && Object.keys(httpErrors).includes(error.status.toString()))
  ) {
    return true;
  }
  return false;
};

module.exports = {
  ...httpErrors,
  isCustomError,
};
