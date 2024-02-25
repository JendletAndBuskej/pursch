/////////// IMPORTS ////////
import { Deck, Card, Hand } from './classes.js';
import { handValue } from './handValue.js';

/////////// PARAMETERS /////////////
const num_players = 4

////////// INITIALIZE //////////////


/////////// PLAYORDER /////////////
if (num_players == 4) {
    
}


/////////// HELP_FUNCTION ///////////
function InitializeGame(playerAmount) {
    var deck = new Deck;
    var players = [];
    for (var i=0; i>num_players; i++) {
        players.push(new Hand);
    }

}