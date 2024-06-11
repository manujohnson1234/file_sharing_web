const express = require('express');
const cors = require('cors');
const app = express();
const dbconnection = require('./db/dbConnect');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const User = require('./models/UserModel');
const socketAuth = require('./middelwares/socketMiddelware');
const { saveFile } = require('./controller/fileShareController');

const PORT = 8080;

app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
dbconnection();

const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin: "http://localhost:3000",
    credentials: true
  }
});


// socket Route
io.use(socketAuth);

io.on('connection', async (socket) => {
  console.log('a user connected', socket.id);

  try {
    await User.findOneAndUpdate(
      { username: socket.user.username },
      { socketId: socket.id },
      { new: true }
    );
    console.log(`Updated socket ID for user ${socket.user.username}`);
  } catch (err) {
    console.error('Error updating socket ID:', err);
  }

  socket.on("disconnect", async()=>{
    console.log('user disconnected', socket.id);
    try {
      await User.findOneAndUpdate(
        { username: socket.user.username },
        { socketId: null },
        { new: true }
      );
      console.log(`Cleared socket ID for user ${socket.user.username}`);
    } catch (err) {
      console.error('Error clearing socket ID:', err);
    }
  })

  socket.on('send-file', async (data)=>{
  
    const receiver = await User.findOne({username:data.username});
       
    if(!receiver ){
      return socket.emit('receive-message-error', 'user not found');
    }else{

      saveFile(data.file, data.fileName, data.username,socket.user.username, (err, result)=>{
        if(err){
          console.error('Error saving file:', err);
          socket.emit('receive-message', 'Error saving file' );
        }else{
          socket.emit('receive-message', `file have sent to ${data.username}`);
          io.to(receiver.socketId).emit('receive-message', `${socket.user.username} have send you file: ${result.fileName}`);
        }
      })

      
    }
    
    
  })

});


// http route
app.use('/',require('./router/router'));

server.listen(PORT, ()=>console.log(`server is listening in ${PORT}`));