import { store } from './reduxStore';
import { updateUserId, updateUsername, updateAvatarId, updateBackgroundId } from './viewingUserSlice';

export function updateViewingUser(username: string, avatarId: number, backgroundId: number, userId: number) {
    store.dispatch(updateUsername(username));
    store.dispatch(updateAvatarId(avatarId));
    store.dispatch(updateBackgroundId(backgroundId));
    store.dispatch(updateUserId(userId));
}