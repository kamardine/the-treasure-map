// eslint-disable-next-line import/no-extraneous-dependencies
import {
  describe,
  expect,
  test,
  beforeEach,
} from '@jest/globals';

import { state } from '../../store/store';

const {
  getNewPositionAndOrientation,
  canMove,
  updatePlayerParams,
  changeCurrentPlayer,
  takeTreasure,
} = require('./actions');

describe('Actions', () => {
  describe('getNewPositionAndOrientation', () => {
    beforeEach(() => {
      state.mapSize = {
        columns: 3,
        lines: 4,
      };
    });
    describe('when movement is FORWARD (A) and orientation is NORTH (N)', () => {
      test('should return position xAxis: 1 yAxis: 2 when old position in xAxis: 1 yAxis: 3', () => {
        const oldPosition = { xAxis: 1, yAxis: 3 };
        const oldOrientation = 'N';
        const movement = 'A';
        const newPositionAndOrientation = {
          newPosition: { xAxis: 1, yAxis: 2 },
          newOrientation: oldOrientation,
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is FORWARD (A) and orientation is SOUTH (S)', () => {
      test('should return position xAxis: 2 yAxis: 2 when old position in xAxis: 2 yAxis: 1', () => {
        const oldPosition = { xAxis: 2, yAxis: 1 };
        const oldOrientation = 'S';
        const movement = 'A';
        const newPositionAndOrientation = {
          newPosition: { xAxis: 2, yAxis: 2 },
          newOrientation: oldOrientation,
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is FORWARD (A) and orientation is EAST (E)', () => {
      test('should return position xAxis: 1 yAxis: 1 when old position in xAxis: 0 yAxis: 1', () => {
        const oldPosition = { xAxis: 0, yAxis: 1 };
        const oldOrientation = 'E';
        const movement = 'A';
        const newPositionAndOrientation = {
          newPosition: { xAxis: 1, yAxis: 1 },
          newOrientation: oldOrientation,
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is FORWARD (A) and orientation is WEST (O)', () => {
      test('should return position xAxis: 0 yAxis: 2 when old position in xAxis: 1 yAxis: 2', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'O';
        const movement = 'A';
        const newPositionAndOrientation = {
          newPosition: { xAxis: 0, yAxis: 2 },
          newOrientation: oldOrientation,
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_LEFT (G) and orientation is NORTH (N)', () => {
      test('should return orientation WEST (O)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'N';
        const movement = 'G';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'O',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_LEFT (G) and orientation is SOUTH (S)', () => {
      test('should return orientation EAST (E)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'S';
        const movement = 'G';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'E',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_LEFT (G) and orientation is EAST (E)', () => {
      test('should return orientation NORTH (N)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'E';
        const movement = 'G';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'N',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_LEFT (G) and orientation is WEST (O)', () => {
      test('should return orientation SOUTH (S)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'O';
        const movement = 'G';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'S',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_RIGHT (D) and orientation is NORTH (N)', () => {
      test('should return orientation EAST (E)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'N';
        const movement = 'D';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'E',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_RIGHT (D) and orientation is SOUTH (S)', () => {
      test('should return orientation WEST (O)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'S';
        const movement = 'D';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'O',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_RIGHT (D) and orientation is EAST (E)', () => {
      test('should return orientation SOUTH (S)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'E';
        const movement = 'D';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'S',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });

    describe('when movement is TURN_RIGHT (D) and orientation is WEST (O)', () => {
      test('should return orientation NORTH (N)', () => {
        const oldPosition = { xAxis: 1, yAxis: 2 };
        const oldOrientation = 'O';
        const movement = 'D';
        const newPositionAndOrientation = {
          newPosition: oldPosition,
          newOrientation: 'N',
        };

        const getPosition = getNewPositionAndOrientation({ oldPosition, oldOrientation, movement });
        expect(getPosition).toStrictEqual(newPositionAndOrientation);
      });
    });
  });

  describe('canMove', () => {
    test('should return true if element in next position is a GROUND (-)', () => {
      const elementInNextPosition = '-';
      const oldOrientation = 'N';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(true);
    });

    test('should return true if element in next position is a MOUNTAIN (M) and oldOrientation is NORTH (N)', () => {
      const elementInNextPosition = 'M';
      const oldOrientation = 'N';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(true);
    });

    test('should return false if element in next position is a MOUNTAIN (M) and oldOrientation is SOUTH (S)', () => {
      const elementInNextPosition = 'M';
      const oldOrientation = 'S';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(false);
    });

    test('should return false if element in next position is a MOUNTAIN (M) and oldOrientation is EAST (E)', () => {
      const elementInNextPosition = 'M';
      const oldOrientation = 'E';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(false);
    });

    test('should return false if element in next position is a MOUNTAIN (M) and oldOrientation is WEST (O)', () => {
      const elementInNextPosition = 'M';
      const oldOrientation = 'O';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(false);
    });

    test('should return true if element in next position is a TREASURE (T) and there isn\'t already a player (A)', () => {
      const elementInNextPosition = 'T';
      const oldOrientation = 'N';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(true);
    });

    test('should return false if element in next position is a TREASURE (T) and there is already a player (A)', () => {
      const elementInNextPosition = 'T/A';
      const oldOrientation = 'S';
      expect(canMove({ elementInNextPosition, oldOrientation })).toBe(false);
    });
  });

  describe('updatePlayerParams', () => {
    test('should update player params', () => {
      state.adventurers = [
        {
          id: 1,
          label: 'A',
          name: 'lara',
          xAxis: 1,
          yAxis: 1,
          firstOrientation: 'S',
          inGameOrientation: 'S',
          movementsToBeMade: ['A', 'A', 'D', 'A'],
          treasures: 0,
        },
        {
          id: 2,
          label: 'A',
          name: 'sara',
          xAxis: 2,
          yAxis: 3,
          firstOrientation: 'O',
          inGameOrientation: 'O',
          movementsToBeMade: ['A', 'G', 'G', 'A'],
          treasures: 0,
        },
      ];
      const playerIndex = 1;
      const newOrientation = 'O';
      const newPosition = { xAxis: 1, yAxis: 3 };
      updatePlayerParams(playerIndex, newOrientation, newPosition);
      expect(state.adventurers[1].xAxis).toBe(1);
      expect(state.adventurers[1].yAxis).toBe(3);
      expect(state.adventurers[1].inGameOrientation).toBe('O');
    });
  });

  describe('changeCurrentPlayer', () => {
    test('should change the current player', () => {
      state.adventurers = [
        {
          id: 1,
          label: 'A',
          name: 'lara',
          xAxis: 1,
          yAxis: 1,
          firstOrientation: 'S',
          inGameOrientation: 'S',
          movementsToBeMade: ['A', 'A', 'D', 'A'],
          treasures: 0,
        },
        {
          id: 2,
          label: 'A',
          name: 'sara',
          xAxis: 2,
          yAxis: 3,
          firstOrientation: 'O',
          inGameOrientation: 'O',
          movementsToBeMade: ['A', 'G', 'G', 'A'],
          treasures: 0,
        },
      ];
      const playerIndex = 0;
      changeCurrentPlayer(playerIndex);
      expect(state.currentPlayer).toBe(2);
    });
  });

  describe('takeTreasure', () => {
    test('should change the current player', () => {
      state.adventurers = [
        {
          id: 1,
          label: 'A',
          name: 'lara',
          xAxis: 2,
          yAxis: 3,
          firstOrientation: 'S',
          inGameOrientation: 'S',
          movementsToBeMade: ['A', 'A', 'D', 'A'],
          treasures: 0,
        },
      ];
      state.treasures = [{
        label: 'T',
        xAxis: 2,
        yAxis: 3,
        quantity: 4,
      }];
      const playerIndex = 0;
      const treasureIndex = 0;
      takeTreasure({ playerIndex, treasureIndex });
      expect(state.treasures[treasureIndex].quantity).toBe(3);
      expect(state.adventurers[playerIndex].treasures).toBe(1);
    });
  });
});
