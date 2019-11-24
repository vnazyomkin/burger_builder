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
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type]++;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({totalPrice: newPrice,  ingredients: updatedIngredients});


    }

    removeIngredientHandler = (type) => {

    }

    render() {
        return (
          <Aux>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls
                ingredientAdded={this.addIngredientHandler} />
          </Aux>
        );
    }
}

export default BurgerBuilder;