var app = require('express')();
var http = require('http').Server(app);
var path = require('path');

var io = require('socket.io')(http);

app.get('/', (req, res) => {

    var options = {
        root: path.join(__dirname)
    }

    var filename = 'index.html'
    res.sendFile(filename, options);
})

    // var users = 0;

    var roomno = 1;
    var full = 0;

io.on('connection', (socket)=> {
    console.log("A user is connected.")

    socket.join("room-"+roomno);

    io.sockets.in("room-"+roomno).emit('connectedRoom', "You are connected to room no. "+roomno);

    full++;

    if(full >= 2) {
        full = 0;
        roomno++;
    }

    // users++;
    /* io.sockets.emit('broadcast', {message: users + " users connected."}) */

    // socket.emit('newuserconnect', { message: 'Hii, Welcome dear!'});

    // socket.broadcast.emit('newuserconnect', {message: users + " users connected!"});

    // setTimeout(()=> {
    //     socket.send('Sent message from server side by prereserved event.');
    // },3000)

    // setTimeout(()=> {
    //     socket.emit('myCustomEvent', {description: 'A custom message from server side!'})
    // }, 3000)

    /* socket.on('myCustomClientEvent', (data)=> {
        console.log(data);
    }) */

    socket.on('disconnect', ()=> {
        console.log("A user is disconnected.")

        // users--;
        // io.sockets.emit('broadcast', {message: users + " users connected."})
        // socket.broadcast.emit('newuserconnect', {message: users + " users connected!"});
        
    })

});

http.listen(3000, ()=> {
    console.log("Server is running on 3000")
})