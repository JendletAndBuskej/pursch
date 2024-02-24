/////////// Imports ////////////
import { Deck, Card } from './classes.js';
import { handValue } from './handValue.js';

//////////// Main ///////////////
const canvas = document.querySelector('canvas')
// const canvas = document.getElementById('middleCanvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

c.fillRect(0,0,canvas.width,canvas.height)

//////// testing script
var testDeck = new Deck()
console.log(testDeck)
var hand = [testDeck.draw(),testDeck.draw(),testDeck.draw(),testDeck.draw(),testDeck.draw()]
// console.log(hand)
console.log(handValue(hand));