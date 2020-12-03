import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./login/index";
import isauth from "./auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isauth() ? (
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
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Shopy Cash</h1>} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute
        exact
        path="/dashboard"
        component={() => <h1>Dashboard Shopycash</h1>}
      />
    </Switch>
  </BrowserRouter>
);
export default Routes;
