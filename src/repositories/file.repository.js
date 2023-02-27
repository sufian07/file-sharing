const subDays = require('date-fns/subDays')
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
    return FileModel.findOneAndUpdate({ publicKey }, { visitedOn: new Date() }, { new: true });
  }

  static async getInactiveFiles(inactivePeriod) {
    const date = subDays(new Date(), inactivePeriod);
    return FileModel.find({ visitedOn: { $lt : date } });
  }

  static async getFileByPrivateKey(privateKey) {
    return FileModel.findOne({ privateKey });
  }

  static async deleteFileByPrivateKey(privateKey) {
    return FileModel.findOneAndDelete({ privateKey });
  }
}

module.exports = FileRepository;