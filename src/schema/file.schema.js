const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  publicKey: { type: String, required: true },
  privateKey: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now },
  visitedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);