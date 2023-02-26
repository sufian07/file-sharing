const FileModel = require('../schema/file.schema');
class FileRepository {
  static async createFile(publicKey, privateKey, originalName, mimeType, size) {
    const file = new FileModel({
      publicKey,
      privateKey,
      originalName,
      mimeType,
      size,
    });
    await file.save();
    return file;
  }

  static async getFileByPublicKey(publicKey) {
    return FileModel.findOne({ publicKey });
  }

  static async getFileByPrivateKey(privateKey) {
    return FileModel.findOne({ privateKey });
  }

  static async deleteFileByPrivateKey(privateKey) {
    return FileModel.findOneAndDelete({ privateKey });
  }
}

module.exports = FileRepository;