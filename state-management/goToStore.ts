import { store } from './reduxStore';
import { updateGoToStore } from './goToStoreSlice';

export function toggleGoToStore(visible: boolean) {
    store.dispatch(updateGoToStore(visible));
}