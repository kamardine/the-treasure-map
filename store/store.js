const state = {
  gameMap: undefined,
  mapSize: {
    columns: 0,
    lines: 0,
  },
  gameRounds: 0,
  maxGameRounds: 0,
  currentPlayer: undefined,
  gameHistory: undefined,
  mountains: [],
  adventurers: [],
  treasures: [],
};

module.exports = {
  state,
};
