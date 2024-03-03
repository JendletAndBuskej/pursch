/////////// IMPORTS ////////
import { Deck, Card, Hand, Game } from './classes.js';
import { handValue } from './handValue.js';

/////////// PARAMETERS /////////////
const num_players = 4

////////// INITIALIZE //////////////
activeGame = new Game(num_players)
activeGame.deal()


/////////// PLAYORDER /////////////



/////////// HELP_FUNCTION ///////////
function CreateJsonBase(gameState) {
    if (gameState == 0) {
        json = {
            "gameId": 344,
            "amountOfPlayers": 4,
            "playerNames": ["","","",""],
            "playerCoins": [23, 24, 30],
            "receivingPlayer": 2,
            "receivingHand": ["2c", "2h"],
            "PlayersTurn": 1,
            "highId": 3,
            "lowId": 0,
            
            "gameState": "initial",
            "stateInformation": {
                "cardsUp": ["","","",""],
                "canSlask": true
            }
        }
    }
    if (gameState == 1 || gameState == 2)
}