const fs = require('fs');
const { state } = require('../store/store');
const { init } = require('./game/init');
const { playTheGame } = require('./game/actions');
const { elements } = require('../data/constants');

function play() {
  while (state.gameRounds < state.maxGameRounds) {
    const numberOfPlayers = state.adventurers.length;

    if (numberOfPlayers === 1) {
      playTheGame(state.currentPlayer);
      state.gameRounds += 1;
    } else {
      while (state.gameHistory[state.gameRounds].players.length < state.adventurers.length) {
        playTheGame(state.currentPlayer);
      }
      state.gameRounds += 1;
    }
  }
}

function getOutputDataFormat() {
  const map = `${elements.MAP} - ${state.mapSize.columns} - ${state.mapSize.lines}\n`;
  const mountains = state.mountains.map((item) => `${elements.MOUNTAIN} - ${item.xAxis} - ${item.yAxis}\n`);
  const treasures = state.treasures.map((item) => {
    const treasuresFormat = item.quantity > 0 ? `${elements.TREASURE} - ${item.xAxis} - ${item.yAxis} - ${item.quantity}\n` : null;
    return treasuresFormat;
  });
  const adventurers = state.adventurers.map((item) => `${elements.ADVENTURER} - ${item.name} - ${item.xAxis} - ${item.yAxis} - ${item.inGameOrientation} - ${item.treasures}\n`);

  const outputData = map + mountains + treasures + adventurers;
  const outputDataWithoutComma = outputData.replace(/,/g, '');

  return outputDataWithoutComma;
}

function writeResultInOutputData() {
  const outputData = getOutputDataFormat();

  if (outputData) {
    try {
      fs.writeFileSync(`${process.cwd()}/outputData.txt`, outputData, { encoding: 'utf-8' });
    } catch (error) {
      console.log('Error writing file : ', error);
    }
  }
}

function getInputdata() {
  let inputData;

  try {
    inputData = fs.readFileSync(`${process.cwd()}/inputData.txt`, { encoding: 'utf-8' });
  } catch (error) {
    console.log('Error reading file : ', error);
  }
  return inputData;
}

function start() {
  console.log('########## START GAME ##########');

  const data = getInputdata();

  if (!data) return;

  const gameData = data.split('\n').map((item) => item.replaceAll(' ', ''));
  init(gameData);
  play();
  writeResultInOutputData();

  console.log('########## GAME OVER ##########');
}

module.exports = { start };
