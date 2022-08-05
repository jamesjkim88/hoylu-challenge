/**
 * B-I-N-G-O
 *
 * A Bingo card contain 25 squares arranged in a 5x5 grid (five columns
 * and five rows). Each space in the grid contains a number between 1
 * and 75. The center space is marked "FREE" and is automatically filled.
 *
 * As the game is played, numbers are drawn. If the player's card has
 * that number, that space on the grid is filled.
 *
 * A player wins BINGO by completing a row, column, or diagonal of filled
 * spaces.
 *
 * Your job is to complete the function that takes a bingo card and array
 * of drawn numbers and return 'true' if that card has achieved a win.
 *
 * A bingo card will be 25 element array. With the string 'FREE' as the
 * center element (index 12). Although developers are unscrupulous, they
 * will pass valid data to your function.
 */

 function checkForBingo (bingoCard, drawnNumbers) {
  // this code for debug purposes, you can remove.
  console.log('Drawn Numbers: ' + JSON.stringify(drawnNumbers));

  // delcaring winner as false by default;
  let winner = false;

  // indexes winning slots from bingoCard
  const winningSlotIndex = [
    // diagnol slots of index
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
    // column slots of index
    [0, 1, 2, 3 , 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // row slots of index
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
  ];

  // empty array to store index of winning numbers drawn
  const winningSlotArr = [];

  // index of the FREE spot for the board
  const freeIndex = 12;

  for (let i=0, len=bingoCard.length; i<len; i++) {
    let row = Math.floor(i/5);
    let col = i % 5;
    // console.log(`${row},${col}: ${bingoCard[i]}`);
  }

  // looping through the drawnNumbers array to create new array of drawn number indexes
  for(let i = 0; i < drawnNumbers.length; i++){
    // checks if drawn number has a FREE space 
    if(drawnNumbers.length === 4){
      // if length is 4, push the indexes to winningSlotArr
      winningSlotArr.push(bingoCard.indexOf(drawnNumbers[i]));
    }else{
      // pushing rest of the 5 indexes into new array
      winningSlotArr.push(bingoCard.indexOf(drawnNumbers[i]))
    }
  }

  // pushing the index of the FREE slot from bingoCard
  if(drawnNumbers.length === 4){
    winningSlotArr.push(freeIndex);
    // sorting the array into numerical order least to great
    winningSlotArr.sort((a, b) => {
      return a - b;
    });
  }

  // looping through array to check if winningSlotArr matches with any of the array elements in winningSlotIndex
  for (let i = 0; i < winningSlotIndex.length; i++) {
    if(winningSlotIndex[i].equals(winningSlotArr) || winningSlotIndex[i].equals(winningSlotArr.reverse())){
      winner = true;
    }
  }

  return winner;
}

// custom array method to compare arrays
// example: [1,2,3] === [1,2,3] is true : [1,2,3] === [3,2,1] is false
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
      return false;

  // compare lengths - can save a lot of time 
  if (this.length != array.length)
      return false;

  for (var i = 0, l=this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
          // recurse into the nested arrays
          if (!this[i].equals(array[i]))
              return false;       
      }           
      else if (this[i] != array[i]) { 
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;   
      }           
  }       
  return true;
}



module.exports = checkForBingo;

// here are some samples

// this should return true with diagonal + free
checkForBingo(
  [
    8, 29, 35, 54, 65,
    13, 24, 44, 48, 67,
    9, 21, 'FREE', 59, 63,
    7, 19, 34, 53, 61,
    1, 20, 33, 46, 72
  ],
  [
    8, 24, 53, 72
  ]
);

// //this should return false
checkForBingo(
  [
   8, 29, 35, 54, 65,
   13, 24, 44, 48, 67,
   9, 21, 'FREE', 59, 63,
   7, 19, 34, 53, 61,
   1, 20, 33, 46, 72
  ],
  [
    1, 33, 53, 65, 29, 75
  ]
);