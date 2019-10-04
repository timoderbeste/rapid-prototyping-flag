import React from 'react';

import 'rbx/index.css';
import { Card, Dropdown, Button } from 'rbx';

const ProductCard = ({ product }) => {
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
                <Dropdown.Item>S</Dropdown.Item>
                <Dropdown.Item>M</Dropdown.Item>
                <Dropdown.Item>L</Dropdown.Item>
                <Dropdown.Item>XL</Dropdown.Item>
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