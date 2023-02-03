import { createSlice } from '@reduxjs/toolkit';

export const squareSlice = createSlice({
  name: 'squareSelect',
  initialState: {
    square: null,
    editable: false,
  },
  reducers: {
    add: (state, action) => {
      state.squares.push(action.payload);
    },
    remove: (state, action) => {
      state.squares = action.payload;
    },
    clear: (state) => {
      state.squares = [];
    },
    setEditable: (state) => {
      state.editable = !state.editable;
    },
  },
});

export const { add, remove, clear, setEditable } = squareSlice.actions;
export default squareSlice.reducer;
