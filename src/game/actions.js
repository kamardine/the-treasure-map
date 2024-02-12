const { state } = require('../../store/store');
const {
  elements,
  orientations,
  movementsType,
} = require('../../data/constants');

function getNewPositionWhenForward(oldOrientation, oldPosition) {
  switch (oldOrientation) {
    case orientations.NORTH:
      return {
        xAxis: oldPosition.xAxis,
        yAxis: oldPosition.yAxis - 1 >= 0 ? oldPosition.yAxis - 1 : -1,
      };
    case orientations.SOUTH:
      return {
        xAxis: oldPosition.xAxis,
        yAxis: oldPosition.yAxis + 1 < state.mapSize.lines
          ? oldPosition.yAxis + 1 : -1,
      };
    case orientations.EAST:
      return {
        xAxis: oldPosition.xAxis + 1 < state.mapSize.columns
          ? oldPosition.xAxis + 1 : -1,
        yAxis: oldPosition.yAxis,
      };
    case orientations.WEST:
      return {
        xAxis: oldPosition.xAxis - 1 >= 0 ? oldPosition.xAxis - 1 : -1,
        yAxis: oldPosition.yAxis,
      };
    default:
      return {
        xAxis: oldPosition.xAxis,
        yAxis: oldPosition.yAxis,
      };
  }
}

function getNewOrientationWhenTurnLeft(oldOrientation) {
  switch (oldOrientation) {
    case orientations.NORTH:
      return orientations.WEST;
    case orientations.SOUTH:
      return orientations.EAST;
    case orientations.EAST:
      return orientations.NORTH;
    case orientations.WEST:
      return orientations.SOUTH;
    default:
      return oldOrientation;
  }
}

function getNewOrientationWhenTurnRight(oldOrientation) {
  switch (oldOrientation) {
    case orientations.NORTH:
      return orientations.EAST;
    case orientations.SOUTH:
      return orientations.WEST;
    case orientations.EAST:
      return orientations.SOUTH;
    case orientations.WEST:
      return orientations.NORTH;
    default:
      return oldOrientation;
  }
}

function getNewPositionAndOrientation({ oldPosition, oldOrientation, movement }) {
  switch (movement) {
    case movementsType.FORWARD:
      return {
        newPosition: getNewPositionWhenForward(oldOrientation, oldPosition),
        newOrientation: oldOrientation,
      };
    case movementsType.TURN_LEFT:
      return {
        newPosition: oldPosition,
        newOrientation: getNewOrientationWhenTurnLeft(oldOrientation),
      };
    case movementsType.TURN_RIGHT:
      return {
        newPosition: oldPosition,
        newOrientation: getNewOrientationWhenTurnRight(oldOrientation),
      };
    default:
      return { newPosition: oldPosition, newOrientation: oldOrientation };
  }
}

function canMove({ elementInNextPosition, oldOrientation }) {
  if (elementInNextPosition.includes(elements.GROUND)
    || (elementInNextPosition.includes(elements.MOUNTAIN) && oldOrientation === orientations.NORTH)
    || (elementInNextPosition.includes(elements.TREASURE)
    && !elementInNextPosition.includes(elements.ADVENTURER))) return true;

  return false;
}

function updatePlayerParams(playerIndex, newOrientation, newPosition) {
  state.adventurers[playerIndex].yAxis = newPosition.yAxis;
  state.adventurers[playerIndex].xAxis = newPosition.xAxis;
  state.adventurers[playerIndex].inGameOrientation = newOrientation;
}

function changeCurrentPlayer(playerIndex) {
  if (state.adventurers.length > playerIndex + 1) {
    state.currentPlayer = state.adventurers[playerIndex + 1].id;
  } else {
    state.currentPlayer = state.adventurers[0].id;
  }
}

function takeTreasure({ playerIndex, treasureIndex }) {
  state.treasures[treasureIndex].quantity -= 1;
  state.adventurers[playerIndex].treasures += 1;
}

function movePlayerInTreasurePosition({ treasureIndex, newPosition, player }) {
  const thereOneMoreTreasure = state.treasures[treasureIndex].quantity > 0;
  if (thereOneMoreTreasure) {
    state.gameMap[newPosition.yAxis][newPosition.xAxis] = `${elements.TREASURE}(${state.treasures[treasureIndex].quantity})/${elements.ADVENTURER}(${player.name})`;
  } else {
    state.gameMap[newPosition.yAxis][newPosition.xAxis] = `${elements.ADVENTURER}(${player.name})`;
  }
}

