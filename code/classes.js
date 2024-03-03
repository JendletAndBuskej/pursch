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

////////////////// Gamestates classes /////////////////
class initial {
    constructor() {
        this.stateInformation = {}
    }
}

///////////////// GAME_CLASS //////////////
export class Game {
    constructor(numPlayer) {
        this.numPlayers = numPlayer;
        this.playerHands = [];
        this.PlayersTurn = 0;
        this.gameId = int(math.random()*1000)
        this.playerNames = []
        for (var i = 0; i > num_players; i++) {
            this.playerHands.push(new Hand);
        }
        this.deck = new Deck;
        this.highIdx = 0;
        this.lowIdx = 0;
        this.gameState = "";
        // gamestates
        this.cardTrownAmount = 0;
        this.isPlayerDone = [];  //true false list for more than one instance
        this.upCard = [];
        this.takeUpCard = [];   //takes the up card true false list
        this.playerShownCards = {
            "0": [],
            "1": [],
            "2": [],
            "3": []
        }
        this.playedCardsHistory = {
            //"0": [playerIndex,card1, card2],
        }


    }
    constructJson(playerIdx) {
        const playerCoins = []
        for (var i=0; i<this.numPlayers; i++) {
            playerCoins.push(this.playerHands[i].coins)
        }
        if (this.gameState == "initial") {
            const cardsUp = [];
            for (var i=0; i<this.numPlayers; i++) {
                cardsUp.push(this.playerHands[i].cards[4])
            }
            const json = {
                "gameId": this.gameId,
                "amountOfPlayers": this.numPlayers,
                "playerNames": this.playerNames,
                "playerCoins": playerCoins,
                "receivingPlayer": playerIdx,
                "receivingHand": cards2json(this.playerHands[playerIdx].cards),
                "PlayersTurn": this.PlayersTurn,
                "highId": this.highIdx,
                "lowId": this.lowIdx,

                "gameState": this.gameState,
                "stateInformation": {
                    "cardsUp": cards2json(cardsUp),
                    "canSlask": this.canSlask(this.playerHands[playerIdx])
                }
            }
        }
        if (this.gameState == "card change") {
            const playersCardAmount = [];upCard
            for (var i=0; i<this.numPlayers; i++) {
                playersCardAmount.push(this.playerHands[i].cards.length)
            }
            const json = {
                "gameId": this.gameId,
                "amountOfPlayers": this.numPlayers,
                "playerNames": this.playerNames,
                "playerCoins": playerCoins,
                "receivingPlayer": playerIdx,
                "receivingHand": cards2json(this.playerHands[playerIdx].cards),
                "PlayersTurn": this.PlayersTurn,
                "highId": this.highIdx,
                "lowId": this.lowIdx,
                
                "gameState": this.gameState,
                "stateInformation": {
                    "cardTrownAmount": this.cardTrownAmount,
                    "playersCardAmount": playersCardAmount,
                    "isPlayerDone": this.isPlayerDone,
                    "oneUp": {
                        "upCard": this.upCard,
                        "takeUpCard": this.takeUpCard
                    }
                }
            }
        }
        if (this.gameState == "poker") {
            const pokerHand = this.bestWorstHand()
            const playersCardAmount = [];upCard
            for (var i=0; i<this.numPlayers; i++) {
                playersCardAmount.push(this.playerHands[i].cards.length)
            }
            const json = {
                "gameId": this.gameId,
                "amountOfPlayers": this.numPlayers,
                "playerNames": this.playerNames,
                "playerCoins": playerCoins,
                "receivingPlayer": playerIdx,
                "receivingHand": cards2json(this.playerHands[playerIdx].cards),
                "PlayersTurn": this.PlayersTurn,
                "highId": this.highIdx,
                "lowId": this.lowIdx,
                
                "gameState": this.gameState,
                "stateInformation": {
                    "leadingPlayer": pokerHand[0],
                    "loosingPlayer": pokerHand[1],
                    "CanShowMore": this.isPlayerDone,
                    "handCoinValue": pokerHand[2],
                    "playerShownCards": this.playerShownCards
                },
            }
        }
        if (this.gameState == "play") {
            const json = {
                "gameId": this.gameId,
                "amountOfPlayers": this.numPlayers,
                "playerNames": this.playerNames,
                "playerCoins": playerCoins,
                "receivingPlayer": playerIdx,
                "receivingHand": cards2json(this.playerHands[playerIdx].cards),
                "PlayersTurn": this.PlayersTurn,
                "highId": this.highIdx,
                "lowId": this.lowIdx,
                
                "gameState": this.gameState,
                "stateInformation": {
                    "cardsPlayed": this.playedCardsHistory
                },
            }
        }
        if (this.gameState == "ending") {
            const pokerHand = this.bestWorstHand()
            const json = {
                "gameId": this.gameId,
                "amountOfPlayers": this.numPlayers,
                "playerNames": this.playerNames,
                "playerCoins": playerCoins,
                "receivingPlayer": playerIdx,
                "receivingHand": cards2json(this.playerHands[playerIdx].cards),
                "PlayersTurn": this.PlayersTurn,
                "highId": this.highIdx,
                "lowId": this.lowIdx,
                
                "gameState": this.gameState,
                "stateInformation": {
                    "pokerWinning": pokerHand[0],
                    "pokerLosing": pokerHand[1],
                    "pokerAmount": pokerHand[2],
                    "playWinning": 3,
                    "playLosing": 2,
                    "playAmount": 6
                }
            }
        }
    }

