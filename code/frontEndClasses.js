//////// IMPORT /////////////
import {relativePos, predeclare, preload} from './functionsFrontEnd.js';

//////////////// CLASSES ///////////////////////
/////////// CARD /////////////////
export class Card {
    constructor(x, y, rotation, scale, value , suit){
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.scale = scale;
        this.value = value;
        this.faceDown = false;
        if (value == 0) {
            this.faceDown = true;
        }
        this.suit = suit;
        this.suit_index = this.get_suit_index();
        // animationsParameters
        this.animationCounter = 0;
        this.momentum = 0;
    }

    get_suit_index() {
        if(this.suit == 'clubs') {
            return(0);
        }
        if(this.suit == 'diamonds') {
            return(1);
        }
        if(this.suit == 'hearts') {
            return(2);
        }
        if(this.suit == 'spades') {
            return(3);
        }
    }

    display(c, images) {
        var image = images[this.suit_index][this.value - 2];
        if (this.faceDown) {
            var image = images[4][0];
        }
        c.save();
        c.translate(this.x, this.y);
        c.rotate(Math.PI / 180 * this.angle);
        const drawX = this.scale*(-image.width / 2);
        const drawY = this.scale*(-image.height / 2);
        c.drawImage(image, drawX, drawY, this.scale*image.width, this.scale*image.height);
        c.restore();
        }
}
////////////////////// HAND ////////////////////
export class Hand {
    constructor(cards, position, rotation, scale) {
        this.position = position;
        this.cards = cards;
        this.rotation = rotation;
        this.scale = scale*position[3];
        if (rotation == 90 || rotation == -90 || rotation == 270) {
            this.scale = scale*position[2];
        }
        this.cardHover = []
        this.cardSelected = []
    }

    updateHover(mousePos) {
        for (var i=0; i<this.cards.length; i++) {
            // image width = 512*this.scale
            if (i < this.cards.length -1) {
                var check2 = (mousePos.x<this.cards[i+1].x - 400*this.scale/2);
            } 
            else {
                var check2 = (mousePos.x<this.cards[i].x + 400*this.scale/2);
            }
            const check1 = (mousePos.x>this.cards[i].x - 400*this.scale/2);
            const check3 = (mousePos.y>this.position[1]);
            const check4 = (mousePos.y<this.position[1] + this.position[3]);
            this.cardHover[i] = check1 && check2 && check3 && check4;
        }
    }

    updateSelect(mousePos) {
        for (var i=0; i<this.cards.length; i++) {
            // image width = 512*this.scale
            if (i < this.cards.length -1) {
                var check2 = (mousePos.x<this.cards[i+1].x - 400*this.scale/2);
            } 
            else {
                var check2 = (mousePos.x<this.cards[i].x + 400*this.scale/2);
            }
            const check1 = (mousePos.x>this.cards[i].x - 400*this.scale/2);
            const check3 = (mousePos.y>this.position[1]);
            const check4 = (mousePos.y<this.position[1] + this.position[3]);
            if (check1 && check2 && check3 && check4) {
                this.cardSelected[i] = (this.cardSelected[i] == false);
            }
        }
    }

    updateHover(mousePos) {
        for (var i=0; i<this.cards.length; i++) {
            // image width = 512*this.scale
            if (i < this.cards.length -1) {
                var check2 = (mousePos.x<this.cards[i+1].x - 400*this.scale/2);
            } 
            else {
                var check2 = (mousePos.x<this.cards[i].x + 400*this.scale/2);
            }
            const check1 = (mousePos.x>this.cards[i].x - 400*this.scale/2);
            const check3 = (mousePos.y>this.position[1]);
            const check4 = (mousePos.y<this.position[1] + this.position[3]);
            this.cardHover[i] = check1 && check2 && check3 && check4;
        }
    }

    draw(c, images, card) {
        const animationLen = 20;
        const speedFunction = [2.5, 1.75, 1.44 , 1.24, 1, 0.95, 0.85, 0.77, 0.7,
                               0.63, 0.57, 0.5, 0.46, 0.41, 0.37, 0.33, 0.23,
                               0.26, 0.22, 0.19];
        //const sum = speedFunction.reduce((partialSum, a) => partialSum + a, 0);
        const sum = 15.37;
        if (card.animationCounter < animationLen) {
            if (card.animationCounter == 0) {
                card.x = 0;
                card.y = 0;
                card.angle = 45;
                card.momentum = Math.random()*(1080/animationLen);
            }
            card.faceDown = true;
            const targetX = this.position[0] + this.position[2]/2;
            const targetY = this.position[1] + this.position[3]/2;
            card.x += speedFunction[card.animationCounter]*targetX/sum;
            card.y += targetY/animationLen;
            card.display(c, images)
            card.angle += card.momentum;
            card.animationCounter += 1
        }
        if (card.animationCounter == animationLen) {
            card.faceDown = false;
            this.cards.push(card);
            card.animationCounter += 1
        }
    }

