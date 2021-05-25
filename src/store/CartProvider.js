import { useEffect, useReducer } from 'react'

import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount


        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id)

        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }
        else {
            updatedItems = state.items.concat(action.item)
        }


        const cart = {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        localStorage.setItem('cartInfo', JSON.stringify(cart));
        return cart
    }
    if (action.type === "REMOVE_ITEM") {


        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }
        else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        const cart = {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
        localStorage.setItem('cartInfo', JSON.stringify(cart));

        return cart
    }

    if (action.type === "LOCAL_STORAGE") {
        const cart = action.items
        return cart
    }
    return defaultCartState
}

const CartProvider = props => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

    useEffect(() => {
        const storedCartInfo = JSON.parse(localStorage.getItem('cartInfo'))
        console.log(storedCartInfo)
        dispatchCart({ type: "LOCAL_STORAGE", items: storedCartInfo })

    }, [])



    const addItemToCartHandler = item => {
        dispatchCart({ type: 'ADD_ITEM', item: item })
    }

    const removeItemFromCartHandler = id => {
        dispatchCart({ type: 'REMOVE_ITEM', id: id })
    }



    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider