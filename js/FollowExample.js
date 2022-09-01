var jBulbX = 100, jBulbY = 100, jBulbAngle = 0.0;
var jBulbRadiusY = 100, jBulbRadiusX = 100;
var jBulbTop = 3.14159, jBulbBottom = 3.14159;

// var segTwoX = 100, segTwoY = 100, segTwoAngle = 0.0;
// var segThreeX = 100, segThreeY = 100, segThreeAngle = 0.0;

var weightGravity = .5;
var segLength = 3;
var segWidth = 5;
var segPoints = 50;

var segmentX = [], segmentY = [], segmentAngle = [];
var segmentDistanceX = [], segmentDistanceY = [];

for (let i = 0; i < segPoints; i++){
    segmentX[i] = 0; segmentY[i] = 0;
    segmentAngle[i] = 0;
    segmentDistanceX[i] = 0;
    segmentDistanceY[i] = 0;
}

var testingAnimationX = 200, testingAnimationY = 200, testingAnimationWidth = 100, testingAnimationHeight = 100, testingAnimationCompress = false, testingAnimationCount = 0;
var testingAnimationCountMax = 100, testingAnimationCountMin = 0;
var testingAnimationCompressDuration = 10, testingAnimationCompressCount = 0; 
var testingAnimationExpandDuration = 75, testingAnimationExpandCount = 0;


function setup() {
  createCanvas(710, 400);
  fill(255, 0, 100, 255);
  strokeWeight(segWidth);
  stroke(255, 0, 100, 100);
  strokeCap(SQUARE);
  strokeJoin(ROUND);
}

