import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Welcome from "./welcome/pages/welcome.page";
import Authentication from "./user/pages/authentication.page";
import About from "./about/about.page";
import Admin from "./user/components/admin/admin.component";
import { AuthContext } from "./context/auth-context";

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback(() => {
    setisLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setisLoggedIn(false);
    setIsAdmin(false);
  }, []);

  const admin = useCallback(() => {
    setIsAdmin(true);
  }, []);

  // console.log(localStorage.getItem("LOGIN"));
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, admin, isAdmin }}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            {isLoggedIn && (
              <Route path="/surway/questions" exact>
                <About />
              </Route>
            )}
            <Route path="/" exact>
              <Welcome />
            </Route>
            {isAdmin && (
              <Route path="/authenticate/admin">
                <Admin />
              </Route>
            )}
            <Route path="/authenticate" exact>
              <Authentication />
            </Route>

            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
