import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost, history }) => {
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
        <h3 style={{width:"100%"}}>What's on your mind ..</h3>
      </div>
      <form class="form my-1" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="head"
          value={head}
          placeholder="Heading"
          required
          style={{
            width:"50%",
            marginBottom:"2%"
          }}
        ></input>
        <textarea
          onChange={handleChange}
          name="body"
          cols="42"
          rows="5"
          placeholder="Create a post"
          value={body}
          required
        ></textarea>
        <Button
          type="submit"
          variant="contained"
          value="Submit"
          style={{ backgroundColor: "#3aafa9", color: "whitesmoke" ,marginTop:"3%"}}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(withRouter(PostForm));
