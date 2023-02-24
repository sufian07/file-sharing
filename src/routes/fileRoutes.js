const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/fileController.js');

const router = express.Router();

const upload = multer();

// routes
router.post('/', upload.single('file'), fileController.uploadFile);
router.get('/:publicKey', fileController.downloadFile);
router.delete('/:privateKey', fileController.deleteFile);

module.exports = router;