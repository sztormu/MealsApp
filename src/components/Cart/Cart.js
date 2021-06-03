import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const [checkout, setCheckout] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [finishedSubmit, setFinishedSubmit] = useState(false)

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)

    }

    const cartItemAddHandler = item => {
        const cartItem = { ...item, amount: 1 }
        cartCtx.addItem(cartItem)
    }

    const orderHandler = () => {
        setCheckout(true)
    }

    const cancelHandler = () => {
        setCheckout(false)
    }

    const sendOrder = async (userData) => {
        setSubmitting(true)
        await fetch('https://react-http-134f7-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userData: userData,
                order: cartCtx.items
            })
        })
        setSubmitting(false)
        setFinishedSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems = <ul className={styles['cart-items']}>{cartCtx.items.map(item => <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
    />)}</ul>


    const cartModalContent = <>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {checkout && <Checkout onCancel={cancelHandler} onSend={sendOrder} />}
        {!checkout && <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onConfirm}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>}


    </>

    const submittingContent = <p>Sending order data...</p>

    const didSubmit = <p>Order successfully sent!</p>

    return (
        <Modal onConfirm={props.onConfirm}>
            {!submitting && !finishedSubmit && cartModalContent}
            {submitting && submittingContent}
            {finishedSubmit && didSubmit}
        </Modal>
    )
}

export default Cart