{/* ---------- Details ---------- 
    Title: <Program title>
    Purpose: <Description>
    Code Version: <Versions>
    Availability: <Location>
    Creator: Rowan Abraham*/}

{// ---------- Learning Resources ----------

    {/* ---------- Javascript best practices ---------- 
    Avoid Global Variables, always declare local variables https://medium.com/@josephcardillo/the-difference-between-function-and-block-scope-in-javascript-4296b2322abe
    Never declare number, string, or boolean objects; instead treat them as primitives
    Don't use new Object(); {} > new Object; "" > new String; 0 > new Number(); false > new Boolean(); [] > new Array(); /()/ > new RegExp(); function(){} > new Function()
    Be aware of automatic type conversions
    Use === comparison
    Create defaults in case your parameters are missing; function thisFunction(a=1, b=2){};
    Always end your switch with a default
    Avoid using eval(), it is outdated and poses a security risk
    https://www.w3schools.com/js/js_best_practices.asp*/}

    {/* ---------- JS Reference ---------- 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference*/}

    {/* ---------- JS Cheat Sheet ---------- 
    https://htmlcheatsheet.com/js/*/}

    {/* ---------- Section ---------- 
        Text
        Link*/}
    }


console.log("script.js loaded");


{// ---------- Import Statements ----------
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
}

{// ---------- Variable Declaration ----------
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations

    var jellyfishOne;

    var bulbLength = 50;

    var segmentLength = 3;
    var segmentWidth = 0.5;
    var segmentPoints = 50;
    var segmentGroups = 11;
    
    var testingBounceX = 100, testingBounceY = 100;
    var testingBounceAngle = 0.0;

    // var animationDistance = 10;
    // var animationSineFrameREPLACE = animationDistance;
    // var animationCosineFrame = animationDistance;

    // animationMovement(1/20, 10, 0, 0); animationMovement(speed, length, offset);

    // var segmentOneX = [100, 100, 100, 100];
    // var segmentOneY = [100, 100, 100, 100];
    // var segmentOneAngle = [0.0, 0.0, 0.0, 0.0];
    // var segmentOneTrailX = [100, 100, 100, 100];
    // var segmentOneTrailY = [100, 100, 100, 100];
}

