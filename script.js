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
        const updateDisplay = (symbol,index) => {
            $('#'+index).text(symbol);
        }
        return {updateDisplay};
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
                console.log(currentPlayer());
                isOver = true;
            }else if(round === 8 && !isOver){
                isOver = true;
                console.log('draw');
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
            .some((row) => row.every(
                (element) => gameBoard.getField(element) === currentPlayer()
            ));    
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
});
