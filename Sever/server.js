const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const threatRoutes = require('./routes/threatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Sessions for basic authentication
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}));

// Use the Threat Routes for CRUD operations
app.use('/api/threats', threatRoutes);

// Socket.io - Emit fake threat data every 5 seconds
let threatLevel = 1;
setInterval(() => {
  const randomThreat = {
    time: new Date().toLocaleTimeString(),
    threatLevel: Math.floor(Math.random() * 6)
  };
  io.emit('newThreatData', randomThreat);
}, 5000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
