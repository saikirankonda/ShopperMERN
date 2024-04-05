export const errorHandler = (status, statuscode, message) => {
  const error = new Error();
  error.statuscode = statuscode;
  error.message = message;
  error.status = false;
  return error;
};
