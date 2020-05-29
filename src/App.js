import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component { 
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routers = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routers = (
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>
          {routers}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

