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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
    return dispatch => {
        console.log('[fetchOrders]');
        dispatch(fetchOrderStart());
        axios.get('./orders.json')
        .then(res => {
            console.log('resp: ');
            console.log(res.data);
            const orders = [];

            for (let item in res.data) {
                console.log('item ' + item);
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