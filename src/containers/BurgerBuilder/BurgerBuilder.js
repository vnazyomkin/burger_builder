import React, { Component } from 'react';

import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuilControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,

        }
    }
    render() {
        return (
          <Aux>
              <Burger ingredients={this.state.ingredients}/>
              <BuilControls/>
          </Aux>
        );
    }
}

export default BurgerBuilder;