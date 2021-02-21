import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost,history }) => {
  const [formdata, setFormData] = useState({
    head: "",
    body: "",
  });
  let { head, body } = formdata;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addPost(formdata, history);
    setFormData({
      head: "",
      body: "",
    });
  };

  
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>What's on your mind ..</h3>
      </div>
      <form class="form my-1" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="head"
          value={head}
          placeholder="Heading"
          required
        ></input>
        <textarea
          onChange={handleChange}
          name="body"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={body}
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(withRouter(PostForm));
