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
      
      if (!plays.some((cell) => cell === '')) {
        Setwinner(STATUS.DRAW);
      }
      Setturn((turn) => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
      SetCells(plays);
    }
  }

  return (
    <>
      {winner !== STATUS.PLAYING && (
       <h1 className="winner" style={{ color: winner === STATUS.X_WIN ? 'red' : winner === STATUS.O_WIN ? 'blue' : 'black' }}>
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
    
      Setturn((turn) => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
      SetCells(plays);
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

      if (!plays.some((cell) => cell === '')) {
        Setwinner(STATUS.DRAW);
      }
    }
  }

  return (
    <>
      {winner !== STATUS.PLAYING && (
        <h1 className="winner">
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


             SIN ESTILOS

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

      if (!plays.some((cell) => cell === '')) {
        Setwinner(STATUS.DRAW);
      }

      Setturn((turn) => (turn === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
      SetCells(plays);
    }
  }

  return (
    <>
      {winner !== STATUS.PLAYING && (
        <h1 className="winner">
          {winner === STATUS.X_WIN && 'Gano X'}
          {winner === STATUS.O_WIN && 'Gano O'}
          {winner === STATUS.DRAW && 'EMPATE'}
        </h1>
      )}

      <h2 className="turno">Turno de {turn}</h2>
      <main className="tictactoe">
        {cells.map((cell, index) => {
          return (
            <div key={index}>
              <p onClick={() => turnPlayer(index)} className="celdas">
                {cell}
              </p>
            </div>
          );
        })}
      </main>
      <div className="historial">
        <h2>Historial:</h2>
        <p>Cruz Gano: {score.X} </p>
        <p>Circulo Gano: {score.O} </p>
        <button className="boton-reset" onClick={() => resetGame()}>Reiniciar Juego</button>
      </div>
    </>
  );
}





*/
