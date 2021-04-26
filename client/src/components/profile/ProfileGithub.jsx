import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getGithubRepos } from "../../actions/profile";

const ProfileGithub = ({ userName, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(userName);
  }, [getGithubRepos]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {(typeof repos!=="String") &&
          repos.map((repo) => (
            <Card
              key={repo._id}
              variant="outlined"
              className="repo bg-white p-1 my-1"
              style={{ width: "30%", marginRight: "1.5%", marginLeft: "1.5%" }}
            >
              <CardContent>
                <Typography color="textSecondary">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ marginTop: "5%", marginBottom: "5%",color:"#555" }}
                >
                  &nbsp; {repo.description}
                </Typography>

                <CardActions>
                  <Button
                    size="small"
                    style={{ backgroundColor: "#364f6b", color: "white" }}
                  >
                    <i class="fas fa-star">{repo.stars}</i>
                  </Button>
                  <Button
                    size="small"
                    style={{ backgroundColor: "#3fc1c9", color: "white" }}
                  >
                    <i class="fas fa-eye">{repo.watchers}</i>
                  </Button>
                  <Button
                    size="small"
                    style={{ backgroundColor: "#364f6b", color: "white" }}
                  >
                    <i class="fas fa-code-branch">{repo.forks}</i>
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
/*

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



<div key={repo._id} className="repo bg-white p-1 my-1">
              <div>
                  <h4>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                      </a>
                  </h4>
                  <p>{repo.description}</p>
              </div>
              <div>
                  <ul>
                      <li className="badge badge-primary">
                          Stars: {repo.stars}
                      </li>
                      <li className="badge badge-dark">
                          Watchers: {repo.watchers}
                      </li>
                      <li className="badge badge-light">
                          Forks: {repo.forks}
                      </li>
                  </ul>
              </div>
          </div>

 */
