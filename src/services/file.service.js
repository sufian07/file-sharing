const fileRepository = require('../repositories/file.repository.js');
const FileAccessRepository = require('../repositories/file-access.repository');
const ProviderFactory = require('../factories/provider.factory');
const storage = require('../configs/storage');
const ApiError = require('../class/api-error.class.js');

class FileService {

  constructor(fileAccessRepository) {
    this.fileAccessRepository = fileAccessRepository;
  }

  async uploadFile (file) {
    const { privateKey, publicKey } = await this.fileAccessRepository.upload(file);
    await fileRepository.createFile(publicKey, privateKey, file.originalname, file.mimetype, file.size);
    return { privateKey, publicKey };
  }

  async getInactiveFiles(inactivePeriod) {
    return fileRepository.getInactiveFiles(inactivePeriod);
  }

  async getFile (publicKey) {
    const metadata = await fileRepository.getFileByPublicKey(publicKey);

    if (!metadata) {
      throw ApiError.NotFound('File not found');
    }
    const { mimeType } = metadata;
  
    // Create a read stream for the file and pipe it to the response stream
    const fileStream = await this.fileAccessRepository.download(publicKey);
    return { mimeType, fileStream };
  }

  async deleteFile (privateKey) {
    const metadata = await fileRepository.getFileByPrivateKey(privateKey);

    if (!metadata) {
      throw ApiError.NotFound('File not found');
    }
    const { publicKey } = metadata;
    await this.fileAccessRepository.remove(publicKey);
    await fileRepository.deleteFileByPrivateKey(privateKey);

    return { message: `File with private key ${privateKey} deleted successfully.` };
  }
}

const providerType = process.env.PROVIDER || 'local';
const config = storage[providerType];
const provider = ProviderFactory.createProvider(providerType, config);
const fileAccessRepository = new FileAccessRepository(provider);

module.exports = new FileService(fileAccessRepository);