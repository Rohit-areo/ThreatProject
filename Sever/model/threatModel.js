const mongoose = require('mongoose');

const threatSchema = new mongoose.Schema({
  time: { type: String, required: true },
  threatLevel: { type: Number, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Threat', threatSchema);