    display(c, images) {
        for (var i=0; i<this.cards.length; i++) {
            const card = this.cards[i];
            if (this.rotation ==0) {
                card.x = this.position[0] + (i+1/2)*this.position[2]/this.cards.length;
                card.y = this.position[1] + this.position[3]*2/3;
                const middleX = this.position[0] + this.position[2]/2;
                const scaleFactor = (card.x - middleX)/middleX;
                card.angle = this.rotation + 20*scaleFactor;
                card.y += 100*scaleFactor*scaleFactor;
                if (this.cardSelected[i]) {
                    card.y -= 0.15*this.position[3];
                }
                else if (this.cardHover[i]) {
                    card.y -= 0.10*this.position[3];
                }
                card.scale = this.scale*1.3;
            }
            if (this.rotation == 180) {
                card.x = this.position[0] + (i+1/2)*this.position[2]/this.cards.length;
                card.y = this.position[1];
                const middleX = this.position[0] + this.position[2]/2;
                const scaleFactor = (card.x - middleX)/middleX;
                card.angle = this.rotation - 20*scaleFactor;
                card.y -= 100*scaleFactor*scaleFactor;
                card.scale = this.scale*1.3;
            }
            if (this.rotation == -90 || this.rotation == 270) {
                card.y = this.position[1] + (i+1/2)*this.position[3]/this.cards.length;
                card.x = this.position[0] + this.position[2]
                const middleY = this.position[1] + this.position[3]/2;
                const scaleFactor = (card.y - middleY)/middleY;
                card.angle = this.rotation - 20*scaleFactor;
                card.x += 100*scaleFactor*scaleFactor;
                card.scale = this.scale*1.3;
            }
            if (this.rotation == 90) {
                card.y = this.position[1] + (i+1/2)*this.position[3]/this.cards.length;
                card.x = this.position[0];
                const middleY = this.position[1] + this.position[3]/2;
                const scaleFactor = (card.y - middleY)/middleY;
                card.angle = this.rotation + 20*scaleFactor;
                card.x -= 100*scaleFactor*scaleFactor;
                card.scale = this.scale*1.3;
            }
            
            card.display(c, images);
        }
    }
}

/////////// PLAYAREA //////////
export class PlayArea {
    constructor(hand, position, scale) {
        this.cards = [];
        this.rotation = hand.rotation;
        this.position = position;
        this.scale = scale*this.position[2]; //???? position 3??????
        this.noiseX = this.calculateNoise((1/10)*this.position[2],+(1/10)*this.position[2]);
        this.noiseY = this.calculateNoise((1/20)*this.position[3],+(1/20)*this.position[3]);
        if (this.rotation == 0 || this.rotation == 180)  {
            this.scale = scale*this.position[3];
            this.noiseX = this.calculateNoise((1/20)*this.position[2],+(1/20)*this.position[2]);
            this.noiseY = this.calculateNoise((1/10)*this.position[3],+(1/10)*this.position[3]);    
        }
        this.noiseRotation = this.calculateNoise(10,10);
    }

    displaySplit(c, images) {
        for (var i=0; i<this.cards.length; i++) {
            const card = this.cards[i][0];
            const splitFactor = 0.90;
            if (this.rotation ==0 || this.rotation ==180) {
                const term1X = splitFactor*this.position[0];
                const factor1X = (i+1/2)/this.cards.length;
                const factor2X = (this.position[2]+this.position[0]*2*(1-splitFactor))
                card.x = term1X + factor1X*factor2X;
                card.y = this.position[1] + this.position[3]/2;
            }
            if (this.rotation == 90 || this.rotation == -90 || this.rotation == 270) {
                const term1Y = splitFactor*this.position[1];
                const factor1Y = (i+1/2)/this.cards.length;
                const factor2Y = (this.position[3]+this.position[1]*2*(1-splitFactor));
                card.y = term1Y + factor1Y*factor2Y;
                card.x = this.position[0] + this.position[2]/2;
            }
            card.scale = this.scale;
            card.angle = this.rotation;
            card.display(c, images);
        }
    }

