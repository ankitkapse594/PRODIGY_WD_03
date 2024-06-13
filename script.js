document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('resetButton');
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  const handleCellClick = (e) => {
      const cell = e.target;
      const index = parseInt(cell.getAttribute('data-index'));

      if (board[index] !== '' || !gameActive) return;

      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWinner()) {
          message.textContent = `${currentPlayer} wins!`;
          gameActive = false;
      } else if (board.includes('')) {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      } else {
          message.textContent = 'Draw!';
          gameActive = false;
      }
  };

  const checkWinner = () => {
      return winningConditions.some(condition => {
          return condition.every(index => board[index] === currentPlayer);
      });
  };

  const resetGame = () => {
      board = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => cell.textContent = '');
      currentPlayer = 'X';
      gameActive = true;
      message.textContent = '';
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
});
