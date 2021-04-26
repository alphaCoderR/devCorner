import React, { useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeProfile } from "../../actions/profile";

const CreateProfile = ({ makeProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "Select Professional Status",
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

  const addingSocialLinks = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, socialMedia: { [name]: value } });
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
      <h1 classNameName="large text-primary"  style={{ marginTop: "3%", color: "#3aafa9" }}>Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <form className="form" onSubmit={formSubmit}>
        <div className="form-group">
        <TextField
            select
            variant="filled"
            name="status"
            required
            placeholder="Your Status"
            size="normal"
            value={formData.status}
            onChange={addingInput}
            style={{ width: "60%" }}
          >
            <MenuItem key="Developer" value="Developer">
              Developer
            </MenuItem>
            <MenuItem key="Junior Developer" value="Junior Developer">
              Junior Developer
            </MenuItem>
            <MenuItem key="Senior Developer" value="Senior Developer">
              Senior Developer
            </MenuItem>
            <MenuItem key="Manager" value="Manager">
              Manager
            </MenuItem>
            <MenuItem key="Student or Learning" value="Student or Learning">
              Student or Learning
            </MenuItem>
            <MenuItem key="Instructor" value="Instructor">
              Instructor
            </MenuItem>
            <MenuItem key="Intern" value="Intern">
              Intern
            </MenuItem>
            <MenuItem key="Other" value="Other">
              Other
            </MenuItem>
          </TextField>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
        <TextField
            style={{ width: "60%" }}
            name="company"
            value={formData.company}
            onChange={addingInput}
            type="text"
            variant="filled"
            placeholder="Company"
          />
          
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
        <TextField
            style={{ width: "60%" }}
            variant="filled"
            type="text"
            name="website"
            value={formData.website}
            onChange={addingInput}
            placeholder="Your Website"
          />
          
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
        <TextField
            style={{ width: "60%" }}
            variant="filled"
            type="text"
            name="location"
            value={formData.location}
            onChange={addingInput}
            placeholder="Location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
        <TextField
            style={{ width: "60%" }}
            variant="filled"
            type="text"
            name="skills"
            value={formData.skills}
            onChange={addingInput}
            required
            placeholder="* Skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
        <TextField
            style={{ width: "60%" }}
            variant="filled"
            type="text"
            name="githubUsername"
            value={formData.githubUsername}
            onChange={addingInput}
            placeholder="Github Username"
          />
         
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
        <TextField
            style={{ width: "60%" }}
            id="filled-multiline-static"
            onChange={addingInput}
            multiline
            placeholder="A short bio of yourself"
            rows={4}
            defaultValue={formData.bio}
            variant="filled"
            name="bio"
          />
          
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <Button
            variant="outlined"
            style={{
              color: "#3aafa9",
              borderColor: "#3aafa9",
              textTransform: "capitalize",
              letterSpacing: "1px",
            }}
            onClick={showIcons}
          >
            {displaySocialMedia.text}
          </Button>
        </div>

        {displaySocialMedia.condition && (
          <Fragment>
            <div
            className="form-group social-input"
            style={{ marginLeft: "10%" }}
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="fab fa-twitter fa-2x"></i>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "180%" }}
                  id="input-with-icon-grid"
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={formData.socialMedia.twitter}
                  onChange={addingSocialLinks}
                />
              </Grid>
            </Grid>
          </div>

          <div
            className="form-group social-input"
            style={{ marginLeft: "10%" }}
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="fab fa-facebook fa-2x"></i>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "180%" }}
                  id="input-with-icon-grid"
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={formData.socialMedia.facebook}
                  onChange={addingSocialLinks}
                />
              </Grid>
            </Grid>
          </div>

          <div
            className="form-group social-input"
            style={{ marginLeft: "10%" }}
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="fab fa-youtube fa-2x"></i>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "180%" }}
                  id="input-with-icon-grid"
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={formData.socialMedia.youtube}
                  onChange={addingSocialLinks}
                />
              </Grid>
            </Grid>
          </div>

          <div
            className="form-group social-input"
            style={{ marginLeft: "10%" }}
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="fab fa-linkedin fa-2x"></i>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "180%" }}
                  id="input-with-icon-grid"
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={addingSocialLinks}
                />
              </Grid>
            </Grid>
          </div>

          <div
            className="form-group social-input"
            style={{ marginLeft: "10%" }}
          >
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <i className="fab fa-instagram fa-2x"></i>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "180%" }}
                  id="input-with-icon-grid"
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={formData.socialMedia.instagram}
                  onChange={addingSocialLinks}
                />
              </Grid>
            </Grid>
          </div>
          </Fragment>
        )}

        <div style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              color: "whitesmoke",
              backgroundColor: "#3aafa9",
              textTransform: "capitalize",
              letterSpacing: "1px",
            }}
          >
            Submit
          </Button>
          <Link className="btn btn-light my-1" to="/dashboard">
            <Button
              variant="outlined"
              style={{
                color: "#3aafa9",
                borderColor: "#3aafa9",
                textTransform: "capitalize",
                letterSpacing: "1px",
              }}
            >
              Go Back
            </Button>
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

/*
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
 */