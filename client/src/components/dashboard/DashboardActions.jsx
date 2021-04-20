import React from "react";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const DashboardActions = (props) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: teal[500],
      },
      secondary: {
        main: "#26a69a",
      },
    },
  });

  return (
    <div class="dash-buttons" style={{ marginTop: "30%" }}>
      <ThemeProvider theme={theme}>
        <CardActions style={{ display: "block" }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            style={{ textTransform: "capitalize", fontSize: "20px",width:"85%" }}
          >
            <Link to="/editProfile">
              <AccountBoxRoundedIcon
                style={{ marginBottom: "-5px", color: "#3aafa9" }}
              />{" "}
              Edit Profile
            </Link>
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            style={{
              marginTop: "10%",
              textTransform: "capitalize",
              fontSize: "20px",
            }}
          >
            <Link to="/addExperience">
              <AssignmentTurnedInRoundedIcon
                style={{ marginBottom: "-5px", color: "#3aafa9" }}
              />{" "}
              Add Experience
            </Link>
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            style={{
              marginTop: "10%",
              textTransform: "capitalize",
              fontSize: "20px",
              width:"85%"
            }}
          >
            <Link to="/addEducation">
              <MenuBookRoundedIcon
                style={{ marginBottom: "-5px", color: "#3aafa9" }}
              />{" "}
              Add Education
            </Link>
          </Button>
        </CardActions>
      </ThemeProvider>
    </div>
  );
};

export default DashboardActions;
