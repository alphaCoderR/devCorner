import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: teal[500],
      },
      secondary: {
        main: "#26a69a",
      },
    },
  });

  const [formData, setformData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const dataSubmit = async (event) => {
    event.preventDefault();
    login(formData);
    setformData({ email: "", password: "" });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section
      className="container"
      style={{ textAlign: "center", height: "60vh" }}
    >
      <h1 className="large text-primary">Log In</h1>
      <p className="lead" style={{ color: "rgb(0,0,0,0.6)" }}>
        <i className="fas fa-user"></i> Log In To Your Account
      </p>
      <form onSubmit={dataSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-primary"
            label="Email"
            variant="outlined"
            color="primary"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            style={{
              marginBottom: "3%",
              marginRight: "2%",
              width: "35%",
              marginTop: "2%",
            }}
          />

          <TextField
            id="outlined-primary"
            label="Password"
            variant="outlined"
            color="primary"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            style={{ marginLeft: "2%", width: "35%", marginTop: "2%" }}
          />

          <div className="form-group">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              value="Login"
            >
              Login
            </Button>
          </div>
        </ThemeProvider>
      </form>

      <p class="my-1" style={{ marginTop: "2%" }}>
        Don't have an account?{" "}
        <Link to="/register">
          <Button variant="outlined" color="primary" href="#outlined-buttons">
            Sign Up
          </Button>
        </Link>
      </p>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// mapStateToProps : this func gives us the value of the state in auth reducer
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
