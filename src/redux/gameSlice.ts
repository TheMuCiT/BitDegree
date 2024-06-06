import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GameState {
  score: number;
  streak: number;
  totalAccuracy: number;
  tapCount: number;
  consecutiveAccurateTaps: number;
  multiplier: number;
}

const initialState: GameState = {
  score: 0,
  streak: 0,
  totalAccuracy: 0,
  tapCount: 0,
  consecutiveAccurateTaps: 0,
  multiplier: 1,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementScore: (state, action: PayloadAction<number>) => {
      const accuracy = action.payload;
      if (accuracy === 1) {
        state.consecutiveAccurateTaps += 1;
        if (state.consecutiveAccurateTaps > 10) {
          state.multiplier = 3;
        } else if (state.consecutiveAccurateTaps > 5) {
          state.multiplier = 2;
        } else {
          state.multiplier = 1;
        }
      } else {
        state.consecutiveAccurateTaps = 0;
        state.multiplier = 1;
      }
      state.score += accuracy * (1 + state.streak * 0.1) * state.multiplier;
      state.streak += 1;
      state.totalAccuracy += accuracy;
      state.tapCount += 1;
    },
    resetScore: state => {
      state.score = 0;
      state.streak = 0;
      state.totalAccuracy = 0;
      state.tapCount = 0;
      state.consecutiveAccurateTaps = 0;
      state.multiplier = 1;
    },
  },
});

export const {incrementScore, resetScore} = gameSlice.actions;

export default gameSlice.reducer;
