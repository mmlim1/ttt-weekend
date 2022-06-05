/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board //state of the sqaures on the board
let turn //track whose turn it is
let winner //represent if anyone has won yet, or if a tie has occured


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.board-div')
const messageEl = document.querySelector('h2')
const resetBtnEl = document.querySelector('button')
console.log(messageEl.textContent)



/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {
  square.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)



/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1 //represents player X
  winner = null
  render()

}

function render() {
  board.forEach(function(element, index) {
    if (board[index] === 1) {
      squareEls[index].textContent = 'x'
    } else if (board[index] === -1) {
      squareEls[index].textContent = 'o'
    } else if (board[index] === null) {
      squareEls[index].textContent = ''
    }
  })
    
  if (winner === null) {
    messageEl.textContent = `It is ${turn === 1 ? 'X' : 'O'}'s turn!`
  } else if (winner === 'T') {
    messageEl.textContent = `It's a tie!`
  } else if (winner === 1 || winner === -1) {
    messageEl.textContent = `Player ${winner === 1 ? 'X' : 'O'} won!`
  }
} 

function handleClick(evt) {
  const sqIdx = parseInt(evt.target.id.slice(2))
  if (board[sqIdx] !== null || winner !== null) {
    return
  } 
  board[sqIdx] = turn
  turn = turn * -1 
  getWinner()
  render()

}

function getWinner() {  
  for (let i=0; i < winningCombos.length; i++) {
      let sum = board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]
      console.log(sum)
      if (sum === 3) {
        winner = 1  
        return
      } else  if (sum === -3) {
        winner = -1
        return
      } else if (board.includes(null) === false) {
        winner = 'T'
        return
      } else {
        winner = null
      } 
    
  }
}
