import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import NotFoundPage from "./pages/NotFoundPage";
import PageDefault from "./pages/PageDefaullt";
import Payments from "./pages/Payments";
import Signup from "./pages/Signup";
import EditProfile from "./pages/EditProfile";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/feed" component={Feed} />
        <Route path="/page-default" component={PageDefault} />
        <Route path="/payments" component={Payments} />
        <Route path="/cadastro" component={Signup} />
        <Route path="/editar-perfil" component={EditProfile} />
        <Route component={NotFoundPage} />
        {/* <Redirect to="/404"/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
