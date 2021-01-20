import React, { useContext } from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = () => {
    const collectionsObject = useContext(CollectionContext);	

    const collections = Object.keys(collectionsObject).map(collection => collectionsObject[collection]);

    return (
        <CollectionsOverviewContainer>
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))
            }
        </CollectionsOverviewContainer>
    );
}

export default CollectionsOverview;