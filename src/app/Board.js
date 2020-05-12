import React, { useState, useEffect, useCallback } from "react";
import BoardTile from "./BoardTile";
import Counter from "./Counter";

const boardSize = 20;
const blackTilePercentage = 0.7;
const divStyle = {
  span: { color: "white" },
  fillSpace: { height: "100%", width: "100%" },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

function Board({ currentScore, setScore, setGameState }) {
  const height = Array(boardSize).fill(null);
  const width = Array(boardSize).fill(null);

  const findNextY = (x, y) => {
    if (x > 0) return 0;
    if (y === boardSize - 1) return Math.random() < 0.5 ? -1 : 0;
    if (y === 0) return Math.random() < 0.5 ? 1 : 0;
    return Math.random() < 0.5 ? -1 : 1;
  };

  const pathGenerator = useCallback(() => {
    const set = new Set();
    const startPosition = [Math.floor(Math.random() * boardSize), 0];
    const xMax = boardSize - 1;
    let [y, x] = startPosition;
    set.add(y + "," + x);
    while (x < xMax) {
      const nextX = Math.random() < 0.8 ? 0 : 1;
      y += findNextY(nextX, y);
      x += nextX;
      set.add(y + "," + x);
    }
    return set;
  }, []);

  const [path, setPath] = useState(pathGenerator());

  const blackTilesGenerator = useCallback(() => {
    const maxTiles = Math.floor(
      (boardSize * boardSize - path.size) * blackTilePercentage
    );
    const tiles = new Set();
    const range = () => Math.floor(Math.random() * boardSize);
    while (tiles.size < maxTiles) {
      const blackTile = `${range()},${range()}`;
      const isOnPath = path.has(blackTile);
      if (!isOnPath) tiles.add(blackTile);
    }
    return tiles;
  }, [path]);

  const counter = Counter();
  const [blackTiles, setBlackTiles] = useState(blackTilesGenerator());
  const [currentPosition, setCurrentPosition] = useState([...path][0]);
  const [lastPosition, setLastPosition] = useState([...path][path.size - 1]);

  useEffect(() => {
    const move = ({ key }) => {
      const curentArr = currentPosition.split(",").map(v => Number.parseInt(v));

      const withinRange = num => num >= 0 && num <= boardSize - 1;

      const setNextPosition = (arrPos, spotsMoved) => {
        curentArr[arrPos] += spotsMoved;
        const nextBoardPosition = curentArr.join(",");
        if (
          !blackTiles.has(nextBoardPosition) &&
          withinRange(curentArr[arrPos])
        )
          setCurrentPosition(nextBoardPosition);
      };

      if (key === "ArrowRight") setNextPosition(1, 1);
      if (key === "ArrowLeft") setNextPosition(1, -1);
      if (key === "ArrowUp") setNextPosition(0, -1);
      if (key === "ArrowDown") setNextPosition(0, 1);
    };

    window.addEventListener("keydown", move);

    if (currentPosition === lastPosition) {
      setScore(newScore => (newScore += 1));
    }

    if (counter === 0) {
      setGameState("finished");
    }

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", move);
    };
  }, [
    currentPosition,
    lastPosition,
    blackTiles,
    currentScore,
    setScore,
    setGameState,
    counter
  ]);

  return (
    <div style={divStyle.fillSpace}>
      <div>
        <span style={divStyle.span}>
          SCORE: {currentScore} TIME: {counter}
        </span>
      </div>
      {height.map((array, indexOne) => (
        <div key={indexOne} style={divStyle.flexCenter}>
          {width.map((square, indexTwo) => {
            const position = `${indexOne},${indexTwo}`;
            return (
              <BoardTile
                key={position}
                position={position}
                path={path}
                score={currentScore}
                currentPosition={currentPosition}
                isBlackTile={blackTiles.has(position)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
export default Board;
