import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primry">Experience</h2>
      {experience.length > 0 ? (
        <Fragment>
          {experience.map((exp) => (
            <div key={exp._id}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
                {exp.to ? <Moment format="DD/MM/YYYY">{exp.to}</Moment> : "Now"}
              </p>
              <p>
                <strong>Position: </strong> {exp.title}
              </p>
              {exp.description && (
                <p>
                  <strong>Description: </strong> {exp.description}
                </p>
              )}
            </div>
          ))}
        </Fragment>
      ) : (
        <h4>No Experience Credentials</h4>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
