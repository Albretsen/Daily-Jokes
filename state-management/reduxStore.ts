import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import coinSlice from './coinSlice';
import toastSlice from './toastSlice';
import loadingSlice from './loadingSlice';

export const store = configureStore({
    reducer: {
        profile: profileSlice,
        coins: coinSlice,
        toast: toastSlice,
        loading: loadingSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
