import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHadler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 40,
    meat: 100,
    bacon: 80,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 100,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(resp => {
                this.setState( {ingredients: resp.data} )
            })
            .catch(err => {
                this.setState( {error: true} );
            });
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients).reduce((sum, item) => sum + ingredients[item], 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]++;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({totalPrice: newPrice,  ingredients: updatedIngredients});

        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] < 1) return;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]--;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({totalPrice: newPrice,  ingredients: updatedIngredients});

        this.updatePurchasableState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true,});
    }

    modalClosedHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('Вы заказали');
        this.setState({loading: true,});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Val',
                adress: {
                    street: 'Teststree t',
                    zipCode: '321435',
                    country: 'Russia',
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest',
            },
            date: new Date(),
        };
        axios.post('/orders.json', order)
            .then( resp => {
                console.log(resp);
                this.setState({ 
                    loading: false,
                    purchasing: false, });
            } )
            .catch( err => this.setState({ 
                loading: false,
                purchasing: false, }) );

    }

    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] < 1;
        }

        let orderSummary = null; 

        let burger = this.state.error ? <p>Невозможно загрузить ингредиенты!</p> : <Spinner/>;

        if (this.state.ingredients) {        
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}/>
            </Aux>
            );

            orderSummary = (
                <OrderSummary
                    totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    modalClose={this.modalClosedHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
            );

            if (this.state.loading) {
                orderSummary = <Spinner/>;
            }
        }

        return (
          <Aux>
              <Modal
                  show={this.state.purchasing}
                  modalClosed={this.modalClosedHandler}>
                  {orderSummary}
              </Modal>
                {burger}
          </Aux>
        );
    }
}

export default withErrorHadler(BurgerBuilder, axios);