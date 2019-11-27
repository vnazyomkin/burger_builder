import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 40,
    meat: 100,
    bacon: 80,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,

        },
        totalPrice: 100,
        purchasable: false,
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

    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] < 1;
        }
        return (
          <Aux>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemove={this.removeIngredientHandler}
                disabled={disableInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}/>
          </Aux>
        );
    }
}

export default BurgerBuilder;