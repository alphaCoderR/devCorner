import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Landing from "./components/layout/Landing.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";
import Alert from "./components/layout/Alert.jsx";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import CreateProfile from "./components/profile-forms/CreateProfile";
import UpdateProfile from "./components/profile-forms/UpdateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import PostForm from "./components/posts/PostForm";
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
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/post/:id" component={Post} />
              <PrivateRoute exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute
                exact
                path="/createProfile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/editProfile"
                component={UpdateProfile}
              />
              <PrivateRoute
                exact
                path="/addExperience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/addEducation"
                component={AddEducation}
              />
              <PrivateRoute exact path="/newPost" component={PostForm} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
