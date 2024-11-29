const { NotFoundError } = require('./errors');

const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Internal Server Error';
  let statusCode = err.statusCode || 500;

  if (err instanceof NotFoundError) {
    message = err.message;
    statusCode = err.status;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;