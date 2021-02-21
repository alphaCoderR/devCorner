import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
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
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
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
            <Link to={`/post/${_id}`} className="btn btn-primary">
              See Post
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
                  <i className="fas fa-thumbs-up"></i>
                  <span>{likes.length}</span>
                </button>
                <button
                  onClick={(event) => {
                    removeLike(_id);
                  }}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-down"></i>
                  <span>{dislikes.length}</span>
                </button>
                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={(event) => {
                      removePost(_id);
                    }}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times"></i>Delete
                  </button>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps={
  showActions:true
}

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
