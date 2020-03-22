import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.makeStateInput('Ваше имя'),
            street: this.makeStateInput('Улица'),
            zipCode: this.makeStateInput('Индекс'),
            country: this.makeStateInput('Страна'),
            email: this.makeStateInput('Эл. почта', 'email'),
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

    makeStateInput(placeholder, type='text', elType='input', value='') {
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
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }


        const order = {
            date: new Date(),
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
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

    inputChangedHandler = ( (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};

        const updatedElementForm = {...updatedOrderForm[inputIdentifier]};
        updatedElementForm.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElementForm;
        
        this.setState({orderForm: updatedOrderForm});
    });

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],

            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Заказать</Button>
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