import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };
    
    componentDidMount () {
        axios.get('./orders.json')
        .then(res => {
            const orders = [];

            for (let item in res.data) {
                orders.push({
                        ...res.data[item],
                        key: item
                });
            } 
            this.setState({loading: false, orders: orders});        
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }

    render() {
        return (
            <div>
                {this.state.orders.reverse().map(order => (
                    <Order {...order}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);