import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => collections ?  Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => {console.warn('isFetching'); return shop.isFetching;}
);

export const selectIsCollectionsLoading = createSelector(
    [selectShop],
    shop => {console.warn('isLoading'); return !!shop.collections;}
);
