import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import squareSelectReducer from '../features/squareSelectSlice';
import { api } from './services/api';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    squareSelect: squareSelectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
