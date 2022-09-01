{/* ---------- Details ---------- 
    Title: Interactive Media Project 1
    Purpose: Interactive (P5) site that has an artistic comment on current world issues
    Code Version: 1
    Availability: IXD firebird server
    Creator: Rowan Abraham*/}

{// ---------- Learning Resources ----------

    {/* ---------- JS Reference ---------- 
    https://p5js.org/reference/*/}

    {/* ---------- Section ---------- 
        Text
        Link*/}
    }



    //test active state
    //console.log("sketch.js loaded");
    
    
    {// ---------- Import Statements ----------
        //
    }
    
    {// ---------- Variable Declaration ----------

        var pixelSwapSizeInitial = 1;var pixelSwapSize = pixelSwapSizeInitial;
        var loopsPerFrameInitial = 10;var loopsPerFrame = loopsPerFrameInitial;
        var varianceMultiplierInitial = 2; var varianceMultiplier = varianceMultiplierInitial;
        var eraserRadiusInitial = 20; var eraserRadius = eraserRadiusInitial;

        var randomVarianceInitial = 2 * varianceMultiplier; var randomVariance = randomVarianceInitial;

        var currentKeyDown = '';var currentKeyUp;


        //var black = color(155);
        var alphaC;var layer;
        //var eraserRadius = pixelSwapSize*2;
        
        var w, h;
        
        var mouseIsDragged = false;

        var backgroundImg;
        //'/img/retro(30).img', height = 1624px, width = 1096px, ratio: height = width(~)0.675

        preload = () => {}
    }
    
    {// ---------- Define Actions and dependancies ----------
        setup = () => {
            w = windowWidth; h = windowWidth*0.675;
            createCanvas(w, h);
            frameRate(60); pixelDensity(1);
            backgroundImg = loadImage('img/retro(30).jpg');// backgroundImg.resize(10, 10);
            //backgroundImg.loadPixels();
            
            alphaC = color(0,0); // transparency '0'
            layer = createGraphics(windowWidth, windowWidth);background(255);layer.fill("red");layer.strokeWeight(0);//top layer bounding box
                // layer.rect(w*0.25, h*0.395, w*0.045, h*0.02);layer.rect(w*0.32, h*0.435, w*0.045, h*0.02);layer.rect(w*0.396, h*0.359, w*0.045, h*0.028);
                // layer.rect(w*0.455, h*0.42, w*0.045, h*0.02);layer.rect(w*0.455, h*0.275, w*0.035, h*0.031);layer.rect(w*0.49, h*0.18, w*0.045, h*0.02);
                // layer.rect(w*0.557, h*0.24, w*0.045, h*0.02);layer.rect(w*0.56, h*0.345, w*0.045, h*0.02);layer.rect(w*0.665, h*0.36, w*0.045, h*0.02);
                // layer.rect(w*0.705, h*0.243, w*0.045, h*0.02);layer.rect(w*0.785, h*0.325, w*0.05, h*0.03);layer.rect(w*0.84, h*0.315, w*0.0365, h*0.02);
                // layer.rect(w*0.898, h*0.318, w*0.045, h*0.02);
        }
    }
    
    {// ---------- Define Main Sequence(s) ----------
        //
    }
    
    {// ---------- Define Main Loop(s) ----------
        draw = () => {
            background(backgroundImg);
            noStroke();
            image(layer, 0, 0); 

            if(frameCount % (1) == 0){// Occurs every frame
                for (let i = 0; i < loopsPerFrame; i++){// # of pixel swaps occuring each frame
                    //console.log(frameCount+": iteration: "+(i+1)+";")
                    let pixelOneXVal = round(random(0, windowWidth));let pixelOneYVal = round(random(0, windowHeight));// Random X, Y for 1st Pixel
                    let pixelOneColor = get(pixelOneXVal, pixelOneYVal);
                    //let pixelTwoXVal = random(0, windowWidth);let pixelTwoYVal = random(0, windowHeight);
                    let pixelTwoXVal = pixelOneXVal + round(random(-randomVariance, randomVariance));let pixelTwoYVal = pixelOneYVal + round(random(-randomVariance, randomVariance));
                    //console.log(pixelOneXVal-pixelTwoXVal);
                    

                    if (pixelTwoXVal < 0){// If 2nd Pixel left of window
                        pixelTwoXVal = 0;
                    } else if (pixelTwoXVal > windowWidth){// If 2nd Pixel right of window
                        pixelTwoXVal = windowWidth;
                    }
                    if (pixelTwoYVal < 0){// If 2nd Pixel above window
                        pixelTwoYVal = 0;
                    } else if(pixelTwoYVal > windowHeight){// If 2nd Pixel below window
                        pixelTwoYVal = windowHeight;
                    }
                    while (pixelOneXVal === pixelTwoXVal && pixelOneYVal === pixelTwoYVal){// If 2nd Pixel occupies same space as 1st Pixel reroll until !=
                        pixelTwoXVal = pixelOneXVal + round(random(-randomVariance, randomVariance));pixelTwoYVal = pixelOneYVal + round(random(-randomVariance, randomVariance));
                        //console.log("DOUBLE; X: "+pixelTwoXVal+", Y: "+pixelTwoYVal);
                    }
                    let pixelTwoColor = get(pixelTwoXVal, pixelTwoYVal);// Get 2nd Pixel Color
                    layer.fill(pixelTwoColor);layer.rect(pixelOneXVal-(pixelSwapSize/2), pixelOneYVal-(pixelSwapSize/2), pixelSwapSize, pixelSwapSize);// Swap 1st Pixel
                    layer.fill(pixelOneColor);layer.rect(pixelTwoXVal-(pixelSwapSize/2), pixelTwoYVal-(pixelSwapSize/2), pixelSwapSize, pixelSwapSize);// Swap 2nd Pixel
                }
            }
        }
    }
    
    {// ---------- Define Tertiary Processes ----------
        function mouseDragged() {
            layer.loadPixels();
            for (var x = mouseX - eraserRadius; x < mouseX+eraserRadius; x++) {
                for (var y = mouseY - eraserRadius; y < mouseY+eraserRadius; y++) {
                    if ((dist(x,y, mouseX, mouseY) < eraserRadius) && x > 0 && x <= width) {
                        layer.set(x,y,alphaC);
                    }
                }
            }
            layer.updatePixels();
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowWidth*0.675);
        }

        function keyTyped() {
            if (currentKeyDown === ''){
                currentKeyDown = key;
                //console.log("key "+key+" Typed");
            }
        }

        function keyReleased() {
            //console.log("key "+key+" Released");
            currentKeyUp = key;
            if (currentKeyDown === currentKeyUp) {
                //console.log("keyDownUp "+key);
                if (currentKeyDown === 'q' && pixelSwapSize > 1){//Pixel Swap Size (MIN 1)
                    pixelSwapSize--; varianceMultiplier--; randomVariance = 2*varianceMultiplier;
                    console.log("(Q)we PSS(-): "+pixelSwapSize);
                } else if (currentKeyDown === 'w'){
                    pixelSwapSize = pixelSwapSizeInitial; varianceMultiplier = varianceMultiplierInitial; randomVariance = 2*varianceMultiplier;
                    console.log("q(W)e PSS(D): "+pixelSwapSize);
                } else if (currentKeyDown ==='e'){
                    pixelSwapSize++; varianceMultiplier++; randomVariance = 2*varianceMultiplier;
                    console.log("qw(E) PSS(+): "+pixelSwapSize);
                } else if (currentKeyDown ==='a' && loopsPerFrame > 1){//Loops Per Frame (MIN 1)
                    loopsPerFrame--;
                    console.log("(A)sd LPf(-): "+loopsPerFrame);
                } else if (currentKeyDown ==='s'){
                    loopsPerFrame = loopsPerFrameInitial;
                    console.log("a(S)d LPf(D): "+loopsPerFrame);
                } else if (currentKeyDown ==='d'){
                    loopsPerFrame++;
                    console.log("as(D) LPf(+): "+loopsPerFrame);
                } else if (currentKeyDown ==='z' && varianceMultiplier > 1){//Random Variance
                    varianceMultiplier--; randomVariance = 2*varianceMultiplier;
                    console.log("(Z)xc RvM(-): "+randomVariance);
                } else if (currentKeyDown ==='x'){
                    varianceMultiplier = varianceMultiplierInitial; randomVariance = 2*varianceMultiplier;
                    console.log("z(X)c RvM(D): "+randomVariance);
                } else if (currentKeyDown ==='c'){
                    varianceMultiplier++; randomVariance = 2*varianceMultiplier;
                    console.log("zx(C) RvM(+): "+randomVariance);
                } else if (currentKeyDown ==='1' && eraserRadius > 2){//Eraser Radius
                    eraserRadius -= 2;
                    console.log("(1)23 Eraser(-): "+eraserRadius);
                } else if (currentKeyDown ==='2'){
                    eraserRadius = eraserRadiusInitial;
                    console.log("1(2)3 Eraser(-): "+eraserRadius);
                } else if (currentKeyDown ==='3'){
                    eraserRadius += 2;
                    console.log("12(3) Eraser(-): "+eraserRadius);
                } else if (currentKeyDown ==='p'){//Save Picture
                    //saveCanvas('ZenChaosTheory', 'jpg');
                    //let to_save; let PImage;
                    let to_save = get(0, 0, windowWidth, windowHeight); // Grab an image of a 100x200 rectangle at (20,30).
                    to_save.save("ZenChaosTheory","jpg");
                }          
                currentKeyDown = '';
            } else if (currentKeyDown != currentKeyUp) {
                currentKeyDown = '';
            }
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
    }
    
    {// ---------- Upon Exiting Page ----------
        //https://www.w3schools.com/jsref/event_onunload.asp
    }