    draw(c, images, card) {
        const animationLen = 20;
        const speedFunction = [2.5, 1.75, 1.44 , 1.24, 1, 0.95, 0.85, 0.77, 0.7,
                               0.63, 0.57, 0.5, 0.46, 0.41, 0.37, 0.33, 0.23,
                               0.26, 0.22, 0.19];
        const sum = 15.37;
        if (card.animationCounter < animationLen) {
            if (card.animationCounter == 0) {
                card.x = 0;
                card.y = 0;
                card.angle = 45;
                card.momentum = Math.random()*(1080/animationLen);
            }
            card.faceDown = false;
            const targetX = this.position[0] + this.position[2]/2;
            const targetY = this.position[1] + this.position[3]/2;
            card.x += speedFunction[card.animationCounter]*targetX/sum;
            card.y += targetY/animationLen;
            card.display(c, images)
            card.angle += card.momentum/10;
            card.animationCounter += 1
        }
        if (card.animationCounter == animationLen) {
            card.faceDown = false;
            this.cards.push([card]);
            card.animationCounter += 1
        }
    }

    calculateNoise(from, to) {
        const noise = [];
        for (var i=0; i<5; i++)
            noise[i] = Math.random()*(from + to) - from;
        return(noise);
    }

    testDraw(c) {
        c.fillRect(this.position[0], this.position[1], this.position[2],this.position[3]);
    }

    displayStacked(c, images) {
        for (var i=0; i<this.cards.length; i++) {
            for (var j=0; j<this.cards[i].length; j++) {
                const card = this.cards[i][j];
                if (this.rotation == 0) {
                    const term1X = this.position[0] + this.noiseX[i];
                    const term2X = (j + 1/2)*this.position[2]/(this.cards[i].length);
                    card.x = term1X + term2X;
                    card.y = this.position[1] + this.position[3]/2 + this.noiseY[i];
                }
                if (this.rotation == 90) {
                    const term1Y = this.position[1] + this.noiseY[i];
                    const term2Y = (j + 1/2)*this.position[3]/(this.cards[i].length);
                    card.y = term1Y + term2Y;
                    card.x = this.position[0] + this.position[2]/2 + this.noiseY[i];
                }
                if (this.rotation == -90 || this.rotation == 270) {
                    const term1Y = this.position[1] + this.noiseY[i];
                    const term2Y = (j + 1/2)*this.position[3]/(this.cards[i].length);
                    card.y = term1Y + term2Y;
                    card.x = this.position[0] + this.position[2]/2 + this.noiseY[i];
                }
                if (this.rotation == 180) {
                    const term1X = this.position[0] + this.noiseX[i];
                    const term2X = (j + 1/2)*this.position[2]/(this.cards[i].length);
                    card.x = term1X + term2X;
                    card.y = this.position[1] + this.position[3]/2 + this.noiseY[i];
                }
                card.angle = this.rotation + this.noiseRotation[i];
                card.scale = this.scale;
                card.display(c, images);
            }
        }
    }
}

//////////////// Coins and Coin Stack ///////////////
export class Coins {
    constructor(amount, x, y, scale) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.isBigStack = 0;
        if (amount >= 7) {
            this.isBigStack = 1;
        }
        // animationsParameters
        this.animationCounter = 0;
    }
    
    display(c, images) {
        const image = images[4][this.isBigStack + 1];
        c.save();
        c.translate(this.x, this.y);
        c.rotate(Math.PI / 180 * this.angle);
        const drawX = this.scale*(-image.width / 2);
        const drawY = this.scale*(-image.height / 2);
        c.drawImage(image, drawX, drawY, this.scale*image.width, this.scale*image.height);
        c.restore();
    }
}

export class CoinStack {
    constructor(seatIdx, handPos, canvas) {
        this.amount = 25;
        this.scale = 0.02;
        if (seatIdx == 0) {
            this.position = [canvas.width - handPos[0], handPos[1]];
        }
        if (seatIdx == 2) {
            this.position = [canvas.width - handPos[0] - 2*handPos[2], handPos[1] + handPos[3]];
        }
        if (seatIdx == 1) {
            this.position = [handPos[0] + handPos[2]/2, canvas.height - handPos[1] + handPos[3]*2/3];
        }
        if (seatIdx == 3) {
            this.position = [handPos[0] - handPos[2]/2, handPos[1] - handPos[3]/2];
        }
    }

    display(c, images) {
        c.font = "30px serif";
        c.fillText(this.amount.toString(),this.position[0],this.position[1]);
        const coin = new Coins(1, this.position[0] + 60, this.position[1] - 10, 0.04);
        coin.display(c, images);
    }

    getCoins(c, images, coins, fromCoinStack) {
        const animationLen = 20;
        if (coins.animationCounter < animationLen) {
            if (coins.animationCounter == 0) {
                coins.x = fromCoinStack.x;
                coins.y = fromCoinStack.y;
            }
            const targetX = this.x - coins.x;
            const targetY = this.y - coins.y;
            coins.x += coins.animationCounter*targetX/animationLen;
            coins.y += coins.animationCounter*targetY/animationLen;
            coins.display(c, images)
            coins.animationCounter += 1
        }
        if (coins.animationCounter == animationLen) {
            coins.faceDown = false;
            this.cards.push([coins]);
            coins.animationCounter += 1
        }
    }
}

//////////////// PLAYER ////////////////////////////////
export class Player {
    constructor(seatIdx, canvas, name) {
        // constant positions of players
        const myPosition = relativePos(35,75,30,25, canvas);
        const westPosition = relativePos(0,40,7,20, canvas);
        const northPosition = [canvas.width/2 - westPosition[3]/2,westPosition[0], westPosition[3], westPosition[2]];
        const eastPosition = [canvas.width - westPosition[2], westPosition[1], westPosition[2], westPosition[3]]
        const position = [myPosition, westPosition, northPosition, eastPosition];
        const myPlayPosition = relativePos(45,60,10,15, canvas);
        const westPlayPosition = [1.2*westPosition[2],canvas.height/2-myPlayPosition[2]/2,myPlayPosition[3],myPlayPosition[2]];
        const northPlayPosition = [canvas.width/2 - westPlayPosition[3]/2,1.2*northPosition[3], westPlayPosition[3], westPlayPosition[2]];
        const eastPlayPosition = [eastPosition[0]-1.2*westPlayPosition[2], westPlayPosition[1], westPlayPosition[2], westPlayPosition[3]];
        const playPos = [myPlayPosition, westPlayPosition, northPlayPosition, eastPlayPosition];
        // declarations
        this.hand = new Hand([], position[seatIdx], 90*seatIdx, 0.002);
        this.playArea = new PlayArea(this.hand, playPos[seatIdx], 0.002);
        this.coinStack = new CoinStack(seatIdx, position[seatIdx], canvas);
        this.name = name;
    }

    display(c, images, isGame) {
        // this.displayName(c, images)
        this.coinStack.display(c,images);
        if (isGame) {
            this.playArea.displayStacked(c, images);
        }
        if (isGame == false) {
            this.playArea.displaySplit(c, images);
        }
        this.hand.display(c, images);
    }

    showCards() {
        for (var i=0; i<this.hand.cards.length; i++) {
            const cardHolder = [];
            if (this.hand.cardSelected[i]) {
                this.playArea.cards.push(this.hand.cards[i]);
            }
            else {
                cardHolder.push(this.hand.cards[i]);
            }
        }
        this.hand.cards = cardHolder;
        return(cards2json(this.playArea.cards))
    }

    discardCards() {
        for (var i=0; i<this.hand.cards.length; i++) {
            const cardHolder = [];
            const removedCards = []
            if (this.hand.cardSelected[i]) {
                cardHolder.push(this.hand.cards[i]);
            }
            else {
                removedCards.push(this.hand.cards[i])
            }
        }
        this.hand.cards = cardHolder;
        return(cards2json(removedCards))
    }
}

////////////// Discard_pile //////////////////
export class DiscardPile {
    constructor(canvas) {
        this.cards = [];
        const noiseFactor = 0.1;
        this.x = canvas.width*2/3;
        this.y = canvas.height/2;
        this.noiseX = this.calculateNoise(noiseFactor*canvas.width,noiseFactor*canvas.width);
        this.noiseY = this.calculateNoise(noiseFactor*canvas.height,noiseFactor*canvas.height);
        this.noiseRotation = this.calculateNoise(720,720);
    }

    calculateNoise(from, to) {
        const noise = [];
        for (var i=0; i<53; i++)
            noise[i] = Math.random()*(from + to) - from;
        return(noise);
    }

    display(c, images) {
        for (var i=0; i>this.cards.length; i++) {
            const card = this.cards[i];
            card.faceDown = true;
            card.x = this.x + this.noiseX[i];
            card.y = this.y + this.noiseY[i];
            card.angle = this.noiseRotation[i];
            card.display(c, images);
        }
    }
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
