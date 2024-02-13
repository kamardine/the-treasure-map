// eslint-disable-next-line import/no-extraneous-dependencies
import {
  describe,
  expect,
  test,
} from '@jest/globals';

const { state } = require('../../store/store');
const {
  init,
  setMapSize,
  setMountain,
  setAdventurer,
  setTreasure,
  createGameMap,
  addMountainsToMap,
  addTreasuresToMap,
  addAdventurersToMap,
} = require('./init');

describe('Init', () => {
  describe('setMapSize', () => {
    test('should set map columns 3 and map lines 4 when map data = [C, 3, 4]', () => {
      const mapData = ['C', '3', '4'];
      const mapSize = { columns: 3, lines: 4 };
      setMapSize(mapData);
      expect(state.mapSize).toStrictEqual(mapSize);
    });
  });

  describe('setMountain', () => {
    test('should set mountains { label: M, xAxis: 1, yAxis: 0 } when mountainData = [M, 1, 0]', () => {
      state.mountains = [];
      const mountainData = ['M', '1', '0'];
      const mountains = { label: 'M', xAxis: 1, yAxis: 0 };
      setMountain(mountainData);
      expect(state.mountains[0]).toStrictEqual(mountains);
    });
    test('should set mountains { label: M, xAxis: 2, yAxis: 1 } when mountainData = [M, 2, 1]', () => {
      state.mountains = [];
      const mountainData = ['M', '2', '1'];
      const mountains = { label: 'M', xAxis: 2, yAxis: 1 };
      setMountain(mountainData);
      expect(state.mountains[0]).toStrictEqual(mountains);
    });
  });

  describe('setAdventurer', () => {
    test('should set adventurer data when adventurerData = [A, Lara, 1, 1, S, AADADAGGA]', () => {
      state.adventurers = [];
      const adventurerData = ['A', 'Lara', '1', '1', 'S', 'AADADAGGA'];
      const adventurer = {
        id: 1,
        label: 'A',
        name: 'lara',
        xAxis: 1,
        yAxis: 1,
        firstOrientation: 'S',
        inGameOrientation: 'S',
        movementsToBeMade: ['A', 'A', 'D', 'A', 'D', 'A', 'G', 'G', 'A'],
        treasures: 0,
      };
      setAdventurer(adventurerData);
      expect(state.adventurers[0]).toStrictEqual(adventurer);
    });
    test('should set adventurer data when adventurerData = [A, Sara, 2, 3, O, AAADADAGA]', () => {
      state.adventurers = [];
      const adventurerData = ['A', 'Sara', '2', '3', 'O', 'AAADADAGA'];
      const adventurer = {
        id: 1,
        label: 'A',
        name: 'sara',
        xAxis: 2,
        yAxis: 3,
        firstOrientation: 'O',
        inGameOrientation: 'O',
        movementsToBeMade: ['A', 'A', 'A', 'D', 'A', 'D', 'A', 'G', 'A'],
        treasures: 0,
      };
      setAdventurer(adventurerData);
      expect(state.adventurers[0]).toStrictEqual(adventurer);
    });
  });

  describe('setTreasure', () => {
    test('should set treasure data when treasuresData = [T, 0, 3, 2]', () => {
      const treasuresData = ['T', '0', '3', '2'];
      const treasure = {
        label: 'T',
        xAxis: 0,
        yAxis: 3,
        quantity: 2,
      };
      setTreasure(treasuresData);
      expect(state.treasures[0]).toStrictEqual(treasure);
    });
    test('should set treasure data when treasuresData = [T, 1, 3, 3]', () => {
      const treasuresData = ['T', '1', '3', '3'];
      const treasure = {
        label: 'T',
        xAxis: 1,
        yAxis: 3,
        quantity: 3,
      };
      setTreasure(treasuresData);
      expect(state.treasures[1]).toStrictEqual(treasure);
    });
  });

  describe('createGameMap', () => {
    test('should create game map with columns 3 and lines 4 when map data = [C, 3, 4]', () => {
      const mapData = ['C', '3', '4'];
      const gameMap = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ];

      setMapSize(mapData);
      createGameMap();
      expect(state.gameMap).toStrictEqual(gameMap);
    });
  });

  describe('addMountainsToMap', () => {
    test('should add mountains to map with xAxis 1 and yAxis 0', () => {
      state.gameMap = [];
      state.mountains = [];
      state.mapSize = [{ columns: 0, lines: 0 }];

      const mapData = ['C', '3', '4'];
      const mountainData = ['M', '1', '0'];
      const gameMap = [
        ['-', 'M', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ];

      setMapSize(mapData);
      setMountain(mountainData);
      createGameMap();
      addMountainsToMap();
      expect(state.gameMap).toStrictEqual(gameMap);
    });
  });

  describe('addTreasuresToMap', () => {
    test('should add treasures to map with xAxis 0 and yAxis 3 and quantity 2', () => {
      state.gameMap = [];
      state.mountains = [];
      state.mapSize = [{ columns: 0, lines: 0 }];
      state.treasures = [];

      const treasuresData = ['T', '0', '3', '2'];
      const mapData = ['C', '3', '4'];
      const gameMap = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['T(2)', '-', '-'],
      ];

      setMapSize(mapData);
      setTreasure(treasuresData);
      createGameMap();
      addTreasuresToMap();
      expect(state.gameMap).toStrictEqual(gameMap);
    });
  });

  describe('addAdventurersToMap', () => {
    test('should add adventurer to map with xAxis 1 and yAxis 1', () => {
      state.gameMap = [];
      state.mapSize = [{ columns: 0, lines: 0 }];
      state.treasures = [];
      state.adventurers = [];

      const adventurerData = ['A', 'Lara', '1', '1', 'S', 'AADADAGGA'];
      const mapData = ['C', '3', '4'];
      const gameMap = [
        ['-', '-', '-'],
        ['-', 'A(lara)', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ];

      setMapSize(mapData);
      setAdventurer(adventurerData);
      createGameMap();
      addAdventurersToMap();
      expect(state.gameMap).toStrictEqual(gameMap);
    });
  });

  describe('create map with all elements', () => {
    test('should create game map with mountains, treasures and adventurers', () => {
      state.gameMap = [];
      state.mapSize = [{ columns: 0, lines: 0 }];
      state.adventurers = [];

      const gameData = [
        'C-3-4',
        'M-1-0',
        'M-2-1',
        'T-0-3-2',
        'T-1-3-3',
        'A-Lara-1-1-S-AADADAGGA',
        'A-Sara-2-3-O-AAADADAGA',
      ];

      const gameMap = [
        ['-', 'M', '-'],
        ['-', 'A(lara)', 'M'],
        ['-', '-', '-'],
        ['T(2)', 'T(3)', 'A(sara)'],
      ];

      init(gameData);
      expect(state.gameMap).toStrictEqual(gameMap);
    });
  });
});
