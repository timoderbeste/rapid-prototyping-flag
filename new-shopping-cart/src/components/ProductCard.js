import React from 'react';

import 'rbx/index.css';
import { Card, Dropdown, Button } from 'rbx';

const ProductCard = ({ product, amountLeft, addToCartFunc }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>
          <div style={{textAlign: 'center', width: '100%'}}>
            { product.title }
          </div>
        </Card.Header.Title>
      </Card.Header>
      <Card.Image>
        <div style={{textAlign: 'center', width: '100%'}}>
          <img src={`./data/images/products/${product.sku}_2.jpg`} alt=''/>
        </div>
      </Card.Image>
      <Card.Content>
        <div style={{textAlign: 'center', width: '100%'}}>
          <p>{ product.style }</p>
          <Dropdown>
            <Dropdown.Trigger>
              <Button>
                <span>Size v</span>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Content>
                { amountLeft['s'] !== 0 ? <Dropdown.Item onClick={ () => addToCartFunc(product.sku, 's') }>S - { amountLeft['s'] } Left</Dropdown.Item> : null }
                { amountLeft['m'] !== 0 ? <Dropdown.Item onClick={ () => addToCartFunc(product.sku, 'm') }>M - { amountLeft['m'] } Left</Dropdown.Item> : null }
                { amountLeft['l'] !== 0 ? <Dropdown.Item onClick={ () => addToCartFunc(product.sku, 'l') }>L - { amountLeft['l'] } Left</Dropdown.Item> : null }
                { amountLeft['xl'] !== 0 ? <Dropdown.Item onClick={ () => addToCartFunc(product.sku, 'xl') }>XL - { amountLeft['xl'] } Left</Dropdown.Item> : null }
              </Dropdown.Content>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Content>
      <Card.Footer>
        <div style={{textAlign: 'center', width: '100%'}}>
          <p>{ '$' + product.price }</p>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default ProductCard;
