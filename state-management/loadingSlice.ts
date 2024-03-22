import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    visible: boolean;
}

const initialState: InitialState = {
    visible: false,
}

export const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        updateLoading: (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload;
        },
        resetState: (state) => {
            // Directly return the initialState
            return initialState;
        },

    },
});

// Export the generated action creators
export const { updateLoading } = loadingSlice.actions;

export default loadingSlice.reducer;