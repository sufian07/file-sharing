const ApiError = require('../class/api-error.class');

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({msg: err.msg});
    return;
  }
  res.status(500).json({msg: 'something went wrong'});
}
module.exports = errorHandler;