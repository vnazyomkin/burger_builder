import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.makeStateInput('Ваше имя'),
            street: this.makeStateInput('Улица'),
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Индекс',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: this.makeStateInput('Страна'),
            email: this.makeStateInput('Эл. почта', 'email'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Экспресс'},
                        {value: 'cheapest', displayValue: 'Самая дешёвая'},
                    ],
                },
                value: 'fastest',
                validation:{},
                valid: true,                
            }
        },
        formIsValid: false,
    }

    makeStateInput(placeholder, type='text', elType='input', value='') {
        return {
            elementType: elType,
            elementConfig: {
                type: type,
                placeholder: placeholder,
            },
            value: value,
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        };
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            date: new Date(),
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = ( (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};

        const updatedElementForm = {...updatedOrderForm[inputIdentifier]};
        updatedElementForm.value = event.target.value;
        updatedElementForm.valid = checkValidity(updatedElementForm.value, updatedElementForm.validation);
        updatedElementForm.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElementForm;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Заказать</Button>
            </form>
        );
        if (this.props.loading) form = <Spinner/>;
        return (
            <div className={classes.ContactData}>
                <h4>Введите ваши данные</h4>
                {form}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));