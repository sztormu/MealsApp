import React, { useContext, useEffect, useState } from 'react'

import styles from './HeaderCartButton.module.css'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'


const HeaderCartButton = (props) => {
    const [btnIsHighligthed, setBtnIsHighligthed] = useState()

    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${styles.button} ${btnIsHighligthed ? styles.bump : ''}`

    const { items } = cartCtx

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighligthed(true)

        const timer = setTimeout(() => {
            setBtnIsHighligthed(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])

    const cartController = () => {
        props.cartClick()
    }
    return (
        <button className={btnClasses} onClick={cartController}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton