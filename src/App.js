import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={withRouter(Auth)} />
        <Route path="/" exact component={withRouter(BurgerBuilder)} />
        <Redirect to = "/" />
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={withRouter(Checkout)} />
            <Route path="/orders" component={withRouter(Orders)} />
            <Route path="/logout" component={withRouter(Logout)} />
            <Route path="/auth" component={withRouter(Auth)} />
            <Route path="/" exact component={withRouter(BurgerBuilder)} />
            <Redirect to = "/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  };
};

const mapStateToPorps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
};
 
const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToPorps, mapDispatchToProps)(App));
