import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { addLike, removeLike, removePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: {
    _id,
    head,
    body,
    name,
    avatar,
    user,
    likes,
    dislikes,
    comments,
    date,
  },
  addLike,
  removeLike,
  removePost,
  showActions,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginLeft: "20%",
    },
  }));
  const classes = useStyles();
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href={"/profile/" + user}>
          <Avatar alt={name} src={avatar} className={classes.large} />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="">{head}</p>
        <p className="my-1">{body}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <Link to={`/post/${_id}`}>
              <Button
                variant="outlined"
                style={{ color: "#3aafa9", borderColor: "#3aafa9" }}
                startIcon={<VisibilityIcon />}
              >
                View
              </Button>
            </Link>
            {auth.isAuthenticated && auth.loading === false && (
              <Fragment>
                <button
                  onClick={(event) => {
                    addLike(_id);
                  }}
                  type="button"
                  className="btn btn-light"
                >
                  <ThumbUpAltIcon style={{ color: "#3aafa9" }} />
                  <span style={{ verticalAlign: "super" }}>{likes.length}</span>
                </button>
                <button
                  onClick={(event) => {
                    removeLike(_id);
                  }}
                  type="button"
                  className="btn btn-light"
                >
                  <ThumbDownIcon color="default" />
                  <span style={{ verticalAlign: "super" }}>
                    {dislikes.length}
                  </span>
                </button>
                {!auth.loading && user === auth.user._id && (
                  <Fab
                    size="medium"
                    style={{ color: "red" }}
                    aria-label="delete"
                  >
                    <DeleteIcon
                      onClick={(event) => {
                        removePost(_id);
                      }}
                    />
                  </Fab>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, removePost })(
  PostItem
);
