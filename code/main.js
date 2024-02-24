/////////// Imports ////////////
import { Deck, Card, Hand } from './classes.js';
import { handValue } from './handValue.js';

//////////// Main ///////////////
const canvas = document.querySelector('canvas')
// const canvas = document.getElementById('middleCanvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

c.fillRect(0,0,canvas.width,canvas.height)

//////// testing script
var deckTest = new Deck()
deckTest.shuffle()
var handTest = new Hand()
handTest.draw(deckTest.draw())
handTest.draw(deckTest.draw())
handTest.draw(deckTest.draw())
handTest.discard(handTest.cards[1])
handTest.draw(deckTest.draw())
handTest.draw(deckTest.draw())
handTest.sort()
console.log(handTest);