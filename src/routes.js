import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { useAuth } from "./contexts/auth";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import NotFoundPage from "./pages/NotFoundPage";
import Payments from "./pages/Payments";
import VagaPage from "./pages/VagaPage";
import Notify from "./pages/Notify";
import Registration from "./pages/Registration";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CriarPerfil";
import UserProfile from "./pages/UserProfile";
import UserProfile2 from "./pages/UserProfile2";
import Login from "./pages/Login";
import PasswordRecovery from "./pages/PasswordRecovery";
import PasswordRegistration from "./pages/PasswordRegistration";
import Wishlist from "./pages/Wishlist";
import ServiceRegistration from "./pages/ServiceRegistration";
import JobOffers from "./pages/JobOffers";
import Teste from "./pages/Teste";
import Loading from "./components/Loading";
import Vagas from "./pages/Vagas";
import CandidatosVagaPage from "./pages/CandidatosVagaPage";

function PrivateRoute({ ...rest }) {
  const { signed, user, loading, validate, signOut } = useAuth();
  // console.log(`is signed: ${signed} - user: ${user}`);
  if (loading) {
    return <Loading />;
    // return <h1 className="text-light">Loading</h1>
  }
  if (!signed) {
    return <Redirect to="/" />;
  }
  validate();
  return <Route {...rest} />;
}

function Routes() {
  const { signOut } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/recuperacao" exact component={PasswordRecovery} />
        <Route path="/novaSenha" exact component={PasswordRegistration} />
        <Route path="/home" component={Home} exact />
        <PrivateRoute path="/feed" component={Feed} />
        {/* <Route path="/page-default" component={Feed} /> */}
        <Route
          path="/contratante/vaga/:id/candidaturas/:perfilId/"
          component={UserProfile2}
        />
        <Route path="/contratante/vaga/:id" component={CandidatosVagaPage} />
        <PrivateRoute path="/vagas/:id" component={VagaPage} />
        <PrivateRoute
          exact
          path="/usuarios/meu-perfil"
          component={UserProfile}
        />
        <PrivateRoute path="/usuarios/:id" component={UserProfile} />
        <Route path="/como-funciona" component={Teste} />
        <Route path="/payments" component={Payments} />
        <Route path="/notify" component={NotFoundPage} />
        <Route path="/cadastro" component={Registration} />
        <Route path="/signup" component={Signup} />
        <Route path="/criar-perfil" component={CreateProfile} />
        <Route path="/wishlist" component={NotFoundPage} />
        <PrivateRoute
          path="/:tipoUsuario/vagas/:status"
          exact
          component={Vagas}
        />
        <PrivateRoute
          path="/cadastro-job"
          exact
          component={ServiceRegistration}
        />
        <Route path="/job-offers" component={JobOffers} />
        <Route path="/logout" render={signOut} />
        {/* Apenas para teste e criação de componentes */}
        <Route path="/lincon-dev" component={Feed} />
        <Route component={NotFoundPage} />
        {/* <Redirect to="/404"/> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
