import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const transformIngredients = Object.keys(props.ingredients)
        .map(idKey => {
            return [...Array(props.ingredients[idKey])]
                .map( (_, i) => {
                    return <BurgerIngredient key={idKey + i} type={idKey}/>
                });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;