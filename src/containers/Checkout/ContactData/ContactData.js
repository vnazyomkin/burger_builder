import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.makeState('Ваше имя'),
            street: this.makeState('Улица'),
            zipCode: this.makeState('Индекс'),
            country: this.makeState('Страна'),
            email: this.makeState('Эл. почта', 'email'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Экспресс'},
                        {value: 'cheapest', displayValue: 'Самая дешёвая'},
                    ],
                }
            }
        },
        loading: false,
    }

    makeState(placeholder, type='text', elType='input', value='') {
        return {
            elementType: elType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
            },
            value: value,
        };
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true,});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            date: new Date(),
        };
        axios.post('/orders.json', order)
            .then( resp => {
                console.log(resp);
                this.setState({ 
                    loading: false,
                });
                this.props.history.push('/');
            } )
            .catch( err => this.setState({ 
                loading: false,
            }) );
  
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],

            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Заказать</Button>
            </form>
        );
        if (this.state.loading) form = <Spinner/>;
        return (
            <div className={classes.ContactData}>
                <h4>Введите ваши данные</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;