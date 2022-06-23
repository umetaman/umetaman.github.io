const MODE = {
    RANDOM: 0,
    DIRCTIONAL: 1,
    SPRING: 2,
}
Object.freeze(MODE);

let mode = 0;
const ellipses = []

const RADIUS_MIN = 400;
const RADIUS_MAX = 650;
const TRANSLATE_MIN = -25;
const TRANSLATE_MAX = 25;
const WIDTH_MIN = 1;
const WIDTH_MAX = 40;

function createEllipses(radiusMin, radiusMax, translateMin, translateMax, widthMin, widthMax) {
    return {
        radius: random(radiusMin, radiusMax),
        center: { x: random(translateMin, translateMax), y: random(translateMin, translateMax) },
        width: random(widthMin, widthMax)
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for(let i = 0; i < 25; i++) {
        ellipses.push(createEllipses(RADIUS_MIN, RADIUS_MAX, TRANSLATE_MIN, TRANSLATE_MAX, WIDTH_MIN, WIDTH_MAX));
    }
}

function draw() {
    background(255);
    translate(windowWidth / 2, windowHeight / 2);

    const mouseCoords = { 
        x: (windowWidth / 2 - mouseX) / windowWidth,
        y: (windowHeight / 2 - mouseY) / windowHeight }

    for(let i = 0; i < ellipses.length; i++){
        const e = ellipses[i];
        const time = frameCount * 0.03
        const step = time + i * 1.25
        stroke(0, 0, 0, sin(step) * 60 + 75)
        noFill()
        strokeWeight(e.width)
        switch(mode) {
            case MODE.RANDOM:
                ellipse(e.center.x * mouseCoords.x * 8, e.center.y * mouseCoords.y * 8, e.radius)    
                break;
            case MODE.DIRCTIONAL:
                const range = (RADIUS_MAX - e.radius - e.width * 0.5) * 0.5
                ellipse(
                    constrain(mouseCoords.x * (75 + i) * -2, -range, range),
                    constrain(mouseCoords.y * (75 + i) * -2, -range, range),
                    e.radius)
                break;
            case MODE.SPRING:
                ellipse(
                    e.center.x + mouseCoords.x * (Math.pow(i * 1.2, 1.8) * -1),
                    e.center.y + mouseCoords.y * (Math.pow(i * 1.2, 1.8) * -1),
                    e.radius)
                break;
        }
    }

    const messageElement = document.getElementById("message");
    if(messageElement !== null){
        let message = ""
        switch(mode){
            case MODE.RANDOM:
                message = "MODE: RANDOM"
                break;
            case MODE.DIRCTIONAL:
                message = "MODE: DIRECTIONAL"
                break;
            case MODE.SPRING:
                message = "MODE: SPRING";
                break;
        }
        messageElement.textContent = message;
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function keyPressed(){
    if(key === "Enter"){
        window.location.reload();
    }else{
        mode++;
        mode %= 3;
    }
}