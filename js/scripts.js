var CONSTANTS = Object.freeze({
    MAX_POINTS: 10,
});

var newGameBtn = document.getElementById('js-newGameButton');
  
    newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {playerPick('KAMIEŃ');});
pickPaper.addEventListener('click', function() {playerPick('PAPIER');});
pickScissors.addEventListener('click', function() {playerPick('NOŻYCE');});

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        name: 'Komputer',
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    helloElement = document.getElementById('js-helloElement'),
    tableBody = document.getElementById('js-scoreTable'),
    tableTitle = document.getElementById('js-tableTitle'),
    score = document.getElementById('js-score');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            helloElement.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            score.style.display = 'block';
        break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
            playerPickElem.innerText = "Wybór gracza";
            computerPickElem.innerText = "Wybór komputera";
            playerResultElem.innerText = "Wynik gracza";
            computerResultElem.innerText = "Wynik komputera";
            tableTitle.innerText = 'WYNIKI POSZCZEGÓLNYCH RUND ZAKOŃCZONEJ GRY:';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            helloElement.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            score.style.display = 'block';
	}
}

function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints(); 
        tableClear();
	}
}

function getComputerPick() {
    var possiblePicks = ['KAMIEŃ', 'PAPIER', 'NOŻYCE'];
    return possiblePicks[Math.floor(Math.random() * possiblePicks.length)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
  var winnerIs = 'player';

  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'KAMIEŃ' &&  playerPick == 'NOŻYCE') ||
        (computerPick == 'NOŻYCE' &&  playerPick == 'PAPIER') ||
        (computerPick == 'PAPIER' &&  playerPick == 'KAMIEŃ')) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    } else {
        playerResultElem.innerHTML = "Remis";
        computerResultElem.innerHTML = 'Remis';
    }

    function updateTable() {
      var trNumber = document.getElementsByTagName('tr'),
      winner;
      
      if(winnerIs === 'player') {
        winner = player.name;
      } else if (winnerIs === 'computer') {
        winner = computer.name;
      } else {
        winner = 'Remis';
      }

      tableBody.innerHTML += '<tr> \
        <td>' + trNumber.length + '</td> \
        <td>' + playerPick + '</td> \
        <td>' + computerPick + '</td> \
        <td>' + winner + '</td> \
        <td>' + player.score + ' : ' + computer.score + '</td> \
      </tr>';
	}

    setGamePoints(); 
    updateTable();
    setTimeout(endGame, 100);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function endGame() {
    if (player.score === CONSTANTS.MAX_POINTS) {
        alert('Wygrywa: ' + player.name);
        gameState = 'ended';
        setGameElements();
    } else if(computer.score === CONSTANTS.MAX_POINTS) {
        alert('Wygrywa: ' + computer.name);
        gameState = 'ended';
        setGameElements();
    } 
} 

function tableClear() {
	tableBody.innerHTML = '';
}


    



    
   