function handlerOldPosition({ elementInOldPosition, oldPosition }) {
  if (elementInOldPosition.includes(elements.TREASURE)
    && elementInOldPosition.includes(elements.ADVENTURER)) {
    const oldTreasureIndex = state.treasures.findIndex(
      (item) => item.yAxis === oldPosition.yAxis && item.xAxis === oldPosition.xAxis,
    );

    if (state.treasures[oldTreasureIndex].quantity === 0) {
      state.gameMap[oldPosition.yAxis][oldPosition.xAxis] = elements.GROUND;
    } else {
      state.gameMap[oldPosition.yAxis][oldPosition.xAxis] = `${elements.TREASURE}(${state.treasures[oldTreasureIndex].quantity})`;
    }
  } else if (elementInOldPosition.includes(elements.MOUNTAIN)
    && elementInOldPosition.includes(elements.ADVENTURER)) {
    state.gameMap[oldPosition.yAxis][oldPosition.xAxis] = elements.MOUNTAIN;
  } else {
    state.gameMap[oldPosition.yAxis][oldPosition.xAxis] = elements.GROUND;
  }
}
function handlerForwardMove({
  player, playerIndex, oldPosition, oldOrientation, newPosition, newOrientation,
}) {
  const nextPositionIsOffMap = newPosition.xAxis === -1 || newPosition.yAxis === -1;
  const elementInNextPosition = nextPositionIsOffMap ? elements.WALL
    : state.gameMap[newPosition.yAxis][newPosition.xAxis];
  const elementInOldPosition = state.gameMap[oldPosition.yAxis][oldPosition.xAxis];
  const playerCanMove = canMove({ elementInNextPosition, oldOrientation });

  if (playerCanMove) {
    if (elementInNextPosition.includes(elements.TREASURE)) {
      const treasureIndex = state.treasures.findIndex(
        (item) => item.yAxis === newPosition.yAxis && item.xAxis === newPosition.xAxis,
      );

      if (state.treasures[treasureIndex].quantity > 0) {
        takeTreasure({ playerIndex, treasureIndex });
        movePlayerInTreasurePosition({ treasureIndex, newPosition, player });
      }
    } else if (elementInNextPosition.includes(elements.MOUNTAIN)) {
      state.gameMap[newPosition.yAxis][newPosition.xAxis] = `${elements.MOUNTAIN}/${elements.ADVENTURER}(${player.name})`;
    } else {
      state.gameMap[newPosition.yAxis][newPosition.xAxis] = `${elements.ADVENTURER}(${player.name})`;
    }

    updatePlayerParams(playerIndex, newOrientation, newPosition);
    handlerOldPosition({ elementInOldPosition, oldPosition });
  } else {
    updatePlayerParams(playerIndex, newOrientation, oldPosition);
  }
}

function addPlayerInGameHistory(playerIndex) {
  state.gameHistory[state.gameRounds].players.push(state.adventurers[playerIndex].id);
}

function movePlayer(player) {
  const playerIndex = state.adventurers.findIndex((item) => item === player);
  const oldPosition = { xAxis: player.xAxis, yAxis: player.yAxis };
  const oldOrientation = player.inGameOrientation;
  const movement = player.movementsToBeMade[state.gameRounds];
  const { newPosition, newOrientation } = getNewPositionAndOrientation({
    oldPosition, oldOrientation, movement,
  });
  const forwardMove = movement.includes(movementsType.FORWARD);
  const turnLeftMove = movement.includes(movementsType.TURN_LEFT);
  const turnRightMove = movement.includes(movementsType.TURN_RIGHT);

  if (forwardMove) {
    handlerForwardMove({
      player, playerIndex, oldPosition, oldOrientation, newPosition, newOrientation,
    });
  }

  if (turnLeftMove || turnRightMove) {
    updatePlayerParams(playerIndex, newOrientation, oldPosition);
  }

  addPlayerInGameHistory(playerIndex)
  changeCurrentPlayer(playerIndex);
}

function playTheGame(playerId) {
  const player = state.adventurers.find((item) => item.id === playerId);
  movePlayer(player);
}

module.exports = {
  playTheGame,
  movePlayer,
  getNewPositionAndOrientation,
  canMove,
  updatePlayerParams,
  changeCurrentPlayer,
  takeTreasure,
};
