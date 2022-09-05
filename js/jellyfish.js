{/* ---------- Details ---------- 
    Title: Animated Interactive Jellyfish
    Purpose: <Description>
    Code Version: 1
    Availability: Firebird Server
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
    

    {// ---------- Import Statements ----------
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
    }
    
    {// ---------- Variable Declaration ----------
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations
    
        var jellyfishOne;
    
        var bulbLength = 50;
    
        var segmentLength = 5;
        var segmentWidth = 1;
        var segmentPoints = 25;
        var segmentGroups = 13;
        
        // var testingBounceX = 100, testingBounceY = 100;
        var testingBounceAngle = 0.0;
    }
    
    {// ---------- Define Actions and dependancies ----------
        //
    }
        class Draggable{//modified from code available at https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
            constructor(){
            // constructor(init_x, init_y, init_size, init_color{r:255, g:255, b:255}, init_opacity, init_travelDistance){
                this.dragging = false; // Is the object being dragged?
                this.rollover = false; // Is the mouse over the ellipse?
    
                this.x = 100; this.y = 100; // initial coordinates
                this.w = 80; this.h = 80; // initial width & height
    
                this.bulbTrailX = 100;
                this.bulbTrailY = 300;
                this.bulbCentreX = this.x + (this.w / 2); this.bulbCentreY = this.y + (this.h / 2);
                this.animatedBulbCentreX = this.bulbCentreX + animationMovement(1/20, 10, 0, 0);
                this.animatedBulbCentreY = this.bulbCentreY + animationMovement(1/20, 10, 0, 0);
    
                this.bulbAngle = 0.0;
                this.segmentArray = [];
                this.segmentArray.length = segmentGroups;
                
                for(let ia = 0; ia < segmentGroups; ia++){
                    this.segmentArray[ia] = []; 
                    if(ia == 0){
                        this.segmentArray[ia].length = segmentPoints * 2;//Oral arm has twice as many segments
                    } else{
                        this.segmentArray[ia].length = segmentPoints;//all other tentacles have a normal amount of segments
                    }
                    
                    for(let ib = 0; ib < this.segmentArray[ia].length; ib++){
                        this.segmentArray[ia][ib] = {segmentX : 150, segmentY : 150, segmentAngle : 0.0};
                    }
                }
            }
            isHovered(){
                if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
                    this.rollover = true;
                } else {
                    this.rollover = false;
                }
            }
            update(){
                //bulb center
                this.aMBulbCentre = animationMovement(1/600, 100, 0, 0);
                this.bulbCentreX = this.x + (this.w / 2) + this.aMBulbCentre; 
                this.bulbCentreY = this.y + (this.h / 2);
                
                this.bulbAngle = atan2(this.bulbCentreX - this.bulbTrailX, this.bulbCentreY - this.bulbTrailY);//bulbAngle = atan2(mouseX - bulbX, mouseY - bulbY);
                this.bulbTrailX = this.bulbCentreX - sin(this.bulbAngle) * bulbLength;
                this.bulbTrailY = this.bulbCentreY - cos(this.bulbAngle) * bulbLength + 0.5;
    
                //AnimatedBulbCentre
                this.animatedBulbCentreX = this.bulbCentreX + sin(this.bulbAngle) * animationMovement(1/30, 10, 0, 1);
                this.animatedBulbCentreY = this.bulbCentreY + cos(this.bulbAngle) * animationMovement(1/30, 10, 0, 1);
    
                this.updateBulb();
                this.updateTentacles();
    
                if (this.dragging === true){
                    this.x = mouseX + this.offsetX;
                    this.y = mouseY + this.offsetY;
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

                this.drawTentacles();
                this.drawBulb();
            }
            updateBulb(){
                {//animated Shell
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
                }
                {//animated Bulb
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
                }
                {//Animated Lip
                    this.animatedLipCentreX = this.animatedBulbCentreX + sin(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/30, 7 / 2, 23 / 2, 1.5);// 50% between centre & south
                    this.animatedLipCentreY = this.animatedBulbCentreY + cos(this.bulbAngle - (4 * QUARTER_PI)) * animationMovement(1/30, 7 / 2, 23 / 2, 1.5);
        
                    this.aMLipN  = animationMovement(1/30, 5, 10, 0.25);
                    this.aMLipNE = animationMovement(1/30, 6.5, 13.5, 0.25);
                    this.aMLipENE = animationMovement(1/30, 10, 20, 0.25);
                    this.aMLipE  = animationMovement(1/30, 6.25, 23.75, 0.25);
                    this.aMLipESE = animationMovement(1/30, 2.5, 17.5, 1.5);
                    this.aMLipSE = animationMovement(1/30, 3, 14, 1.5);
                    this.aMLipSSE = animationMovement(1/30, 3.25, 12.25, 1.5);
                    this.aMLipS  = animationMovement(1/30, 3.75, 11.25, 1.5);
                    this.aMLipSW = this.aMLipSE;
                    this.aMLipSSW = this.aMLipSSE;
                    this.aMLipWSW = this.aMLipESE;
                    this.aMLipW  = this.aMLipE;
                    this.aMLipWNW = this.aMLipENE;
                    this.aMLipNW = this.aMLipNE;
        
                    this.animatedLipN_X   = this.animatedLipCentreX + sin(this.bulbAngle - (0.0 * QUARTER_PI)) * this.aMLipN;//AL_N
                    this.animatedLipN_Y   = this.animatedLipCentreY + cos(this.bulbAngle - (0.0 * QUARTER_PI)) * this.aMLipN;
                    this.animatedLipNE_X  = this.animatedLipCentreX + sin(this.bulbAngle - (1.0 * QUARTER_PI)) * this.aMLipNE;//AL_NE
                    this.animatedLipNE_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (1.0 * QUARTER_PI)) * this.aMLipNE;
                    this.animatedLipENE_X = this.animatedLipCentreX + sin(this.bulbAngle - (1.5 * QUARTER_PI)) * this.aMLipENE;//AL_ENE
                    this.animatedLipENE_Y = this.animatedLipCentreY + cos(this.bulbAngle - (1.5 * QUARTER_PI)) * this.aMLipENE;
                    this.animatedLipE_X   = this.animatedLipCentreX + sin(this.bulbAngle - (2.0 * QUARTER_PI)) * this.aMLipE;//AL_E
                    this.animatedLipE_Y   = this.animatedLipCentreY + cos(this.bulbAngle - (2.0 * QUARTER_PI)) * this.aMLipE;
                    this.animatedLipESE_X = this.animatedLipCentreX + sin(this.bulbAngle - (2.5 * QUARTER_PI)) * this.aMLipESE;//AL_ESE
                    this.animatedLipESE_Y = this.animatedLipCentreY + cos(this.bulbAngle - (2.5 * QUARTER_PI)) * this.aMLipESE;
                    this.animatedLipSE_X  = this.animatedLipCentreX + sin(this.bulbAngle - (3.0 * QUARTER_PI)) * this.aMLipSE;//AL_SW
                    this.animatedLipSE_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (3.0 * QUARTER_PI)) * this.aMLipSE;
                    this.animatedLipSSE_X = this.animatedLipCentreX + sin(this.bulbAngle - (3.5 * QUARTER_PI)) * this.aMLipSSE;//AL_SW
                    this.animatedLipSSE_Y = this.animatedLipCentreY + cos(this.bulbAngle - (3.5 * QUARTER_PI)) * this.aMLipSSE;
                    this.animatedLipS_X   = this.animatedLipCentreX + sin(this.bulbAngle - (4.0 * QUARTER_PI)) * this.aMLipS;//AL_S
                    this.animatedLipS_Y   = this.animatedLipCentreY + cos(this.bulbAngle - (4.0 * QUARTER_PI)) * this.aMLipS;
                    this.animatedLipSSW_X = this.animatedLipCentreX + sin(this.bulbAngle - (4.5 * QUARTER_PI)) * this.aMLipSSW;//AL_SW
                    this.animatedLipSSW_Y = this.animatedLipCentreY + cos(this.bulbAngle - (4.5 * QUARTER_PI)) * this.aMLipSSW;
                    this.animatedLipSW_X  = this.animatedLipCentreX + sin(this.bulbAngle - (5.0 * QUARTER_PI)) * this.aMLipSW;//AL_SW
                    this.animatedLipSW_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (5.0 * QUARTER_PI)) * this.aMLipSW;
                    this.animatedLipWSW_X = this.animatedLipCentreX + sin(this.bulbAngle - (5.5 * QUARTER_PI)) * this.aMLipWSW;//AL_WSW
                    this.animatedLipWSW_Y = this.animatedLipCentreY + cos(this.bulbAngle - (5.5 * QUARTER_PI)) * this.aMLipWSW;
                    this.animatedLipW_X   = this.animatedLipCentreX + sin(this.bulbAngle - (6.0 * QUARTER_PI)) * this.aMLipW;//AL_W
                    this.animatedLipW_Y   = this.animatedLipCentreY + cos(this.bulbAngle - (6.0 * QUARTER_PI)) * this.aMLipW;
                    this.animatedLipWNW_X = this.animatedLipCentreX + sin(this.bulbAngle - (6.5 * QUARTER_PI)) * this.aMLipWNW;//AL_WNW
                    this.animatedLipWNW_Y = this.animatedLipCentreY + cos(this.bulbAngle - (6.5 * QUARTER_PI)) * this.aMLipWNW;
                    this.animatedLipNW_X  = this.animatedLipCentreX + sin(this.bulbAngle - (7.0 * QUARTER_PI)) * this.aMLipNW;//AL_NW
                    this.animatedLipNW_Y  = this.animatedLipCentreY + cos(this.bulbAngle - (7.0 * QUARTER_PI)) * this.aMLipNW;
                }
                
            }
            updateTentacles(){
                //Initialize stem
                this.segmentArray[0][0].segmentX  = this.animatedLipN_X; this.segmentArray[0][0].segmentY  = this.animatedLipN_Y;

                {//Initialize all tentacles
                    this.segmentArray[1][0].segmentX  = this.animatedLipNE_X;
                    this.segmentArray[1][0].segmentY  = this.animatedLipNE_Y;

                    this.segmentArray[2][0].segmentX  = this.animatedLipENE_X;
                    this.segmentArray[2][0].segmentY  = this.animatedLipENE_Y;

                    this.segmentArray[3][0].segmentX  = this.animatedLipE_X;
                    this.segmentArray[3][0].segmentY  = this.animatedLipE_Y;

                    this.segmentArray[4][0].segmentX  = this.animatedLipESE_X;
                    this.segmentArray[4][0].segmentY  = this.animatedLipESE_Y;

                    this.segmentArray[5][0].segmentX  = this.animatedLipSE_X;
                    this.segmentArray[5][0].segmentY  = this.animatedLipSE_Y;

                    this.segmentArray[11][0].segmentX  = this.animatedLipSSE_X;
                    this.segmentArray[11][0].segmentY  = this.animatedLipSSE_Y;

                    this.segmentArray[12][0].segmentX  = this.animatedLipSSW_X;
                    this.segmentArray[12][0].segmentY  = this.animatedLipSSW_Y;

                    this.segmentArray[6][0].segmentX  = this.animatedLipWSW_X;
                    this.segmentArray[6][0].segmentY  = this.animatedLipWSW_Y;

                    this.segmentArray[7][0].segmentX  = this.animatedLipSW_X;
                    this.segmentArray[7][0].segmentY  = this.animatedLipSW_Y;

                    this.segmentArray[8][0].segmentX  = this.animatedLipW_X;
                    this.segmentArray[8][0].segmentY  = this.animatedLipW_Y;

                    this.segmentArray[9][0].segmentX  = this.animatedLipWNW_X;
                    this.segmentArray[9][0].segmentY  = this.animatedLipWNW_Y;
                    this.segmentArray[10][0].segmentX  = this.animatedLipNW_X;
                    this.segmentArray[10][0].segmentY  = this.animatedLipNW_Y;
                }
                
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
                stroke(0, 0, 0, 0);
                {//BULB without Lip
                    fill(255, 0, 144, 200);
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
                    fill(255, 0, 144, 200);
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
                    fill(255, 255, 255, 100);
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
                stroke(255, 255, 255, 100);

                for(let ib = 1; ib < this.segmentArray[0].length; ib++){
                    strokeWeight(10 - (ib * 0.2))
                    line(this.segmentArray[0][ib].segmentX, this.segmentArray[0][ib].segmentY, this.segmentArray[0][ib-1].segmentX, this.segmentArray[0][ib-1].segmentY);
                    line(
                            this.segmentArray[0][ib].segmentX + sin(this.segmentArray[0][ib].segmentAngle) * segmentLength,
                            this.segmentArray[0][ib].segmentY + cos(this.segmentArray[0][ib].segmentAngle) * segmentLength,
                            (this.segmentArray[0][ib].segmentX + sin(this.segmentArray[0][ib].segmentAngle) * segmentLength)
                             + (sin(this.segmentArray[0][ib].segmentAngle + (3 * QUARTER_PI)) * segmentLength / 2),
                            (this.segmentArray[0][ib].segmentY + cos(this.segmentArray[0][ib].segmentAngle) * segmentLength)
                             + (cos(this.segmentArray[0][ib].segmentAngle + (3 * QUARTER_PI)) * segmentLength / 2)
                    );
                    line(
                            this.segmentArray[0][ib].segmentX + sin(this.segmentArray[0][ib].segmentAngle) * segmentLength,
                            this.segmentArray[0][ib].segmentY + cos(this.segmentArray[0][ib].segmentAngle) * segmentLength,
                            (this.segmentArray[0][ib].segmentX + sin(this.segmentArray[0][ib].segmentAngle) * segmentLength)
                             + (sin(this.segmentArray[0][ib].segmentAngle - (3 * QUARTER_PI)) * segmentLength / 2),
                            (this.segmentArray[0][ib].segmentY + cos(this.segmentArray[0][ib].segmentAngle) * segmentLength)
                             + (cos(this.segmentArray[0][ib].segmentAngle - (3 * QUARTER_PI)) * segmentLength / 2)
                    );
                }
                strokeWeight(1);
                for(let ia = 1; ia < segmentGroups; ia++){
                    for(let ib = 1; ib < this.segmentArray[ia].length; ib++){
                        line(this.segmentArray[ia][ib].segmentX, this.segmentArray[ia][ib].segmentY, this.segmentArray[ia][ib-1].segmentX, this.segmentArray[ia][ib-1].segmentY);

                        // line(
                        //     this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        //     this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        //     (this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                        //      + (sin(this.segmentArray[ia][ib].segmentAngle + (3 * QUARTER_PI)) * segmentLength / 2),
                        //     (this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                        //      + (cos(this.segmentArray[ia][ib].segmentAngle + (3 * QUARTER_PI)) * segmentLength / 2)
                        // );

                        // line(
                        //     this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        //     this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength,
                        //     (this.segmentArray[ia][ib].segmentX + sin(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                        //      + (sin(this.segmentArray[ia][ib].segmentAngle - (3 * QUARTER_PI)) * segmentLength / 2),
                        //     (this.segmentArray[ia][ib].segmentY + cos(this.segmentArray[ia][ib].segmentAngle) * segmentLength)
                        //      + (cos(this.segmentArray[ia][ib].segmentAngle - (3 * QUARTER_PI)) * segmentLength / 2)
                        // );
                    }
                }
            }
            isPressed(){
                if (mouseX > (this.bulbCentreX - this.w / 2) && mouseX < (this.bulbCentreX + this.w/2) && mouseY > (this.bulbCentreY - this.h / 2) && mouseY < (this.bulbCentreY + this.h / 2)) {
                    this.dragging = true;
                    this.offsetX = this.x - mouseX;
                    this.offsetY = this.y - mouseY;
                }
            }
            isReleased(){this.dragging = false;}
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



            console.log("script.js loaded");
        }
    }
    
    {// ---------- Define Main Loop(s) ----------
        function draw(){
            clear();
    
            jellyfishOne.isHovered();
            jellyfishOne.update();
            jellyfishOne.show();
        }
    }
    
    {// ---------- Define Tertiary Processes ----------
        function animationMovement(inheritSpeed, inheritLength, inheritOffset, inheritWaveOffset){
            return sin(frameCount * inheritSpeed + (PI * inheritWaveOffset)) * inheritLength + inheritOffset;
        }
    }
    
    {// ---------- Active Testing ----------
        //
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
