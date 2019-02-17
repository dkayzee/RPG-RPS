const $gameBoard = document.body.querySelector('.gameBoard')
const $player1 = document.body.querySelector('.player1');
const $player2 = document.body.querySelector('.player2');
const $rock = document.body.querySelector('.rock');
const $paper = document.body.querySelector('.paper');
const $scissor = document.body.querySelector('.scissor');
const $gameBoardWidth = $gameBoard.offsetWidth;
const $gameBoardHeight = $gameBoard.offsetHeight;
const player1ClassList = $player1.classList;
const player2ClassList = $player2.classList;
let gameOver = true;

const player1 = {
  x: 0,
  y: 3
};

const player2 = {
  x: 12,
  y: 3
};

const obstacles = [
{x: 4, y: 3},
{x: 8, y: 3}
]

const rock = {
  x: 6,
  y: 1
}

const paper = {
  x: 6,
  y: 3
}

const scissor = {
  x: 6,
  y: 5
}

//checks if the desired movement is within the gameBoard
//code was referenced from blerf game taught by John Master
function isCoordinateInGrid(x, y) {
  if (x < 0 || y < 0 || x > 12 || y > 6){
    return false;
  }
  return true;
}

//similiar to the rock check in the blerf game
function isThereAnObstacleAt(x, y) {
  for (const obstacle of obstacles) {
    if (obstacle.x === x && obstacle.y === y){
      return true;
    }
  }
  return false;
}

//from blerf game, if the conditions are met, able to move
function canMoveTo(x, y) {
  if (!isCoordinateInGrid(x, y)) {
    return false;
  }
  if (isThereAnObstacleAt(x, y)) {
    return false;
  }
  return true;
}

//checks to see if players have a weapon
function doesPlayer1HaveWeapon(){
  if (player1.weapon === undefined){
    return false;
  }
  else {
    return true;
  }
}

function doesPlayer2HaveWeapon(){
  if (player2.weapon === undefined){
    return false;
  }
  else {
    return true;
  }
}

//when reaching for a weapon, the different conditions
function player1Weapon(x, y){
  if (!doesPlayer1HaveWeapon()){
    if (rock.x === x && rock.y === y) {
      $player1.classList.add('player1WithRock');
      $rock.remove();
      player1.weapon = 'Rock';
      rock.x = -6;
      rock.y = -1;
    }
    else if (paper.x === x && paper.y === y) {
      $player1.classList.add('player1WithPaper');
      $paper.remove();
      player1.weapon = 'Paper';
      paper.x = -6;
      paper.y = -3;
    }
    else if (scissor.x === x && scissor.y === y) {
      $player1.classList.add('player1WithScissor');
      $scissor.remove();
      player1.weapon = 'Scissor';
      scissor.x = -6;
      scissor.y = -5;
    }
  }
  else if (doesPlayer1HaveWeapon()){
    // swaps scissor with rock only if he has scissor
   if (rock.x === x && rock.y === y) {
      if (player1ClassList[2] === 'player1WithScissor'){
        $player1.classList.remove('player1WithScissor');
        $player1.classList.add('player1WithRock');
        $rock.remove();
        $gameBoard.appendChild($scissor);
        player1.weapon = 'Rock';
        rock.x = -6;
        rock.y = -1;
        scissor.x = 6;
        scissor.y = 5;
      }

      else if (player1ClassList[2] === 'player1WithPaper'){
        $player1.classList.remove('player1WithPaper');
        $player1.classList.add('player1WithRock');
        $rock.remove();
        $gameBoard.appendChild($paper);
        player1.weapon = 'Rock';
        rock.x = -6;
        rock.y = -1;
        paper.x = 6;
        paper.y = 3;
      }
    }
    else if (paper.x === x && paper.y === y) {
      if (player1ClassList[2] === 'player1WithScissor'){
        $player1.classList.remove('player1WithScissor');
        $player1.classList.add('player1WithPaper');
        $paper.remove();
        $gameBoard.appendChild($scissor);
        player1.weapon = 'Paper';
        paper.x = -6;
        paper.y = -3;
        scissor.x = 6;
        scissor.y = 5;
      }
      else if (player1ClassList[2] === 'player1WithRock'){
        $player1.classList.remove('player1WithRock');
        $player1.classList.add('player1WithPaper');
        $paper.remove();
        $gameBoard.appendChild($rock);
        player1.weapon = 'Paper';
        rock.x = 6;
        rock.y = 1;
        paper.x = -6;
        paper.y = -3;
      }
    }
    else if (scissor.x === x && scissor.y === y) {
      if (player1ClassList[2] === 'player1WithRock'){
        $player1.classList.remove('player1WithRock');
        $player1.classList.add('player1WithScissor');
        $scissor.remove();
        $gameBoard.appendChild($rock);
        player1.weapon = 'Scissor';
        rock.x = 6;
        rock.y = 1;
        scissor.x = -6;
        scissor.y = -5;
      }
      else if (player1ClassList[2] === 'player1WithPaper'){
        $player1.classList.remove('player1WithPaper');
        $player1.classList.add('player1WithScissor');
        $scissor.remove();
        $gameBoard.appendChild($paper);
        player1.weapon = 'Scissor';
        scissor.x = -6;
        scissor.y = -5;
        paper.x = 6;
        paper.y = 3;
      }
    }
  }
}

