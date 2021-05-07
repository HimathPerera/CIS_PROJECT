import React, { useState, useCallback, useEffect } from "react";
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
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState(false);

  const login = useCallback((token, admin) => {
    setToken(token);
    setIsAdmin(admin);
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setIsAdmin(false);
    localStorage.clear();
  }, []);

  const admin = useCallback((token, admin) => {
    setIsAdmin(admin);
    setAdminToken(token);
    localStorage.setItem("userItem", JSON.stringify({ token, admin }));
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userItem"));
    if (storedUser && storedUser.token && storedUser.admin) {
      admin(storedUser.token, storedUser.admin);
    }
  }, [admin]);

  // console.log(localStorage.getItem("LOGIN"));
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        admin,
        isAdmin,
        token,
        adminToken,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            {token && (
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
