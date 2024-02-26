////////// IMPORT ///////////
import { Card, Hand, PlayArea } from './frontEndClasses.js';
import {relativePos, predeclare, preload} from './functionsFrontEnd.js';

/////////// INITIALIZE ///////////
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
var coinStackImg = [new Image(), new Image()];
var images = predeclare()  // [suit ordered by letter][value-2]
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.x = 0
canvas.y = 0

///////// PARAMETERS ////////////

////////// test ////////////
const card1 = new Card(0,0,0,1,2,'clubs')
const card2 = new Card(0,0,0,0,5,'diamonds')
const card3 = new Card(0,0,0,0,8,'spades')
const card4 = new Card(0,0,0,0,10,'hearts')
var card5 = new Card(0,0,0,0,4,'clubs')
var cards = [card1, card2, card3, card4, card5]
const myPosition = relativePos(30,75,40,25, canvas)
const myHand = new Hand(cards, myPosition, 0, 0.002)
const myPlayPosition = relativePos(45,60,10,15, canvas)
const myPlayArea = new PlayArea(myHand, myPlayPosition, 0.002)
myPlayArea.cards = [[card1],[card2,card2],[card3]];

//////// FUNCTIONS ///////////////

//////////// UPDATE ///////////
function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    myPlayArea.displaySplit(c, images)
    myHand.display(c, images)
}

// MOUSE
window.addEventListener('mousemove', (event) => {
    var mousePos = { x: event.clientX, y: event.clientY };
    myHand.updateHover(mousePos);
});

/////// LOAD //////////
images[3][12].onload = function(){
    animate()
}
coinStackImg[0].src = '../image_files/smallStack.png'
coinStackImg[1].src = '../image_files/bigStack.png'
images = preload(images)


