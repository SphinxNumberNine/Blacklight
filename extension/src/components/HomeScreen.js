import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ textAlign: "left" }}>
        <Typography
          style={{ fontSize: "40px", marginTop: "50px" }}
          variant="h4"
          component="h4"
          gutterBottom
        >
          Revealing True
        </Typography>
        <Typography
          style={{ fontSize: "40px" }}
          variant="h4"
          component="h4"
          gutterBottom
        >
          Privacy
        </Typography>
      </Container>
    );
  }
}

export default HomeScreen;
