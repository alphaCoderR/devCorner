import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeProfile, getCurrentProfile } from "../../actions/profile";

const UpdateProfile = ({
  profile: { profile, loading },
  makeProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubUsername: "",
    socialMedia: {
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
    },
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills,
      bio: loading || !profile.bio ? "" : profile.bio,
      githubUsername:
        loading || !profile.githubUsername ? "" : profile.githubUsername,
      socialMedia: (profile.socialMedia)
        ? {
            twitter:loading || !profile.socialMedia.twitter
            ? ""
            :  profile.socialMedia.twitter,
            facebook:
              loading || !profile.socialMedia.facebook
                ? ""
                : profile.socialMedia.facebook,
            linkedin:
              loading || !profile.socialMedia.linkedin
                ? ""
                : profile.socialMedia.linkedin,
            youtube:
              loading || !profile.socialMedia.youtube
                ? ""
                : profile.socialMedia.youtube,
            instagram:
              loading || !profile.socialMedia.instagram
                ? ""
                : profile.socialMedia.instagram,
          }
        : {
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
          },
    });
  }, [loading]);

  const customStyle = {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    backgroundColor: "white",
  };

  const addingInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addingSocialLinks = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, socialMedia: { ...formData.socialMedia,[name]: value } });
  };

  // Form Submission
  const formSubmit =  (event) => {
    event.preventDefault();
    makeProfile(formData, history, true);
    setFormData({
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      bio: "",
      githubUsername: "",
      socialMedia: {
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
      },
    });
  };

  return (
    <div style={customStyle}>
      <h1 classNameName="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
          <select
            name="status"
            required
            value={formData.status}
            onChange={addingInput}
          >
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={formData.company}
            onChange={addingInput}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={addingInput}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={addingInput}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={formData.skills}
            onChange={addingInput}
            required
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubUsername"
            value={formData.githubUsername}
            onChange={addingInput}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={formData.bio}
            onChange={addingInput}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input
              type="text"
              placeholder="Twitter URL"
              name="twitter"
              value={formData.socialMedia.twitter}
              onChange={addingSocialLinks}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input
              type="text"
              placeholder="Facebook URL"
              name="facebook"
              value={formData.socialMedia.facebook}
              onChange={addingSocialLinks}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input
              type="text"
              placeholder="YouTube URL"
              name="youtube"
              value={formData.socialMedia.youtube}
              onChange={addingSocialLinks}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input
              type="text"
              placeholder="Linkedin URL"
              name="linkedin"
              value={formData.socialMedia.linkedin}
              onChange={addingSocialLinks}
            />
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input
              type="text"
              placeholder="Instagram URL"
              name="instagram"
              value={formData.socialMedia.instagram}
              onChange={addingSocialLinks}
            />
          </div>
        </Fragment>

        <div style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

UpdateProfile.propTypes = {
  makeProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { makeProfile, getCurrentProfile })(
  withRouter(UpdateProfile)
);
