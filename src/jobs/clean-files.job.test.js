const cleanupJob = require('./clean-files.job');
const fileService = require('../services/file.service.js')

describe.skip('Clean files', () => {
    it('should remove file correctly', async () => {
        const mockFilesResponse =   [{ privateKey: 'privateKey', publicKey: 'publicKey' }];
        jest.spyOn(fileService, 'getInactiveFiles').mockResolvedValueOnce(mockFilesResponse);
        const mockDeleteResponse =   { message: `File with private key privateKey deleted successfully.` };
        jest.spyOn(fileService, 'deleteFile').mockResolvedValueOnce(mockDeleteResponse);
        cleanupJob.start();
        expect(fileService.getInactiveFiles).toBeCalledWith(process.env.INACTIVE_PERIOD);
        expect(fileService.deleteFile).toBeCalledWith('privateKey');
        // expect(mockRes.status).toBeCalledWith(201);
    });
});