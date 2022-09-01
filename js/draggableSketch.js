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

// ---------- Variable Declaration ----------
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Declarations

    // ---------- f1 variable declaration start ----------
    var f1X = 100, f1Y = 100, f1Angle1 = 0.0, f1SegLength = 50;
    var oneX = 50, oneY = 50;
    // ---------- f1 variable declaration end ----------
    // ---------- d1 variable declaration start ----------
    var d1objectOne;
    // ---------- d1 variable declaration end ----------


// ---------- Define Actions and dependancies ----------
  class Draggable {
      constructor() {
        this.dragging = false; // Is the object being dragged?
        this.rollover = false; // Is the mouse over the ellipse?

        this.x = 100;this.y = 100; // initial coordinates
        this.w = 100;this.h = 100; // initial width & height
      }
    
      over() {// Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          this.rollover = true;
        } else {
          this.rollover = false;
        }
      }
    
      update() {
        // Adjust location if being dragged
        if (this.dragging) {
          this.x = mouseX + this.offsetX;
          this.y = mouseY + this.offsetY;
        }
    
      }
    
      show() {
        stroke(0);
        // Different fill based on state
        if (this.dragging) {
          fill(50);
        } else if (this.rollover) {
          fill(100);
        } else {
          fill(175, 200);
        }
        rect(this.x, this.y, this.w, this.h);
      }
    
      pressed() {
        // Did I click on the rectangle?
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          this.dragging = true;
          console.log("pressedOn");
          // If so, keep track of relative location of click to corner of rectangle
          this.offsetX = this.x - mouseX;
          this.offsetY = this.y - mouseY;
        }
      }
    
      released() {
        // Quit dragging
        this.dragging = false;
      }
  }


{// ---------- Define Tertiary Processes ----------
  //
}

// ---------- Define set up ----------
    function preload(){
        //
    }
    function setup(){
      background(255);
      createCanvas(600, 600);
      strokeWeight(20.0);
      stroke(255, 100);
      // ---------- f1 setup start ----------
      // ---------- f1 setup end ----------
      // ---------- d1 setup start ----------
      fill(255);
      d1objectOne = new Draggable(0,0,100,100);
      // ---------- d1 setup start ----------
    }


// ---------- Define Main function(s) ----------
    // ---------- f1 define main function start ----------
    function f1Segment(f1X, f1Y, f1A) {
        push();
        translate(f1X, f1Y);
        rotate(f1A);
        line(0, 0, f1SegLength, 0);
        pop();
    }
    // ---------- f1 define main function end ----------
    // ---------- d1 define main function start ----------
    // ---------- d1 define main function end ----------




// ---------- Define Main Loop(s) ----------
  function draw(){
    //background(100);
    // ---------- f1 Define Main Loop(s) start ----------
    f1DirectionalX = mouseX - f1X;
    f1DirectionalY = mouseY - f1Y;
    f1Angle1 = atan2(f1DirectionalY, f1DirectionalX);
    f1X = mouseX - cos(f1Angle1) * f1SegLength;
    f1Y = mouseY - sin(f1Angle1) * f1SegLength;

    f1Segment(f1X, f1Y, f1Angle1);
    ellipse(f1X, f1Y, 20, 20);
    // ---------- f1 Define Main Loop(s) end ----------
    // ---------- d1 Define Main Loop(s) start ----------
    
    // d1objectOne.released();
    d1objectOne.over();
    d1objectOne.update();
    d1objectOne.show();

    // function mousePressed(){
    //   d1objectOne.pressed();
    // }
    mousePressed();
    // ---------- d1 Define Main Loop(s) end ----------
    function mousePressed(event) {
      console.log(event);
    }
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

{// ---------- Active Testing ----------
    //
}

{// ---------- Backup Testing ----------
    //
}