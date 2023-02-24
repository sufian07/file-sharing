// LocalFileSystemProvider.js

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class LocalFileSystemProvider {
  constructor(config) {
    this.rootFolder = config.folder;
  }

  async upload(file) {
    const privateKey = uuidv4();
    const publicKey = uuidv4();
    const filePath = path.join(this.rootFolder, publicKey);
    await fs.promises.writeFile(filePath, file.buffer);
    return { publicKey, privateKey };
  }

  async download(publicKey) {
    const filePath = path.join(this.rootFolder, publicKey);
    console.log(filePath);
    return fs.createReadStream(filePath);
  }

  async remove(privateKey) {
    const filePath = path.join(this.rootFolder, privateKey);
    await fs.promises.unlink(filePath);
  }
}

module.exports = LocalFileSystemProvider;