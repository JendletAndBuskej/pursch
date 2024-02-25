////////// IMPORT ///////////


const canvas = document.querySelector('canvas');
// const canvas = document.getElementById('middleCanvas')
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.y = 0;
canvas.x = 0;
canvas.scale = canvas.height*0.002

///////// PARAMETERS ////////////


//////////// class ///////////


class visualObject {
    constructor(x, y, width, height, parent) {
        const real = relativePos(x, y, width, height, parent);
        this.x = real[0]
        this.y = real[1]
        this.width = real[2]
        this.height = real[3]
        this.scale = parent.scale*this.height/parent.height

    }
    testDraw() {
        c.fillRect(this.x, this.y, this.width, this.height)
    }

    drawCard(angle) {
        const imageLoc = '../image_files/cards/2_of_clubs.png'
        const cardX = this.x + this.width/2
        const cardY = this.y + this.height/2
        drawCardFun(imageLoc, this.scale, cardX, cardY, angle)
    }
}


//////// FUNCTIONS ///////////////
function relativePos(x, y, width, height, parent) {
    const width1P = parent.width/100;
    const height1P = parent.height/100;
    const realX = x*width1P + parent.x
    const realY = y*height1P + parent.y
    const realWidth = width*width1P
    const realHeight = height*height1P
    return([realX, realY, realWidth, realHeight])
}

function drawCardFun(image, scale, x, y, angle) {
    var image = new Image();
    image.onload = function(){
        var cache = this;
        c.save();
        c.translate(x, y);
        c.rotate(Math.PI / 180 * angle);
        const drawX = scale*(-cache.width / 2);
        const drawY = scale*(-cache.height / 2);
        c.drawImage(image, drawX, drawY, scale*cache.width, scale*cache.height);
        c.restore();
    };
    image.src = imageLocation;
}

////////// test ////////////
var PlayArea = new visualObject(10, 10, 80, 70, canvas)
PlayArea.testDraw()
c.fillStyle = 'blue'
var myHand = new visualObject(30,75,40,25, canvas)
var westHand = new visualObject(0,35,10,30, canvas)
westHand.testDraw()
myHand.testDraw()
var card1 = new visualObject(0, 10, 100/5, 100, myHand)
var card2 = new visualObject(100/5, 2, 100/5, 100, myHand)
var card3 = new visualObject(2*100/5, 0, 100/5, 100, myHand)
var card4 = new visualObject(3*100/5, 2, 100/5, 100, myHand)
var card5 = new visualObject(4*100/5, 10, 100/5, 100, myHand)
c.fillStyle = 'red'
card1.drawCard(-10)
card2.drawCard(-5)
card3.drawCard(0)
card4.drawCard(5)
card5.drawCard(10)

window.addEventListener('mousemove', (event) => {
    var mousePos = { x: event.clientX, y: event.clientY };
    const xCheck = (mousePos.x <= 100)
    if (xCheck) {
        c.fillStyle = 'red'
        PlayArea.testDraw()
    }
});

function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height)
    c.fillStyle = 'black'
    PlayArea.testDraw()
    card1.drawCard(-10)
    card2.drawCard(-5)
    card3.drawCard(0)
    card4.drawCard(5)
    card5.drawCard(10)
    window.addEventListener('mousemove', (event) => {
        var mousePos = { x: event.clientX, y: event.clientY };
        const xCheck = (mousePos.x <= 100)
        if (xCheck) {
            c.fillStyle = 'red'
            PlayArea.testDraw()
        }
    });
    

}
animate()
// testImage.src = '../image_files/cards/2_of_clubs.png'


