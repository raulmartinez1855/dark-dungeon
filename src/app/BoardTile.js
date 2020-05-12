import React from "react";

const bgColors = {
  walkable: "url(tile.png)",
  hidden: score => `rgba(0,0,0,${score / 10}`,
  unwalkable: "#25131a"
};
const tileStyle = {
  containerParent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "4.8vh",
    width: "4.8vw"
  },
  character: {
    background: "url('character.png') 5rem 0rem",
    height: "1rem",
    width: "1rem"
  },
  blackTile: score => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    background: bgColors.hidden(score),
    position: "absolute"
  }),
  boardTile: bgColor => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    color: "yellow",
    fontWeight: 700,
    height: "100%",
    width: "100%",
    background: bgColor,
    backgroundSize: "cover",
    position: "absolute"
  })
};

function BoardTile({ score, position, path, isBlackTile, currentPosition }) {
  const pathArray = [...path];
  const finish = pathArray[pathArray.length - 1];

  const limitedView = (() => {
    const tilePosition = position.split(",").map(v => Number.parseInt(v, 10));
    const playerPosition = currentPosition
      .split(",")
      .map(v => Number.parseInt(v, 10));

    const determinePostion = (positionOne, positionTwo) =>
      tilePosition[0] === playerPosition[0] + positionOne &&
      tilePosition[1] === playerPosition[1] + positionTwo;
    const notHiddenSpots = [
      determinePostion(0, 0),
      determinePostion(1, 0),
      determinePostion(-1, 0),
      determinePostion(1, 1),
      determinePostion(1, -1),
      determinePostion(-1, -1),
      determinePostion(-1, 1),
      determinePostion(0, 1),
      determinePostion(0, -1)
    ].find(v => !!v);

    if (position === finish) return bgColors.walkable;
    if (notHiddenSpots && !isBlackTile) return bgColors.walkable;
    if (notHiddenSpots && isBlackTile) return bgColors.unwalkable;
    return bgColors.hidden(score);
  })();

  // Use this as the boardTile argument if
  // you would like to only see the generated path
  // const viewPath = (() =>
  //   path.has(position) ? bgColors.walkable : bgColors.unwalkable)();

  const viewBoard = (() =>
    isBlackTile ? bgColors.unwalkable : bgColors.walkable)();

  return (
    <div style={tileStyle.containerParent}>
      <div style={tileStyle.boardTile(viewBoard)}>
        {position === currentPosition && <div style={tileStyle.character} />}
        {position === finish && (
          <img
            alt="treasure chest"
            src={`chest${position === currentPosition ? "_open" : ""}.png`}
          />
        )}
      </div>
      {/*comment this out to view the game board without limited vision */}
      {limitedView === bgColors.hidden(score) && (
        <div style={tileStyle.blackTile(score)} />
      )}
    </div>
  );
}
export default BoardTile;
