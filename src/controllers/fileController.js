const fileService = require('../services/FileService.js')

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file
    const result = await fileService.uploadFile(file)
    res.status(201).json(result)
  } catch(error) {
    res.status(error.status || 500);
    res.json({msg: error.message})
  }
}

exports.downloadFile = async (req, res) => {
  try {
    const publicKey = req.params.publicKey
    // Create a read stream for the file and pipe it to the response stream
    const { mimeType, fileStream } =  await fileService.getFile(publicKey);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename=${publicKey}`);
    return fileStream.pipe(res);
  } catch(error) {
    res.status(error.status || 500);
    res.json({msg: error.message})
  }
}

exports.deleteFile = async (req, res) => {
  try {
    const privateKey = req.params.privateKey
    const result = await fileService.deleteFile(privateKey)
    res.json(result)
  } catch(error) {
    res.status(error.status || 500);
    res.json({msg: error.message})
  }
}
