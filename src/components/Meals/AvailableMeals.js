import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';

//import DUMMY_MEALS from '../../assets/dummy-meals'
import styles from './AvailableMeals.module.css'
import MealItem from './MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {

            try {
                const response = await fetch('https://react-http-134f7-default-rtdb.europe-west1.firebasedatabase.app/meals.json')

                if (!response.ok) {
                    throw new Error('Request failed!');
                }
                const data = await response.json()

                const loadedMeals = []
                for (const key in data) {
                    loadedMeals.push({
                        id: data[key].id,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price
                    })
                }
                setMeals(loadedMeals)

            } catch (err) {
                setError(err.message || 'Something went wrong!');
            }



            setIsLoading(false)
        }

        fetchMeals()
    }, [])


    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            desc={meal.description}
            price={meal.price}
        ></MealItem>)

    return (
        <section className={styles.meals}>
            <Card >
                <ul>
                    {isLoading ? <p>Loading meals...</p> : mealsList}
                    {error && <p> {error}</p>}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals