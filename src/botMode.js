import logo from './logo.png';
import './App.css';
import { useState } from 'react';

function Square({value,onsclick}) {
  return <button className="square" onClick={onsclick}>
     {value}
  </button>;
}

function App() {
  const [Xnext,setXnext] = useState(true);
  const [squares,setSquares] = useState(Array(9).fill(null));

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function minimax(squares, isMaximizing) {
    const winner = calculateWinner(squares);
    if (winner === 'O') return { score: 10 };
    else if (winner === 'X') return { score: -10 };
    else if (!squares.includes(null)) return { score: 0 };
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          let score = minimax(squares, false).score;
          squares[i] = null;
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      return { score: bestScore, move };
    } else {
      let bestScore = Infinity;
      let move;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          let score = minimax(squares, true).score;
          squares[i] = null;
          if (score < bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
      return { score: bestScore, move };
    }
  }
  
  function bestMove(squares) {
    return minimax(squares, true).move;
  }

  function handleClick(i){
    if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
  nextSquares[i] = 'X'; // Player's move
  setSquares(nextSquares);
  setXnext(!Xnext);

      if (!calculateWinner(nextSquares)) {
    const move = bestMove(nextSquares); // Find the best move for the bot
    if (move != null) {
      nextSquares[move] = 'O'; // Bot makes its move
      setSquares(nextSquares);
      setXnext(!Xnext); // Toggle the turn back to the player
    }
  }
  }
  const winner = calculateWinner(squares);
let status;
if (winner) {
  status = "Winner: " + winner;
} else if (!squares.includes(null)) { // Check if all squares are filled
  status = "It's a draw!";
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TIC TAC TOE
        </p>
      </header>
    <div className="Main_App">

       <div className="board_row">
           <Square value={squares[0]} onsclick={() => handleClick(0)}/>
           <Square value={squares[1]} onsclick={() => handleClick(1)}/>
           <Square value={squares[2]} onsclick={() => handleClick(2)}/>
       </div>
       <div className="board_row">
           <Square value={squares[3]} onsclick={() => handleClick(3)}/>
           <Square value={squares[4]} onsclick={() => handleClick(4)}/>
           <Square value={squares[5]} onsclick={() => handleClick(5)}/>
       </div>
       <div className="board_row">
           <Square value={squares[6]} onsclick={() => handleClick(6)}/>
           <Square value={squares[7]} onsclick={() => handleClick(7)}/>
           <Square value={squares[8]} onsclick={() => handleClick(8)}/>
       </div>
       <div className="status">{status}</div>
    </div>
    </div>
  );
}

export default App;
