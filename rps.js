const WINS_TO_END = 5;

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
 * @returns {number} 1 if the player won, -1 if the player lost, 0 if the player tied
 */
function playRound(playerSelection, computerSelection) {
    const beats = {
        "Paper" : "Rock",
        "Scissors" : "Paper",
        "Rock" : "Scissors"
    };
    if (beats[playerSelection] === computerSelection) {
        return 1;
    } else if (beats[computerSelection] === playerSelection) {
        return -1;
    } else {
        return 0;
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
    let playerWins = 0;
    let computerWins = 0;
    while (Math.max(playerWins, computerWins) < WINS_TO_END) {
        let playerChoice = getPlayerChoice();
        let computerChoice = getComputerChoice();
        let result = playRound(playerChoice, computerChoice);
        if (result>0) {
            playerWins++;
            console.log(`You win! ${playerChoice} beats ${computerChoice}. Player ${playerWins}-${computerWins} Computer`);
        } else if (result<0) {
            computerWins++;
            console.log(`You lose! ${computerChoice} beats ${playerChoice}. Player ${playerWins}-${computerWins} Computer`);
        } else {
            console.log(`You tied! Player ${playerWins}-${computerWins} Computer`);
        }
    }
    if (playerWins == WINS_TO_END) {
        console.log("Congratulations, you won!");
    } else {
        console.log("The computer wins - better luck next time!");
    }
}

let resultDiv = document.createElement("div");
resultDiv.style.paddingTop = "32px";
resultDiv.style.whiteSpace = "pre-line";
let body = document.querySelector("body");
body.appendChild(resultDiv);

let playerWins = 0;
let computerWins = 0;
function gameWithButtons(playerChoice) {
    if (Math.max(playerWins, computerWins) >= WINS_TO_END) {
        return;
    }
    let computerChoice = getComputerChoice()
    let result = playRound(playerChoice, computerChoice);
    if (result>0) {
        playerWins++;
        resultDiv.textContent = `You win! ${playerChoice} beats ${computerChoice}. Player ${playerWins}-${computerWins} Computer`;
    } else if (result<0) {
        computerWins++;
        resultDiv.textContent = `You lose! ${computerChoice} beats ${playerChoice}. Player ${playerWins}-${computerWins} Computer`;
    } else {
        resultDiv.textContent = `You tied! Player ${playerWins}-${computerWins} Computer`;
    }
    
    if (playerWins == WINS_TO_END) {
        resultDiv.textContent += "\n\nCongratulations, you won!";
    } else if (computerWins == WINS_TO_END) {
        resultDiv.textContent += "\n\nThe computer wins - better luck next time!";
    }
}

let btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener("click", (b) => {
        gameWithButtons(b.target.textContent);
    });
});