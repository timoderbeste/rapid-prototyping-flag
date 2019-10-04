import React from 'react';

import 'rbx/index.css';
import { Card, Button } from 'rbx';

const CartItem = ({ product, size, amount, removeFromCart }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>
            { product.title }
        </Card.Header.Title>
      </Card.Header>
      <Card.Image>
        <div style={{textAlign: 'center', width: '100%'}}>
          <img src={`./data/images/products/${product.sku}_2.jpg`} alt=''/>
        </div>
      </Card.Image>
      <Card.Content>
        <div style={{textAlign: 'center', width: '100%'}}>
          <p>{ 'Size: ' + size.upper() }</p>
          <p>{ 'Amount: ' + amount }</p>
        </div>
      </Card.Content>
      <Card.Footer>
        <div style={{textAlign: 'center', width: '100%'}}>
          <p>{ '$' + product.price + ' x ' + amount + ' = ' + amount * product.price}</p>
          <Button onClick={ () => removeFromCart(product.sku, size) } rounded>
            -
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default CartItem;
