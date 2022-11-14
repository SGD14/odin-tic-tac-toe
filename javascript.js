const game = (() => {
    const board = [];

    const createPlayer = (playerName, playerSymbol) => {
        let name = playerName;
        const symbol = playerSymbol;

        return {name, symbol};
    }

    const player1 = createPlayer("Player 1", "O");
    const player2 = createPlayer("Player 2", "X");

    let currentPlayer = player1;
    let winner = undefined;
    let gameState = "playing";

    const addNextMark = (position) => {
        if(gameState !== "playing" || board[position])
            return;

        board[position] = currentPlayer;

        currentPlayer = currentPlayer === player1 ? player2 : player1;

        checkEnd();
    }

    const checkEnd = () => {
        const cellGroups = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        const winGroup = cellGroups.find(cellGroup => board[cellGroup[0]] && board[cellGroup[0]] === board[cellGroup[1]] && board[cellGroup[1]] === board[cellGroup[2]])

        if(winGroup) {
            winner = board[winGroup[0]];
            gameState = "ended";
            return;
        }

        if(board.length >= 9 && !board.includes(undefined))
            gameState = "ended";
    }

    return {board, player1, player2, currentPlayer, addNextMark, winner};
})();

const renderGame = () => {
    const boardCells = document.querySelectorAll(".board > div");

    boardCells.forEach((cell, index) => {
        const cellPlayer = game.board[index];

        cell.innerHTML = cellPlayer ? cellPlayer.symbol : '';
    })
}

document.querySelectorAll(".board > div").forEach((cell, index) => {
    cell.addEventListener('click', (event) => {
        game.addNextMark(index);
        renderGame();
    });
});