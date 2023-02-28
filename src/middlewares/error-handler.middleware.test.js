const ApiError = require('../class/api-error.class');
const errorHandler = require('./error-handler.middleware');

describe('Error handler middleware', ()=>{
  it('should handle api error', async () => {
    const mockError = new ApiError(300, 'some message');
    const mockReq = { params: { id: '' } };
    const mockRes = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();
    await errorHandler(mockError, mockReq, mockRes, mockNext);
    expect(mockRes.json).toBeCalledWith({msg: 'some message'});
    expect(mockRes.status).toBeCalledWith(300);
  });
  it('should handle unknown error', async () => {
    const mockError = new Error('some message');
    const mockReq = { params: { id: '' } };
    const mockRes = {status: jest.fn().mockReturnThis(), json: jest.fn()};
    const mockNext = jest.fn();
    await errorHandler(mockError, mockReq, mockRes, mockNext);
    expect(mockRes.json).toBeCalledWith({msg: 'something went wrong'});
    expect(mockRes.status).toBeCalledWith(500);
  });
});