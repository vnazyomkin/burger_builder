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
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasable: true,
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
        return  sum > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true,});
    }

    modalClosedHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {...this.props.ings};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] < 1;
        }

        let orderSummary = null; 

        let burger = this.state.error ? <p>Невозможно загрузить ингредиенты!</p> : <Spinner/>;

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
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHadler(BurgerBuilder, axios));