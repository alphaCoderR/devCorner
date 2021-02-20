import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primry">Education</h2>
      {education.length > 0 ? (
        <Fragment>
          {education.map((edu) => (
            <div key={edu._id}>
              <h3 className="text-dark">{edu.school}</h3>
              <p>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
                {edu.to ? <Moment format="DD/MM/YYYY">{edu.to}</Moment> : "Now"}
              </p>
              <p>
                <strong>Degree: </strong> {edu.degree}
              </p>
              <p>
                <strong>Field of Study: </strong> {edu.fieldOfStudy}
              </p>
              {edu.description && (
                <p>
                  <strong>Description: </strong> {edu.description}
                </p>
              )}
            </div>
          ))}
        </Fragment>
      ) : (
        <h4>No Education Details</h4>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEducation;
