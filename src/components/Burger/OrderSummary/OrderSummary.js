import React from 'react';

import Aux from '../../../hoc/Auxilliary';
import dictRu from "../../../dictionary/ingredientsNames";
import Button from '../../UI/Button/Button';

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
            <p><strong>Общая стоимость: {props.totalPrice} руб.</strong> </p>
            <p>Продолжить оформление заказа?</p>
            <Button
                btnType='Success'
                clicked={props.modalClose}>ОТМЕНА</Button>
            <Button
                btnType='Danger'
                clicked={props.purchaseContinue}>ПРОДОЛЖИТЬ</Button>
        </Aux>
    );
}

export default orderSummary;