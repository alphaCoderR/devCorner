import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
      <form class="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="body"
          value={body}
          onChange={handleChange}
          required
          cols="35"
          rows="5"
          placeholder="Comment"
        ></textarea>
        <Button
          type="submit"
          value="Submit"
          variant="contained"
          style={{ marginTop: "2%",backgroundColor:"#3aafa9",color:"whitesmoke" }}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
