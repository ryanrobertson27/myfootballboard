import { createSlice } from '@reduxjs/toolkit';

export const squareSlice = createSlice({
  name: 'squareSelect',
  initialState: {
    // filled with square object that has been stringified
    squares: [],
    isDisabled: true,
  },
  reducers: {
    add: (state, action) => {
      // using stringy to make equality checks easier. use JSON.parse() to return to object where needed
      const square = state.squares.find((square) => square._id === action.payload._id)
      if(!square){
        state.squares.push(action.payload);
      }
    },
    remove: (state, action) => {
      const squaresToKeep = state.squares.filter((square) => square._id !== action.payload._id)
      // console.log(action.payload._id)
      state.squares = squaresToKeep
    },
    clear: (state) => {
      state.squares = []
    },
    setDisabled: (state) => {
      state.isDisabled = !state.isDisabled;
    },
  },
});

export const { add, remove, clear, setDisabled } = squareSlice.actions;
export default squareSlice.reducer;
