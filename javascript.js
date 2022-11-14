const game = (() => {
    const board = [];

    const createPlayer = (playerName, playerSymbol) => {
        let name = playerName;

        const symbol = playerSymbol;

        const getName = () => name;
        const setName = (newName) => name = newName;

        return {getName, setName, symbol};
    }

    const player1 = createPlayer("Player 1", "O");
    const player2 = createPlayer("Player 2", "X");

    let currentPlayer = player1;

    const addNextMark = (position) => {
        if(board[position])
            return;

        board[position] = currentPlayer;

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    return {board, player1, player2, currentPlayer, addNextMark};
})();

const renderBoard = () => {
    const boardCells = document.querySelectorAll(".board > div");

    boardCells.forEach((cell, index) => {
        const cellPlayer = game.board[index];

        cell.innerHTML = cellPlayer ? cellPlayer.symbol : '';
    })
}

document.querySelectorAll(".board > div").forEach((cell, index) => {
    cell.addEventListener('click', (event) => {
        game.addNextMark(index);
        renderBoard();
    });
});