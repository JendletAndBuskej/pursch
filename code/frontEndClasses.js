

class Card {
    constructor(x, y, rotation, scale, value , suit){
        this.x = x
        this.y = y
        this.rotation = rotation
        this.scale = scale
        this.value = value
        this.suit = suit
    }

    updatePos(x, y, rotation) {
        this.x = x
        this.y = y
        this.rotation = rotation
    }

    display() {
        imageLoc = '../image_files/cards/' + str(this.value) + '_of_' + this.suit + '.png'
        const image = new Image();
        image.onload = function(){
            var cache = this;
            c.save();
            c.translate(this.x, this.y);
            c.rotate(Math.PI / 180 * this.angle);
            const drawX = this.scale*(-cache.width / 2);
            const drawY = this.scale*(-cache.height / 2);
            const drawWidth = this.scale*cache.width;
            const drawHeight = this.scale*cache.height;
            c.drawImage(image, drawX, drawY, drawWidth, drawHeight);
            c.restore();
        };
        image.src = imageLoc;
    }
}

class Hand {
    constructor() {

    }
}


/////////// HELP_FUNCTIONS ////////////////
