import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import ProductCard from './components/ProductCard';
import ShoppingCart  from './components/ShoppingCart';

const App = () => {
  const [data, setData] = useState({});
  const [shoppingCartFlag, setShoppingCartFlag] = useState(false);
  const [shoppingCartContent, setShoppingCartContent] = useState([]);
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
      <Container as='div' style={ {width: '100%', paddingTop: '20px'} }>
        <Navbar fixed='top' as='div' style={ {paddingLeft: '50px', paddingRight: '50px', paddingTop: '10px'} }>
        <Navbar.Brand>
          <Navbar.Item href="#">
              <h1 style={{fontSize: '24px'}}><strong>Timo's Store</strong></h1>
              </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Segment align="end">
              <Navbar.Item><Button rounded color='danger'>S</Button></Navbar.Item>
              <Navbar.Item><Button rounded color='danger'>M</Button></Navbar.Item>
              <Navbar.Item><Button rounded color='danger'>L</Button></Navbar.Item>
              <Navbar.Item><Button rounded color='danger'>XL</Button></Navbar.Item>
              <Navbar.Item dropdown>
                <Navbar.Link>Ordered By</Navbar.Link>
                <Navbar.Dropdown>
                  <Navbar.Item>Lowest to Highest</Navbar.Item>
                  <Navbar.Item>Highest to Lowest</Navbar.Item>
                </Navbar.Dropdown>
              </Navbar.Item>
              <Navbar.Item>
                <Button color='black' onClick={ () => setShoppingCartFlag(true) }>
                  <Icon>
                    <FontAwesomeIcon icon={ faShoppingCart }/>
                  </Icon>
                </Button>
              </Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
        </Navbar>

        <Modal active={ shoppingCartFlag }>
          <Modal.Background />
          <Modal.Content>
            <ShoppingCart />
          </Modal.Content>
          <Modal.Close onClick={ () => setShoppingCartFlag(false) } />
        </Modal>

        <Column.Group multiline>
          <Column size='full'>
          </Column>
          {products.map(product =>
            <Column size='one-third' key={ product.sku }>
              <ProductCard product={ product } />
            </Column>
          )}
        </Column.Group>
      </Container>
  );
};

export default App;
