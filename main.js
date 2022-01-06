music1 = "";
music2 = "";

left_wrist_score = 0;
right_wrist_score = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    music1 = loadSound("Music1.mp3");
    music2 = loadSound("Music2.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.position(570,340);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);

}

function draw(){
    image(video,0,0,400,400);

    stroke("black");
    fill("red");

    song1 = music1.isPlaying()

    if(left_wrist_score > 0.2){
        circle(leftWristX-120,leftWristY - 10,20);
        music2.stop();

        if (song1 == false ){
            music1.play();
            document.getElementById("song_note").innerHTML = "Dynamite from BTS"; 
    
        }
    
            }
//--//
    song2 = music2.isPlaying()

    if(right_wrist_score > 0.2){
        circle(rightWristX-120,rightWristY - 10,20);
        music1.stop();

        if (song2 == false ){
            music2.play();
            document.getElementById("song_note").innerHTML = "Shape of you from Ed Sheeran"; 
    
        }
    
            }

}


function modelloaded(){
    console.log("Model has loaded !!!");
    }

function gotposes(results){
    if (results.length > 0){
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("right Wrist X = " + rightWristX + "right Wrist Y = " + rightWristY);

        left_wrist_score= results[0].pose.keypoints[9].score;
        console.log("LEFT WRIST SCORE  " + left_wrist_score);

        right_wrist_score= results[0].pose.keypoints[10].score;
        console.log("RIGHT WRIST SCORE  " + right_wrist_score);

    }
    
}

function play(){
    song1.rate(1);
    song1.setVolume(1);
}