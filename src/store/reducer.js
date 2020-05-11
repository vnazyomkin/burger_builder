import  * as actionTypes from './action';

const initinalState = {
    ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0,
    },
    totalPrice: 0,
}

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 40,
    meat: 100,
    bacon: 80,
}

const reducer = (state=initinalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1, 
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1, 
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
    }
    return state;
}

export default reducer;