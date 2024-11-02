document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetBtn = document.getElementById("reset-btn");
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function updateStatusColor() {
        if (currentPlayer === "X") {
            statusText.style.backgroundColor = "green"; // Green for X's turn
            statusText.style.color = "white";
        } else {
            statusText.style.backgroundColor = "#ecff6f"; // White for O's turn
            statusText.style.color = "black";
        }
    }

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                statusText.textContent = `${currentPlayer} wins!`;
                isGameActive = false;
                statusText.style.backgroundColor = "purple"; // Set final background color when game ends
                return ;
            }
        }
        if (!board.includes("")) {
            statusText.textContent = "It's a tie!";
            isGameActive = false;
            statusText.style.backgroundColor = "red"; // Set final background color when game ends
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (board[index] || !isGameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (isGameActive) {
            statusText.textContent = `Player ${currentPlayer}'s turn`;
            updateStatusColor();
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameActive = true;
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        updateStatusColor();
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetBtn.addEventListener("click", resetGame);

    statusText.textContent = `Player ${currentPlayer}'s turn`;
    updateStatusColor(); // Initialize status color at start
});
