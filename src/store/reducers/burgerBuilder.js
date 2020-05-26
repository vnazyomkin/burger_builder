import  * as actionTypes from '../actions/actionTypes';

const initinalState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
}

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 40,
    meat: 100,
    bacon: 80,
}

const burgerBuilder = (state=initinalState, action) => {
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
        case actionTypes.SET_INGREDIENTS:
            let totalPrice = 0;
            for (let ing in action.ingredients) {
                totalPrice += INGREDIENT_PRICES[ing]*action.ingredients[ing];
            }
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: totalPrice,
                error: false,
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            };
        default: return state
    }
}

export default burgerBuilder;