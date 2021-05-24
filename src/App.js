import React, { useState } from 'react'
import Cart from './components/Cart/Cart'


import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './store/CartProvider'


const App = () => {
  const [cartClicked, setCartClicked] = useState(null)

  const showCart = () => {
    setCartClicked(true)
  }

  const dismissCart = () => {
    setCartClicked(null)
  }

  return (
    <CartProvider>
      {cartClicked && <Cart onConfirm={dismissCart}></Cart>}
      <Header cartClick={showCart}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
