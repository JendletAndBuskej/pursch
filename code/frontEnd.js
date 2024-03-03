////////// IMPORT ///////////
import { Card, CoinStack, Hand, PlayArea, Player } from './frontEndClasses.js';
import {relativePos, predeclare, preload} from './functionsFrontEnd.js';

/////////// INITIALIZE ///////////
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
var images = predeclare(3)  // [suit ordered by letter][value-2]
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
const card6 = new Card(0,0,0,0,3,'hearts')
const card7 = new Card(0,0,0,0,4,'hearts')
var cards = [card1, card2, card3, card4, card5]
const cardDown = new Card(0,0,0,0.02,0,'clubs')
const cardsDown = [cardDown, cardDown, cardDown, cardDown, cardDown]
const playAreaCards = [[card6], [card6,card7], [card6], [cardDown]]

const myPlayer = new Player(0, canvas, "boss");
myPlayer.hand.cards = cards;
myPlayer.playArea.cards = playAreaCards
const west = new Player(1, canvas, "boss");
west.hand.cards = cardsDown;
west.playArea.cards = playAreaCards
const north = new Player(2, canvas, "boss");
north.hand.cards = cardsDown;
north.playArea.cards = []
const south = new Player(3, canvas, "boss");
south.hand.cards = cardsDown;
south.playArea.cards = playAreaCards

const cleanCard = new Card(0,0,0,0.6,3,'clubs')




//////// FUNCTIONS ///////////////

//////////// UPDATE ///////////
function animate() {
    window.requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    myPlayer.display(c,images,false)
    north.display(c,images,false)
    west.display(c,images,false)
    south.display(c,images,true)
    myPlayer.hand.draw(c, images, cleanCard)
}

// MOUSE
window.addEventListener('mousemove', (event) => {
    var mousePos = { x: event.clientX, y: event.clientY };
    myPlayer.hand.updateHover(mousePos);

});

/////// LOAD //////////
images[4][2].onload = function(){
    animate()
}
images = preload(images)


