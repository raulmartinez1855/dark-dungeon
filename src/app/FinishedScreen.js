import React from "react";

const welcomScreenStyle = {
  container: {
    background: "rgba(45, 48, 61,.8)",
    position: "absolute",
    zIndex: 3,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  textContainer: {
    color: "white",
    maxWidth: "35rem"
  }
};

function FinishedScreen({ setScore, score, setGameState }) {
  return (
    <div style={welcomScreenStyle.container}>
      <div style={welcomScreenStyle.textContainer}>
        <h3>Congratulations!</h3>
        <p>Your score: {score}</p>
      </div>
      <button
        onClick={() => {
          setScore(0);
          setGameState("playing");
        }}
        type="button"
        className="nes-btn is-error"
      >
        Play Again?
      </button>
    </div>
  );
}

export default FinishedScreen;
