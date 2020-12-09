import React from "react";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./login/index";
import Dashboard from "./dashboard/index"
import history from "../src/history"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("@token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/login" component={withRouter(Login)} />
      <PrivateRoute
        exact
        path="/dashboard"  
        component={withRouter(Dashboard)}
      />
      <Route exact path="/" component={() => <h1>Shopy Cash</h1>} />
    </Switch>
  </Router>
);
export default Routes;
