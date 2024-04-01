import { store } from './reduxStore';
import { updateUsername, updateAvatarId, updateBackgroundId } from './viewingUserSlice';

export function updateViewingUser(username: string, avatarId: number, backgroundId: number) {
    store.dispatch(updateUsername(username));
    store.dispatch(updateAvatarId(avatarId));
    store.dispatch(updateBackgroundId(backgroundId));
}