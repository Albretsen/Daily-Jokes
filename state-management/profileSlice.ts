import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    avatarId: number;
    backgroundId: number;
    avatarPrice: number;
    backgroundPrice: number;
    /** 
    * @property The background color of the avatar
    */
    color: string;
    /** 
    * @property The ids of the avatars that have been unlocked
    */
    ownedAvatars: Array<number>;
    /** 
    * @property Avatars yet to be unlocked
    */
    remainingAvatars: Array<number>;
    ownedBackgrounds: Array<number>;
    remainingBackgrounds: Array<number>;
}

const initialState: InitialState = {
    avatarId: 1,
    backgroundId: 0,
    avatarPrice: 50,
    backgroundPrice: 100,
    color: "white",

    ownedAvatars: [], // These avatars are permanently unlocked by default
    remainingAvatars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],

    ownedBackgrounds: [], // These backgrounds are permanently unlocked by default
    remainingBackgrounds: [0, 1, 2, 3],
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateAvatar: (state, action: PayloadAction<number>) => {
            state.avatarId = action.payload;
        },

        updateBackground: (state, action: PayloadAction<number>) => {
            state.backgroundId = action.payload;
        },

        updateAvatarPrice: (state, action: PayloadAction<number>) => {
            state.avatarPrice = action.payload;
        },

        updateBackgroundPrice: (state, action: PayloadAction<number>) => {
            state.backgroundPrice = action.payload;
        },

        updateColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },

        addOwnedAvatar: (state, action: PayloadAction<number>) => {
            const avatarId = action.payload;
            // Check if the avatar ID already exists to avoid duplicates in ownedAvatars
            if (!state.ownedAvatars.includes(avatarId)) {
                state.ownedAvatars.push(avatarId);
                // Remove the avatar from remainingAvatars
                const index = state.remainingAvatars.indexOf(avatarId);
                if (index > -1) {
                    state.remainingAvatars.splice(index, 1);
                }
            }
        },

        addOwnedBackground: (state, action: PayloadAction<number>) => {
            const backgroundId = action.payload;
            // Check if the background ID already exists to avoid duplicates in ownedBackgrounds
            if (!state.ownedBackgrounds.includes(backgroundId)) {
                state.ownedBackgrounds.push(backgroundId);
                // Remove the background from remainingBackgrounds
                const index = state.remainingBackgrounds.indexOf(backgroundId);
                if (index > -1) {
                    state.remainingBackgrounds.splice(index, 1);
                }
            }
        },

        resetState: (state) => {
            // Directly return the initialState
            return initialState;
        },

    },
});

// Export the generated action creators
export const { updateAvatar, updateBackground, updateAvatarPrice, updateBackgroundPrice, updateColor, addOwnedAvatar, addOwnedBackground } = profileSlice.actions;

export default profileSlice.reducer;