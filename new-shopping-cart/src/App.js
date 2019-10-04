import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal, Box } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import ProductCard from './components/ProductCard';
import ShoppingCart  from './components/ShoppingCart';

const App = () => {
  const [data, setData] = useState({});
  const [shoppingCartFlag, setShoppingCartFlag] = useState(false);
  const [shoppingCartContent, setShoppingCartContent] = useState([]);
  const [inventory, setInventory] = useState({});

  const useForceUpdate = () => {
    const [value, set] = useState(true); //boolean state
    return () => set(value => !value); // toggle the state to force render
  }
  const forceUpdate = useForceUpdate();

  const products = Object.values(data);
  const id2product = {}
  let i;
  for (i = 0; i < products.length; i += 1) {
    id2product[products[i].sku] = products[i];
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    };

    fetchInventory();
  }, []);

  const inCart = (productId) => {
    let i;
    for (i = 0; i < shoppingCartContent.length; i += 1) {
      if (shoppingCartContent[i].productId === productId) {
        return i;
      }
    }
    return -1;
  }

  const addToCart = (productId, size) => {
    const i = inCart(productId);
    if (i !== -1) {
      shoppingCartContent[i][size] += 1;
    }
    else {
      shoppingCartContent.push({
        productId: productId,
        product: id2product[productId],
        's': 0,
        'm': 0,
        'l': 0,
        'xl': 0,
      });
      shoppingCartContent[shoppingCartContent.length - 1][size] += 1;
    }
    setShoppingCartContent(shoppingCartContent);
    setShoppingCartFlag(true);
    forceUpdate();
  };

  useEffect(() => {
    console.log('shoppingCartContent changed', shoppingCartContent);
  });

  const removeFromCart = (productId, size) => {
    const i = inCart(productId);
    if (i !== -1) {
      shoppingCartContent[i][size] = shoppingCartContent[i][size] > 0 ? shoppingCartContent[i][size] - 1 : 0;
    }
    else {
      shoppingCartContent.push({
        productId: productId,
        product: id2product[productId],
        's': 0,
        'm': 0,
        'l': 0,
        'xl': 0,
      });
      shoppingCartContent[i][size] = shoppingCartContent[i][size] > 0 ? shoppingCartContent[i][size] - 1 : 0;
    }
    setShoppingCartContent(shoppingCartContent);
    forceUpdate();
  };

  const computeAmountLeft = (productId) => {
    const idx = inCart(productId);
    const amountLeft = {
      's': inventory[productId] ? (idx === -1 ? (inventory[productId]['S']) : (inventory[productId]['S'] - shoppingCartContent[idx]['s'])) : 0,
      'm': inventory[productId] ? (idx === -1 ? (inventory[productId]['M']) : (inventory[productId]['M'] - shoppingCartContent[idx]['m'])) : 0,
      'l': inventory[productId] ? (idx === -1 ? (inventory[productId]['L']) : (inventory[productId]['L'] - shoppingCartContent[idx]['l'])) : 0,
      'xl': inventory[productId] ? (idx === -1 ? (inventory[productId]['XL']) : (inventory[productId]['XL'] - shoppingCartContent[idx]['xl'])) : 0,
    };
    console.log(amountLeft);
    return amountLeft;
  };

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
            <Box>
              <ShoppingCart shoppingCartContentProp={ shoppingCartContent } removeFromCartFunc={ removeFromCart }/>
            </Box>
          </Modal.Content>
          <Modal.Close onClick={ () => setShoppingCartFlag(false) } />
        </Modal>

        <Column.Group multiline>
          <Column size='full'>
          </Column>
          {products.map(product =>
            <Column size='one-third' key={ product.sku }>
              <ProductCard product={ product } amountLeft={ computeAmountLeft(product.sku) } addToCartFunc={ addToCart } />
            </Column>
          )}
        </Column.Group>
      </Container>
  );
};

export default App;
