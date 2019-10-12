import React, { Component } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid
} from "@material-ui/core";
import BlacklightLogo from "../assets/BLACKLIGHT-2.png";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      redirect: ""
    };
  }
  render() {
    return (
      <Container>
        <img
          alt="logo"
          src={BlacklightLogo}
          style={{ width: "80%", marginTop: "50px", marginBottom: "50px" }}
        />
        <Typography
          variant="body1"
          style={{ fontSize: "20px", marginBottom: "10px" }}
        >
          Sign Up
        </Typography>
        <Grid
          container
          alignItems="center"
          alignContent="center"
          justify="center"
          direction="row"
          noWrap
          style={{ marginTop: "10px" }}
        >
          <Grid item>
            <TextField
              variant="outlined"
              label="First Name"
              style={{
                marginRight: "5px",
                marginBottom: "10px",
                width: "300px"
              }}
              onChange={e => this.setState({ firstName: e.target.value })}
            ></TextField>
            <TextField
              variant="outlined"
              label="Last Name"
              style={{
                marginLeft: "5px",
                marginBottom: "10px",
                width: "300px"
              }}
              onChange={e => this.setState({ lastName: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Email"
              style={{
                marginRight: "5px",
                marginBottom: "10px",
                width: "300px"
              }}
              onChange={e => this.setState({ email: e.target.value })}
            ></TextField>
            <TextField
              variant="outlined"
              label="Phone (no dashes or spaces)"
              style={{
                marginLeft: "5px",
                marginBottom: "10px",
                width: "300px"
              }}
              onChange={e => this.setState({ phone: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              type="password"
              label="Password"
              style={{
                marginRight: "5px",
                marginBottom: "10px",
                width: "300px"
              }}
              onChange={e => this.setState({ password: e.target.value })}
            ></TextField>
            <TextField
              variant="outlined"
              type="password"
              label="Confirm Password"
              style={{
                marginLeft: "5px",
                marginBottom: "10px",
                width: "300px"
              }}
              onChange={e => this.setState({ firstName: e.target.value })}
            ></TextField>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          style={{
            marginTop: "10px",
            borderRadius: 35,
            fontWeight: "bolder",
            fontSize: "17px",
            backgroundColor: "#854DFF",
            color: "#DBDBDB"
          }}
          onClick={() => this.signUp()}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          style={{
            marginTop: "10px",
            borderRadius: 35,
            fontWeight: "bolder",
            fontSize: "17px",
            backgroundColor: "#854DFF",
            color: "#DBDBDB"
          }}
          onClick={() => this.setState({ redirect: "/" })}
        >
          Back
        </Button>
        {this.state.redirect == "" ? (
          <div />
        ) : (
          <Redirect to={this.state.redirect} />
        )}
      </Container>
    );
  }

  async signUp() {
    var { firstName, lastName, email, phone, password } = this.state;

    var formatted = this.matchStrings();

    if (!formatted) {
      console.log("failed");
      return;
    }

    var resp = await axios.post("http://localhost:5000/api/register_user", {
      firstName,
      lastName,
      email,
      phone,
      password
    });

    console.log(resp);

    if (resp.data.user) {
      this.setState({ redirect: "/dashboard" });
    }
  }

  matchStrings() {
    if (!this.state.firstName.match(/[A-Za-z]+/)) {
      console.log(1);
      return false;
    }

    if (!this.state.lastName.match(/[A-Za-z]+/)) {
      console.log(2);
      return false;
    }

    /* if (!this.state.phone.match(/\d{10}/)) {
      console.log(3);
      return false;
    } */

    /*if (!this.state.email.match(/[\w]+\@[\w]+\.[\w]+/)) {
      console.log(4);
      return false;
    }*/

    return true;
  }
}

export default SignupScreen;
