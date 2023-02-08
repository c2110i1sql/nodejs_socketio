const express = require('express');
const ejs = require('ejs');
const storage = require('node-sessionstorage');

const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
    res.render('home');
});

let chat_data = storage.getItem('chat_data');
var message_data = chat_data ? JSON.parse(chat_data) : [];

io.on('connection', function(socket) {
    console.log('Co ket noi moi....');
    socket.on('disconnect', function(socket) {
        console.log('Da huy ket noi');    
    })

    socket.on('client-send', function(data) {
        let message = {
            text: data,
            author: 'bkap',
            date: new Date()
        };
        message_data.push(message);
        let jsonString = JSON.stringify(message_data);
         storage.setItem('chat_data', jsonString);
        io.emit('server-send', data);
    });

    io.emit('server-send-data', message_data);

    // socket.emit('server-send', 'Chao mưng bạn đến với chúng tôi');

})

server.listen(3000, function() {
    console.log('Server on: http://localhost:3000');
})


