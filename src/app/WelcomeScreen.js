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
  headingContainer: {
    color: "white",
    maxWidth: "50rem",
    marginBottom: "2rem"
  },
  textContainer: {
    color: "white",
    maxWidth: "35rem"
  }
};

function WelcomeScreen({ setGameState }) {
  return (
    <div style={welcomScreenStyle.container}>
      <h1 style={welcomScreenStyle.headingContainer}>
        Welcome to Darker Dungeon
      </h1>
      <div style={welcomScreenStyle.textContainer}>
        <p>
          Navigate your way through the maze using the arrow keys to get the
          tresure. Maps are always randomly generated and there will always be
          at least one path to the treasure.
        </p>
        <p>
          As you progress the maze will become darker and darker. If you can get
          to level 10 you will experience a total blackout.
        </p>
        <p>Good luck!</p>
      </div>
      <button
        onClick={() => setGameState("playing")}
        type="button"
        className="nes-btn is-error"
      >
        Begin
      </button>
    </div>
  );
}

export default WelcomeScreen;
