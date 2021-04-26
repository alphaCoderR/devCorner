import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, description, current } = formData;

  const addingInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    addExperience(formData, history);
    setFormData({
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
    });
  };

  return (
    <Fragment>
      <h1 className="large text-primary" style={{ marginTop: "2%" }}>
        Add An Experience
      </h1>
      <p>
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>

      <form onSubmit={formSubmit}>
        <TextField
          id="filled-basic"
          name="title"
          value={title}
          onChange={addingInput}
          required
          type="text"
          label="Job Title"
          variant="filled"
          style={{ width: "50%", margin: "1% 25% 1% 25%" }}
        />
        <TextField
          id="filled-basic"
          name="company"
          value={company}
          onChange={addingInput}
          required
          type="text"
          label="Company"
          variant="filled"
          style={{ width: "50%", margin: "1% 25% 1% 25%" }}
        />

        <TextField
          id="filled-basic"
          onChange={addingInput}
          name="location"
          value={location}
          required
          type="text"
          label="Location"
          variant="filled"
          style={{ width: "50%", margin: "1% 25% 1% 25%" }}
        />

        <div
          className="form-group"
          style={{ display: "inline-flex", marginTop: "2%" }}
        >
          <div style={{ marginRight: "10%" }}>
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              onChange={addingInput}
              value={from}
            />
          </div>

          <div style={{ marginLeft: "10%" }}>
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              onChange={addingInput}
              value={to}
              disabled={current ? "disabled" : ""}
            />
          </div>
        </div>
        <p style={{ marginBottom: "3%" }}>
          <FormControlLabel
            control={
              <Checkbox
                name="current"
                checked={current}
                onClick={() => {
                  setFormData({ ...formData, current: !current });
                }}
                value={current}
                color="primary"
              />
            }
            label="Current Job"
          />
        </p>

        <div className="form-group">
          <textarea
            name="description"
            cols="60"
            rows="6"
            placeholder="Job Description"
            onChange={addingInput}
            value={description}
          ></textarea>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#3aafa9", textTransform: "capitalize" }}
        >
          Submit
        </Button>
        <Link className="btn btn-light my-1" to="/dashboard">
          <Button
            variant="outlined"
            color="primary"
            style={{
              color: "#3aafa9",
              borderColor: "#3aafa9",
              textTransform: "capitalize",
            }}
          >
            Go Back
          </Button>
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
