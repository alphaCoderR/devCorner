import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, delAccount } from "../../actions/profile";
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

  return loading && profile === null ? <Spinner/> : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Hello {user.name}
      </p>
      {!profile === true ? (
        <Fragment>
          <p>Click the below button to create your profile</p>
          <Link to="/createProfile" className="btn btn-primary my-1">
            Let's Go
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
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
        </Fragment>
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
