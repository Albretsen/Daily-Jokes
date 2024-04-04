import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    visible: boolean;
}

const initialState: InitialState = {
    visible: false,
}

export const goToStoreSlice = createSlice({
    name: "goToStore",
    initialState,
    reducers: {
        updateGoToStore: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload;
        },
    },
});

export const { updateGoToStore } = goToStoreSlice.actions;

export default goToStoreSlice.reducer;