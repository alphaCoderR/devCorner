import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { getCurrentProfile, delAccount } from "../../actions/profile";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../Spinner";

const Dashboard = ({
  getCurrentProfile,
  delAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <h1 style={{ margin: "5% auto 3% auto" }} className="large text-primary">
        Dashboard
      </h1>
      {!profile === true ? (
        <Fragment>
          <p className="lead"> Hello {user.name}</p>
          <p>Click the below button to create your profile</p>
          <Link to="/createProfile">
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: "2%",
                marginBottom: "2%",
                backgroundColor: "#3aafa9",
                textTransform:"capitalize"
              }}
            >
              Let's Go
            </Button>
          </Link>
        </Fragment>
      ) : (
        <div className="dash-display">
          <Card varient="outlined" className="dash-card-1">
            <CardContent>
              <img
                style={{ borderRadius: "120px", width: "80%" }}
                src={profile.user.avatar}
              ></img>
              <Typography
                variant="h4"
                gutterBottom
                style={{
                  color: "rgb(0,0,0,0.8",
                  marginTop: "5%",
                  fontFamily: "sans-serif",
                }}
              >
                Hello {user.name}
              </Typography>

              <DashboardActions />
            </CardContent>
          </Card>

          <div style={{ width: "2%" }}></div>

          <Card varient="outlined" className="dash-card-2">
            <CardContent>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />

              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => delAccount(user._id)}
                >
                  <i className="fas fa-user-minus" /> Delete My Account
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  delAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, delAccount })(
  Dashboard
);
