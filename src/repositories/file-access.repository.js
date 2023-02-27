// FileAccess.js

class FileAccessRepository {
    constructor(storageProvider) {
      this.storageProvider = storageProvider;
    }
  
    async upload(file) {
      const { publicKey, privateKey } = await this.storageProvider.upload(file);
      return { publicKey, privateKey };
    }
  
    async download(publicKey) {
      return this.storageProvider.download(publicKey);
    }
  
    async remove(publicKey) {
      await this.storageProvider.remove(publicKey);
      return { message: "File removed successfully" };
    }
  }
  
  module.exports = FileAccessRepository;