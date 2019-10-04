import React, { useEffect } from 'react';

import 'rbx/index.css';

import { Title, Column, Container } from 'rbx';

import CartItem from './CartItem';

const ShoppingCart = (shoppingCartContent, removeFromCart) => {
  useEffect(() => {
    console.log('shoppingCartContent changed', shoppingCartContent);
  });
  const contents = [];
  let i;
  for (i = 0; i < shoppingCartContent.length; i += 1) {
    const content = shoppingCartContent[i];
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
  console.log(contents);

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <Column.Group multiline>
        <Column size='full'>
        </Column>
        {contents.map(content =>
          <Column size='one-third' key={ content[0].sku }>
            <CartItem product={ content[0] } size={ content[1] } amount={ content[2] } removeFromCart={ removeFromCart } />
          </Column>
        )}
      </Column.Group>
    </Container>
  );
};

export default ShoppingCart;
