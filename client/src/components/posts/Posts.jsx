import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import PostItem from "./PostItem";

import { fetchPosts } from "../../actions/post";

const Posts = ({
  fetchPosts,
  post: { posts, loading },
  auth: { isAuthenticated },
}) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 style={{ marginTop: "3%" }} className="large text-primary">
        Posts
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Here is your feed
      </p>
      {isAuthenticated && (
        <div className="dash-buttons">
          <Link to="/newPost">
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#3aafa9",
                color: "whitesmoke",
                textTransform: "capitalize",
                letterSpacing:"1px"
              }}
              startIcon={<AddIcon />}
            >
              Create a new post
            </Button>
          </Link>
        </div>
      )}

      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
