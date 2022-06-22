const MODE = {
    RANDOM: 0,
    DIRCTIONAL: 1
}
Object.freeze(MODE);

let mode = 0;
const ellipses = []

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
        ellipses.push(createEllipses(450, 650, -25, 25, 1, 40))
    }
}

function draw() {
    background(255);
    translate(windowWidth / 2, windowHeight / 2);

    const mouseCooords = { 
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
                ellipse(e.center.x * mouseCooords.x * 8, e.center.y * mouseCooords.y * 8, e.radius)    
                break;
            case MODE.DIRCTIONAL:
                ellipse(
                    e.center.x + mouseCooords.x * (Math.pow(i * 1.2, 1.8) * -1),
                    e.center.y + mouseCooords.y * (Math.pow(i * 1.2, 1.8) * -1),
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
        }
        messageElement.textContent = message;
        console.log(messageElement.textContent)
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}

function keyPressed(){
    mode++;
    mode %= 2;
}