import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { delEducation } from "../../actions/profile";

const Education = ({ education, delEducation }) => {
  const delFunc = (id) => {
    delEducation(id);
  };

  const eduDetails = education.map((edu) => (
    <tr key={edu.id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => {
            delFunc(edu.id);
          }}
          className="btn btn-danger"
        >
          X
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="my-2">Education Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{eduDetails}</tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  delEducation: PropTypes.func.isRequired,
};

export default connect(null, { delEducation })(Education);
