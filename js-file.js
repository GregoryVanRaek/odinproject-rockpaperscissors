
function GetComputerChoice()
{
    let computerChoice = Math.floor(Math.random() * 3);
    switch(computerChoice)
    {
        case 0 : computerChoice = "rock";break;
        case 1 : computerChoice = "paper";break;
        case 2 : computerChoice = "scissors";break;
    }
    return computerChoice;
} 

function GetPLayerChoice(PlayRound)
{
    let playerChoice = document.querySelectorAll('button');
    playerChoice.forEach(btn => {
        btn.addEventListener('click', () => {
            playerChoice = btn.id;
            PlayRound(playerChoice);
        });
    });
}

function Round(playerChoice, computerChoice)
{
    let result;

    if((playerChoice === 'rock' && computerChoice === 'scissors') || (playerChoice === 'scissors' && computerChoice === 'paper') || (playerChoice === 'paper' && computerChoice === 'rock'))
        result = 1;
    else if ((playerChoice === 'scissors' && computerChoice === 'rock') || (playerChoice === 'paper' && computerChoice === 'scissors') || (playerChoice === 'rock' && computerChoice === 'paper'))
        result = -1;    
    else if(playerChoice === computerChoice)
        result = 0;

    return result;
}

function GameLoop()
{
    let computerScore = 0, playerScore = 0;

    function PlayRound(playerChoice)
    {
        let computerChoice = GetComputerChoice();
        let resultat = Round(playerChoice, computerChoice);

        switch(resultat)
        {
            case -1 : console.log(playerChoice + " beat " + computerChoice + " . You win this round.");
            playerScore++;break;
            case 0 : console.log("Equality, you choose the same.");break;
            case 1 : console.log(playerChoice + " beat " + computerChoice + " . You win this round.");
            playerScore++;break;
        }

        console.log("Player score : " + playerScore + " | Computer score : " + computerScore);

        if(playerScore < 5 && computerScore < 5)
            GetPLayerChoice(PlayRound);
        else if(playerScore === 5)
            console.log("Congratulation ! You win the game !");
        else if(computerScore === 5) 
            console.log("You loose the game");
    }
}

GameLoop();