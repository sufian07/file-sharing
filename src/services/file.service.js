const fileRepository = require('../repositories/file.repository.js');
const FileAccessRepository = require('../repositories/file-access.repository');
const ProviderFactory = require('../factories/provider.factory');
const storage = require('../configs/storage');

class FileService {

  constructor() {
    const providerType = process.env.PROVIDER || 'local';
    const config = storage[providerType];
    const provider = ProviderFactory.createProvider(providerType, config);
    this.fileAccessRepository = new FileAccessRepository(provider);
  }

  async uploadFile (file) {
    const { privateKey, publicKey } = await this.fileAccessRepository.upload(file);
    await fileRepository.createFile(publicKey, privateKey, file.originalname, file.mimetype, file.size);
    return { privateKey, publicKey };
  }

  async getFile (publicKey) {
    const metadata = await fileRepository.getFileByPublicKey(publicKey);

    if (!metadata) {
      throw new Error('File not found');
    }
    const { mimeType } = metadata;
  
    // Create a read stream for the file and pipe it to the response stream
    const fileStream = await this.fileAccessRepository.download(publicKey);
    return { mimeType, fileStream };
  }

  async deleteFile (privateKey) {
    const metadata = await fileRepository.getFileByPrivateKey(privateKey);

    if (!metadata) {
      throw new Error('File not found');
    }
    const { publicKey } = metadata;
    await this.fileAccessRepository.remove(publicKey);
    await fileRepository.deleteFileByPrivateKey(privateKey);

    return { message: 'File deleted successfully.' };
  }
}

module.exports = new FileService();