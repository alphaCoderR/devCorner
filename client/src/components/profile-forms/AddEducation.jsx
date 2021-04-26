import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, withRouter } from "react-router-dom";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    to,
    description,
    current,
  } = formData;

  const addingInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    addEducation(formData, history);
    setFormData({
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
    });
  };

  return (
    <div>
      <h1 className="large text-primary" style={{ marginTop: "2%" }}>
        Add Your Education
      </h1>
      <p>
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>

      <form onSubmit={formSubmit}>
        <TextField
          id="filled-basic"
          name="school"
          onChange={addingInput}
          value={school}
          required
          type="text"
          label="School or Bootcamp"
          variant="filled"
          style={{ width: "50%", margin: "1% 25% 1% 25%" }}
        />
        <TextField
          id="filled-basic"
          name="degree"
          onChange={addingInput}
          value={degree}
          required
          type="text"
          label="Degree or Certificate"
          variant="filled"
          style={{ width: "50%", margin: "1% 25% 1% 25%" }}
        />

        <TextField
          id="filled-basic"
          name="fieldOfStudy"
          onChange={addingInput}
          value={fieldOfStudy}
          required
          type="text"
          label="Field Of Study"
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
            label="Current School or Bootcamp"
          />
        </p>
        <div className="form-group">
          <textarea
            name="description"
            cols="60"
            rows="6"
            placeholder="Program Description"
            value={description}
            onChange={addingInput}
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
    </div>
  );
};

AddEducation.propTypes = { addEducation: PropTypes.func.isRequired };

export default connect(null, { addEducation })(withRouter(AddEducation));
