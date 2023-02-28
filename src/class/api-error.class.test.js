const ApiError = require('./api-error.class');

describe('Api error class ', () => {
  it('should response correctly', async () => {
    const invalidRequest = ApiError.InvalidRequest('sample message');
    expect(invalidRequest).toEqual(expect.any(ApiError))
    expect(invalidRequest.statusCode).toEqual(400)
    const notFound = ApiError.NotFound('sample message');
    expect(notFound).toEqual(expect.any(ApiError))
    expect(notFound.statusCode).toEqual(404)
    const internalError = ApiError.InternalError('sample message');
    expect(internalError).toEqual(expect.any(ApiError))
    expect(internalError.statusCode).toEqual(500)
  });
})
