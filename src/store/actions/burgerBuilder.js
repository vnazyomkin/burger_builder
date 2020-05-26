import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (ingName) => {
  return {
      type: actionTypes.ADD_INGREDIENTS,
      ingredientName: ingName
  };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(resp => {
            dispatch(setIngredients(resp.data));
        })
        .catch(err => {
            dispatch(fetchIngredientFailed());
        });

    };
};