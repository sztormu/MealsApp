import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm'


const MealItem = (props) => {

    const cartCtx = useContext(CartContext)

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }


    return (
        <li className={styles.meal}>
            <div >
                <h3>{props.name}</h3>
                <span className={styles.description}>{props.desc}</span>
                <br></br>
                <span className={styles.price}>${props.price.toFixed(2)}</span>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}></MealItemForm>
            </div>

        </li>
    )
}

export default MealItem