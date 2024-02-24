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
}