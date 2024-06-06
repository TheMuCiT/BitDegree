import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GameState {
  score: number;
  timeLeft: number;
  multiplier: number;
  streak: number;
}

const initialState: GameState = {
  score: 0,
  timeLeft: 10,
  multiplier: 1,
  streak: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementScore(
      state,
      action: PayloadAction<{accuracy: number; speed: number}>,
    ) {
      const {accuracy, speed} = action.payload;
      if (accuracy > 0.9 && speed < 0.5) {
        state.streak += 1;
        state.multiplier = Math.pow(2, state.streak);
      } else {
        state.streak = 0;
        state.multiplier = 1;
      }
      state.score += state.multiplier;
    },
    resetGame(state) {
      state.score = 0;
      state.timeLeft = 10;
      state.multiplier = 1;
      state.streak = 0;
    },
    decrementTime(state) {
      state.timeLeft -= 1;
    },
  },
});

export const {incrementScore, resetGame, decrementTime} = gameSlice.actions;
export default gameSlice.reducer;
