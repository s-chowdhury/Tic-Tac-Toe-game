let turnPlay = new Audio("turnPlay.mp3");
let gamePlay = new Audio("gamePlay.mp3");
let save = document.querySelector('.btnSave');
let reset = document.querySelector('.btn');
let gameWin = false;
let gameDraw=false;
let turn = "X";
save.addEventListener('click', () => {
    document.getElementById('Player1').disabled = true;
    document.getElementById('Player2').disabled = true;
    document.getElementsByClassName('info')[0].innerText = 'This is turn of ' + document.getElementById('Player1').value;
})
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
}
function checkWin() {
    let boxTexts = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach(e => {
        if ((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[2]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[0]].innerText !== '')) {
            if (boxTexts[e[0]].innerText === 'X') {
                document.getElementsByClassName('info')[0].innerText = 'Congratution ' + document.getElementById('Player1').value + '! you win the game';
                gameWin = true;
            }
            if (boxTexts[e[0]].innerText === 'O') {
                document.getElementsByClassName('info')[0].innerText = 'Congratution ' + document.getElementById('Player2').value + '! you win the game';
                gameWin = true;
            }
            document.getElementById('img').classList = "active";
            gamePlay.play();
        }
    })
}
function testDraw(){
    let boxtext = document.querySelectorAll('.boxText');
    let j=0;
    Array.from(boxtext).forEach(element => {
        if(element.innerText === ""){
           j++
        }
    })  
    if((j==0)&&(!gameWin)) return true;
    else return false;
}



let boxs = document.getElementsByClassName('box');
Array.from(boxs).forEach(element => {
    let boxText = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            checkWin();
            gameDraw=testDraw();
            if ((!gameWin)&&(!gameDraw)) {
                if (turn === 'X') {
                    document.getElementsByClassName('info')[0].innerText = 'This is turn of ' + document.getElementById('Player2').value;
                }
                if (turn === 'O') {
                    document.getElementsByClassName('info')[0].innerText = 'This is turn of ' + document.getElementById('Player1').value;
                }
            }
            turn = changeTurn();
            turnPlay.play();
        }
        if (gameDraw) {
            document.getElementsByClassName('info')[0].innerText="It's a draw! You both played so well that we can't decide a winner";
            document.getElementById('img1').classList = "active";
            gamePlay.play();
        }
    })
})
reset.addEventListener('click', () => {
    gameWin = false;
    turn="X";
    document.getElementById('Player1').disabled = false;
    document.getElementById('Player2').disabled = false;
    document.getElementById('Player1').value = "";
    document.getElementById('Player2').value = "";
    let boxtext = document.querySelectorAll('.boxText');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    })
    document.getElementById('img').classList = "";
    document.getElementById('img1').classList = "";
    gamePlay.pause();
    document.getElementsByClassName('info')[0].innerText = "";
})