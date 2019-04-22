console.log('Chat.js public script file');
const socket = io();

// ELEMENTOS DE DOM
let div_output = document.getElementById('output');
let div_actions = document.getElementById('actions');
let inp_username = document.getElementById('username');
let inp_message = document.getElementById('message');
let btn_send = document.getElementById('send');

btn_send.addEventListener('click', (e) => {
    console.log({
        username: inp_username.value,
        message: inp_message.value
    });
    socket.emit('chat:message', {
        username: inp_username.value,
        message: inp_message.value
    });
});

inp_message.addEventListener('keypress', (e) => {
    console.log({
        username: inp_username.value
    });
    socket.emit('chat:typing', {
        username: inp_username.value
    });
});

socket.on('chat:message', (data) => {
    div_actions.innerHTML = "";
    div_output.innerHTML += `<p>
    <strong>${data['username']}</strong>: ${data['message']}
    </p>`;
});

socket.on('chat:typing', (data) => {
    div_actions.innerHTML = `<p><em>
    ${data['username']} esta escribiendo...
    </em></p>`;
});