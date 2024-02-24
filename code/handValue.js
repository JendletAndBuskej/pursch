////////////// MAIN_FUNCTION /////////////////////
export function handValue(hand) {
// this function will return the value of your hand and 
// give tie breaker values in consecutive order.
// I use [0] as a false return
    const storedHandValues = [0,1,2,3,4,5,6,8,20]
    var cardValues = sortHand(hand)
    console.log(cardValues);
    if (cardValues.length > 2) {
        const color = isHandOneColor(hand);
        const straight = checkStraight(cardValues, storedHandValues);
        const roundStraight = checkRoundStraight(cardValues, storedHandValues);
        if (color && straight.length != 1) {
            return([storedHandValues[8]].concat(cardValues));
        }
        if (color && roundStraight.length != 1) {
            return([storedHandValues[7]].concat(cardValues));
        }
        const four = checkSame(4,cardValues, storedHandValues);
        if (four.length != 1) {
            return(four);
        }
        const house = checkHouse(cardValues, storedHandValues);
        if (house.length != 1) {
            return(house);
        }
        if (color) {
            return([storedHandValues[5].concat(cardValues)]);
        }
        if (straight.length != 1) {
            return(straight);
        }
        if (roundStraight.length != 1) {
            return(roundStraight);
        }
        const tree = checkSame(3,cardValues, storedHandValues);
        if (tree.length != 1) {
            return(tree);
        }
        const parPar = check2Par(cardValues, storedHandValues);
        if (parPar.length != 1) {
            return(parPar);
        }
        const par = checkSame(2,cardValues, storedHandValues);
        if (par.length != 1) {
            return(par);
        }
    }
    return([0].concat(cardValues));
}

/////////////// HELP_FUNCTIONS ///////////////////
function sortHand(cardList) {
    var valueList = []
    for (var i = 0; i < cardList.length; i++) {
        var card = cardList[i]
        valueList.push(card.value)
    }
    var sorted = valueList.toSorted((a, b) => a - b)
    return(sorted.reverse())
}

function checkSame(amount, valueList, storedHandValues) {
    if (valueList.length >= amount) {
        const storedSameVal = [storedHandValues[1], storedHandValues[3], storedHandValues[7]]
        for (var i = 0; i < valueList.length - amount+1; i++) {
            if (valueList[i] == valueList[i + amount -1]) {
                var multipleValue = [valueList[i]]
                const equalOrder = valueList.filter(item => item !== valueList[i])
                const rest = multipleValue.concat(equalOrder)
                return([storedSameVal[amount-2]].concat(rest))
            }
        }
    }
    return([0])
}

function check2Par(valueList, storedHandValues) {
    if (valueList.length > 3) {
        const check1 = checkSame(2,valueList, storedHandValues);
        if (1 != check1.length) {
            const highestPar = check1[1];
            var cardsLeft = valueList.filter(item => item !== highestPar)
            const check2 = checkSame(2,cardsLeft, storedHandValues);
            if (1 != check2.length) {
                const lowestPar = check2[1];
                cardsLeft = cardsLeft.filter(item => item !== lowestPar)
                if (cardsLeft != 0) {
                    return([storedHandValues[2],highestPar,lowestPar,cardsLeft[0]]);
                }
                return([storedHandValues[2],highestPar,lowestPar])
            }
        }
    }
    return([0])
}

function checkHouse(valueList, storedHandValues) {
    if (valueList.length > 4) {
        const check1 = checkSame(3,valueList, storedHandValues);
        if (1 != check1.length) {
            const highestPar = check1[1];
            var cardsLeft = valueList.filter(item => item !== highestPar)
            const check2 = checkSame(2,cardsLeft, storedHandValues);
            if (1 != check2.length) {
                const lowestPar = check2[1];
                return([storedHandValues[6],highestPar,lowestPar])
            }
        }
    }
    return([0])
}

function checkStraight(valueList, storedHandValues) {
    if (valueList.length > 4) {
        const parCheck = checkSame(2,valueList,storedHandValues)
        const check1 = valueList[0] == valueList[4]+4 && parCheck.length == 1
        const check2 = valueList == [14,5,4,3,2]
        if (check1 || check2) {
            return ([storedHandValues[4]].concat(valueList))
        }
    }
    return([0])
}

function isHandOneColor(hand) {
    if (hand.length > 4) {
        var colorList = []
        for (var i = 0; i < hand.length; i++) {
            const card = hand[i]
            colorList.push(card.suit);
        }
        const check1 = colorList[0] == colorList[1]
        const check2 = colorList[1] == colorList[2]
        const check3 = colorList[2] == colorList[3]
        const check4 = colorList[3] == colorList[4]
        if (check1 && check2 && check3 && check4) {
            return(true)
        }
    }
    return(false)
}

function checkRoundStraight(valueList, storedHandValues) {
    if (valueList.length > 4) {
        const order1 = [14,13,4,3,2]
        const order2 = [14,13,12,3,2]
        const order3 = [14,13,12,11,2]
        if (valueList == order1 || valueList == order2 || valueList == order3) {
            return(storedHandValues[3].concat(valueList))
        }
    }
    return([0])
}