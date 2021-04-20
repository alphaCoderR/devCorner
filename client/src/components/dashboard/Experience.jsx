import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Moment from "react-moment";
import { connect } from "react-redux";
import { delExperience } from "../../actions/profile";

const Experience = ({ experience, delExperience }) => {
  const delFunc = (id) => {
    delExperience(id);
  };

  const experiences = experience.map((exp) => (
    <tr key={exp.id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
      <td>
        <Fab size="medium" style={{ color: "red" }} aria-label="delete">
          <DeleteIcon
            onClick={() => {
              delFunc(exp.id);
            }}
          />
        </Fab>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  delExperience: PropTypes.func.isRequired,
};

export default connect(null, { delExperience })(Experience);

/*
 
 */
