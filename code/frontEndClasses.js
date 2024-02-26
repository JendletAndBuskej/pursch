//////// IMPORT /////////////
import {relativePos, predeclare, preload} from './functionsFrontEnd.js';

//////////////// CLASSES ///////////////////////
/////////// CARD /////////////////
export class Card {
    constructor(x, y, rotation, scale, value , suit){
        this.x = x
        this.y = y
        this.rotation = rotation
        this.scale = scale
        this.value = value
        this.suit = suit
        this.suit_index = this.get_suit_index()
    }

    get_suit_index() {
        if(this.suit == 'clubs') {
            return(0)
        }
        if(this.suit == 'diamonds') {
            return(1)
        }
        if(this.suit == 'hearts') {
            return(2)
        }
        if(this.suit == 'spades') {
            return(3)
        }
    }

    updatePos(x, y, rotation) {
        this.x = x
        this.y = y
        this.rotation = rotation
    }

    display(c, images) {
        var image = images[this.suit_index][this.value - 2];
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
        this.cardHover = []
    }

    updateHover(mousePos) {
        for (var i=0; i<this.cards.length; i++) {
            // image width = 512*this.scale
            if (i < this.cards.length -1) {
                var check2 = (mousePos.x<this.cards[i+1].x - 400*this.scale/2)
            } 
            else {
                var check2 = (mousePos.x<this.cards[i].x + 400*this.scale/2)
            }
            const check1 = (mousePos.x>this.cards[i].x - 400*this.scale/2)
            const check3 = (mousePos.y>this.position[1])
            const check4 = (mousePos.y<this.position[1] + this.position[3])
            this.cardHover[i] = check1 && check2 && check3 && check4
        }
    }

    testDraw(c) {
        c.fillRect(this.position[0], this.position[1], this.position[2],this.position[3])
    }

    display(c, images) {
        for (var i=0; i<this.cards.length; i++) {
            const card = this.cards[i]
            card.x = this.position[0] + (i+1/2)*this.position[2]/this.cards.length
            card.y = this.position[1] + this.position[3]/2
            card.scale = this.scale
            const middleX = this.position[0] + this.position[2]/2;
            const scaleFactor = (card.x - middleX)/middleX;
            card.angle = this.rotation + 20*scaleFactor;
            card.y += 100*scaleFactor*scaleFactor;
            if (this.cardHover[i]) {
                card.y -= 0.13*this.position[3]
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
        const middleX = hand.position[0] + hand.position[3]/2;
        this.position = position;
        this.scale = scale*this.position[3];
        this.noiseX = this.calculateNoise((1/20)*this.position[2],+(1/20)*this.position[2]);
        this.noiseY = this.calculateNoise((1/10)*this.position[3],+(1/10)*this.position[3]);
        this.noiseRotation = this.calculateNoise(25,25);
    }

    displaySplit(c, images) {
        for (var i=0; i<this.cards.length; i++) {
            const card = this.cards[i][0];
            const splitFactor = 0.90;
            const term1X = splitFactor*this.position[0]
            const factor1X = (i+1/2)/this.cards.length
            const factor2X = (this.position[2]+this.position[0]*2*(1-splitFactor))
            card.x = term1X + factor1X*factor2X;
            card.y = this.position[1] + this.position[3]/2
            card.scale = this.scale;
            card.angle = this.rotation;
            card.display(c, images);
        }
    }

    calculateNoise(from, to) {
        const noise = [];
        for (var i=0; i<5; i++)
            noise[i] = Math.random()*(from + to) - from;
        return(noise);
    }

    displayStacked(c, images) {
        for (var i=0; i<this.cards.length; i++) {
            for (var j=0; j<this.cards[i].length; j++) {
                const card = this.cards[i][j];
                const term1X = this.position[0] + this.noiseX[i];
                const term2X = (j + 1/2)*this.position[2]/(this.cards[i].length);
                card.x = term1X + term2X;
                card.y = this.position[1] + this.position[3]/2 + this.noiseY[i];
                card.angle = this.noiseRotation[i];
                card.scale = this.scale;
                card.display(c, images);
            }
        }
    }
}

export class Coins {
    constructor(amount, x, y) {
        this.x = x;
        this.y = y;
        this.scale;
        this.isBigStack = 0;
        if (amount >= 7) {
            this.isBigStack = 1;
        }
    }
    
    display(c, images) {
        var image = images[this.isBigStack];
        const drawX = this.scale*(-image.width / 2);
        const drawY = this.scale*(-image.height / 2);
        c.drawImage(image, drawX, drawY, this.scale*image.width, this.scale*image.height);
    }
}

export class Player {
    constructor(hand, canvas) {
        this.hand = hand;
        const playAreaPos = relativePos(45,60,10,15, canvas);
        this.playArea = new PlayArea(hand, playAreaPos, 0.002);
        this.coinStack = coinStack;
        this.playArea = playArea;
        
    }
}
