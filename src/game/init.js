const { state } = require('../../store/store');
const { elements } = require('../../data/constants');

function setMapSize(mapData) {
  const [, columns, lines] = mapData;
  state.mapSize.columns = Number(columns);
  state.mapSize.lines = Number(lines);
}

function setMountain(mountainData) {
  const [label, xAxis, yAxis] = mountainData;
  state.mountains.push({ label, xAxis: Number(xAxis), yAxis: Number(yAxis) });
}

function setAdventurer(adventurerData) {
  const [label, name, xAxis, yAxis, firstOrientation, movementsToBeMade] = adventurerData;
  const id = state.adventurers.length + 1;
  state.adventurers.push({
    id,
    label,
    name: name.toLowerCase(),
    xAxis: Number(xAxis),
    yAxis: Number(yAxis),
    firstOrientation,
    inGameOrientation: firstOrientation,
    movementsToBeMade: movementsToBeMade.split(''),
    treasures: 0,
  });
}

function setTreasure(treasureData) {
  const [label, xAxis, yAxis, quantity] = treasureData;
  state.treasures.push({
    label,
    xAxis: Number(xAxis),
    yAxis: Number(yAxis),
    quantity: Number(quantity),
  });
}

function setMaxGameRounds() {
  state.maxGameRounds = state.adventurers[0].movementsToBeMade.length;
}

function setCurrentPlayer() {
  state.currentPlayer = state.adventurers[0].id;
}

function setGameHistory() {
  const gameHistory = [];
  for (let i = 0; i < state.maxGameRounds; i += 1) {
    gameHistory.push({ round: i, players: [] });
  }
  state.gameHistory = gameHistory;
}

function setGameParams() {
  setMaxGameRounds();
  setCurrentPlayer();
  setGameHistory();
}

function saveGameParams(gameData) {
  gameData.forEach((item) => {
    const elem = item.split('-');
    switch (elem[0]) {
      case elements.MAP:
        setMapSize(elem);
        break;
      case elements.MOUNTAIN:
        setMountain(elem);
        break;
      case elements.ADVENTURER:
        setAdventurer(elem);
        break;
      case elements.TREASURE:
        setTreasure(elem);
        break;
      default:
    }
  });

  setGameParams();
}

function setEmptyGameMap(emptyMap) {
  state.gameMap = emptyMap;
}

function createGameMap() {
  const emptyMap = [];
  for (let i = 0; i < state.mapSize.lines; i += 1) {
    const mapTab = [];

    for (let j = 0; j < state.mapSize.columns; j += 1) {
      mapTab.push(elements.GROUND);
    }

    emptyMap.push(mapTab);
  }

  setEmptyGameMap(emptyMap);
}

function addMountainsToMap() {
  for (let m = 0; m < state.mountains.length; m += 1) {
    const yAxis = Number(state.mountains[m].yAxis);
    const xAxis = Number(state.mountains[m].xAxis);
    state.gameMap[yAxis][xAxis] = elements.MOUNTAIN;
  }
}

function addTreasuresToMap() {
  for (let t = 0; t < state.treasures.length; t += 1) {
    const yAxis = Number(state.treasures[t].yAxis);
    const xAxis = Number(state.treasures[t].xAxis);
    state.gameMap[yAxis][xAxis] = `${elements.TREASURE}(${state.treasures[t].quantity})`;
  }
}

function addAdventurersToMap() {
  for (let a = 0; a < state.adventurers.length; a += 1) {
    const yAxis = Number(state.adventurers[a].yAxis);
    const xAxis = Number(state.adventurers[a].xAxis);
    state.gameMap[yAxis][xAxis] = `${elements.ADVENTURER}(${state.adventurers[a].name})`;
  }
}

function init(gameData) {
  saveGameParams(gameData);
  createGameMap();
  addMountainsToMap();
  addTreasuresToMap();
  addAdventurersToMap();
}

module.exports = {
  init,
  saveGameParams,
  setMapSize,
  setMountain,
  setAdventurer,
  setTreasure,
  createGameMap,
  addMountainsToMap,
  addTreasuresToMap,
  addAdventurersToMap,
};
