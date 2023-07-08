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

io.on('connection', (socket)=> {
    console.log("A user is connected.")

    // setTimeout(()=> {
    //     socket.send('Sent message from server side by prereserved event.');
    // },3000)

    // setTimeout(()=> {
    //     socket.emit('myCustomEvent', {description: 'A custom message from server side!'})
    // }, 3000)

    socket.on('myCustomClientEvent', (data)=> {
        console.log(data);
    })

    socket.on('disconnect', ()=> {
        console.log("A user is disconnected.")
    })
});

http.listen(3000, ()=> {
    console.log("Server is running on 3000")
})