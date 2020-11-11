//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', function() {
    console.log("Connected");
});

function preload() {

    manoRed = loadImage('img/red.png');
    manoGreen = loadImage('img/green.png');
    manoBlue = loadImage('img/blue.png');
    manoYellow = loadImage('img/yellow.png');
    manoOrange = loadImage('img/orange.png');
    manoPurple = loadImage('img/purple.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    //get all previous manos from DB
    fetch('/getManos')
    .then(response => response.json())
    .then(data => {
        
        for(let i=0;i<data.data.length;i++) {
            console.log("data");
            console.log(data.data[i]);
            drawPos(data.data[i]);
            
        }

    });

    //Listen for messages named 'data' from the server
    socket.on('data', function(obj) {
        console.log(obj);
        drawPos(obj);
    });
}

function mouseReleased() {
    //Select color
    let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    let color = random(colors);

    //Grab mouse position, create data
    let manoData = {
        x: mouseX,
        y: mouseY,
        c: color,
    };

    //Send mouse position object to the server
    socket.emit('data', manoData);

    let mano_json = JSON.stringify(manoData);

    // send data
    fetch("/manos", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: mano_json,
    })
    .then(response => response.json())
    .then(data => {console.log(data)});

}

//Expects an object with a and y properties
function drawPos(pos) {
    console.log(pos);
    
    if(pos.c == "red") {
        image(manoRed, pos.x - 150, pos.y - 174);
    }
    else if(pos.c == "green") {
        image(manoGreen, pos.x - 150, pos.y - 174);
    }
    else if(pos.c == "blue") {
        image(manoBlue, pos.x - 150, pos.y - 174);
    }
    else if(pos.c == "yellow") {
        image(manoYellow, pos.x - 150, pos.y - 174);
    }
    else if(pos.c == "orange") {
        image(manoOrange, pos.x - 150, pos.y - 174);
    }
    else if(pos.c == "purple") {
        image(manoPurple, pos.x - 150, pos.y - 174);
    }

}