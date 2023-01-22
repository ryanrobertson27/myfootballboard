import { createSlice } from '@reduxjs/toolkit';

export const squareSelectSlice = createSlice({
  name: 'squareSelect',
  initialState: {
    squares: [],
  },
  reducers: {
    add: (state, action) => {
      state.squares.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.squares.indexOf(action.payload);
      if (index > -1) {
        state.squares.splice(index, 1);
      }
    },
  },
});

export const { add, remove } = squareSelectSlice.actions;
export default squareSelectSlice.reducer;
