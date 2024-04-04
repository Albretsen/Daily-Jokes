import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    username: string;
    avatarId: number,
    backgroundId: number,
}

const initialState: InitialState = {
    username: "Username",
    avatarId: 0,
    backgroundId: 0,
}

export const viewingUserSlice = createSlice({
    name: "viewingUser",
    initialState,
    reducers: {
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        updateAvatarId: (state, action: PayloadAction<number>) => {
            state.avatarId = action.payload;
        },
        updateBackgroundId: (state, action: PayloadAction<number>) => {
            state.backgroundId = action.payload;
        },
        resetState: (state) => {
            // Directly return the initialState
            return initialState;
        },

    },
});

// Export the generated action creators
export const { updateUsername, updateAvatarId, updateBackgroundId } = viewingUserSlice.actions;

export default viewingUserSlice.reducer;