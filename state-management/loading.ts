import { store } from './reduxStore';
import { updateLoading } from './loadingSlice';

export function loading(visible: boolean) {
    store.dispatch(updateLoading(visible));
}