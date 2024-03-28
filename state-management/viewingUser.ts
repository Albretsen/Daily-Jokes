import { store } from './reduxStore';
import { updateUsername, updateAvatarId, updateBackgroundId } from './viewingUserSlice';

export function updateViewingUser(username: string, avatarId: number | string, backgroundId: number | string) {
    store.dispatch(updateUsername(username));
    store.dispatch(updateAvatarId(avatarId));
    store.dispatch(updateBackgroundId(backgroundId));
}