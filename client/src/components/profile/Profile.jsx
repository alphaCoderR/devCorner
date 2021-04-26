import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";


const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth:{isAuthenticated,user},
  match,
  // In this match obj there is another obj called params which holds all the matching params in the url that we passed
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {match.params.id === user._id && isAuthenticated === true && (
            <IconButton color="primary" component="span">
              <Link to="/editProfile">
                <EditTwoToneIcon />
              </Link>
            </IconButton>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExperience profile={profile} />
            <ProfileEducation profile={profile} />
            {profile.githubUsername && (
              <ProfileGithub userName={profile.githubUsername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);

