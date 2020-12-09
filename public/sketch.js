window.addEventListener('load', function() {
    let introButton = document.getElementById("introClose");
    introButton.addEventListener('click', closeMe, false);
});

function closeMe() {
    var x = document.getElementById("introContainer");
    if (x.style.display !== "none") {
        x.style.display = "none";
    }
}

//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', function() {
    console.log("Connected");
});

let video;
let features;
let knn;
let labelP;
let ready = false;
let label;

let peaceImg;
let hornsImg;
let palmImg;

let imgPath;
let img;
let pose;

// asset init
let peaceRed;
let openRed;
let hornsRed;

let peaceOrange;
let openOrange;
let hornsOrange;

let peaceYellow;
let openYellow;
let hornsYellow;

let peaceGreen;
let openGreen;
let hornsGreen;

let peaceBlue;
let openBlue;
let hornsBlue;

let peacePurple;
let openPurple;
let hornsPurple;

function preload() {

    openRed = loadImage('img/red/open.png');
    hornsRed = loadImage('img/red/horns.png');
    peaceRed = loadImage('img/red/peace.png');

    openOrange = loadImage('img/orange/open.png');
    hornsOrange = loadImage('img/orange/horns.png');
    peaceOrange = loadImage('img/orange/peace.png');

    openYellow = loadImage('img/yellow/open.png');
    hornsYellow = loadImage('img/yellow/horns.png');
    peaceYellow = loadImage('img/yellow/peace.png');

    openGreen = loadImage('img/green/open.png');
    hornsGreen = loadImage('img/green/horns.png');
    peaceGreen = loadImage('img/green/peace.png');

    openBlue = loadImage('img/blue/open.png');
    hornsBlue = loadImage('img/blue/horns.png');
    peaceBlue = loadImage('img/blue/peace.png');

    openPurple = loadImage('img/purple/open.png');
    hornsPurple = loadImage('img/purple/horns.png');
    peacePurple = loadImage('img/purple/peace.png');

}

function setup() {
    createCanvas(5000, 5000);
    window.scroll(2500,2500);
    background(0);

    //get all previous manos from DB
    fetch('/getManos')
    .then(response => response.json())
    .then(data => {
        
        for(let i=0;i<data.data.length;i++) {
            
            drawPos(data.data[i]);
            
        }

    });

    //Listen for messages named 'data' from the server
    socket.on('data', function(obj) {
        drawPos(obj);
    });


    //ml5 / video stuff

    video = createCapture(VIDEO);
    video.size(320,320);
    video.hide();
    features = ml5.featureExtractor("MobileNet", modelReady);
    //labelP = createP("need training data");
}

// function draw() {
//     cursor('img/red/open.png');
// }

function mouseReleased() {

    if(ready) {

        //Select color
        let colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
        let color = random(colors);

        //Grab mouse position, create data
        let manoData = {
            x: mouseX,
            y: mouseY,
            c: color,
            p: pose,
        };

        //console.log(manoData);

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

}

//Expects an object with a and y properties
function drawPos(pos) {

    // imgPath = "img/"+pos.c+"/"+pos.p+".png";
    // console.log(imgPath);
    // img = loadImage(imgPath);
    if(pos.p == "open") {

        if(pos.c == "red") {
            image(openRed, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "orange") {
            image(openOrange, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "yellow") {
            image(openYellow, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "green") {
            image(openGreen, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "blue") {
            image(openBlue, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "purple") {
            image(openPurple, pos.x - 150, pos.y - 174);
        }
        
    }
    else if(pos.p == "peace") {

        if(pos.c == "red") {
            image(peaceRed, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "orange") {
            image(peaceOrange, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "yellow") {
            image(peaceYellow, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "green") {
            image(peaceGreen, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "blue") {
            image(peaceBlue, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "purple") {
            image(peacePurple, pos.x - 150, pos.y - 174);
        }
    }
    else if(pos.p == "horns") {
        
        if(pos.c == "red") {
            image(hornsRed, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "orange") {
            image(hornsOrange, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "yellow") {
            image(hornsYellow, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "green") {
            image(hornsGreen, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "blue") {
            image(hornsBlue, pos.x - 150, pos.y - 174);
        }
        else if(pos.c == "purple") {
            image(hornsPurple, pos.x - 150, pos.y - 174);
        }
    }
    

}

function goClassify() {
    const logits = features.infer(video);
    knn.classify(logits, function (error, result) {
        if(error) {
            console.error(error);
        }
        else {
            //console.log(result);
            if(result.label == 0) {
                label = "🖐️";
                pose = "open";
                img = palmImg;
            }
            else if(result.label == 1) {
                label = "✌️";
                pose = "peace";
                img = peaceImg;
            }
            else if(result.label == 2) {
                label = "🤘";
                pose = "horns";
                img = hornsImg;
            }
            ready = true;
            goClassify();
        }
    });
}


function modelReady() {
    console.log("MobileNet READY");
    knn = ml5.KNNClassifier();
    knn.load("model/model.json", function() {
        console.log("model ready");
        goClassify();
    });
}

