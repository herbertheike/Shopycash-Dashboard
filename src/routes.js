import React from "react";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./login/administrativo/index";
import ShLogin from "./login/shopping/index";
import Dashboard from "./dashboard/administrativo/index"
import ShDashboard from "./dashboard/shopping/index"
import history from "./history"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('@token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/administrativo/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/administrativo/login" component={withRouter(Login)} />
      <PrivateRoute
        exact
        path="/administrativo/dashboard"  
        component={withRouter(Dashboard)}
      />
      <Route exact path="/" component={() => <div><h1>Shopy Cash</h1>
      <p><a href="http://localhost:3000/administrativo/login">Painel Administrativo</a></p>
      <p><a href="http://localhost:3000/shopping/login">Painel Shopping</a></p></div>
      } />
    <Route exact path={"/shopping/login"} component={withRouter(ShLogin)} />
      <PrivateRoute
        exact
        path={"/shopping/"+localStorage.getItem("@slug")+"/dashboard" } 
        component={withRouter(ShDashboard)}
      />
    </Switch>
  </Router>
);
export default Routes;
