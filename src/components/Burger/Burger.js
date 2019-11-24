import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(idKey => {
            return [...Array(props.ingredients[idKey])]
                .map( (_, i) => {
                    return <BurgerIngredient key={idKey + i} type={idKey}/>
                })
        })
        .reduce( (arr, el) => arr.concat(el), [] );

    if (transformIngredients.length === 0) {
        transformIngredients = <p>Пожалуйста, начните добавлять ингредиенты</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;