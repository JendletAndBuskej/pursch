

export function relativePos(x, y, width, height, parent) {
    const width1P = parent.width*0.01;
    const height1P = parent.height*0.01;
    const realX = x*width1P + parent.x;
    const realY = y*height1P + parent.y;
    const realWidth = width*width1P;
    const realHeight = height*height1P;
    return([realX, realY, realWidth, realHeight])
}

export function predeclare() {
    var images = [[],[],[],[]]
    for (var i=0; i<4; i++) {
        for (var j=0; j<13; j++) {
            images[i][j] = new Image();
        }
    }
    return(images)
}

export function preload(images) {
    const val = [2,3,4,5,6,7,8,9,10,11,12,13,14]
    const suit = ["clubs", 'diamonds','hearts','spades']
    for (var i=0; i<4; i++) {
        for (var j=0; j<13; j++) {
            const path = '../image_files/cards/' + val[j].toString() + '_of_' + suit[i] + '.png'
            images[i][j].src = path
        }
    }
    return(images)
}