    calculateWinner() {
        const lastCardPlayed = [];
        const IdxSortedValues = [];
        const historyLen = this.playedCardsHistory.length
        for (var i=historyLen; i > historyLen - this.numPlayers; i--) {
            const lastPlay = this.playedCardsHistory[toString(i)]
            lastCardPlayed.push(lastPlay);
            IdxSortedValues.push(lastPlay[0])
        }
        for (var i=0; i<lastCardPlayed; i++) {

        }
    }

    bestWorstHand() {
        const handValues = [];
        const bigSums = [];
        const best2worstIdx = [];
        for (var i=0; i<this.numPlayers; i++) {
            handValues.push(handValue(this.playerShownCards[toString(i)]));
            best2worstIdx.push(i)
            const bigSum = 0
            for (var i=0; i<6; i++) {
                if (handValues[i].length == i) {
                    break
                }
                bigSum += handValue[i]*Math.pow(100,5-i);
            }
            bigSums.push(bigSum);
        }
        best2worstIdx = sortSecond(best2worstIdx, bigSums);
        const bestAmount = handValues[best2worstIdx[0]][0];
        const best = []
        for (var i=0; i<best2worstIdx.length-1; i++) {
            best.push(best2worstIdx[i])
            current = bigSums[best2worstIdx[i]];
            next = bigSums[best2worstIdx[i+1]];
            if(current != next) {
                break
            }
        }
        const worst = []
        for (var i=best2worstIdx.length-1; i>0; i--) {
            best.push(best2worstIdx[i])
            current = bigSums[best2worstIdx[i]];
            previous = bigSums[best2worstIdx[i-1]];
            if(current != previous) {
                break
            }
        }
        return([best, worst, bestAmount])
    }

    canSlask(hand) {
        const counter = 0
        if (this.numPlayers == 4) {
            return(false)
        }
        for (var i=0; i < hand.cards.length; i++) {
            const value = hand.cards[i].value
            if (value > 11) {
                return(false)
            }
        }
        return(true)
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
function sortSecond(array1, array2) {       //sort first array by second array
    const dsu = (arr1, arr2) => arr1
        .map((item, index) => [arr2[index], item]) // add the args to sort by
        .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
        .map(([, item]) => item); // extract the sorted items
    return(dsu(array1, array2));
}

function cards2json(cards) {
    const returnList = [];
    for (var i=0; i<cards.length; i++) {
        const cardValue = cards.value
        const cardSuit = cards.suit
        const stringed = toString(cardValue) + cardSuit.charAt(0)
        returnList.push(stringed)
    }
    return(returnList)
}