//if player 2 doesn't have a weapon, he will pick up according to grid
function player2Weapon(x, y){
  if (!doesPlayer2HaveWeapon()){
    if (rock.x === x && rock.y === y) {
      $player2.classList.add('player2WithRock');
      $rock.remove();
      player2.weapon = 'Rock';
      rock.x = -6;
      rock.y = -1;
    }
    else if (paper.x === x && paper.y === y) {
      $player2.classList.add('player2WithPaper');
      $paper.remove();
      player2.weapon = 'Paper';
      paper.x = -6;
      paper.y = -3;
    }
    else if (scissor.x === x && scissor.y === y) {
      $player2.classList.add('player2WithScissor');
      $scissor.remove();
      player2.weapon = 'Scissor';
      scissor.x = -6;
      scissor.y = -5;
    }
  }
  //if player 2 does have a weapon, run through these lines
  else if (doesPlayer2HaveWeapon()){
    //when player 2 reaches the rocks according
   if (rock.x === x && rock.y === y) {
      //if player 2 has scissors, it will be replaced with rock
      if (player2ClassList[2] === 'player2WithScissor'){
        $player2.classList.remove('player2WithScissor');
        $player2.classList.add('player2WithRock');
        $rock.remove();
        $gameBoard.appendChild($scissor);
        player2.weapon = 'Rock';
        rock.x = -6;
        rock.y = -1;
        scissor.x = 6;
        scissor.y = 5;
      }
      else if (player2ClassList[2] === 'player2WithPaper'){
        $player2.classList.remove('player2WithPaper');
        $player2.classList.add('player2WithRock');
        $rock.remove();
        $gameBoard.appendChild($paper);
        player2.weapon = 'Rock';
        rock.x = -6;
        rock.y = -1;
        paper.x = 6;
        paper.y = 3;
      }
    }
    else if (paper.x === x && paper.y === y) {
      if (player2ClassList[2] === 'player2WithScissor'){
        $player2.classList.remove('player2WithScissor');
        $player2.classList.add('player2WithPaper');
        $paper.remove();
        $gameBoard.appendChild($scissor);
        player2.weapon = 'Paper';
        paper.x = -6;
        paper.y = -3;
        scissor.x = 6;
        scissor.y = 5;
      }
      else if (player2ClassList[2] === 'player2WithRock'){
        console.log('iwork ')
        $player2.classList.remove('player2WithRock');
        $player2.classList.add('player2WithPaper');
        $paper.remove();
        $gameBoard.appendChild($rock);
        player2.weapon = 'Paper';
        rock.x = 6;
        rock.y = 1;
        paper.x = -6;
        paper.y = -3;
      }
    }
    else if (scissor.x === x && scissor.y === y) {
      if (player2ClassList[2] === 'player2WithRock'){
        $player2.classList.remove('player2WithRock');
        $player2.classList.add('player2WithScissor');
        $scissor.remove();
        $gameBoard.appendChild($rock);
        player2.weapon = 'Scissor';
        rock.x = 6;
        rock.y = 1;
        scissor.x = -6;
        scissor.y = -5;
      }
      else if (player2ClassList[2] === 'player2WithPaper'){
        $player2.classList.remove('player2WithPaper');
        $player2.classList.add('player2WithScissor');
        $scissor.remove();
        $gameBoard.appendChild($paper);
        player2.weapon = 'Scissor';
        scissor.x = -6;
        scissor.y = -5;
        paper.x = 6;
        paper.y = 3;
      }
    }
  }
}

//the win condition on the rock paper scissor logic
function checkWin(){
  if($player1.style.left === $player2.style.left && $player1.style.top === $player2.style.top){
    gameOver = true;
    const $winner = document.querySelector('.winner');
    if (player1.weapon === 'Rock' && player2.weapon === 'Scissor'){
      $player2.remove();
      $winner.innerHTML = 'Player 1 wins!';
    }
    else if (player1.weapon === 'Rock' && player2.weapon === 'Paper'){
      $player1.remove();
      $winner.innerHTML = 'Player 2 wins!';
    }
    else if (player1.weapon === 'Scissor' && player2.weapon === 'Paper'){
      $player2.remove();
      $winner.innerHTML = 'Player 1 wins!';
    }
    else if (player1.weapon === 'Scissor' && player2.weapon === 'Rock'){
      $player1.remove();
      $winner.innerHTML = 'Player 2 wins!';
    }        
    else if (player1.weapon === 'Paper' && player2.weapon === 'Rock'){
      $player2.remove();
      $winner.innerHTML = 'Player 1 wins!';
    }    
    else if (player1.weapon === 'Paper' && player2.weapon === 'Scissor'){
      $player1.remove();
      $winner.innerHTML = 'Player 2 wins!';
    } 
    else if (typeof(player1.weapon) == 'string' && typeof(player2.weapon) == 'undefined'){
      $player2.remove();
      $winner.innerHTML = 'Player 1 wins!';
    }  
    else if (typeof(player1.weapon) == 'undefined' && typeof(player2.weapon) == 'string'){
      $player1.remove();
      $winner.innerHTML = 'Player 2 wins!';
    }
    else {
      $player1.remove();
      $player2.remove();
      $winner.innerHTML = 'Both lose!'
    } 
    document.querySelector('.winnerScreen').style.zIndex = '1';
  }
}

//utilizing the x,y from the player object, moves them accordingly in CSS
//also with responsive styling
const movePlayer1To = (x, y) => {
  if ($gameBoardWidth === 975){
    $player1.style.left = (player1.x * 75).toString() + 'px';
    $player1.style.top = (player1.y * 75).toString() + 'px';
    player1Weapon(x, y);
    checkWin();
  }
  else {
    $player1.style.left = (player1.x * 50).toString() + 'px';
    $player1.style.top = (player1.y * 50).toString() + 'px';
    player1Weapon(x, y);
    checkWin();
  }
}

const movePlayer2To = (x, y) => {
  if ($gameBoardWidth === 975){
    $player2.style.left = (player2.x * 75).toString() + 'px';
    $player2.style.top = (player2.y * 75).toString() + 'px';
    player2Weapon(x, y);
    checkWin(); 
  }
  else {
  $player2.style.left = (player2.x * 50).toString() + 'px';
  $player2.style.top = (player2.y * 50).toString() + 'px';
  player2Weapon(x, y);
  checkWin();
  }
}

//movement for both characters depending on the keyCode
movePlayer1Up = () => {
  if (canMoveTo(player1.x, player1.y - 1)) {
    player1.y -= 1;
    movePlayer1To(player1.x, player1.y)
  } 
}

movePlayer1Down = () => {
  if (canMoveTo(player1.x, player1.y + 1)) {
    player1.y += 1;
    movePlayer1To(player1.x, player1.y)
  } 
}

movePlayer1Left = () => {
  if (canMoveTo(player1.x - 1, player1.y)) {
    player1.x -= 1;
    movePlayer1To(player1.x, player1.y)
  } 
}

movePlayer1Right = () => {
  if (canMoveTo(player1.x + 1, player1.y)) {
    player1.x += 1;
    movePlayer1To(player1.x, player1.y)
  }
}

movePlayer2Up = () => {
  if (canMoveTo(player2.x, player2.y - 1)) {
    player2.y -= 1;
    movePlayer2To(player2.x, player2.y)
  } 
}

movePlayer2Down = () => {
  if (canMoveTo(player2.x, player2.y + 1)) {
    player2.y += 1;
    movePlayer2To(player2.x, player2.y)
  } 
}

movePlayer2Left = () => {
  if (canMoveTo(player2.x - 1, player2.y)) {
    player2.x -= 1;
    movePlayer2To(player2.x, player2.y)
  } 
}

movePlayer2Right = () => {
  if (canMoveTo(player2.x + 1, player2.y)) {
    player2.x += 1;
    movePlayer2To(player2.x, player2.y)
  }
}

document.body.addEventListener('keydown', evt => {
  const keyCode = evt.keyCode;
  if([37, 38, 39, 40, 65, 68, 83, 87].includes(keyCode)) {
    evt.preventDefault();
  }
  if (gameOver) return;

  switch (keyCode) {
    case 37:
      movePlayer2Left();
    break;
    case 38:
      movePlayer2Up();
    break;
    case 39:
      movePlayer2Right();
    break;
    case 40:
      movePlayer2Down();
    break;
    case 65:
      movePlayer1Left();
    break;
    case 68:
      movePlayer1Right();
    break;
    case 83:
      movePlayer1Down();
    break;
    case 87:
      movePlayer1Up();
    break;
  }
});

const landingModal = document.body.querySelector('.landingModal');
landingModal.onclick = function () {
  landingModal.style.display = 'none';
  gameOver = false;
}

const playAgain = document.querySelector('.playAgain');
playAgain.onclick = function (){
  location.reload();
}