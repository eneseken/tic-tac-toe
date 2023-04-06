const board = [null, null, null, null, null, null, null, null, null];
let player = "x";

function render() {
	for (let i = 0; i < board.length; i++) {
		const cell = document.getElementById(i.toString());
		cell.classList.remove("x", "o");
		if (board[i] === "x") {
			cell.classList.add("x");
		} else if (board[i] === "o") {
			cell.classList.add("o");
		}
	}
}

function checkWin() {
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winConditions.length; i++) {
		const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    
    return null;
}
function handleClick(event) {
    const id = event.target.id;
    if (!board[id]) {
    board[id] = player;
    if (player === "x") {
    player = "o";
    } else {
    player = "x";
    }
    render();
    const winner = checkWin();
    if (winner) {
    alert(winner + " wins!");
    reset();
    } else if (!board.includes(null)) {
    alert("Tie game!");
    reset();
    }
    }
    }
    
    function reset() {
    for (let i = 0; i < board.length; i++) {
    board[i] = null;
    }
    player = "x";
    render();
    }
    
    document.querySelectorAll("td").forEach((cell) => {
    cell.addEventListener("click", handleClick);
    });
    
    render();

    function handleClick(event) {
        const id = event.target.id;
        if (!board[id]) {
            board[id] = player;
            render();
            const winner = checkWin();
            if (winner) {
                alert(winner + " wins!");
                reset();
            } else if (!board.includes(null)) {
                alert("Tie game!");
                reset();
            } else {
                if (player === "x") {
                    player = "o";
                    setTimeout(() => {
                        const emptyCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
                        const randomIndex = Math.floor(Math.random() * emptyCells.length);
                        const aiMove = emptyCells[randomIndex];
                        board[aiMove] = player;
                        render();
                        const aiWinner = checkWin();
                        if (aiWinner) {
                            alert(aiWinner + " wins!");
                            reset();
                        } else if (!board.includes(null)) {
                            alert("Tie game!");
                            reset();
                        } else {
                            player = "x";
                        }
                    }, 1000);
                }
            }
        }
    }

