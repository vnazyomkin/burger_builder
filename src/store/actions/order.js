import {  } from 'redux';

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
     return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
     };
};

export const purchaseBurgerFail = (error) => {
    return {
       type: actionTypes.PURCHASE_BURGER_FAIL,
       error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then( resp => {orderData
                console.log(resp.data);
                dispatch(purchaseBurgerSuccess(resp.data.name, orderData));
            } )
            .catch( err => {
                dispatch(purchaseBurgerFail(err));
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get(`./orders.json?auth=${token}`)
        .then(res => {
            const orders = [];

            for (let item in res.data) {
                orders.push({
                        ...res.data[item],
                        key: item
                });
            } 
            dispatch(fetchOrderSuccess(orders));      
        })
        .catch(err => {
            dispatch(fetchOrderFail(err)); 
        });
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};