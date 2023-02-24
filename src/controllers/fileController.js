const fileService = require('../services/fileService.js')

exports.uploadFile = async (req, res) => {
  const file = req.file
  const result = await fileService.uploadFile(file)
  res.json(result)
}

exports.downloadFile = async (req, res) => {
  const publicKey = req.params.publicKey
  // Create a read stream for the file and pipe it to the response stream
  const { mimeType, fileStream } =  await fileService.getFile(publicKey);
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Content-Disposition', `attachment; filename=${publicKey}`);
  return fileStream.pipe(res);
}

exports.deleteFile = async (req, res) => {
  const privateKey = req.params.privateKey
  const result = await fileService.deleteFile(privateKey)
  res.json(result)
}
