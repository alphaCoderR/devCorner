import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { getCurrentProfile, delAccount } from "../../actions/profile";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../Spinner";

const Dashboard = ({
  getCurrentProfile,
  delAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <h1 style={{margin:"5% auto 3% auto"}} className="large text-primary">Dashboard</h1>
      {!profile === true ? (
        <Fragment>
          <Typography variant="h2" component="h2">
            Dashboard
          </Typography>
          <p className="lead"> Hello {user.name}</p>
          <p>Click the below button to create your profile</p>
          <Link to="/createProfile" className="btn btn-primary my-1">
            Let's Go
          </Link>
        </Fragment>
      ) : (
        <div style={{ display: "flex" }}>
          <Card varient="outlined" style={{ width: "30%" }}>
            <CardContent>
              <img
                style={{ borderRadius: "120px",width:"80%" }}
                src={profile.user.avatar}
              ></img>
              <p className="lead"> Hello {user.name}</p>
              <DashboardActions />
            </CardContent>
          </Card>

          <div style={{ width: "2%" }}></div>

          <Card varient="outlined">
            <CardContent>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />

              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => delAccount(user._id)}
                >
                  <i className="fas fa-user-minus" /> Delete My Account
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  delAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, delAccount })(
  Dashboard
);

/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

<Avatar
              avatarStyle="Circle"
              topType="Hat"
              accessoriesType="Sunglasses"
              facialHairType="Blank"
              clotheType="Hoodie"
              clotheColor="PastelBlue"
              eyeType="Happy"
              eyebrowType="FlatNatural"
              mouthType="Default"
              skinColor="Brown"
            />

 */
