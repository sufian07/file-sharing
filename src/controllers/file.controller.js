const ApiError = require('../class/api-error.class.js')
const fileService = require('../services/file.service.js')

exports.uploadFile = async (req, res, next) => {
  try {
    const file = req.file
    // If request do not have file throw 400 error
    if(!file) {
      throw ApiError.InvalidRequest('No file uploaded');
    }
    const result = await fileService.uploadFile(file)
    res.status(201).json(result)
  } catch(error) {
    next(error);
  }
}

exports.downloadFile = async (req, res, next) => {
  try {
    const publicKey = req.params.publicKey
    // Create a read stream for the file and pipe it to the response stream
    const { mimeType, fileStream } =  await fileService.getFile(publicKey);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename=${publicKey}`);
    return fileStream.pipe(res);
  } catch(error) {
    next(error);
  }
}

exports.deleteFile = async (req, res, next) => {
  try {
    const privateKey = req.params.privateKey
    const result = await fileService.deleteFile(privateKey)
    res.json(result)
  } catch(error) {
    next(error);
  }
}
