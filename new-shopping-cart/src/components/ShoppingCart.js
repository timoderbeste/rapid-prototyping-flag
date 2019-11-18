import React, { useEffect } from 'react';

import 'rbx/index.css';

import { Title, Column, Container } from 'rbx';

import CartItem from './CartItem';

const ShoppingCart = ({ shoppingCartContentProp, removeFromCartFunc }) => {
  const contents = [];
  let i;
  for (i = 0; i < shoppingCartContentProp.length; i += 1) {
    const content = shoppingCartContentProp[i];
    const product = content.product;
    if (content['s'] !== 0) {
      contents.push([product, 's', content['s']]);
    }
    if (content['m'] !== 0) {
      contents.push([product, 'm', content['m']]);
    }
    if (content['l'] !== 0) {
      contents.push([product, 'l', content['l']]);
    }
    if (content['xl'] !== 0) {
      contents.push([product, 'xl', content['xl']]);
    }
  }

  useEffect(() => {
    console.log('shoppingCartContentProp changed', shoppingCartContentProp);
  });

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <Column.Group multiline>
        <Column size='full'>
        </Column>
        {contents.map(content =>
          <Column size='full' key={ content[0].sku }>
            <CartItem product={ content[0] } size={ content[1] } amount={ content[2] } removeFromCartFunc={ removeFromCartFunc } />
          </Column>
        )}
      </Column.Group>
    </Container>
  );
};

export default ShoppingCart;
