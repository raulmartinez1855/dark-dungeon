import React, { useState } from "react";
import Board from "./Board";
import WelcomeScreen from "./WelcomeScreen";
import FinishedScreen from "./FinishedScreen";
import "nes.css/css/nes.min.css";

function App() {
  const availGameStates = {
    welcome: "welcome",
    playing: "playing",
    finished: "finished"
  };
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState(availGameStates.welcome);

  return (
    <>
      {gameState === availGameStates.welcome && (
        <WelcomeScreen setGameState={setGameState} />
      )}
      {gameState === availGameStates.playing && (
        <Board
          key={score}
          currentScore={score}
          setGameState={setGameState}
          setScore={setScore}
        />
      )}
      {gameState === availGameStates.finished && (
        <FinishedScreen
          score={score}
          setScore={setScore}
          setGameState={setGameState}
        />
      )}
    </>
  );
}
export default App;