{// ---------- Define Actions and dependancies ----------
    //
}
    class Draggable{//modified from code available at https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
        constructor(){
            this.dragging = false; // Is the object being dragged?
            this.rollover = false; // Is the mouse over the ellipse?

            this.x = 100; this.y = 100; // initial coordinates
            this.w = 100; this.h = 100; // initial width & height

            this.bulbTrailX = 100;
            this.bulbTrailY = 300;
            this.bulbCentreX = this.x + (this.w / 2); this.bulbCentreY = this.y + (this.h / 2);
            this.animatedBulbCentreX = this.bulbCentreX + animationMovement(1/20, 10, 0, 0);
            this.animatedBulbCentreY = this.bulbCentreY + animationMovement(1/20, 10, 0, 0);

            this.bulbAngle = 0.0;

            // this.positionZeroX = this.x + (this.w / 2);
            // this.positionZeroY = this.y + (this.h / 2);
            // this.segmentTwoX = [];
            // this.segmentTwoY = [];
            // this.segmentTwoAngle = [];

            // for(let i = 0; i < segmentPoints; i++){
            //     this.segmentTwoX[i] = this.positionZeroX;
            //     this.segmentTwoY[i] = this.positionZeroY + (i + 1) * 100;
            //     this.segmentTwoAngle[i] = 3.14159;
            // }

            // this.sinPosX = 100; this.sinPosY = 100;

            // ((this.bulbCentreX + sin(this.bulbAngle)) * (sin(frameCount / 20) * segmentLength / 2))
            // ((this.bulbCentreY + cos(this.bulbAngle)) * (sin(frameCount / 20) * segmentLength / 2))

            this.segmentArray = [];
            this.segmentArray.length = segmentGroups;
            

            for(let ia = 0; ia < segmentGroups; ia++){
                this.segmentArray[ia] = []; 
                if(ia == 0){
                    this.segmentArray[ia].length = segmentPoints * 2;//stem has twice as many segments
                } else{
                    this.segmentArray[ia].length = segmentPoints;//all other tentacles have a normal amount of segments
                }
                
                for(let ib = 0; ib < this.segmentArray[ia].length; ib++){
                    this.segmentArray[ia][ib] = {segmentX : 200, segmentY : 300, segmentAngle : 0.0};
                }
            }
            // console.log(this.segmentArray[0][0].segmentX);
            // console.log(this.segmentArray);

        }
        isHovered(){
            if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
                this.rollover = true;
            } else {
                this.rollover = false;
            }
        }
        update(){
            this.bulbCentreX = this.x + (this.w / 2); 
            this.bulbCentreY = this.y + (this.h / 2);
            
            this.bulbAngle = atan2(this.bulbCentreX - this.bulbTrailX, this.bulbCentreY - this.bulbTrailY);//bulbAngle = atan2(mouseX - bulbX, mouseY - bulbY);
            this.bulbTrailX = this.bulbCentreX - sin(this.bulbAngle) * bulbLength;
            this.bulbTrailY = this.bulbCentreY - cos(this.bulbAngle) * bulbLength + 0.5;

            //AnimatedBulbCentre
            this.animatedBulbCentreX = this.bulbCentreX + sin(this.bulbAngle) * animationMovement(1/30, 10, 0, 1);
            this.animatedBulbCentreY = this.bulbCentreY + cos(this.bulbAngle) * animationMovement(1/30, 10, 0, 1);

            {
            
            // this.animatedLip075_X  = this.animatedLipCentreX + sin(this.bulbAngle - (0.75 * QUARTER_PI)) * animationMovement(1/30, 2.75, 8.75, 0.5);//6, 11.5
            // this.animatedLip075_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (0.75 * QUARTER_PI)) * animationMovement(1/30, 2.75, 8.75, 0.5);

            // this.animatedLip125_X  = this.animatedLipCentreX + sin(this.bulbAngle - (1.25 * QUARTER_PI)) * animationMovement(1/30, 4, 12, 0.5);//8, 16
            // this.animatedLip125_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (1.25 * QUARTER_PI)) * animationMovement(1/30, 4, 12, 0.5);
            // this.animatedLip175_X  = this.animatedLipCentreX + sin(this.bulbAngle - (1.75 * QUARTER_PI)) * animationMovement(1/30, 4.75, 19.25, 0.45);//14.5, 24
            // this.animatedLip175_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (1.75 * QUARTER_PI)) * animationMovement(1/30, 4.75, 19.25, 0.45);

            // this.animatedLip225_X  = this.animatedLipCentreX + sin(this.bulbAngle - (2.25 * QUARTER_PI)) * animationMovement(1/30, 1.25, 21.25, 1.75);//
            // this.animatedLip225_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (2.25 * QUARTER_PI)) * animationMovement(1/30, 1.25, 21.25, 1.75);
            // this.animatedLip275_X  = this.animatedLipCentreX + sin(this.bulbAngle - (2.75 * QUARTER_PI)) * animationMovement(1/30, 2.5, 15, 1.5);//12.5, 17.5
            // this.animatedLip275_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (2.75 * QUARTER_PI)) * animationMovement(1/30, 2.5, 15, 1.5);

            // this.animatedLip325_X  = this.animatedLipCentreX + sin(this.bulbAngle - (3.25 * QUARTER_PI)) * animationMovement(1/30, 3, 12, 1.5);//9 15
            // this.animatedLip325_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (3.25 * QUARTER_PI)) * animationMovement(1/30, 3, 12, 1.5);
            // this.animatedLip375_X  = this.animatedLipCentreX + sin(this.bulbAngle - (3.75 * QUARTER_PI)) * animationMovement(1/30, 3.5, 11.5, 1.5);//
            // this.animatedLip375_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (3.75 * QUARTER_PI)) * animationMovement(1/30, 3.5, 11.5, 1.5);

            // this.animatedLip425_X  = this.animatedLipCentreX + sin(this.bulbAngle - (4.25 * QUARTER_PI)) * animationMovement(1/30, 3.5, 11.5, 1.5);//
            // this.animatedLip425_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (4.25 * QUARTER_PI)) * animationMovement(1/30, 3.5, 11.5, 1.5);
            // this.animatedLip475_X  = this.animatedLipCentreX + sin(this.bulbAngle - (4.75 * QUARTER_PI)) * animationMovement(1/30, 3, 12, 1.5);//
            // this.animatedLip475_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (4.75 * QUARTER_PI)) * animationMovement(1/30, 3, 12, 1.5);

            // this.animatedLip525_X  = this.animatedLipCentreX + sin(this.bulbAngle - (5.25 * QUARTER_PI)) * animationMovement(1/30, 2.5, 15, 1.5);//
            // this.animatedLip525_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (5.25 * QUARTER_PI)) * animationMovement(1/30, 2.5, 15, 1.5);
            // this.animatedLip575_X  = this.animatedLipCentreX + sin(this.bulbAngle - (5.75 * QUARTER_PI)) * animationMovement(1/30, 1.25, 21.25, 1.75);//20, 22.5
            // this.animatedLip575_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (5.75 * QUARTER_PI)) * animationMovement(1/30, 1.25, 21.25, 1.75);

            // this.animatedLip625_X  = this.animatedLipCentreX + sin(this.bulbAngle - (6.25 * QUARTER_PI)) * animationMovement(1/30, 4.75, 19.25, 0.45);//
            // this.animatedLip625_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (6.25 * QUARTER_PI)) * animationMovement(1/30, 4.75, 19.25, 0.45);
            // this.animatedLip675_X  = this.animatedLipCentreX + sin(this.bulbAngle - (6.75 * QUARTER_PI)) * animationMovement(1/30, 4, 12, 0.5);//
            // this.animatedLip675_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (6.75 * QUARTER_PI)) * animationMovement(1/30, 4, 12, 0.5);

            // this.animatedLip725_X  = this.animatedLipCentreX + sin(this.bulbAngle - (7.25 * QUARTER_PI)) * animationMovement(1/30, 2.75, 8.75, 0.5);//
            // this.animatedLip725_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (7.25 * QUARTER_PI)) * animationMovement(1/30, 2.75, 8.75, 0.5);
            // this.animatedLip775_X  = this.animatedLipCentreX + sin(this.bulbAngle - (7.75 * QUARTER_PI)) * animationMovement(1/30, 2.5, 7.5, 0.5);//
            // this.animatedLip775_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (7.75 * QUARTER_PI)) * animationMovement(1/30, 2.5, 7.5, 0.5);

            // stroke(255, 0, 0);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipN_X, this.animatedLipN_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipENE_X, this.animatedLipENE_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipE_X, this.animatedLipE_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipESE_X, this.animatedLipESE_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipS_X, this.animatedLipS_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipWSW_X, this.animatedLipWSW_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipW_X, this.animatedLipW_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLipWNW_X, this.animatedLipWNW_Y);
            // line(this.animatedLipN_X, this.animatedLipN_Y, this.animatedLipENE_X, this.animatedLipENE_Y);
            // line(this.animatedLipENE_X, this.animatedLipENE_Y, this.animatedLipE_X, this.animatedLipE_Y);
            // line(this.animatedLipE_X, this.animatedLipE_Y, this.animatedLipESE_X, this.animatedLipESE_Y);
            // line(this.animatedLipESE_X, this.animatedLipESE_Y, this.animatedLipS_X, this.animatedLipS_Y);
            // line(this.animatedLipS_X, this.animatedLipS_Y, this.animatedLipWSW_X, this.animatedLipWSW_Y);
            // line(this.animatedLipWSW_X, this.animatedLipWSW_Y, this.animatedLipW_X, this.animatedLipW_Y);
            // line(this.animatedLipW_X, this.animatedLipW_Y, this.animatedLipWNW_X, this.animatedLipWNW_Y);
            // line(this.animatedLipWNW_X, this.animatedLipWNW_Y, this.animatedLipN_X, this.animatedLipN_Y);
            // stroke(0, 0, 255);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip025_X, this.animatedLip025_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip075_X, this.animatedLip075_Y);
            
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip125_X, this.animatedLip125_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip175_X, this.animatedLip175_Y);

            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip225_X, this.animatedLip225_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip275_X, this.animatedLip275_Y);

            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip325_X, this.animatedLip325_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip375_X, this.animatedLip375_Y);

            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip425_X, this.animatedLip425_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip475_X, this.animatedLip475_Y);

            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip525_X, this.animatedLip525_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip575_X, this.animatedLip575_Y);

            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip625_X, this.animatedLip625_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip675_X, this.animatedLip675_Y);

            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip725_X, this.animatedLip725_Y);
            // line(this.animatedLipCentreX, this.animatedLipCentreY, this.animatedLip775_X, this.animatedLip775_Y);
            // stroke(0, 0, 0);
            

            // line(this.animatedBulbN_X, this.animatedBulbN_Y, this.animatedBulbNE_X, this.animatedBulbNE_Y);
            // line(this.animatedBulbNE_X, this.animatedBulbNE_Y, this.animatedBulbE_X, this.animatedBulbE_Y);
            // line(this.animatedBulbE_X, this.animatedBulbE_Y, this.animatedBulbSE_X, this.animatedBulbSE_Y);
            // line(this.animatedBulbSE_X, this.animatedBulbSE_Y, this.animatedBulbS_X, this.animatedBulbS_Y);
            // line(this.animatedBulbS_X, this.animatedBulbS_Y, this.animatedBulbSW_X, this.animatedBulbSW_Y);
            // line(this.animatedBulbSW_X, this.animatedBulbSW_Y, this.animatedBulbW_X, this.animatedBulbW_Y);
            // line(this.animatedBulbW_X, this.animatedBulbW_Y, this.animatedBulbNW_X, this.animatedBulbNW_Y);
            // line(this.animatedBulbNW_X, this.animatedBulbNW_Y, this.animatedBulbN_X, this.animatedBulbN_Y);

            // ((this.bulbCentreX + sin(this.bulbAngle)) * (sin(frameCount / 20) * segmentLength / 2))
            // ((this.bulbCentreY + cos(this.bulbAngle)) * (sin(frameCount / 20) * segmentLength / 2))

            // this.positionZeroX = this.sinPosX + (this.w / 2);
            // this.positionZeroY = this.sinPosY + (this.h);

            // this.segmentTwoAngle[0] = atan2(this.positionZeroX - this.segmentTwoX[0], this.positionZeroY - this.segmentTwoY[0]);
            // this.segmentTwoX[0] = this.positionZeroX - sin(this.segmentTwoAngle[0]) * segmentLength;
            // this.segmentTwoY[0] = this.positionZeroY - cos(this.segmentTwoAngle[0]) * segmentLength;
            
            // for(let i = 1; i < segmentPoints; i++){
            //     this.segmentTwoAngle[i] = atan2(this.segmentTwoX[i-1] - this.segmentTwoX[i], this.segmentTwoY[i-1] - this.segmentTwoY[i]);
            //     this.segmentTwoX[i] = this.segmentTwoX[i-1] - sin(this.segmentTwoAngle[i]) * segmentLength;
            //     this.segmentTwoY[i] = this.segmentTwoY[i-1] - cos(this.segmentTwoAngle[i]) * segmentLength;
            // }
            }

            this.updateBulb();
            this.updateTentacles();

            if (this.dragging === true){
                this.x = mouseX + this.offsetX;
                this.y = mouseY + this.offsetY;
                // document.getElementById("segmentOne").innerHTML = "X dist("+round(mouseX)+" - "+round(bulbX)+"), "+"Y dist("+round(mouseY)+" - "+round(bulbY)+"), "+"Angle("+round(bulbAngle)+")";
            }
        }
        show(){
            if (this.dragging === true){
                fill(50, 100);
            } else if (this.rollover === true){
                fill(100, 100);
            } else {
                fill(255, 0);
            }

            {
            // rect(this.animatedBulbCentreX - 50, this.animatedBulbCentreY - 50, 100, 100);
            // rect(this.x, this.y, this.w, this.h);//actual output
            
            // line(this.sinPosX, this.sinPosY, this.x + (this.w / 2), this.y + (this.h / 2));
            // line(this.x - this.offsetX, this.y - this.offsetY, this.x + (this.w / 2), this.y + (this.h / 2));

            //N
            // this.bulbPointN_X = this.bulbCentreX + sin(this.bulbAngle) * bulbLength; 
            // this.bulbPointN_Y = this.bulbCentreY + cos(this.bulbAngle) * bulbLength;
            // //NE
            // this.bulbPointNE_X = this.bulbCentreX + sin(this.bulbAngle - QUARTER_PI) * bulbLength; this.bulbPointNE_Y = this.bulbCentreY + cos(this.bulbAngle - QUARTER_PI) * bulbLength;
            // //E
            // this.bulbPointE_X = this.bulbCentreX + sin(this.bulbAngle - HALF_PI) * bulbLength; this.bulbPointE_Y = this.bulbCentreY + cos(this.bulbAngle - HALF_PI) * bulbLength;
            // //SE
            // this.bulbPointSE_X = this.bulbCentreX - sin(this.bulbAngle + QUARTER_PI) * bulbLength; this.bulbPointSE_Y = this.bulbCentreY - cos(this.bulbAngle + QUARTER_PI) * bulbLength;
            // //S
            // this.bulbPointS_X = this.bulbCentreX + sin(this.bulbAngle + PI) * bulbLength; this.bulbPointS_Y = this.bulbCentreY + cos(this.bulbAngle + PI) * bulbLength;
            // //SW
            // this.bulbPointSW_X = this.bulbCentreX - sin(this.bulbAngle - QUARTER_PI) * bulbLength; this.bulbPointSW_Y = this.bulbCentreY - cos(this.bulbAngle - QUARTER_PI) * bulbLength;
            // //W
            // this.bulbPointW_X = this.bulbCentreX + sin(this.bulbAngle + HALF_PI) * bulbLength; this.bulbPointW_Y = this.bulbCentreY + cos(this.bulbAngle + HALF_PI) * bulbLength;
            // //NW
            // this.bulbPointNW_X = this.bulbCentreX + sin(this.bulbAngle + QUARTER_PI) * bulbLength; this.bulbPointNW_Y = this.bulbCentreY + cos(this.bulbAngle + QUARTER_PI) * bulbLength;
            
            // line(this.bulbCentreX, this.bulbCentreY, this.bulbPointN_X, this.bulbPointN_Y);
            // ellipse(this.bulbPointN_X, this.bulbPointN_Y, 5);
            // ellipse(this.bulbPointNE_X, this.bulbPointNE_Y, 5);
            // ellipse(this.bulbPointE_X, this.bulbPointE_Y, 5);
            // ellipse(this.bulbPointSE_X, this.bulbPointSE_Y, 5);
            // ellipse(this.bulbPointS_X, this.bulbPointS_Y, 5);
            // ellipse(this.bulbPointSW_X, this.bulbPointSW_Y, 5);
            // ellipse(this.bulbPointW_X, this.bulbPointW_Y, 5);
            // ellipse(this.bulbPointNW_X, this.bulbPointNW_Y, 5);
            
            // ellipse(this.animatedBulbN_X, this.animatedBulbN_Y, 5);
            // ellipse(this.animatedBulbNE_X, this.animatedBulbNE_Y, 5);
            // ellipse(this.animatedBulbE_X, this.animatedBulbE_Y, 5);
            // ellipse(this.animatedBulbSE_X, this.animatedBulbSE_Y, 5);
            // ellipse(this.animatedBulbS_X, this.animatedBulbS_Y, 5);
            // ellipse(this.animatedBulbSW_X, this.animatedBulbSW_Y, 5);
            // ellipse(this.animatedBulbW_X, this.animatedBulbW_Y, 5);
            // ellipse(this.animatedBulbNW_X, this.animatedBulbNW_Y, 5);
            //
            //     //sin(this.bulbAngle + (QUARTER_PI * 4)) * animationDistance
            //     // this.animatedBulbE_X = this.animatedBulbCentreX + sin(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 10, 10, 0); 
            //     // this.animatedBulbE_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 10, 10, 0);
            // this.animatedBulbN_B1_X = this.animatedBulbN_X + sin(this.bulbAngle - (6 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbN_B1_Y = this.animatedBulbN_Y + cos(this.bulbAngle - (6 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbN_B2_X = this.animatedBulbN_X + sin(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbN_B2_Y = this.animatedBulbN_Y + cos(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbNE_B1_X = this.animatedBulbNE_X + sin(this.bulbAngle - (7 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbNE_B1_Y = this.animatedBulbNE_Y + cos(this.bulbAngle - (7 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbNE_B2_X = this.animatedBulbNE_X + sin(this.bulbAngle - (3 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbNE_B2_Y = this.animatedBulbNE_Y + cos(this.bulbAngle - (3 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbE_B1_X = this.animatedBulbE_X + sin(this.bulbAngle - (0 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbE_B1_Y = this.animatedBulbE_Y + cos(this.bulbAngle - (0 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbE_B2_X = this.animatedBulbE_X + sin(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbE_B2_Y = this.animatedBulbE_Y + cos(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbSE_B1_X = this.animatedBulbSE_X + sin(this.bulbAngle - (1 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbSE_B1_Y = this.animatedBulbSE_Y + cos(this.bulbAngle - (1 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbSE_B2_X = this.animatedBulbSE_X + sin(this.bulbAngle - (5 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbSE_B2_Y = this.animatedBulbSE_Y + cos(this.bulbAngle - (5 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbS_B1_X = this.animatedBulbS_X + sin(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbS_B1_Y = this.animatedBulbS_Y + cos(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbS_B2_X = this.animatedBulbS_X + sin(this.bulbAngle - (6 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbS_B2_Y = this.animatedBulbS_Y + cos(this.bulbAngle - (6 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbSW_B1_X = this.animatedBulbSW_X + sin(this.bulbAngle - (3 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbSW_B1_Y = this.animatedBulbSW_Y + cos(this.bulbAngle - (3 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbSW_B2_X = this.animatedBulbSW_X + sin(this.bulbAngle - (7 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbSW_B2_Y = this.animatedBulbSW_Y + cos(this.bulbAngle - (7 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbW_B1_X = this.animatedBulbW_X + sin(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbW_B1_Y = this.animatedBulbW_Y + cos(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbW_B2_X = this.animatedBulbW_X + sin(this.bulbAngle - (0 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbW_B2_Y = this.animatedBulbW_Y + cos(this.bulbAngle - (0 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // this.animatedBulbNW_B1_X = this.animatedBulbNW_X + sin(this.bulbAngle - (5 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbNW_B1_Y = this.animatedBulbNW_Y + cos(this.bulbAngle - (5 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbNW_B2_X = this.animatedBulbNW_X + sin(this.bulbAngle - (1 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);
            // this.animatedBulbNW_B2_Y = this.animatedBulbNW_Y + cos(this.bulbAngle - (1 * QUARTER_PI)) * animationMovement(1/20, 3, 5, 0);

            // line(this.animatedBulbN_B1_X, this.animatedBulbN_B1_Y, this.animatedBulbN_B2_X, this.animatedBulbN_B2_Y);
            // line(this.animatedBulbNE_B1_X, this.animatedBulbNE_B1_Y, this.animatedBulbNE_B2_X, this.animatedBulbNE_B2_Y);
            // line(this.animatedBulbE_B1_X, this.animatedBulbE_B1_Y, this.animatedBulbE_B2_X, this.animatedBulbE_B2_Y);
            // line(this.animatedBulbSE_B1_X, this.animatedBulbSE_B1_Y, this.animatedBulbSE_B2_X, this.animatedBulbSE_B2_Y);
            // line(this.animatedBulbS_B1_X, this.animatedBulbS_B1_Y, this.animatedBulbS_B2_X, this.animatedBulbS_B2_Y);
            // line(this.animatedBulbSW_B1_X, this.animatedBulbSW_B1_Y, this.animatedBulbSW_B2_X, this.animatedBulbSW_B2_Y);
            // line(this.animatedBulbW_B1_X, this.animatedBulbW_B1_Y, this.animatedBulbW_B2_X, this.animatedBulbW_B2_Y);
            // line(this.animatedBulbNW_B1_X, this.animatedBulbNW_B1_Y, this.animatedBulbNW_B2_X, this.animatedBulbNW_B2_Y);
            







            // line(
            //     this.animatedBulbNE_X + sin(this.bulbAngle - (QUARTER_PI * 3)) * animationMovement(1/20, 10, 5, 0), 
            //     this.animatedBulbNE_Y + cos(this.bulbAngle - (QUARTER_PI * 3)) * animationMovement(1/20, 10, 5, 0),
            //     this.animatedBulbNE_X, 
            //     this.animatedBulbNE_Y
            // );
            //
            // line(
            //     this.animatedBulbN_X,
            //     this.animatedBulbN_Y,
            //     this.animatedBulbN_X + sin(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 2, 10, 0),
            //     this.animatedBulbN_Y + cos(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/20, 2, 10, 0)
            // );
            // line(
            //     this.animatedBulbN_X,
            //     this.animatedBulbN_Y,
            //     this.animatedBulbNE_X,
            //     this.animatedBulbNE_Y
            // );

            



            // ellipse(this.animatedBulbCentreX, this.animatedBulbCentreY, 5);

            

            // //North
            
            // ellipse(this.bulbPointN_X, this.bulbPointN_Y, 5);
            // line(this.bulbCentreX, this.bulbCentreY, this.bulbPointN_X, this.bulbPointN_Y);
            // //East
            
            // line(this.bulbCentreX, this.bulbCentreY, this.bulbPointE_X, this.bulbPointE_Y);
            // //South
            
            // line(this.bulbCentreX, this.bulbCentreY, this.bulbPointS_X, this.bulbPointS_Y);
            // //West
            
            // line(this.bulbCentreX, this.bulbCentreY, this.bulbPointW_X, this.bulbPointW_Y);

            // //SouthEast
            // this.bulbPointSE_X = this.bulbPointS_X + sin(this.bulbAngle - HALF_PI) * (bulbLength);
            // this.bulbPointSE_Y = this.bulbPointS_Y + cos(this.bulbAngle - HALF_PI) * (bulbLength);
            // ellipse(this.bulbPointSE_X, this.bulbPointSE_Y, 5);
            // line(this.bulbPointS_X, this.bulbPointS_Y, this.bulbPointSE_X, this.bulbPointSE_Y);
            // //SouthWest
            // this.bulbPointSW_X = this.bulbPointS_X + sin(this.bulbAngle + HALF_PI) * (bulbLength);
            // this.bulbPointSW_Y = this.bulbPointS_Y + cos(this.bulbAngle + HALF_PI) * (bulbLength);
            // ellipse(this.bulbPointSW_X, this.bulbPointSW_Y, 5);
            // line(this.bulbPointS_X, this.bulbPointS_Y, this.bulbPointSW_X, this.bulbPointSW_Y);




            // curve(
                // this.animatedBulbNW_X, this.animatedBulbNW_Y, 

                // this.animatedBulbN_X, this.animatedBulbN_Y, 
                // this.animatedBulbNE_X, this.animatedBulbNE_Y, 
                // this.animatedBulbE_X, this.animatedBulbE_Y, 
                // this.animatedBulbSE_X, this.animatedBulbSE_Y, 
                // this.animatedBulbS_X, this.animatedBulbS_Y, 
                // this.animatedBulbSW_X, this.animatedBulbSW_Y, 
                // this.animatedBulbW_X, this.animatedBulbW_Y, 
                // this.animatedBulbNW_X, this.animatedBulbNW_Y, 
                // this.animatedBulbN_X, this.animatedBulbN_Y, 

                // this.animatedBulbNE_X, this.animatedBulbNE_Y
            // );

            // line(this.animatedBulbCentreX, this.animatedBulbCentreY, this.animatedBulbN_X, this.animatedBulbN_Y);
            
            
                // fill(0, 255, 0, 50);
                // // strokeWeight(0.5);
                // // stroke(0, 255, 0);
                // fill(0, 0, 255, 50);

                // // strokeWeight(1);
                // // stroke(0);
                // // fill(255);

                // // strokeWeight(0.5);
                // // stroke(255, 0, 0);
                // fill(255, 0, 255, 50);
            
            //LIP
                // beginShape();
                // vertex(this.animatedLipWNW_X, this.animatedLipWNW_Y);
                // curveVertex(this.animatedLipN_X, this.animatedLipN_Y);
                // curveVertex(this.animatedLipENE_X, this.animatedLipENE_Y);
                // curveVertex(this.animatedLipE_X, this.animatedLipE_Y);
                // curveVertex(this.animatedLipESE_X, this.animatedLipESE_Y);
                // curveVertex(this.animatedLipS_X, this.animatedLipS_Y);
                // curveVertex(this.animatedLipWSW_X, this.animatedLipWSW_Y);
                // curveVertex(this.animatedLipW_X, this.animatedLipW_Y);
                // curveVertex(this.animatedLipWNW_X, this.animatedLipWNW_Y);
                // curveVertex(this.animatedLipN_X, this.animatedLipN_Y);
                // vertex(this.animatedLipENE_X, this.animatedLipENE_Y);
                // endShape();
            
            
            

            // (cos(segmentAngle + QUARTER_PI) * segmentLength / 2)

            //redirectLines(mouseX, mouseY, bulbAngle, segmentLength);
            //redirectLines(this.sinPosX,          this.sinPosY,          bulbAngle, segmentLength);
            //redirectLines(this.sinPosX + this.w, this.sinPosY,          bulbAngle, segmentLength);
            // redirectLines(this.sinPosX,          this.sinPosY + this.h, bulbAngle, segmentLength * 4);
            // redirectLines(this.sinPosX + this.w, this.sinPosY + this.h, bulbAngle, segmentLength * 4);

            // ellipse(this.bulbTrailX, this.bulbTrailY, 5);
            // // bulbX = this.x + (this.w / 2) - sin(bulbAngle) * 20;
            // // bulbY = this.y + (this.h / 2) - cos(bulbAngle) * 20 + 0.25;
            // ellipse(
            //     this.bulbTrailX - sin(this.bulbAngle) * segmentLength, 
            //     this.bulbTrailY - cos(this.bulbAngle) * segmentLength + 0.25, 
            //     5
            // );
            // ellipse(this.bulbCentreX + sin(this.bulbAngle) * animationMovement(1/20, 10, 0, 0), this.bulbCentreY + cos(this.bulbAngle) * animationMovement(1/20, 10, 0, 0), 5);

            // animationMovement(1/20, 10, 0, 0); animationMovement(speed, length, offset, 0);

            // ellipse(
            //     this.bulbCentreX + sin(this.bulbAngle) * bulbLength, 
            //     this.bulbCentreY + cos(this.bulbAngle) * bulbLength + animationMovement(1/20, 10, 0, 0), 
            //     5
            // );

            // document.getElementById("segmentOne").innerHTML = 
            // "this.x("+this.x+"), "+
            // "this.y("+this.x+"), "+
            // "this.offsetX("+this.offsetX+"), "+
            // "this.offsetY("+this.offsetY+"), ";

            // ellipse(this.positionZeroX, this.positionZeroY, 5);
            // // ellipse(this.sinPosX + (this.w / 2), this.sinPosY + (this.h * 2), 5);
            // //ellipse(this.segmentTwoX[0], this.segmentTwoY[0], 5);
            }
            this.drawTentacles();
            this.drawBulb();
        }
        updateBulb(){
            //animated Shell
            this.aMShellN  = animationMovement(1/30, 2.5, 40, 0.75);
            this.aMShellNE = animationMovement(1/30, 10, 40, 0.5);
            this.aMShellE  = animationMovement(1/30, 10, 40, 0.25);
            this.aMShellSE = animationMovement(1/30, 5, 25, 1.5);
            this.aMShellS  = animationMovement(1/30, 7, 23, 1.5);
            this.aMShellSW = this.aMShellSE;
            this.aMShellW  = this.aMShellE;
            this.aMShellNW = this.aMShellNE;

            this.animatedShellN_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (0 * QUARTER_PI)) * this.aMShellN;//AS_N
            this.animatedShellN_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (0 * QUARTER_PI)) * this.aMShellN;
            this.animatedShellNE_X = this.animatedBulbCentreX + sin(this.bulbAngle - (1 * QUARTER_PI)) * this.aMShellNE;//AS_NE
            this.animatedShellNE_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (1 * QUARTER_PI)) * this.aMShellNE;
            this.animatedShellE_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (2 * QUARTER_PI)) * this.aMShellE;//AS_E
            this.animatedShellE_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (2 * QUARTER_PI)) * this.aMShellE;
            this.animatedShellSE_X = this.animatedBulbCentreX + sin(this.bulbAngle - (3 * QUARTER_PI)) * this.aMShellSE;//AS_SE
            this.animatedShellSE_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (3 * QUARTER_PI)) * this.aMShellSE;
            this.animatedShellS_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (4 * QUARTER_PI)) * this.aMShellS;//AS_S
            this.animatedShellS_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (4 * QUARTER_PI)) * this.aMShellS;
            this.animatedShellSW_X = this.animatedBulbCentreX + sin(this.bulbAngle - (5 * QUARTER_PI)) * this.aMShellSW;//AS_SW
            this.animatedShellSW_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (5 * QUARTER_PI)) * this.aMShellSW;
            this.animatedShellW_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (6 * QUARTER_PI)) * this.aMShellW;//AS_W
            this.animatedShellW_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (6 * QUARTER_PI)) * this.aMShellW;
            this.animatedShellNW_X = this.animatedBulbCentreX + sin(this.bulbAngle - (7 * QUARTER_PI)) * this.aMShellNW;//AS_NW
            this.animatedShellNW_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (7 * QUARTER_PI)) * this.aMShellNW;

            //animated Bulb
            {
            // this.animatedBulbN_X       = this.animatedBulbCentreX + sin(this.bulbAngle - (0 * QUARTER_PI)) * animationMovement(1/30, -15, 30, 0);//A_N
            // this.animatedBulbN_Y       = this.animatedBulbCentreY + cos(this.bulbAngle - (0 * QUARTER_PI)) * animationMovement(1/30, -15, 30, 0);
            // this.animatedBulbNE_X      = this.animatedBulbCentreX + sin(this.bulbAngle - (1 * QUARTER_PI)) * animationMovement(1/30, -5, 25, 0);//A_NE
            // this.animatedBulbNE_Y      = this.animatedBulbCentreY + cos(this.bulbAngle - (1 * QUARTER_PI)) * animationMovement(1/30, -5, 25, 0);
            // this.animatedBulbE_X       = this.animatedBulbCentreX + sin(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/30, 10, 35, 0);//A_E
            // this.animatedBulbE_Y       = this.animatedBulbCentreY + cos(this.bulbAngle - (2 * QUARTER_PI)) * animationMovement(1/30, 10, 35, 0);
            // this.animatedBulbSE_X      = this.animatedBulbCentreX + sin(this.bulbAngle - (3 * QUARTER_PI)) * animationMovement(1/30, 15, 32.5, 0);//A_SE
            // this.animatedBulbSE_Y      = this.animatedBulbCentreY + cos(this.bulbAngle - (3 * QUARTER_PI)) * animationMovement(1/30, 15, 32.5, 0);
            // this.animatedBulbS_X       = this.animatedBulbCentreX + sin(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/30, 15, 30, 0);//A_S
            // this.animatedBulbS_Y       = this.animatedBulbCentreY + cos(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/30, 15, 30, 0);
            // this.animatedBulbSW_X      = this.animatedBulbCentreX + sin(this.bulbAngle - (5 * QUARTER_PI)) * animationMovement(1/30, 15, 32.5, 0);//A_SW
            // this.animatedBulbSW_Y      = this.animatedBulbCentreY + cos(this.bulbAngle - (5 * QUARTER_PI)) * animationMovement(1/30, 15, 32.5, 0);
            // this.animatedBulbW_X       = this.animatedBulbCentreX + sin(this.bulbAngle - (6 * QUARTER_PI)) * animationMovement(1/30, 10, 35, 0);//A_W
            // this.animatedBulbW_Y       = this.animatedBulbCentreY + cos(this.bulbAngle - (6 * QUARTER_PI)) * animationMovement(1/30, 10, 35, 0);
            // this.animatedBulbNW_X      = this.animatedBulbCentreX + sin(this.bulbAngle - (7 * QUARTER_PI)) * animationMovement(1/30, -5, 25, 0);//A_NW
            // this.animatedBulbNW_Y      = this.animatedBulbCentreY + cos(this.bulbAngle - (7 * QUARTER_PI)) * animationMovement(1/30, -5, 25, 0);
            }
            this.aMBulbN  = animationMovement(1/30, 2.5, 27.5, 0.75);
            this.aMBulbNE = animationMovement(1/30, 10, 30, 0.5);
            this.aMBulbE  = animationMovement(1/30, 10, 35, 0.25);
            this.aMBulbSE = animationMovement(1/30, 5, 25, 1.5);
            this.aMBulbS  = animationMovement(1/30, 7, 23, 1.5);
            this.aMBulbSW = this.aMBulbSE;
            this.aMBulbW  = this.aMBulbE;
            this.aMBulbNW = this.aMBulbNE;

            this.animatedBulbN_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (0 * QUARTER_PI)) * this.aMBulbN;//A_N
            this.animatedBulbN_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (0 * QUARTER_PI)) * this.aMBulbN;
            this.animatedBulbNE_X = this.animatedBulbCentreX + sin(this.bulbAngle - (1 * QUARTER_PI)) * this.aMBulbNE;//A_NE
            this.animatedBulbNE_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (1 * QUARTER_PI)) * this.aMBulbNE;
            this.animatedBulbE_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (2 * QUARTER_PI)) * this.aMBulbE;//A_E
            this.animatedBulbE_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (2 * QUARTER_PI)) * this.aMBulbE;
            this.animatedBulbSE_X = this.animatedBulbCentreX + sin(this.bulbAngle - (3 * QUARTER_PI)) * this.aMBulbSE;//A_SE
            this.animatedBulbSE_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (3 * QUARTER_PI)) * this.aMBulbSE;
            this.animatedBulbS_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (4 * QUARTER_PI)) * this.aMBulbS;//A_S
            this.animatedBulbS_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (4 * QUARTER_PI)) * this.aMBulbS;
            this.animatedBulbSW_X = this.animatedBulbCentreX + sin(this.bulbAngle - (5 * QUARTER_PI)) * this.aMBulbSW;//A_SW
            this.animatedBulbSW_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (5 * QUARTER_PI)) * this.aMBulbSW;
            this.animatedBulbW_X  = this.animatedBulbCentreX + sin(this.bulbAngle - (6 * QUARTER_PI)) * this.aMBulbW;//A_W
            this.animatedBulbW_Y  = this.animatedBulbCentreY + cos(this.bulbAngle - (6 * QUARTER_PI)) * this.aMBulbW;
            this.animatedBulbNW_X = this.animatedBulbCentreX + sin(this.bulbAngle - (7 * QUARTER_PI)) * this.aMBulbNW;//A_NW
            this.animatedBulbNW_Y = this.animatedBulbCentreY + cos(this.bulbAngle - (7 * QUARTER_PI)) * this.aMBulbNW;

            //Animated Lip
            this.animatedLipCentreX = this.animatedBulbCentreX + sin(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/30, 7 / 2, 23 / 2, 1.5);// 50% between centre & south
            this.animatedLipCentreY = this.animatedBulbCentreY + cos(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/30, 7 / 2, 23 / 2, 1.5);

            this.aMLipN  = animationMovement(1/30, 5, 10, 0.25);
            this.aMLipNE = animationMovement(1/30, 6.5, 13.5, 0.25);
            this.aMLipENE = animationMovement(1/30, 10, 20, 0.25);
            this.aMLipE  = animationMovement(1/30, 6.25, 23.75, 0.25);
            this.aMLipESE = animationMovement(1/30, 2.5, 17.5, 1.5);
            this.aMLipSE = animationMovement(1/30, 3, 14, 1.5);
            this.aMLipS  = animationMovement(1/30, 3.75, 11.25, 1.5);
            this.aMLipSW = this.aMLipSE;
            this.aMLipWSW = this.aMLipESE;
            this.aMLipW  = this.aMLipE;
            this.aMLipWNW = this.aMLipENE;
            this.aMLipNW = this.aMLipNE;

            this.animatedLipN_X  = this.animatedLipCentreX + sin(this.bulbAngle - (0   * QUARTER_PI)) * this.aMLipN;//AL_N
            this.animatedLipN_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (0   * QUARTER_PI)) * this.aMLipN;
            this.animatedLipNE_X  = this.animatedLipCentreX + sin(this.bulbAngle - (1 * QUARTER_PI)) * this.aMLipNE;//AL_NE
            this.animatedLipNE_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (1 * QUARTER_PI)) * this.aMLipNE;
            this.animatedLipENE_X = this.animatedLipCentreX + sin(this.bulbAngle - (1.5 * QUARTER_PI)) * this.aMLipENE;//AL_ENE
            this.animatedLipENE_Y = this.animatedLipCentreY + cos(this.bulbAngle - (1.5 * QUARTER_PI)) * this.aMLipENE;
            this.animatedLipE_X  = this.animatedLipCentreX + sin(this.bulbAngle - (2   * QUARTER_PI)) * this.aMLipE;//AL_E
            this.animatedLipE_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (2   * QUARTER_PI)) * this.aMLipE;
            this.animatedLipESE_X = this.animatedLipCentreX + sin(this.bulbAngle - (2.5 * QUARTER_PI)) * this.aMLipESE;//AL_ESE
            this.animatedLipESE_Y = this.animatedLipCentreY + cos(this.bulbAngle - (2.5 * QUARTER_PI)) * this.aMLipESE;
            this.animatedLipSE_X  = this.animatedLipCentreX + sin(this.bulbAngle - (3   * QUARTER_PI)) * this.aMLipSE;//AL_SW
            this.animatedLipSE_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (3   * QUARTER_PI)) * this.aMLipSE;
            this.animatedLipS_X  = this.animatedLipCentreX + sin(this.bulbAngle - (4   * QUARTER_PI)) * this.aMLipS;//AL_S
            this.animatedLipS_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (4   * QUARTER_PI)) * this.aMLipS;
            this.animatedLipSW_X  = this.animatedLipCentreX + sin(this.bulbAngle - (5   * QUARTER_PI)) * this.aMLipSW;//AL_SW
            this.animatedLipSW_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (5   * QUARTER_PI)) * this.aMLipSW;
            this.animatedLipWSW_X = this.animatedLipCentreX + sin(this.bulbAngle - (5.5 * QUARTER_PI)) * this.aMLipWSW;//AL_WSW
            this.animatedLipWSW_Y = this.animatedLipCentreY + cos(this.bulbAngle - (5.5 * QUARTER_PI)) * this.aMLipWSW;
            this.animatedLipW_X  = this.animatedLipCentreX + sin(this.bulbAngle - (6   * QUARTER_PI)) * this.aMLipW;//AL_W
            this.animatedLipW_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (6   * QUARTER_PI)) * this.aMLipW;
            this.animatedLipWNW_X = this.animatedLipCentreX + sin(this.bulbAngle - (6.5 * QUARTER_PI)) * this.aMLipWNW;//AL_WNW
            this.animatedLipWNW_Y = this.animatedLipCentreY + cos(this.bulbAngle - (6.5 * QUARTER_PI)) * this.aMLipWNW;
            this.animatedLipNW_X  = this.animatedLipCentreX + sin(this.bulbAngle - (7 * QUARTER_PI)) * this.aMLipNW;//AL_NW
            this.animatedLipNW_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (7 * QUARTER_PI)) * this.aMLipNW;
        }
        updateTentacles(){
            //Initialize stem
            this.segmentArray[0][0].segmentX  = this.animatedLipN_X; this.segmentArray[0][0].segmentY  = this.animatedLipN_Y;
            
            //Initialize all tentacles
            this.segmentArray[1][0].segmentX  = this.animatedLipNE_X; this.segmentArray[1][0].segmentY  = this.animatedLipNE_Y;
            this.segmentArray[2][0].segmentX  = this.animatedLipENE_X; this.segmentArray[2][0].segmentY  = this.animatedLipENE_Y;
            this.segmentArray[3][0].segmentX  = this.animatedLipE_X; this.segmentArray[3][0].segmentY  = this.animatedLipE_Y; 
            this.segmentArray[4][0].segmentX  = this.animatedLipESE_X; this.segmentArray[4][0].segmentY  = this.animatedLipESE_Y; 
            this.segmentArray[5][0].segmentX  = this.animatedLipSE_X; this.segmentArray[5][0].segmentY  = this.animatedLipSE_Y; 
            this.segmentArray[6][0].segmentX  = this.animatedLipWSW_X; this.segmentArray[6][0].segmentY  = this.animatedLipWSW_Y; 
            this.segmentArray[7][0].segmentX  = this.animatedLipSW_X; this.segmentArray[7][0].segmentY  = this.animatedLipSW_Y; 
            this.segmentArray[8][0].segmentX  = this.animatedLipW_X; this.segmentArray[8][0].segmentY  = this.animatedLipW_Y;
            this.segmentArray[9][0].segmentX  = this.animatedLipWNW_X; this.segmentArray[9][0].segmentY  = this.animatedLipWNW_Y;
            this.segmentArray[10][0].segmentX  = this.animatedLipNW_X; this.segmentArray[10][0].segmentY  = this.animatedLipNW_Y;
            
            //re establish positions
            for(let ia = 0; ia < segmentGroups; ia++){
                for(let ib = 1; ib < this.segmentArray[ia].length; ib++){
                    this.segmentArray[ia][ib].segmentAngle = atan2(
                        this.segmentArray[ia][ib-1].segmentX - this.segmentArray[ia][ib].segmentX + random(-0.05, 0.05),
                        this.segmentArray[ia][ib-1].segmentY - this.segmentArray[ia][ib].segmentY - 0.25 - random(0.25)
                    );
                    this.segmentArray[ia][ib].segmentX = this.segmentArray[ia][ib-1].segmentX - sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength;
                    this.segmentArray[ia][ib].segmentY = this.segmentArray[ia][ib-1].segmentY - cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength;
                }
            }
        }
        drawBulb(){
            {//BULB without Lip
                fill(255, 0, 255, 50);
                beginShape();
                vertex(this.animatedBulbNW_X, this.animatedBulbNW_Y);
                curveVertex(this.animatedBulbN_X, this.animatedBulbN_Y);
                curveVertex(this.animatedBulbNE_X, this.animatedBulbNE_Y);
                curveVertex(this.animatedBulbE_X, this.animatedBulbE_Y);
                curveVertex(this.animatedBulbSE_X, this.animatedBulbSE_Y);

                curveVertex(this.animatedBulbS_X, this.animatedBulbS_Y);
                vertex(this.animatedBulbSW_X, this.animatedBulbSW_Y);
                curveVertex(this.animatedBulbS_X, this.animatedBulbS_Y);

                curveVertex(this.animatedLipESE_X, this.animatedLipESE_Y);
                curveVertex(this.animatedLipE_X, this.animatedLipE_Y);
                curveVertex(this.animatedLipENE_X, this.animatedLipENE_Y);
                curveVertex(this.animatedLipN_X, this.animatedLipN_Y);
                curveVertex(this.animatedLipWNW_X, this.animatedLipWNW_Y);
                curveVertex(this.animatedLipW_X, this.animatedLipW_Y);
                curveVertex(this.animatedLipWSW_X, this.animatedLipWSW_Y);

                curveVertex(this.animatedBulbS_X, this.animatedBulbS_Y);
                vertex(this.animatedBulbSE_X, this.animatedBulbSE_Y);
                curveVertex(this.animatedBulbS_X, this.animatedBulbS_Y);

                curveVertex(this.animatedBulbSW_X, this.animatedBulbSW_Y);
                curveVertex(this.animatedBulbW_X, this.animatedBulbW_Y);
                curveVertex(this.animatedBulbNW_X, this.animatedBulbNW_Y);
                curveVertex(this.animatedBulbN_X, this.animatedBulbN_Y);
                vertex(this.animatedBulbNE_X, this.animatedBulbNE_Y);
                endShape();
            }
            {//BULB
                fill(255, 0, 255, 50);
                beginShape();
                vertex(this.animatedBulbNW_X, this.animatedBulbNW_Y);
                curveVertex(this.animatedBulbN_X, this.animatedBulbN_Y);
                curveVertex(this.animatedBulbNE_X, this.animatedBulbNE_Y);
                curveVertex(this.animatedBulbE_X, this.animatedBulbE_Y);
                curveVertex(this.animatedBulbSE_X, this.animatedBulbSE_Y);
                curveVertex(this.animatedBulbS_X, this.animatedBulbS_Y);
                curveVertex(this.animatedBulbSW_X, this.animatedBulbSW_Y);
                curveVertex(this.animatedBulbW_X, this.animatedBulbW_Y);
                curveVertex(this.animatedBulbNW_X, this.animatedBulbNW_Y);
                curveVertex(this.animatedBulbN_X, this.animatedBulbN_Y);
                vertex(this.animatedBulbNE_X, this.animatedBulbNE_Y);
                endShape();
            }
            {//SHELL
                fill(255, 255, 255, 50);
                beginShape();
                vertex(this.animatedShellNW_X, this.animatedShellNW_Y);
                curveVertex(this.animatedShellN_X, this.animatedShellN_Y);
                curveVertex(this.animatedShellNE_X, this.animatedShellNE_Y);
                curveVertex(this.animatedShellE_X, this.animatedShellE_Y);
                curveVertex(this.animatedShellSE_X, this.animatedShellSE_Y);
                curveVertex(this.animatedShellS_X, this.animatedShellS_Y);
                curveVertex(this.animatedShellSW_X, this.animatedShellSW_Y);
                curveVertex(this.animatedShellW_X, this.animatedShellW_Y);
                curveVertex(this.animatedShellNW_X, this.animatedShellNW_Y);
                curveVertex(this.animatedShellN_X, this.animatedShellN_Y);
                vertex(this.animatedShellNE_X, this.animatedShellNE_Y);
                endShape();
            }
        }
        drawTentacles(){
            stroke(0, 0, 0, 50)
            for(let ia = 0; ia < segmentGroups; ia++){
                //console.log("ia");
                //ellipse(this.segmentArray[ia][0].segmentX, this.segmentArray[ia][0].segmentY, 1);
                for(let ib = 1; ib < this.segmentArray[ia].length; ib++){
                    //console.log("ib");
                    //ellipse(this.segmentArray[ia][ib].segmentX, this.segmentArray[ia][ib].segmentY, 1);
                    line(
                        this.segmentArray[ia][ib].segmentX, 
                        this.segmentArray[ia][ib].segmentY, 
                        this.segmentArray[ia][ib-1].segmentX, 
                        this.segmentArray[ia][ib-1].segmentY
                    );
                    line(
                        this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        (this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                         + (sin(this.segmentArray[ia][ib].segmentAngle + (3 * QUARTER_PI)) * segmentLength / 2),
                        (this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                         + (cos(this.segmentArray[ia][ib].segmentAngle + (3 * QUARTER_PI)) * segmentLength / 2)
                    );
                    line(
                        this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        (this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                         + (sin(this.segmentArray[ia][ib].segmentAngle - (3 * QUARTER_PI)) * segmentLength / 2),
                        (this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                         + (cos(this.segmentArray[ia][ib].segmentAngle - (3 * QUARTER_PI)) * segmentLength / 2)
                    );
                }
            }
        }
        isPressed(){
            if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
                this.dragging = true;
                this.offsetX = this.x - mouseX;
                this.offsetY = this.y - mouseY;
            }
        }
        isReleased(){
            this.dragging = false;
        }
    }

    function mousePressed(){jellyfishOne.isPressed();}
    function mouseReleased(){jellyfishOne.isReleased();}

{// ---------- Define Main Sequence(s) ----------
    function preload(){
        //
    }
    function setup(){
        let foregroundCanvas = createCanvas(windowWidth, windowHeight);
        let foregroundParent = document.getElementById("foreground");
        foregroundCanvas.parent(foregroundParent);

        jellyfishOne = new Draggable(100, 100, 100, 100);

        strokeWeight(segmentWidth);
        stroke(255, 0, 100, 100);
        strokeCap(SQUARE);
        strokeJoin(ROUND);
    }
}

{// ---------- Define Main Loop(s) ----------
    function draw(){
        clear();

        jellyfishOne.isHovered();
        jellyfishOne.update();
        jellyfishOne.show();

        //fill(255);
        //strokeWeight(1);
        //stroke(0);
        {//previous angle methods
            // segmentOneAngle[0] = atan2(segmentOneTrailX[0], segmentOneTrailY[0]);
            // segmentOneTrailX[0] = 100;
            // segmentOneTrailY[0] = 100;
            //segmentOneX[0] = segmentOneTrailX[0] - sin(segmentOneAngle[0]);
            //segmentOneY[0] = segmentOneTrailY[0] - cos(segmentOneAngle[0]);

                //angle comes from atan2 (position 1 - previous extrapolated position 1, position 2 - previous extrapolated position 2)
            // bulbAngle = atan2(this.x + (this.w / 2) - bulbX, this.y + (this.h / 2) - bulbY); 
            // //bulbAngle = atan2(mouseX - bulbX, mouseY - bulbY);
            // bulbX = this.x + (this.w / 2) - sin(bulbAngle) * 20;
            // bulbY = this.y + (this.h / 2) - cos(bulbAngle) * 20 + 0.5;

            // segmentDistanceX[0] = mouseX - segmentX[0];
            // segmentDistanceY[0] = mouseY - segmentY[0] - weightGravity * .1;
            // segmentAngle[0] = atan2(segmentDistanceY[0], segmentDistanceX[0]);
            // segmentX[0] = mouseX - cos(segmentAngle[0]) * segmentLength;
            // segmentY[0] = mouseY - sin(segmentAngle[0]) * segmentLength;
            // segmentTestThree(mouseX, mouseY, segmentAngle[0]);

                    //redirectLines(segmentOneX[0], segmentOneY[0], segmentOneAngle[0]), 50;
            //console.log(segmentOneAngle[0]);
            // ellipse(200, 200, 5);
            //ellipse(segmentOneTrailX, segmentOneTrailY, 5);
            //ellipse(segmentOneX, segmentOneY, 5);
            // newEllipse(mouseX, mouseY, 5);
            // newEllipse(segmentOneTrailX, segmentOneTrailY, 5);
            // newEllipse(segmentOneX, segmentOneY, 5);
        

        // mouse position trail
            // positionZeroX = mouseX;positionZeroY = mouseY;// standin for actual first point

            // // segmentOneTrailX[0] = positionZeroX - segmentOneX[0]; segmentOneTrailY[0] = positionZeroY - segmentOneY[0]; //distances are not necessary, can do math in atan2

            // segmentOneAngle[0] = atan2(positionZeroX - segmentOneX[0], positionZeroY - segmentOneY[0]);
            // segmentOneX[0] = positionZeroX - sin(segmentOneAngle[0]) * segmentLength;
            // segmentOneY[0] = positionZeroY - cos(segmentOneAngle[0]) * segmentLength;
            // ellipse(segmentOneX[0], segmentOneY[0], 5);

            // segmentOneAngle[1] = atan2(segmentOneX[0] - segmentOneX[1], segmentOneY[0] - segmentOneY[1]);
            // segmentOneX[1] = segmentOneX[0] - sin(segmentOneAngle[1]) * segmentLength;
            // segmentOneY[1] = segmentOneY[0] - cos(segmentOneAngle[1]) * segmentLength;
            // ellipse(segmentOneX[1], segmentOneY[1], 5);

            // segmentOneAngle[2] = atan2(segmentOneX[1] - segmentOneX[2], segmentOneY[1] - segmentOneY[2]);
            // segmentOneX[2] = segmentOneX[1] - sin(segmentOneAngle[2]) * segmentLength;
            // segmentOneY[2] = segmentOneY[1] - cos(segmentOneAngle[2]) * segmentLength;
            // ellipse(segmentOneX[2], segmentOneY[2], 5);

            // segmentOneAngle[3] = atan2(segmentOneX[2] - segmentOneX[3], segmentOneY[2] - segmentOneY[3]);
            // segmentOneX[3] = segmentOneX[2] - sin(segmentOneAngle[3]) * segmentLength;
            // segmentOneY[3] = segmentOneY[2] - cos(segmentOneAngle[3]) * segmentLength;
            // ellipse(segmentOneX[3], segmentOneY[3], 5);

            // segmentOneAngle[4] = atan2(segmentOneX[3] - segmentOneX[4], segmentOneY[3] - segmentOneY[4]);
            // segmentOneX[4] = segmentOneX[3] - sin(segmentOneAngle[4]) * segmentLength;
            // segmentOneY[4] = segmentOneY[3] - cos(segmentOneAngle[4]) * segmentLength;
            // ellipse(segmentOneX[4], segmentOneY[4], 5);

            // document.getElementById("segmentOne").innerHTML = 
            // "s1A("+round(segmentOneAngle[0])+"), "+
            // "s1tX("+round(segmentOneTrailX[0])+"), "+
            // "s1tY("+round(segmentOneTrailY[0])+"), "+
            // "s1X("+round(segmentOneX[0])+"), "+
            // "s1Y("+round(segmentOneY[0])+"), ";
            

            
            // stroke(200,00,00);
            // //ellipse(positionZeroX, positionZeroY, 5);
            
            // //ellipse(positionZeroX*2 - segmentOneX[0], positionZeroY * 2 - segmentOneY[0], 5);

            // stroke(00,200,00);
            // line(positionZeroX, positionZeroY, positionZeroX + sin(segmentOneAngle[0]) * segmentLength, positionZeroY + cos(segmentOneAngle[0]) * segmentLength);
            // line(
            //     positionZeroX + sin(segmentOneAngle[0]) * segmentLength, 
            //     positionZeroY + cos(segmentOneAngle[0]) * segmentLength,
            //     (positionZeroX + sin(segmentOneAngle[0]) * segmentLength) + sin(segmentOneAngle[0] + (3 * QUARTER_PI) ) * segmentLength,
            //     (positionZeroY + cos(segmentOneAngle[0]) * segmentLength) + cos(segmentOneAngle[0] + (3 * QUARTER_PI) ) * segmentLength
            // );
            // line(
            //     positionZeroX + sin(segmentOneAngle[0]) * segmentLength, 
            //     positionZeroY + cos(segmentOneAngle[0]) * segmentLength,
            //     (positionZeroX + sin(segmentOneAngle[0]) * segmentLength) + sin(segmentOneAngle[0] - (3 * QUARTER_PI) ) * segmentLength,
            //     (positionZeroY + cos(segmentOneAngle[0]) * segmentLength) + cos(segmentOneAngle[0] - (3 * QUARTER_PI) ) * segmentLength
            // );

            // stroke(00,00,200);
            // line(positionZeroX, positionZeroY, segmentOneX[0], segmentOneY[0]);

            // stroke(255, 0, 100, 100);
        }
    }
}

{// ---------- Define Tertiary Processes ----------
    //
}

{// ---------- Active Testing ----------

    // function redirectLines(fromX, fromY, inheritAngle, inheritLength){
    //     push();
    //     newPointX = fromX - sin(inheritAngle) * inheritLength;
    //     newPointY = fromY - cos(inheritAngle) * inheritLength;

    //     line(fromX, fromY, newPointX, newPointY);

    //     document.getElementById("segmentTwo").innerHTML =
    //     "1X("+round(fromX)+"), "+
    //     "1Y("+round(fromY)+"), "+
    //     "Angle("+round(inheritAngle)+"), "+
    //     "2X("+round(newPointX)+"), "+
    //     "2Y("+round(newPointY)+"), ";

    //     pop();
    // }

    function animationMovement(inheritSpeed, inheritLength, inheritOffset, inheritWaveOffset){
        return sin(frameCount * inheritSpeed + (PI * inheritWaveOffset)) * inheritLength + inheritOffset;
    }
}

{// ---------- Backup Testing ----------
    //
}

{// ---------- Upon entering page ----------
    //https://www.w3schools.com/jsref/event_onload.asp
}

{// ---------- While Running Page ----------
    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    function windowResized(){
        resizeCanvas(windowWidth, windowHeight);
    }
}

{// ---------- Upon Exiting Page ----------
    //https://www.w3schools.com/jsref/event_onunload.asp
}