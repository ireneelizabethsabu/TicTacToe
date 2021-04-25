$(document).ready(function () {
    
    const player = (symbol) => {
        return {symbol};
    }
    
    const gameBoard = (() => {
        let board = ['','','','','','','','',''];

        const setField = (symbol,index) => {
            if(index >= 9) return;
            board[index] = symbol;
            displayController.updateDisplay(symbol,index+"");
        }

        const getField = (index) => {
            if(index < 9) 
                return board[index];
        }
        return {setField,getField};
    })();

    const displayController = (() => {
        const displayWinner = (winnerText) => {
            $(this).delay(2000).queue(() => {
                $('.table').addClass('winner-display');
                let winner = $(`<div class="winner-text typewriter">${winnerText}</div>`).hide().fadeIn(100);
                $('body').append(winner);
                $('body').append(`<button class="btn btn-outline-secondary play-again-btn">Play Again ?</button>`);
            });
            
        }
        const updateDisplay = (symbol,index) => {
            $('#'+index).text(symbol);
        }
        return {updateDisplay,displayWinner};
    })();

    const gameController = (() => {
        let playerX = player('X');
        let playerO = player('O');
        let round = 0;
        let isOver = false;

        const playRound = (index) =>{
            if(gameBoard.getField(index) === '' && !isOver){
                gameBoard.setField(currentPlayer(),index);   
            }
            if(checkWinner(index)) {
                displayController.displayWinner('The Winner is ' + currentPlayer());
                console.log(currentPlayer());
                isOver = true;
            }else if(round === 8 && !isOver){
                isOver = true;
                displayController.displayWinner('DRAW');
                return;
            }   
            round++;
        }
        const checkWinner = (index) => {
            let possibleWin = [[0,1,2],
                            [3,4,5],
                            [6,7,8],
                            [0,3,6],
                            [1,4,7],
                            [2,5,8],
                            [0,4,8],
                            [2,4,6]
                        ];
            return possibleWin.filter((rows) => rows.includes(index))
            .some((row) => {
                if(row.every((element) => gameBoard.getField(element) === currentPlayer())){
                    row.forEach(cell => $('#'+cell).css("background-color",'rgb(82 193 133)'));
                    return true;
                }
            });   
        }

        const currentPlayer = () => {
            return round%2===0 ? playerX.symbol : playerO.symbol;
        }
        return {currentPlayer,playRound};
    })();
    
    $(document).on("click", "#board td", function(e) {
            var data = $(this).attr('id');           
            gameController.playRound(parseInt(data));
    });

    $(document).on("click", ".play-again-btn", function(e) {
        history.go(0)
    });

});
