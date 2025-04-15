const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const input = document.getElementById('input');
const sendButton = document.getElementById('send');

const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // フォーム送信を無効化
    const input = document.getElementById('input');
    const message = input.value;
    if (message) {
        socket.emit('message', message); // サーバーにメッセージを送信
        input.value = ''; // 入力欄をクリア
    }
});



socket.on('message', (msg) => {
    console.log('Received message:', msg); // デバッグ用
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    const messages = document.getElementById('messages');
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; // スクロールを最下部に
});


socket.on('connect', () => {
    console.log('Connected to server');
});
