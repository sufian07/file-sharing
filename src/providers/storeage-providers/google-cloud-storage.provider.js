// GoogleCloudStorageProvider.js

const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');

class GoogleCloudStorageProvider {
  constructor(config) {
    this.storage = new Storage(config);
    this.bucketName = config.bucketName;
  }

  async upload(file) {
    const privateKey = uuidv4();
    const publicKey = uuidv4();
    const bucket = this.storage.bucket(this.bucketName);
    const fileObj = bucket.file(publicKey);
    await fileObj.save(file.buffer, { contentType: file.mimetype });
    return { publicKey, privateKey };
  }

  async download(publicKey) {
    const bucket = this.storage.bucket(this.bucketName);
    const fileObj = bucket.file(publicKey);
    const [exists] = await fileObj.exists();
    if (!exists) {
      throw new Error('File not found');
    }
    return fileObj.createReadStream();
  }

  async remove(publicKey) {
    const bucket = this.storage.bucket(this.bucketName);
    const fileObj = bucket.file(publicKey);
    await fileObj.delete();
  }
}

module.exports = GoogleCloudStorageProvider;