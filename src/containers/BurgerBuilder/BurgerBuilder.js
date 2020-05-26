import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHadler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasable: true,
        purchasing: false,
        loading: false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }



    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients).reduce((sum, item) => sum + ingredients[item], 0);
        return  sum > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true,});
    }

    modalClosedHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {...this.props.ings};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] < 1;
        }

        let orderSummary = null; 

        let burger = this.props.error ? <p>Невозможно загрузить ингредиенты!</p> : <Spinner/>;

        if (this.props.ings ) {        
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemove={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchasableState(this.props.ings)}
                    ordered={this.purchasingHandler}/>
            </Aux>
            );

            orderSummary = (
                <OrderSummary
                    totalPrice={this.props.price}
                    ingredients={this.props.ings}
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHadler(BurgerBuilder, axios));