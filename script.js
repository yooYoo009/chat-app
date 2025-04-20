const socket = io('http://localhost:3000');

// ユーザー名を設定
const username = prompt('Enter your username:'); // ユーザー名を入力
socket.emit('setUsername', username);

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

// メッセージを受信して表示
socket.on('message', (data) => {
    const { username, message } = data; // ユーザー名とメッセージを取得
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}:</strong> ${message}`; // ユーザー名とメッセージを表示
    const messages = document.getElementById('messages');
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; // スクロールを最下部に
});

socket.on('connect', () => {
    console.log('Connected to server');
});
