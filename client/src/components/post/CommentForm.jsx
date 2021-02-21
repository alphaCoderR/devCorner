import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment, postId }) => {
  const [formdata, setFormData] = useState({
    body: "",
  });
  let { body } = formdata;
  const handleChange = (event) => {
    setFormData({ body: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addComment(formdata, postId);
    setFormData({
      body: "",
    });
  };

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Comment on this topic</h3>
      </div>
      <form class="form my-1" onSubmit={handleSubmit}>
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
