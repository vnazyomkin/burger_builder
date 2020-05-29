import React, { Component } from 'react';
import { connect } from 'react-redux';


import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
   
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
    if (this.props.error) return <p>{this.props.error.response.data.error}</p>
        if (!this.props.loading) {
            orders = (
                <div>
                {this.props.orders.reverse().map(order => {
                    return <Order 
                                key={order.key}
                                ingredients={order.ingredients}
                                price={order.price} />
                })}
            </div>
            );
        }
        
        return orders;

    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
