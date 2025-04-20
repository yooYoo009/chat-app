const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

// 静的ファイルの提供
app.use(express.static(__dirname)); // 現在のディレクトリを静的ファイルとして提供

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // ユーザー名を受け取る
  socket.on('setUsername', (username) => {
    socket.username = username; // ユーザー名をソケットに保存
    console.log(`User ${socket.id} set their username to ${username}`);
  });

  // メッセージを受信して全クライアントに送信
  socket.on('message', (msg) => {
    const messageData = {
      username: socket.username || 'Anonymous', // ユーザー名が設定されていない場合は "Anonymous"
      message: msg,
    };
    io.emit('message', messageData); // メッセージデータを送信
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

http.listen(3000, () => {
  console.log('Server is listening on port 3000');
});