const express = require('express');
const cors = require('cors'); // for cross origin resource sharing
const mongoose = require('mongoose'); // for mongodb
const socket = require('socket.io');

const app = express();
require('dotenv').config(); // for environment variables

app.use(cors()); // for cross origin resource sharing
app.use(express.json()); // for parsing json

// routes
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/msgRoutes'));

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// socket.io connection
const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// socket.io events
global.onlineUsers = new Map();

// socket.io events to handle online users
io.on('connection', (socket) => {
  global.chatSocket = socket;

  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});
