const fileService = require('./file.service');
const fileRepository = require('../repositories/file.repository.js');
const FileAccessRepository = require('../repositories/file-access.repository');

describe('File service', () => {
    it('upload file correctly', async () => {
        const file = {originalname: 'originalname', mimetype: 'mimetype', size: 34};
        const getterMethodMock = jest.spyOn(FileAccessRepository.prototype, 'upload').mockImplementation(() => 'some-mocked-result');
        jest.spyOn(fileRepository, 'createFile').mockResolvedValueOnce({ privateKey: 'privateKey', publicKey: 'publicKey' });
        fileService.uploadFile(file);
        expect(getterMethodMock).toBeCalledWith(file)
        // expect(fileRepository.createFile).toBeCalledWith('publicKey', 'privateKey', file.originalname, file.mimetype, file.size)
    });

    it('get file correctly', async () => {
        const getterMethodMock = jest.spyOn(FileAccessRepository.prototype, 'download').mockImplementation(() => 'some-mocked-result');
        jest.spyOn(fileRepository, 'getFileByPublicKey').mockResolvedValueOnce({ privateKey: 'privateKey', publicKey: 'publicKey' });
        fileService.getFile('publicKey');
        expect(getterMethodMock).toBeCalledWith('publicKey')
        // expect(fileRepository.getFileByPublicKey).toBeCalledWith('publicKey')
    });
    it.skip('get file throw if file not exist', async () => {
        try{
            jest.spyOn(fileRepository, 'getFileByPublicKey').mockResolvedValueOnce(null);
            fileService.getFile('publicKey');
        } catch(error){
            expect(error.status).toBe(404)
        }
    });
    it('delete file correctly', async () => {
        const getterMethodMock = jest.spyOn(FileAccessRepository.prototype, 'remove').mockImplementation(() => ({ privateKey: 'privateKey', publicKey: 'publicKey' }));
        jest.spyOn(fileRepository, 'getFileByPrivateKey').mockResolvedValueOnce({ privateKey: 'privateKey', publicKey: 'publicKey' });
        jest.spyOn(fileRepository, 'deleteFileByPrivateKey').mockResolvedValueOnce({});
        fileService.deleteFile('privateKey');
        expect(getterMethodMock).toBeCalledWith('privateKey')
        // expect(fileRepository.getFileByPublicKey).toBeCalledWith('privateKey')
        // expect(fileRepository.deleteFileByPrivateKey).toBeCalledWith('privateKey')
    });
});