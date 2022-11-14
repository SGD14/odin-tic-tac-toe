const game = (() => {
    let board = [];

    const getBoard = () => board;

    const createPlayer = (playerName, playerSymbol) => {
        let name = playerName;
        const getName = () => name;
        const setName = (newName) => name = newName;
        const symbol = playerSymbol;

        return {getName, setName, symbol};
    }

    const player1 = createPlayer("Player 1", "O");
    const player2 = createPlayer("Player 2", "X");

    let currentPlayer = player1;
    const getCurrentPlayer = () => currentPlayer;

    let winner = undefined;
    const getWinner = () => winner;

    let gameState = "playing";
    const getGameState = () => gameState;

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

    const reset = () => {
        board = [];
        currentPlayer = player1;
        winner = undefined;
        gameState = "playing";
    }

    return {getBoard, player1, player2, getCurrentPlayer, getGameState, addNextMark, getWinner, reset};
})();

const renderGame = () => {
    const boardCells = document.querySelectorAll(".board > div");

    boardCells.forEach((cell, index) => {
        const cellPlayer = game.getBoard()[index];

        cell.innerHTML = cellPlayer ? cellPlayer.symbol : '';
    });

    if(game.getGameState() === "ended") {
        if(game.getWinner())
            document.querySelector("#info-text").innerHTML = "The winner is " + game.getWinner().getName() + "!";
        else
            document.querySelector("#info-text").innerHTML = "The game ended in tie!";
    } else {
        document.querySelector("#info-text").innerHTML = "";
    }
}

document.querySelector("#player-1-name").value = "Player 1";
document.querySelector("#player-2-name").value = "Player 2";

document.querySelectorAll(".board > div").forEach((cell, index) => {
    cell.addEventListener('click', (event) => {
        game.addNextMark(index);
        renderGame();
    });
});

document.querySelector("#reset-button").addEventListener("click", event => {
    game.reset();
    renderGame();
});

document.querySelector("#player-1-name").addEventListener("input", event => {
    game.player1.setName(event.target.value);
    renderGame();
})

document.querySelector("#player-2-name").addEventListener("input", event => {
    game.player2.setName(event.target.value);
    renderGame();
})