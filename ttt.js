let board=[
    ["X","-","-"],
    ["-","-","-"],
    ["-","-","-"]
];

const opponent = "X";
const player="O";

const evaluate = (b) => {
    
    for(let row=0;row<3;row++){
        if( b[row][0] == b[row][1] && b[row][0] == b[row][2] ){

            if(b[row][0] == player){
                return 10;
            }
            else if(b[row][0]==opponent){
                return -10;
            }
        }
    }

    for(let col=0;col<3;col++){
        if( b[0][col] == b[1][col] && b[1][col] == b[2][col] ){
            if( b[0][col] == player){
                return 10;
            }
            else if (b[0][col] == opponent){
                return -10;
            }
        }
    }

    if(b[0][0] == b[1][1] && b[1][1] == b[2][2]){
        if(b[0][0] == player){
            return 10;
        }
        else if (b[0][0] == opponent){
            return -10;
        }
    }
    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
        if (b[0][2] == player) {
            return 10;
        } else if (b[0][2] == opponent) {
            return -10;
        }
    }
    return 0;
}

const movesLeft = (b) => {
    for(let row=0;row<3;row++){
        for(let col=0;col<3;col++){
            if(board[row][col] == "-"){
                return true;
            }
        }
    }
    return false;
}

const miniMax = (board,depth,isMax) =>{

    const score = evaluate(board);
    if ( score == 10 ){
        return 10;
    }
    if ( score == -10 ){
        return -10;
    }

    if( movesLeft(board) == false){
        return 0;
    }

    if(isMax){

        let best =-Infinity;

        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                if( board[row][col] == "-" ){

                    board[row][col] = player;

                    best = Math.max(best,miniMax(board,depth+1,!isMax));

                    board[row][col] = "-";
                }
            }
        }
        return best;
    }
    else{
        let best = Infinity;

        for(let row = 0;row<3;row++){
            for(let col=0;col<3;col++){
                if( board[row][col] == "-"){

                    board[row][col] = opponent;

                    best = Math.min(best,miniMax(board,depth+1,!isMax));

                    board[row][col] = "-";

                }
            }
        }
        return best;
    }
}

const findBestMove = (board) => {
    let bestMove = {
                    score:-Infinity,
                    row:-1,
                    col:-1
                };
    for(let row=0;row<3;row++){
        for(let col=0;col<3;col++){
            if(board[row][col] == "-"){

                board[row][col] = player;

                let value = miniMax(board,0,false);

                board[row][col] = "-";

                if(bestMove.score < value){

                    bestMove.row = row;
                    bestMove.col = col;
                    bestMove.score = value;
                }

            }
        }
    }
    console.log(board);
    console.log(bestMove);
    return bestMove;
}

let bestMove = findBestMove(board);
board[bestMove.row][bestMove.col] = player;
console.log(board);


console.log(evaluate(board));