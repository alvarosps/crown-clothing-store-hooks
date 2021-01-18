import React from 'react';

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import {
    CollectionItemContainer,
    CollectionFooterContainer,
    ImageContainer,
    NameContainer,
    PriceContainer,
    AddToCartButtonContainer
} from './collection-item.styles';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <CollectionItemContainer>
            <ImageContainer imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>
                    {name}
                </NameContainer>
                <PriceContainer>
                    ${price}
                </PriceContainer>
            </CollectionFooterContainer>
            <AddToCartButtonContainer
                onClick={() => addItem(item)}    
                inverted
            >
                Add to cart
            </AddToCartButtonContainer>
        </CollectionItemContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);