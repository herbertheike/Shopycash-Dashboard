import React from "react";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./login/administrativo/index";
import ShLogin from "./login/shopping/index";
import Dashboard from "./dashboard/administrativo/index"
import ShDashboard from "./dashboard/shopping/index"
import LjDashboard from "./dashboard/loja/index"
import LjLogin from "./login/loja/index"
import MainPage from "./mainpages/index"
import CadastroCat from "./dashboard/loja/categoria"
import OrderPage from "./dashboard/loja/orders"
import history from "./history"

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
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
const PrivateRouteShop = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('@token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/shopping/login", state: { from: props.location } }}
        />
      )
    }
  />
);
const PrivateRouteStore = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('@token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/store/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={withRouter(MainPage)} />
      <Route exact path="/administrativo/login" component={withRouter(Login)} />
      <PrivateRouteAdmin
        exact
        path="/administrativo/dashboard"  
        component={withRouter(Dashboard)}
      />  
    <Route exact path={"/shopping/login"} component={withRouter(ShLogin)} />
      <PrivateRouteShop
        exact
        path={"/shopping/"+localStorage.getItem("@slug")+"/dashboard" } 
        component={withRouter(ShDashboard)}
      />
    <Route exact path={"/store/login"} component={withRouter(LjLogin)} />
    <PrivateRouteStore
        exact
        path={"/store/"+localStorage.getItem("@slug")+"/dashboard" } 
        component={withRouter(LjDashboard)}
      />
      <PrivateRouteStore 
      exact
      path={"/store/"+localStorage.getItem("@slug")+"/categorias"}
      component={withRouter(CadastroCat)}/>
      <PrivateRouteStore 
      exact
      path={"/store/"+localStorage.getItem("@slug")+"/pedidos"}
      component={withRouter(OrderPage)}/>

      <PrivateRouteStore 
      exact
      path={"/store/"+localStorage.getItem("@slug")+"/pedidos/"+localStorage.getItem("@pedidonumero")}
      component={withRouter(CadastroCat)}/>

      <PrivateRouteStore 
      exact
      path={"/store/"+localStorage.getItem("@slug")+"/checkout"}
      component={withRouter(CadastroCat)}/>
      
    </Switch>
  </Router>
);
export default Routes;
