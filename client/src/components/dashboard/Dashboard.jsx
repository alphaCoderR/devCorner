import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <div class="fa-5x" style={{ color: "#feffff", textAlign: "center" }}>
      <i class="fas fa-sync fa-spin"></i>
    </div>
  ) : (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Hello {user.name}
      </p>
      {!profile === true ? (
        <Fragment>
          <p>Click the below button to create your profile</p>
          <Link to="/createProfile" className="btn btn-primary my-1" >Let's Go</Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>Your profile is already created</p>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
