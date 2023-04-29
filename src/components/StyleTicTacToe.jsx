import { useState } from "react";
import { winningCombinations, PLAYERS, STATUS } from "./Players";

export default function TicTacToe() {
  const [turn, Setturn] = useState(PLAYERS.X);
  const [cells, SetCells] = useState(Array(9).fill(""));  
  const [winner, Setwinner] = useState(STATUS.PLAYING);
  const [score, Setscore] = useState({
    [PLAYERS.X]: 0,
    [PLAYERS.O]: 0
  })

  const resetGame = () => {
    SetCells(Array(9).fill(""))
    Setwinner(STATUS.PLAYING)
    Setturn(PLAYERS.X)
  }

  const turnPlayer = (index) => {
    if (winner !== STATUS.PLAYING) return;

    const plays = [...cells];

    if (plays[index] === '') {
      plays[index] = turn;
    
      const winnerPlayer = winningCombinations.some((combinations) =>
      combinations.every((cell) => turn === plays[cell])
      );

      if (winnerPlayer) {
        if (turn === PLAYERS.X) {
          Setwinner(STATUS.X_WIN);
          Setscore((score) => ({
            ...score,
            [PLAYERS.X]: score[PLAYERS.X] + 1,
          }));
        } else if (turn === PLAYERS.O) {
          Setwinner(STATUS.O_WIN);
          Setscore((score) => ({
            ...score,
            [PLAYERS.O]: score[PLAYERS.O] + 1,
          }));
        }
      }
     else if (!plays.some((cell) => cell === '')) {
        Setwinner(STATUS.DRAW);
      }
      Setturn((turn) => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
      SetCells(plays);
    }
  }

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
             <div onClick={() => turnPlayer(index)} className={`celdas ${cell}`}>
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




     


/*

ALGORITMO NORMAL, PERO TIENE ERRORES DE QUE PASA EL TURNO SOLO EL O.
     
import { useState, useEffect } from "react";
import { winningCombinations, PLAYERS, STATUS } from "./Players";

const getRandomCell = () => Math.floor(Math.random() * 9);

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

  const turnPlayer = (index) => {
    if (winner !== STATUS.PLAYING) return;

    const plays = [...cells];

    if (plays[index] === "") {
      plays[index] = turn;

      const winnerPlayer = winningCombinations.some((combinations) =>
        combinations.every((cell) => turn === plays[cell])
      );

      if (winnerPlayer) {
        if (turn === PLAYERS.X) {
          setWinner(STATUS.X_WIN);
          setScore((score) => ({
            ...score,
            [PLAYERS.X]: score[PLAYERS.X] + 1,
          }));
        } else if (turn === PLAYERS.O) {
          setWinner(STATUS.O_WIN);
          setScore((score) => ({
            ...score,
            [PLAYERS.O]: score[PLAYERS.O] + 1,
          }));
        }
      } else if (!plays.some((cell) => cell === "")) {
        setWinner(STATUS.DRAW);
      }
      setTurn((turn) => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
      setCells(plays);
    }
  };

  useEffect(() => {
    if (winner === STATUS.PLAYING && turn === PLAYERS.O) {
      const timer = setTimeout(() => {
        const availableCells = cells.reduce(
          (acc, cell, index) => (cell === "" ? [...acc, index] : acc),
          []
        );

        if (availableCells.length) {
          const randomCellIndex = getRandomCell(availableCells);
          const newCells = [...cells];
          newCells[availableCells[randomCellIndex]] = PLAYERS.O;

          const winnerPlayer = winningCombinations.some((combinations) =>
            combinations.every((cell) => PLAYERS.O === newCells[cell])
          );

          if (winnerPlayer) {
            setWinner(STATUS.O_WIN);
            setScore((score) => ({
              ...score,
              [PLAYERS.O]: score[PLAYERS.O] + 1,
            }));
          } else if (!newCells.some((cell) => cell === "")) {
            setWinner(STATUS.DRAW);
          }

          setCells(newCells);
          setTurn(PLAYERS.X);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [cells, turn, winner]);








  GAMEMODE PLAYERS VS PLAYERS || GAMEMODE PLAYER VS CPU

  export default function TicTacToe() {
  const [turn, setTurn] = useState(PLAYERS.X);
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(STATUS.PLAYING);
  const [score, setScore] = useState({
    [PLAYERS.X]: 0,
    [PLAYERS.O]: 0
  });
  const [gameMode, setGameMode] = useState("playerVsPlayer");

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setWinner(STATUS.PLAYING);
    setTurn(PLAYERS.X);
  };

  const turnPlayer = (index) => {
    if (winner !== STATUS.PLAYING) return;

    const plays = [...cells];

    if (plays[index] === "") {
      plays[index] = turn;

      const winnerPlayer = winningCombinations.some(combinations =>
        combinations.every(cell => turn === plays[cell])
      );

      if (winnerPlayer) {
        if (turn === PLAYERS.X) {
          setWinner(STATUS.X_WIN);
          setScore(score => ({
            ...score,
            [PLAYERS.X]: score[PLAYERS.X] + 1
          }));
        } else if (turn === PLAYERS.O) {
          setWinner(STATUS.O_WIN);
          setScore(score => ({
            ...score,
            [PLAYERS.O]: score[PLAYERS.O] + 1
          }));
        }
      } else if (!plays.some(cell => cell === "")) {
        setWinner(STATUS.DRAW);
      }

      setCells(plays);

      if (gameMode === "playerVsCPU") {
        setTurn(PLAYERS.O);
        turnCPU(plays);
      } else {
        setTurn(turn => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
      }
    }
  };

  const turnCPU = (plays) => {
    let index = getRandomCell();
    while (plays[index] !== "") {
      index = getRandomCell();
    }

    plays[index] = PLAYERS.O;
    setCells(plays);

    const winnerPlayer = winningCombinations.some(combinations =>
      combinations.every(cell => PLAYERS.O === plays[cell])
    );

    if (winnerPlayer) {
      setWinner(STATUS.O_WIN);
     setScore((score) => ({
      ...score,
      [PLAYERS.O]: score[PLAYERS.O] + 1,
    }));
  }

          const handleClickCell = (index) => {
if (winner !== STATUS.PLAYING || cells[index] !== "") return;
const newCells = [...cells];
newCells[index] = turn;
setCells(newCells);

const winnerPlayer = winningCombinations.some((combinations) =>
  combinations.every((cell) => newCells[cell] === turn)
);

if (winnerPlayer) {
  if (turn === PLAYERS.X) {
    setWinner(STATUS.X_WIN);
    setScore((score) => ({
      ...score,
      [PLAYERS.X]: score[PLAYERS.X] + 1,
    }));
  } else if (turn === PLAYERS.O) {
    setWinner(STATUS.O_WIN);
    setScore((score) => ({
      ...score,
      [PLAYERS.O]: score[PLAYERS.O] + 1,
    }));
  }
} else if (!newCells.some((cell) => cell === "")) {
  setWinner(STATUS.DRAW);
} else {
  setTurn((turn) => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
  if (mode === MODES.SINGLE_PLAYER && turn === player2) {
    setTimeout(() => {
      computerTurn();
    }, 1000);
  }
}
};

const computerTurn = () => {
let index = getRandomCell();
while (cells[index] !== "") {
index = getRandomCell();
}
handleClickCell(index);
};

return (
<>
{winner !== STATUS.PLAYING && (
<h1
className="winner"
style={{
color:
winner === STATUS.X_WIN ? "red"
: winner === STATUS.O_WIN ? "blue" : "#a90fff",
}}
>
{winner === STATUS.X_WIN && "Gano Messi!!"}
{winner === STATUS.O_WIN && "Gano Cristiano!!"}
{winner === STATUS.DRAW && "EMPATE!!"}
</h1>
)}
<h2 className={`turno ${turn === PLAYERS.X ? "turno-de-X" : "turno-de-O"}`}>
    Turno de {turn}
  </h2>

  <main className="tictactoe">
    {cells.map((cell, index) => {
      return (
        <div key={index}>
          <div
            onClick={() => handleClickCell(index)}
            className={`celdas ${cell}`}
          >
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
    <button className="boton-reset" onClick={() => resetGame()}>
      Reiniciar Juego
    </button>
  </div>
</>

*/
