import { useEffect, useState } from "react";
import { winningCombinations, PLAYERS, STATUS } from "./Players";

export default function TicTacToe() {
  const [turn, setTurn] = useState(PLAYERS.X);
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(STATUS.PLAYING);
  const [score, setScore] = useState({
    [PLAYERS.X]: 0,
    [PLAYERS.O]: 0,
  });

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setWinner(STATUS.PLAYING);
    setTurn(PLAYERS.X);
  };

  const checkIfWinnerPlayer = (newCells) => {
    return winningCombinations.some((combinations) =>
      combinations.every((cell) => turn === newCells[cell])
    );
  };

  const checkIfDraw = (newCells) => {
    return !newCells.some((cell) => cell === "");
  };

  const playTurn = (index) => {
    if (winner !== STATUS.PLAYING || cells[index] !== "") {
      return;
    }

    const newCells = [...cells];
    newCells[index] = turn;
    setCells(newCells);

    const winnerPlayer = checkIfWinnerPlayer(newCells);

    if (winnerPlayer) {
      const winnerStatus = turn === PLAYERS.X ? STATUS.X_WIN : STATUS.O_WIN;
      setWinner(winnerStatus);
      setScore((score) => ({
        ...score,
        [winnerStatus]: score[winnerStatus] + 1,
      }));
    } else if (checkIfDraw(newCells)) {
      setWinner(STATUS.DRAW);
    } else {
      setTurn(turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X);
    }
  };

  const playTurnComputer = () => {
    if (winner === STATUS.PLAYING && turn === PLAYERS.O) {
      const timer = setTimeout(() => {
        const availableCells = cells.reduce(
          (acc, cell, index) => (cell === "" ? [...acc, index] : acc),
          []
        );

        if (availableCells.length) {
          const randomCellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
          const newCells = [...cells];
          newCells[randomCellIndex] = PLAYERS.O;

          const winnerPlayer = checkIfWinnerPlayer(newCells);

          if (winnerPlayer) {
            setWinner(STATUS.O_WIN);
            setScore((score) => ({
              ...score,
              [STATUS.O_WIN]: score[STATUS.O_WIN] + 1,
            }));
          } else if (checkIfDraw(newCells)) {
            setWinner(STATUS.DRAW);
          } else {
            setTurn(PLAYERS.X);
          }

          setCells(newCells);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  };

  useEffect(playTurnComputer, [cells, turn, winner]);

  return (
    <>
      {winner !== STATUS.PLAYING && (
       <h1 className="winner" style={{ color: winner === STATUS.X_WIN ? 'red' : winner === STATUS.O_WIN ? 'blue' : '#a90fff' }}>
       {winner === STATUS.X_WIN && 'Gano Messi!!'}
       {winner === STATUS.O_WIN && 'Gano Cristiano!!'}
       {winner === STATUS.DRAW && 'EMPATE!!'}
     </h1>
     
      )}

<h2 className={`turno ${turn === PLAYERS.X ? 'turno-de-X' : 'turno-de-O'}`}>Turno de {turn}</h2>

      <main className="tictactoe">
        {cells.map((cell, index) => {
          return (
            <div key={index}>
             <div onClick={() => playTurn(index)} className={`celdas ${cell}`}>
              {cell === PLAYERS.X && <div className="cruz"></div>}
              {cell === PLAYERS.O && <div className="circulo"></div>}
              
            </div>
            </div>
          );
        })}
      </main>
      <div className="historial">
        <div className="contenedor-historial">
        <h2>Historial:</h2>
        <p className="messi">Messi Gano: {score.X} </p>
        <p className="ronaldo">Cristiano Gano: {score.O} </p>
        </div>
        <button className="boton-reset" onClick={() => resetGame()}>Reiniciar Juego</button>
      </div>
    </>
  );
}