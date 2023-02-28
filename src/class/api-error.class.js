class ApiError {
    constructor(statusCode, msg) {
      this.statusCode = statusCode;
      this.msg = msg;
    }
  
    static InvalidRequest(msg) {
      return new ApiError(400, msg);
    }
  
    static NotFound(msg) {
      return new ApiError(404, msg);
    }

    static InternalError(msg) {
      return new ApiError(500, msg);
    }
  }
  
  module.exports = ApiError;