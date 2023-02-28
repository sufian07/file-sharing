const ApiError = require('../class/api-error.class');
const fileController = require('./file.controller');
const fileService = require('../services/file.service.js')

describe('File controller upload file', () => {
  it('should throw 400 error if file is not uploaded', async () => {
    const mockReq = { params: { id: '' } };
    const mockRes = {};
    const mockNext = jest.fn();
    await fileController.uploadFile(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledWith(ApiError.InvalidRequest('No file uploaded'));
  });

  it('should upload file and send response correctly', async () => {
    const mockFileResponse = { privateKey: 'privateKey', publicKey: 'publicKey' };
    jest.spyOn(fileService, 'uploadFile').mockResolvedValueOnce(mockFileResponse);
    const mockReq = { file: { 'content': '1' } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockNext = jest.fn();
    await fileController.uploadFile(mockReq, mockRes, mockNext);
    expect(fileService.uploadFile).toBeCalledWith({ 'content': '1' });
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith(mockFileResponse);
  });
});

describe('File controller download file', () => {
  it('should throw error if file is not exist', async () => {
    const mockReq = { params: { publicKey: 'publicKey' } };
    const mockRes = {setHeader: jest.fn()};
    const mockNext = jest.fn();
    const error = new Error('Async error');
    jest.spyOn(fileService, 'getFile').mockRejectedValue(error);
    await fileController.downloadFile(mockReq, mockRes, mockNext);
    expect(fileService.getFile).toBeCalledWith('publicKey');
    expect(mockNext).toBeCalledWith(error);
  });

  it('should response file stream', async () => {
    const mockReq = { params: { publicKey: 'publicKey' } };
    const mockRes = {setHeader: jest.fn()};
    const mockNext = jest.fn();
    const mockFileResponse = { mimeType: 'mimeType', fileStream:{pipe: jest.fn()} }
    jest.spyOn(fileService, 'getFile').mockResolvedValueOnce(mockFileResponse);
    await fileController.downloadFile(mockReq, mockRes, mockNext);
    expect(fileService.getFile).toBeCalledWith('publicKey');
    expect(mockRes.setHeader).toBeCalledWith('Content-Type', 'mimeType');
    expect(mockRes.setHeader).toBeCalledWith('Content-Disposition', 'attachment; filename=publicKey');
    expect(mockRes.setHeader).toBeCalledWith('Content-Disposition', 'attachment; filename=publicKey');
    expect(mockFileResponse.fileStream.pipe).toBeCalledWith(mockRes);
  });
});

describe('File controller delete file', () => {
  it('should throw 400 error if file is not exist', async () => {
    const mockReq = { params: { privateKey: 'privateKey' } };
    const mockRes = {setHeader: jest.fn()};
    const mockNext = jest.fn();
    const error = new Error('Async error');
    jest.spyOn(fileService, 'deleteFile').mockRejectedValue(error);
    await fileController.deleteFile(mockReq, mockRes, mockNext);
    expect(fileService.deleteFile).toBeCalledWith('privateKey');
    expect(mockNext).toBeCalledWith(error);
  });

  it('should response file stream', async () => {
    const mockReq = { params: { privateKey: 'privateKey' } };
    const mockRes = {json: jest.fn()};
    const mockNext = jest.fn();
    const mockFileResponse = { message: `File with private key privateKey deleted successfully.` };
    jest.spyOn(fileService, 'deleteFile').mockResolvedValueOnce(mockFileResponse);
    await fileController.deleteFile(mockReq, mockRes, mockNext);
    expect(fileService.deleteFile).toBeCalledWith('privateKey');
    expect(mockRes.json).toBeCalledWith(mockFileResponse);
  });
});
