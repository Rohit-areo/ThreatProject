const Threat = require('../models/threatModel');

// Fetch all threats from the database
exports.getAllThreats = async (req, res) => {
  try {
    const threats = await Threat.find();
    res.json(threats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new threat manually
exports.createThreat = async (req, res) => {
  try {
    const { time, threatLevel, description } = req.body;
    const newThreat = new Threat({ time, threatLevel, description });
    await newThreat.save();
    res.json(newThreat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
