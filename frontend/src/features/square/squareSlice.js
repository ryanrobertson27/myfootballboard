import { createSlice } from '@reduxjs/toolkit';

export const squareSlice = createSlice({
  name: 'squareSelect',
  initialState: {
    // filled with objects {index, id}
    squares: [],
  },
  reducers: {
    add: (state, action) => {
      state.squares.push(action.payload);
    },
    remove: (state, action) => {
      state.squares = state.squares.filter(
        (element) => element.index !== action.payload
      );
    },
  },
});

export const { add, remove } = squareSlice.actions;
export default squareSlice.reducer;
