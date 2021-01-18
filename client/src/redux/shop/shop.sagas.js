import {
    takeEvery,
    call,
    put, // saga effect for creating action(like dispatch)
    all
} from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';

import ShopActionsTypes from './shop.types';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync () {
    yield console.warn('fetchCollectionsAsyn()');

    try {
        const collectionRef = firestore.collection('collections');

        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart () {
    yield takeEvery(ShopActionsTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all(call(fetchCollectionsSuccess))
}