const mongoose = require('mongoose');
const shortId = require('shortid')

const miniUrlSchema = new mongoose.Schema({
  OGUrl: {
    type: String,
    required: true,
  },
  miniUrl: {
    type: String,
    required: true,
    default: shortId.generate
  },
  Count: {
    type: Number,
    required: true,
    default: 0
  },
});

module.exports = mongoose.model('miniUrl', miniUrlSchema);