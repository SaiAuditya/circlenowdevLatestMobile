import { configureStore } from '@reduxjs/toolkit';
import communitiesSlice from './projectSlice';

export const store = configureStore({
  reducer: {
    communities: communitiesSlice,
    //drawer: drawerSlice,
    //login: loginSlice
  },

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
