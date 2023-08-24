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
    
    // style
    score.classList.add('flex', 'gap-6', 'justify-center', 'flex-wrap');
    message.classList.add('py-8');
    playerScore.classList.add('flex');
    computerScore.classList.add('flex');


    playerScore.textContent = "Player : " + pScore;
    computerScore.textContent = "Computer : " + cScore;

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
                            message.classList.remove('text-gray-300', 'text-red-300');
                            message.classList.add('text-green-300');
                            message.textContent = "Well played ! " + playerChoice + " beats " + computerChoice;
                            break;
                case 0 :    message.classList.remove('text-green-300', 'text-red-300');
                            message.classList.add('text-gray-300');    
                            message.textContent = "Equality ! You choosed the same weapon";
                            break;
                case -1 :   cScore++;
                            message.classList.remove('text-gray-300', 'text-green-300');
                            message.classList.add('text-red-300');            
                            message.textContent = "Oh no ! " + computerChoice + " beats " + playerChoice;
                            break;
            }
            console.log(message.classList);
    
            playerScore.textContent = "Player : " + pScore;
            computerScore.textContent = "Computer : " + cScore;
    
            if(pScore < 5 && cScore < 5)
            {
                GetPlayerSelection(Play);
            }
            else
            {
                playArea.appendChild(winner);
                if(pScore === 5)
                {
                    winner.classList.add('text-green-500');
                    winner.textContent = "You won !";
                }
                else
                {
                    winner.classList.add('text-red-500')
                    winner.textContent = "You lost";
                }
                
                
                if(newGame)
                {
                    let playAgain = document.createElement('button');
                    playAgain.classList.add('mt-8', 'border-2', 'border-amber-400', 'p-4', 'rounded');
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
                        winner.classList.remove('text-green-500', 'test-red-500');
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