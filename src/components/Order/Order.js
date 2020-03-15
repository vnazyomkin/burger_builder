import React from 'react';

import controls from '../UI/LOV/Controls';

import classes from './Order.css';
const order = (props) => {
    const ingredients = [];
    for (let ing in props.ingredients) {
        ingredients.push({
            name: controls[controls.findIndex(el => el.type === ing)].label,
            amount: props.ingredients[ing],
        });
    }
    const ingredientsOutput = ingredients.map( el => {
        return <span
            style={{
                display: 'inline-block',
                margin: '2px 8px',
                border: '1px solid #ccc',
                padding: '5px',
            }} 
            key={el.name}>{el.name} ({el.amount})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ингредиены: {ingredientsOutput}</p>
            <p>Цена: <strong>{props.price + 'руб.'}</strong></p>
            <p>Дата: {Date(props.date)}</p>
        </div>
    );
};


export default order;