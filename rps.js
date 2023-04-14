/**
 * Randomly select rock, paper, or scissors.
 * @returns {string} a string containing either rock, paper, or scissors
 */
function getComputerChoice() {
    const NUMBER_OF_OPTIONS = 3;
    const ROCK = 0;
    const PAPER = 1;
    const SCISSORS = 2;

    const result = Math.floor(Math.random()*NUMBER_OF_OPTIONS);
    switch(result) {
        case ROCK:
            return "Rock";
        case PAPER:
            return "Paper";
        case SCISSORS:
            return "Scissors";
        default:
            throw new Error('Could not select a valid action.')
    }
}

/**
 * Determines the result of a rock-paper-scissors game based on the player and computer selections.
 * @param {string} playerSelection
 * @param {string} computerSelection 
 * @returns {string} a string saying whether the player won, lost, or tied
 */
function playRound(playerSelection, computerSelection) {
    const beats = {
        "Paper" : "Rock",
        "Scissors" : "Paper",
        "Rock" : "Scissors"
    };
    if (beats[playerSelection] === computerSelection) {
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else if (beats[computerSelection] === playerSelection) {
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    } else {
        return `You tied!`;
    }
}

function getPlayerChoice() {
    const OPTIONS = new Set(["rock", "paper", "scissors"]);
    let input;
    while (!OPTIONS.has(input = prompt("Rock, paper, or scissors?").toLowerCase())){}
    return input.substring(0, 1).toUpperCase()+input.substring(1);
}

/**
 * Play rock-paper-scissors games until either the player or computer has won five games. Print the results of each round and of the game overall to the console.
 * @returns {void}
 */
function game() {
    const WINS_TO_END = 5;
    let playerWins = 0;
    let computerWins = 0;
    while (Math.max(playerWins, computerWins) < WINS_TO_END) {
        let result = playRound(getPlayerChoice(), getComputerChoice());
        if (result.includes("win")) {
            playerWins += 1;
        } else if (result.includes("lose")) {
            computerWins += 1;
        }
        console.log(result);
    }
    if (playerWins == 5) {
        console.log("Congratulations, you beat the computer!");
    } else {
        console.log("The computer wins - better luck next time!");
    }
}

game();