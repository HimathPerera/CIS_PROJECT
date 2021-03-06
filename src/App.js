import React from "react";
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

const App = () => {
  //dummy user
  const USER = [
    {
      id: "124578",
      email: "test@test.com",
      password: "test12345",
    },
  ];

  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/questions" exact>
            <About />
          </Route>
          <Route path="/" exact>
            <Welcome user={USER} />
          </Route>
          <Route path="/authenticate" exact>
            <Authentication />
          </Route>

          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
