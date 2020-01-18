import React, {Component} from 'react';

import Aux from '../../../hoc/Auxilliary';
import dictRu from "../../../dictionary/ingredientsNames";
import Button from '../../UI/Button/Button';

class  OrderSummary extends Component {
    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map( el => {
            return (
                <li key={el}>
                    <span style={{textTransform: 'capitalize'}}>{dictRu[el]}</span>: {this.props.ingredients[el]}
            </li> );
            } );
        return (
            <Aux>
                <h3>Ваш заказ</h3>
                <p>Супер-бургер со следующими ингредиентами:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Общая стоимость: {this.props.totalPrice} руб.</strong> </p>
                <p>Продолжить оформление заказа?</p>
                <Button
                    btnType='Success'
                    clicked={this.props.modalClose}>ОТМЕНА</Button>
                <Button
                    btnType='Danger'
                    clicked={this.props.purchaseContinue}>ПРОДОЛЖИТЬ</Button>
            </Aux>
        );
    }

}

export default OrderSummary;