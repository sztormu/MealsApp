import React from 'react'

import styles from './Header.module.css'
import mealsPhoto from '../../assets/meals.jpg'

import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
    return (
        <>
            <header className={styles.header}>
                <h1>MealsApp</h1>
                <HeaderCartButton cartClick={props.cartClick}></HeaderCartButton>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsPhoto} alt='meals' />
            </div>
        </>

    )
}

export default Header