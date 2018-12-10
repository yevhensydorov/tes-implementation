export const initialState = {
  gamePoints: {
    player1: 0,
    player2: 0
  }
};

export function setScore(playerNumber, previousState) {
  return {
    gamePoints: Object.assign({}, previousState.gamePoints, {
      [`player${playerNumber}`]:
        previousState.gamePoints[`player${playerNumber}`] + 1
    })
  };
}

export function getGameScore(gamePoints) {
  // ... do something with gamePoints ...

  const converter = points => {
    switch (points) {
      case 0:
        return "love";
      case 1:
        return "15";
      case 2:
        return "30";
      case 3:
        return "40";
      case 4:
        return "Game";
    }
  };

  const theGame = (player1points, player2points) => {
    if (player1points === player2points) {
      return { scores: `${converter(player1points)}-all` };
    } else if (player1points === 4 && player2points < 4) {
      return {
        scores: `${converter(player1points)}, ${Object.keys(gamePoints)[0]}`,
        winner: Object.keys(gamePoints)[0]
      };
    } else if (player2points === 4 && player1points < 4) {
      return {
        scores: `${converter(player2points)}, ${Object.keys(gamePoints)[1]}`,
        winner: Object.keys(gamePoints)[0]
      };
    } else {
      return {
        scores: `${converter(player1points)}-${converter(player2points)}`
      };
    }
  };

  return {
    scoreCall: theGame(gamePoints.player1, gamePoints.player2).scores,
    winningPlayer: theGame(gamePoints.player1, gamePoints.player2).winner
  };
}
