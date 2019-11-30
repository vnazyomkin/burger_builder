import React from 'react';

import Aux from '../../../hoc/Auxilliary';
import dictRu from "../../../dictionary/ingredientsNames";

const orderSummary = (props) => {
    console.log('sg');
    const ingredientSummary = Object.keys(props.ingredients).map( el => {
        return (
            <li key={el}>
                <span style={{textTransform: 'capitalize'}}>{dictRu[el]}</span>: {props.ingredients[el]}
            </li>
        )});
    return (
        <Aux>
            <h3>Ваш заказ</h3>
            <p>Супер-бургер со следующими ингредиентами:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Продолжить оформление заказа?</p>
        </Aux>
    );
}

export default orderSummary;