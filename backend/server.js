const app = require('express')()

const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

io.on('connection', (socket) => {
    console.log("what is socket", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("what is playload", payload);
        io.emit("chat", payload)
    })
})

// app.listen(3000, () => console.log("Server is listening"))

server.listen(5500, () => console.log("Server is listening"))