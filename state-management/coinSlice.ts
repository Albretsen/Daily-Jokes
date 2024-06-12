import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    coins: number;
}

const initialState: InitialState = {
    coins: 0,
}

export const coinSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {
        updateCoins: (state, action: PayloadAction<number>) => {
            state.coins = action.payload;
        },
        incrementCoins: (state, action: PayloadAction<number>) => {
            state.coins += action.payload;
        },
        decrementCoins: (state, action: PayloadAction<number>) => {
            state.coins -= action.payload;
        },
        resetState: (state) => {
            // Directly return the initialState
            return initialState;
        },

    },
});

// Export the generated action creators
export const { updateCoins, incrementCoins, decrementCoins } = coinSlice.actions;

export default coinSlice.reducer;