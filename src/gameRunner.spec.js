const { start } = require('./gameRunner.js');
import { state } from '../store/store.js'

describe('gameRunner', () => {
    describe('start', () => {
        test('should play the game to the end ', () => {
            start();
            const gameMapToStart = [
                [ '-', 'M', '-' ],
                [ '-', 'A(lara)', 'M' ],
                [ '-', '-', '-' ],
                [ 'T(2)', 'T(3)', 'A(sara)' ]
            ];
            const gameOver = state.adventurers.length > 0 && (state.gameRounds > 0
                && state.gameRounds === state.maxGameRounds);
            expect(gameOver).toBe(true);
        });

        test('show result', () => {
            const gameMapResult = [
                [ '-', 'M', '-' ],
                [ '-', '-', 'M' ],
                [ 'A(lara)', 'A(sara)', '-' ],
                [ 'T(1)', 'T(1)', '-' ]
              ];
            expect(state.gameMap).toEqual(gameMapResult);
        });
    }); 
});

