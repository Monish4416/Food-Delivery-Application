import React, { useContext, useEffect, useState } from 'react';
import "./FoodDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 1000); 
        return () => clearTimeout(timer);
    }, [food_list]);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            {isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="food-display-list">
                    {food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
};

export default FoodDisplay;
