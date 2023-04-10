const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

//generatefield
function generateField() {
  const field = new Array(row).fill().map(() => new Array(col).fill(fieldCharacter));
  field[0][0] = pathCharacter;

  let hatPlaced = false;
  let holeCount = 0;

  while (!hatPlaced) {
    const randomRow = Math.floor(Math.random() * row);
    const randomCol = Math.floor(Math.random() * col);
    if (field[randomRow][randomCol] === fieldCharacter) {
      field[randomRow][randomCol] = hat;
      hatPlaced = true;
    }
  }    //end of while loop

  while (holeCount < (row * col) / 4) {
    const randomRow = Math.floor(Math.random() * row);
    const randomCol = Math.floor(Math.random() * col);
    if (field[randomRow][randomCol] === fieldCharacter) {
      field[randomRow][randomCol] = hole;
      holeCount++;
    }
  }

  return field;
}  //End of function

function printField(field) {
  for (let i = 0; i < row; i++) {
    console.log(field[i].join(''));
  }
}  // end of function

function getUserInput() {
  const input = prompt('Which way? ');
  if (input === 'u' || input === 'U' || input === 'd' || input === 'D' ||
      input === 'l' || input === 'L' || input === 'r' || input === 'R') {
    return input.toLowerCase();
  } else {
    console.log('Enter (u, d, l or r)');
    return getUserInput();
  }
} //end of function

function movePlayer(field, direction, currentPosition) {
  const newRow = currentPosition[0] + (direction === 'd' ? 1 : direction === 'u' ? -1 : 0);
  const newCol = currentPosition[1] + (direction === 'r' ? 1 : direction === 'l' ? -1 : 0);

  if (newRow < 0 || newRow >= row || newCol < 0 || newCol >= col) {
    console.log('Out of bounds - Game Over!');
    return false;
  } else if (field[newRow][newCol] === hat) {
    console.log('Congratulations, you found your hat!');
    return true;
  } else if (field[newRow][newCol] === hole) {
    console.log('Sorry, you fell down a hole!');
    return false;
  } else {
    field[currentPosition[0]][currentPosition[1]] = fieldCharacter;
    field[newRow][newCol] = pathCharacter;
    return [newRow, newCol];
  }
}   //end  of function

function runGame() {
  let field = generateField();
  let currentPosition = [0, 0];
  let gameOver = false;

  while (!gameOver) {
    clear();
    printField(field);
    const direction = getUserInput();
    const result = movePlayer(field, direction, currentPosition);
    if (result === true) {
      console.log('You Win!');
      gameOver = true;
    } else if (result === false) {
      console.log('Game Over!');
      gameOver = true;
    } else {
      currentPosition = result;
    }
  }
}

runGame();
