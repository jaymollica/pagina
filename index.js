//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//parse JSON
let bodyParser = require('body-parser');
app.use(bodyParser.json());

//database init
let Datastore = require("nedb");
let db = new Datastore('manos.db');
db.loadDatabase();

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

app.post("/manos", (req,res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        x: req.body.x,
        y: req.body.y,
        c: req.body.c,
    }

    //insert into db
    db.insert(obj, (err, newDocs)=> {
        if(err) {
            res.json({status: "fail"});
        }
        else {
            res.json({status: "success"});
        }
    });

});

app.get('/getManos', (req,res)=> {

    db.find({}, (err, manos)=> {
        if(err) {
            res.json({status: "fail"});
        }
        else {
            console.log("got data");
            let obj = {data: manos};
            res.json(obj);
        }
    });
    
});

//Initialize socket.io
//let io = require('socket.io').listen(server);

let io = require('socket.io')();
io.listen(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message named 'data' from this client
    socket.on('data', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received: 'data' " + data);

        //Send the data to all clients, including this one
        //Set the name of the message to be 'data'
        io.sockets.emit('data', data);

        //Send the data to all other clients, not including this one
        // socket.broadcast.emit('data', data);

        //Send the data to just this client
        // socket.emit('data', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});