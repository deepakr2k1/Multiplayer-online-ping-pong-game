const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var user = 0;

app.use(require('express').static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A new Player joined');

    socket.on('ready', async(val) => {
        await user++;
        await socket.broadcast.emit("ready", val);
        if ((user % 2) == 1) {
            socket.broadcast.emit("isHost", val);
        } else {
            io.emit("start", true);
        }
    })
    socket.on('win', val => {
        socket.broadcast.emit('win', val);
    })
    socket.on('Y', y => {
        socket.broadcast.emit("Y", y);
    })
    socket.on('ball_x', x => {
        socket.broadcast.emit("ball_x", 600 - x);
    })
    socket.on('ball_y', y => {
        socket.broadcast.emit("ball_y", y);
    })
    socket.on('disconnect', () => {
        console.log('Player disconnected');
    })
});

const port = process.env.port || 3000;
http.listen(port, () => {
    console.log(`listening on port ${port}`);
});