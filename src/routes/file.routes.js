const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/file.controller.js');
const { uploadLimiter, downloadLimiter } = require('../middlewares/rate-limiter.middleware');
// MAX_FILE_SIZE define max file size in mb
const MAX_FILE_SIZE = parseInt(`${process.env.MAX_FILE_SIZE || 2}`) * 1024 * 1024;
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE },
});

// routes
router.post('/', [uploadLimiter ,upload.single('file')], fileController.uploadFile);
router.get('/:publicKey',downloadLimiter, fileController.downloadFile);
router.delete('/:privateKey', fileController.deleteFile);

module.exports = router;