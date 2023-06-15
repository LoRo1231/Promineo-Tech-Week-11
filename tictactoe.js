const gameBoard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');

let go = 'x';
infoDisplay.textContent = 'X Goes First';

/* startign with empty gameboard cells - 9 total for availible spaces to play */
const startCells = [
    " ", " ", " ", " ", " ", " ", " ", " ", " ", 
];

/* for each of our open placeholder spaces, we want to create an element that is a div */
function createBoard(){
    startCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        /* we want to establish a class for each "box" that is created  - this will be in CSS */
        cellElement.classList.add('square');
        /* assigns an id to each cell element */
        cellElement.id = index;
        /* we need something to happen when clicking on the cell, so event listener is waiting for the click,
        then preforming a function that I'm calling addGo -> will write function later */
        cellElement.addEventListener('click', addGo);
        /* now we need to add to the gameboard */
        gameBoard.append(cellElement);
    })
}

createBoard();

/* going to add X or O if nothing is there yet - e is for event. So once the event occurs (clicking the cell)
then it will display what is passed in using th class list to call on what our circle looks like */
function addGo(e){
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    /* ? will change the output if statement is true - otherwise returns same vaule */
    go = go === 'x' ? 'circle' : 'x';
    infoDisplay.textContent = `it is now ${go}'s turn`;
    /* removing event listener will keep you from clicking on a square twice */
    e.target.removeEventListener('click', addGo);
    checkScore();
}

function checkScore(){
    /*each time we call the function, we need to look at all thje squares since position of O or X will always change */
    const allSquares = document.querySelectorAll('.square');
    const winningCombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8], 
        [0,3,6],
        [2,5,8],
        [1,4,7],
        [0,4,8],
        [2,4,6]
    ]

    /* going into each array, and looking at each cell, passing it in & seeing if it has a child element & is it circle?
    if so, then it is in facta winning combo */
    winningCombo.forEach(array => {
       const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('circle'));
        if (circleWins) {
            infoDisplay.textContent = "Circle WINS!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    }) 

    winningCombo.forEach(array => {
        const xWins = array.every(cell => allSquares[cell].firstChild?.classList.contains('x'));
         if (xWins) {
             infoDisplay.textContent = "X WINS!";
             allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
             return;
         }
     }) 

} 

const replayButton = document.getElementById('replay').addEventListener('click', replay);


/* not clearing game board */
function replay() {
    document.getElementsByClassName('square').removeChildren;
    
    infoDisplay.textContent = "X Goes First!"
    }