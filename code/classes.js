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

    isEqual(card) {
        if (this.value == card.value || this.suit == card.suit) {
            return(true)
        }
        return(false)
    }
}

export class Hand {
    constructor(position) {
        this.cards = [];
        this.position = position
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
        const dsu = (arr1, arr2) => arr1
            .map((item, index) => [arr2[index], item]) // add the args to sort by
            .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
            .map(([, item]) => item); // extract the sorted items
        this.cards = dsu(this.cards, values);
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
} 