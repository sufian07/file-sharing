const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/file.controller.js');
const { uploadLimiter, downloadLimiter } = require('../middlewares/rate-limiter.middleware');

const router = express.Router();

const upload = multer();

// routes
router.post('/', [uploadLimiter ,upload.single('file')], fileController.uploadFile);
router.get('/:publicKey',downloadLimiter, fileController.downloadFile);
router.delete('/:privateKey', fileController.deleteFile);

module.exports = router;