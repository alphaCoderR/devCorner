import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeProfile } from "../../actions/profile";

const CreateProfile = ({ makeProfile, history }) => {
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
    }
  });

  const [displaySocialMedia, setSocialMedia] = useState({
    condition: false,
    text: "Add Social Media Links",
  });

  const showIcons = () => {
    displaySocialMedia.condition === false
      ? setSocialMedia({
          condition: true,
          text: "Hide Links",
        })
      : setSocialMedia({
          condition: false,
          text: "Add Social Media Links",
        });
  };

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

  // Form Submission
  const formSubmit = async (event) => {
    event.preventDefault();
    makeProfile(formData, history);
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

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={showIcons}>
            {displaySocialMedia.text}
          </button>
        </div>

        {displaySocialMedia.condition && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={formData.socialMedia.twitter}
                onChange={addingInput}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={formData.socialMedia.facebook}
                onChange={addingInput}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={formData.socialMedia.youtube}
                onChange={addingInput}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={formData.socialMedia.linkedin}
                onChange={addingInput}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={formData.socialMedia.instagram}
                onChange={addingInput}
              />
            </div>
          </Fragment>
        )}

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

CreateProfile.propTypes = {
  makeProfile: PropTypes.func.isRequired,
};

export default connect(null, { makeProfile })(withRouter(CreateProfile));
