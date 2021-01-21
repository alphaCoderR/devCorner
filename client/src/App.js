import "./App.css";
import React, { Fragment } from "react";
import{BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Landing from "./components/layout/Landing.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";

const App = () => (
  <Router>
<Fragment>
    <Navbar />
    <Route exact path="/" component={Landing}/>
    <section className="container">
      <Switch>
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
  </Fragment>
  </Router>
  
);

export default App;
