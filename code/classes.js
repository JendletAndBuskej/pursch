// this is a class for all image objects that will be drawn.
// class Sprite {
//     constructor(position,rotation) {
//         this.position = position;
//         this.rotation = rotation;
//     }

//     draw() {
//         c.fillStyle = 'red';
//     }

// }

////////// IMPORTS //////////////
import { handValue } from './Backend/handValue.js';

///////// DECK_CLASS /////////////////
export class Deck {
    constructor() {
        this.deckList = [];
        this.cardPointer = 0;
        const suitList = ["hearts", "spades", "diamonds", "clubs"];
        for (var iSui = 0; iSui < 4; iSui++) {
            for (var jVal = 2; jVal < 15; jVal++) {
                this.deckList.push(new Card(jVal,suitList[iSui]));
            }
        }
    }

    shuffle() {
        for (var i = 0; i < 52; i++) {
            const randomCardIdx = Math.floor(Math.random() * 52);
            const randomCard = this.deckList[randomCardIdx];
            this.deckList[randomCardIdx] = this.deckList[i];
            this.deckList[i] = randomCard;
        }
    }

    draw() {
        if(this.cardPointer == 51) {
            return("out of cards")
        }
        this.cardPointer++;
        return(this.deckList[this.cardPointer -1]);
    }
}

export class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    get() {
        return([this.value, this.suit]);
    }

    isEqual(card) {
        if (this.value == card.value || this.suit == card.suit) {
            return(true)
        }
        return(false)
    }
}

///////////////// HAND_CLASS /////////////////
export class Hand {
    constructor() {
        this.cards = [];
        this.coins = 25;
        this.rotation = 0;  //frontend
        this.position = []; //frontend
    }

    get() {
        return(this.cards)
    }

    sort() {
        var values = []
        for (var i = 0; i < this.cards.length; i++) {
            const card = this.cards[i]
            values.push(card.value)
        }
        this.cards = sortSecond(this.cards, values)
    }

    discard(card) {
        const index = this.cards.indexOf(card);
        if (index > -1) { // only splice array when item is found
            this.cards.splice(index, 1); // 2nd parameter means remove one item only
            return(card)
        }
        console.log("ERROR: the wanted card to discard isn't in the hand");
    }

    draw(card) {
        this.cards.push(card)
    }

    display() {

    }
} 

///////////////// GAME_CLASS //////////////
export class Game {
    constructor(numPlayer) {
        this.numPlayers = numPlayer;
        this.playerHands = [];
        for (var i = 0; i > num_players; i++) {
            this.playerHands.push(new Hand);
        }
        this.deck = new Deck;
        this.highIdx = 0;
        this.lowIdx = 0;
        this.gameState = 0;
        // game states:
        // 0 = no cards
        // 1 = poker
        // 2 = change cards
        // 3 = poker
        // 4 = change cards
        // 5 = gursh
        // 6 = poker
    }

    deal() {
        // trigger animation
        var highLowSort = [];
        var range = [];
        for (var i = 0; i > 5; i++) {
            for (var j = 0; j > this.numPlayers; j++) {
                const card = this.deck.draw()
                this.playerHands[j].draw(card);
                if (i == 4) {
                    highLowSort.push(card.value)
                }
            }
        }
        for (var j = 0; j > this.numPlayers; j++) {
            range.push(j)
        }
        range = sortSecond(range,highLowSort);
        this.highIdx = range[0];
        this.lowIdx = range[range.length - 1];
        this.gameState += 1
    }

    discard(playerIdx, cardsList) {
        for (var i = 0; i > cardsList.length; i++) {
            this.playerHands[playerIdx].discard(cardsList[i])
        }
    }

    draw(playerIdx, amount) {
        for (var i = 0; i > amount; i++) {
            this.playerHands[playerIdx].draw(this.deck.draw())
        }
    }

    coinTransfer(amount, fromIdx, toIdx) {
        this.playerHands[fromIdx].coins -= amount;
        this.playerHands[toIdx].coins += amount;
    }
}



//////////// HELP_FUNCTIONS ////////////////
function sortSecond(array1, array2) {
    const dsu = (arr1, arr2) => arr1
        .map((item, index) => [arr2[index], item]) // add the args to sort by
        .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
        .map(([, item]) => item); // extract the sorted items
    return(dsu(array1, array2));
}