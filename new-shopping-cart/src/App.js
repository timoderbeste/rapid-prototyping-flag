import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal, Box, Message, Title } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import ProductCard from './components/ProductCard';
import ShoppingCart  from './components/ShoppingCart';


const firebaseConfig = {
  apiKey: "AIzaSyC0wE6Ay_yd0OvkoTdAjq3K-AxSUaRY7Fc",
  authDomain: "rapid-shopping-cart.firebaseapp.com",
  databaseURL: "https://rapid-shopping-cart.firebaseio.com",
  projectId: "rapid-shopping-cart",
  storageBucket: "",
  messagingSenderId: "559910122031",
  appId: "1:559910122031:web:be086c28ab212fbb9a0cda",
  measurementId: "G-DVZ49S4ZY6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Banner = ({ user, title }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <Title>{ title || '[loading...]' }</Title>
  </React.Fragment>
);

const App = () => {
  const [data, setData] = useState({});
  const [shoppingCartFlag, setShoppingCartFlag] = useState(false);
  const [shoppingCartContent, setShoppingCartContent] = useState([]);
  const [inventory, setInventory] = useState({});
  const [user, setUser] = useState(null);
  let userRef = null;

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
    firebase.auth().onAuthStateChanged(setUser);
    forceUpdate();
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setData(snap.val()['products']);
        setInventory(snap.val()['inventory']);
        if (user) {
          if (!userRef) {
            console.log('No userRef')
            userRef = firebase.database().ref('users/' + user.uid);
            if (!snap.val()['users'][user.uid]) {
              console.log('Shopping cart does not exist');
              userRef.child('shopping_cart').set([]);
            }
            else {
              console.log('Shopping cart exists');
              setShoppingCartContent(snap.val()['users'][user.uid]['shopping_cart']);
            }
          }
          else {
            if (!snap.val()['users'][user.uid]) {
              setShoppingCartContent(snap.val()['users'][user.uid]['shopping_cart']);
            }
          }
        }
        else {
          setShoppingCartContent([]);
        }
      };
    }
    db.on('value', handleData, error => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [user]);

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
    if (user) {
      if (!userRef) {
        userRef = firebase.database().ref('users/' + user.uid);
      }
      userRef.child('shopping_cart').set(shoppingCartContent);
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
    if (user) {
      if (!userRef) {
        userRef = firebase.database().ref('users/' + user.uid);
      }
      userRef.child('shopping_cart').set(shoppingCartContent);
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
    return amountLeft;
  };

  return (
      <Container as='div' style={ {width: '100%', paddingTop: '20px'} }>
        <Banner title={ "My Shop" } user={ user }/>
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
                <Button color='black' onClick={ () => { forceUpdate(); setShoppingCartFlag(true); } }>
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
