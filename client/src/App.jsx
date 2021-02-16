import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Landing from "./components/layout/Landing.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";
import Alert from "./components/layout/Alert.jsx";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import UpdateProfile from "./components/profile-forms/UpdateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";


// Checking the local storage for the token
if (localStorage.token) {
  setAuthToken(localStorage.token); // Setting the header with the given token
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/createProfile" component={CreateProfile} />
              <PrivateRoute exact path="/editProfile" component={UpdateProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
