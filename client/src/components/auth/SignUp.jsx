import React, { useState } from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert"; // An action is imported here
import { register } from "../../actions/auth";

import PropTypes from "prop-types";

const SignUp = ({ setAlert, register,isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1, password2 } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const checking = async (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      setAlert("Password do not match", "danger"); // ACTION
    } else {
      /*    **** This is an example code that shows how to communicate with our server ***** 
      
      Using axios package to communicate with our server.js in backend with data from frontend in React 
        Axios acts as a substitute for using Postman
      
      try{
        const newUser={
          name:name,
          email:email,
          password:password1
        }
        const body=JSON.stringify(newUser);
        const config={
          headers:{
            "Content-Type":"application/json"
          }
        }
        const res=await axios.post("/api/users",body,config); //url is shortened because of the proxy field in package.json
        console.log(res.data.token);
      } catch(err){
        console.log(err.message);
      }*/
      const newUser = {
        name: name,
        email: email,
        password: password1,
      };
      register(newUser); // ACTION
    }
    setformData({
      name: "",
      email: "",
      password1: "",
      password2: "",
    });
  };

  // Redirect if registration is successful
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container" style={{ textAlign: "center" }}>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={checking}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password1"
            minLength="8"
            onChange={handleChange}
            value={password1}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="8"
            onChange={handleChange}
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};


// mapStateToProps : this func gives us the value of the state in auth reducer
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// ****** To use an action we have to pass it in the connect()
// ***** connect() takes 2 parameters : i)any state you want to map & ii) a js objects with any actions you want to follow
export default connect(mapStateToProps, { setAlert, register })(SignUp);