function draw() {
    background(0);

    {//Jellyfish Bulb
        //jBulbX, jBulbY, jBulbAngle, jBulbRadiusY, jBulbRadiusX, jBulbTop, jBulbBottom;
        jBulbDistanceX = mouseX - jBulbX; jBulbDistanceY = mouseY - jBulbY - (weightGravity * .01);
        jBulbAngle = atan2(jBulbDistanceY, jBulbDistanceX);

        jBulbX = mouseX - cos(jBulbAngle) * segLength;//testingAnimationExpandCount
        jBulbY = mouseY - sin(jBulbAngle) * segLength;//segLength

        animatedArc(jBulbX, jBulbY, jBulbAngle);
        segmentTestOne(jBulbX, jBulbY, jBulbAngle);
    }

    {//Segment 1 & 2
        // segTwoDistanceX = mouseX - segTwoX; segTwoDistanceY = mouseY - segTwoY - weightGravity;
        // segTwoAngle = atan2(segTwoDistanceY, segTwoDistanceX);

        // segTwoX = mouseX - cos(segTwoAngle) * segLength;
        // segTwoY = mouseY - sin(segTwoAngle) * segLength;

        // //segmentTestOne(segTwoX, segTwoY, segTwoAngle);
        // //ellipse(segTwoX, segTwoY, 20, 20);
        // //segmentTestTwo(segTwoX, segTwoY, (segTwoX + segTwoDistanceX), (segTwoY + segTwoDistanceY), segTwoAngle);
        // segmentTestThree(mouseX, mouseY, segTwoAngle);
    
    
    //Segment Two
        // segThreeDistanceX = segTwoX - segThreeX; segThreeDistanceY = segTwoY - segThreeY - weightGravity;
        // segThreeAngle = atan2(segThreeDistanceY, segThreeDistanceX);
        
        // segThreeX = segTwoX - cos(segThreeAngle) * segLength;
        // segThreeY = segTwoY - sin(segThreeAngle) * segLength;
        
        // segmentTestOne(segThreeX, segThreeY, segThreeAngle);
        // //ellipse(segThreeX, segThreeY, 20, 20);
    }

    {//Monitor
        // document.getElementById("Specs").innerHTML =
        // "mouseX("+mouseX+"), "+"mouseY("+mouseY+"), "+
        // "segTwoX("+round(segTwoX)+"), "+
        // "segTwoY("+round(segTwoY)+"), "+
        // "segTwoDistanceX(mouseX-segTwoX)= "+round(segTwoDistanceX)+"; "+
        // "segTwoDistanceY(mouseY-segTwoY)= "+round(segTwoDistanceY)+"; ";

        //document.getElementById("Specs").innerHTML = jBulbAngle;

        document.getElementById("segmentOne").innerHTML = "jbdX("+round(jBulbDistanceX)+")";

        document.getElementById("segmentTwo").innerHTML = "";
    }

    {//segment[0]
        segmentDistanceX[0] = mouseX - segmentX[0];
        segmentDistanceY[0] = mouseY - segmentY[0] - weightGravity * .1;
        segmentAngle[0] = atan2(segmentDistanceY[0], segmentDistanceX[0]);
        segmentX[0] = mouseX - cos(segmentAngle[0]) * segLength;
        segmentY[0] = mouseY - sin(segmentAngle[0]) * segLength;
        segmentTestThree(mouseX, mouseY, segmentAngle[0]);

        // document.getElementById("Specs").innerHTML =
        //     "Mouse("+mouseX+", "+mouseY+"); "+
        //     "segment[0]("+round(segmentX[0])+", "+round(segmentY[0])+"); "+
        //     "segment Angle("+round(segmentAngle[0])+"); "
        // ;
    }

    {//segment[i] Loop
        for(let i = 1; i < segPoints; i++){
            segmentDistanceX[i] = segmentX[i-1] - segmentX[i];
            segmentDistanceY[i] = segmentY[i-1] - segmentY[i] - weightGravity * .1;
            segmentAngle[i] = atan2(segmentDistanceY[i], segmentDistanceX[i]);
            segmentX[i] = segmentX[i-1] - cos(segmentAngle[i]) * segLength;
            segmentY[i] = segmentY[i-1] - sin(segmentAngle[i]) * segLength;
            segmentTestThree(segmentX[i-1], segmentY[i-1], segmentAngle[i]);
        }
    }

    {//movement
        //current direction
        //state[compression, expansion]
        // if(){
        //     //
        // }

        // testingAnimationX
        // testingAnimationY (100, 1),(50, 2)
        // testingAnimationWidth
        // testingAnimationHeight
        //expand (0 - 100)
        //compress (100 - 0)

        // if(testingAnimationCompress == false && testingAnimationCount < testingAnimationCountMax){
        //     testingAnimationCount += 1;
        // } else if(testingAnimationCompress == false && testingAnimationCount >= testingAnimationCountMax){
        //     testingAnimationCompress = true;
        // } else if(testingAnimationCompress == true && testingAnimationCount > testingAnimationCountMin){
        //     testingAnimationCount -= 1;
        // } else if(testingAnimationCompress == true && testingAnimationCount <= testingAnimationCountMin){
        //     testingAnimationCompress = false;
        // }

        if(testingAnimationCompress == false && testingAnimationExpandCount < testingAnimationExpandDuration){
            testingAnimationExpandCount += 1; 
            testingAnimationCompressCount = round(testingAnimationCompressDuration - testingAnimationCompressDuration * (testingAnimationExpandCount / testingAnimationExpandDuration));
        } else if(testingAnimationCompress == false && testingAnimationExpandCount >= testingAnimationExpandDuration){
            testingAnimationCompress=true;
            //testingAnimationExpandCount = 0;
        } else if(testingAnimationCompress == true && testingAnimationCompressCount < testingAnimationCompressDuration){
            testingAnimationCompressCount += 1; 
            testingAnimationExpandCount = round(testingAnimationExpandDuration - testingAnimationExpandDuration * (testingAnimationCompressCount / testingAnimationCompressDuration));
        } else if(testingAnimationCompress == true && testingAnimationCompressCount >= testingAnimationCompressDuration){
            testingAnimationCompress=false;
            //testingAnimationCompressCount = 0;
        }
        //document.getElementById("Specs").innerHTML = "compress("+testingAnimationCompress+") : count("+testingAnimationCount+" / "+testingAnimationCountMax+")";
        document.getElementById("Specs").innerHTML = 
            "Compress("+testingAnimationCompress+"); "+
            "Compress("+testingAnimationCompressCount+"/"+testingAnimationCompressDuration+") : "+
            "Expand("+testingAnimationExpandCount+"/"+testingAnimationExpandDuration+"); "
        ;

        ellipse(200, 200+(testingAnimationExpandCount * 0.5), 50+(testingAnimationExpandCount * 0.5), 40 + (testingAnimationCompressCount * 0.5));
        
        //ellipse(testingAnimationX, (200 + 75 * sin(frameCount / 20)), 150 - 100 * -sin(frameCount / 20), testingAnimationHeight);
    }
}

function animatedArc(inheritX, inheritY, inheritAngle) {
    push();

    //jBulbX, jBulbY, jBulbAngle,jBulbRadiusY, jBulbRadiusX, jBulbTop, jBulbBottom
    //arc(x, y, w, h, start, stop, [mode], [detail])
    arcPosX = inheritX;
    arcPosY = inheritY;
    arcXRadiusFromStart = 75 + (testingAnimationExpandCount * 0.25);
    arcYRadiusFromStart = 75 + (testingAnimationExpandCount * 0.25);
    arcTop = inheritAngle - HALF_PI;
    arcBottom = inheritAngle + HALF_PI;

    arc(arcPosX, arcPosY, arcXRadiusFromStart, arcYRadiusFromStart, arcTop, arcBottom, PIE);

    pop();
}

function segmentTestOne(inheritX, inheritY, inheritAngle) {
    push();
    translate(inheritX, inheritY);
    rotate(inheritAngle);
    line(0, 0, 75, 0);
    pop();
}

function segmentTestTwo(inheritX, inheritY, inheritDistanceX, inheritDistanceY) {
    push();
    line(inheritX, inheritY, inheritDistanceX, inheritDistanceY);
    pop();
}

function segmentTestThree(inheritX, inheritY, inheritAngle) {
    push();
    line(inheritX, inheritY, (inheritX - cos(inheritAngle) * segLength), (inheritY - sin(inheritAngle) * segLength) );
    pop();
}