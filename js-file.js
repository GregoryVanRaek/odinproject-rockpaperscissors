function GetComputerSelection()
{
    let computerChoice ;
    let random = Math.floor(Math.random() * 3);
    switch(random)
    {
        case 0 : computerChoice = "rock";break;
        case 1 : computerChoice = "paper";break;
        case 2 : computerChoice = "scissors";break;
    }
    return computerChoice;
}

function GetPlayerSelection(Play)
{
    let playerButtons = document.querySelectorAll('button');
    playerButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            let playerChoice = event.target.id;
            Play(playerChoice);
        });
    });
}

function MakeRound(playerSelection, computerSelection)
{
    let result

    // Return 1 if the player win the round, -1 if he loose and 0 if equality
    if((playerSelection === "rock" && computerSelection === "scissors") || (playerSelection === "paper" && computerSelection === "rock") || (playerSelection === "scissors" && computerSelection === "paper"))
        result = 1; 
    else if((computerSelection === "rock" && playerSelection === "scissors") || (computerSelection === "paper" && playerSelection === "rock") || (computerSelection === "scissors" && playerSelection === "paper"))
        result = -1; 
    else if(playerSelection === computerSelection)
        result = 0;
    return result;
}

function GameLoop()
{
    let pScore = 0, cScore = 0;
    let newGame = true;
    let playArea = document.querySelector('#playArea');
    let message = document.createElement('p');
    let score = document.createElement('div');
    let playerScore = document.createElement('p');
    let computerScore = document.createElement('p');
    let winner = document.createElement('p');

    playArea.appendChild(score);
    score.appendChild(playerScore);
    score.appendChild(computerScore);
    

    playerScore.textContent = "Player : " + pScore ;
    computerScore.textContent = " Computer : " + cScore;

    function Play(playerChoice)
    {
        if(newGame === true)
        {
            playArea.appendChild(message);
            let computerChoice = GetComputerSelection();
            let result = MakeRound(playerChoice, computerChoice);
    
            switch(result)
            {
                case 1 :    pScore++;
                            message.textContent = "Well played ! " + playerChoice + " beats " + computerChoice;
                            break;
                case 0 :    message.textContent = "Equality ! You choosed the same";
                            break;
                case -1 :   cScore++;
                            message.textContent = "Oh no ! " + computerChoice + " beats " + playerChoice;
                            break;
            }
    
            playerScore.textContent = "Player : " + pScore ;
            computerScore.textContent = " Computer : " + cScore;
    
            if(pScore < 5 && cScore < 5)
            {
                GetPlayerSelection(Play);
            }
            else
            {
                playArea.appendChild(winner);
                pScore === 5 ? winner.textContent = "You win !" : winner.textContent = "You loose";
                
                if(newGame)
                {
                    let playAgain = document.createElement('button');
                    playAgain.textContent = "Play again";
                    playArea.appendChild(playAgain);
                    playAgain.addEventListener('click', () => {
                        pScore = 0;
                        cScore = 0;
                        playerScore.textContent = "Player : " + pScore ;
                        computerScore.textContent = " Computer : " + cScore;
                        playArea.removeChild(message);
                        playArea.removeChild(winner);
                        playArea.removeChild(playAgain);
                        newGame = true;
                    });
                    newGame = false;
                }
            }
        }
        
    }
    GetPlayerSelection(Play);
}

GameLoop();