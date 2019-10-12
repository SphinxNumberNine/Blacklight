import React, { Component } from "react";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import ErrorLogo from "@material-ui/icons/ErrorOutline";
import PhoneLockLogo from "@material-ui/icons/ScreenLockPortrait";
import CloudLogo from "@material-ui/icons/CloudOutlined";
import LockDockLogo from "../assets/LockDoctrans.png";
import { goTo } from "route-lite";

import RalewayExtraBold from "../assets/fonts/Raleway-ExtraBold.ttf";

import PrivacyPolicyScreen from "./PrivacyPolicyScreen";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Container style={{ textAlign: "left" }}>
        <Grid container alignItems="center" direction="row" noWrap>
          <Grid item>
            <Typography
              style={{
                fontSize: "45px",
                marginTop: "40px",
                marginLeft: "0px",
                color: "#854DFF",
                fontWeight: "bold"
              }}
              variant="h4"
              component="h4"
              gutterBottom
              noWrap
            >
              Privacy,
            </Typography>
            <Typography
              style={{
                fontSize: "45px",
                marginLeft: "0px",
                color: "#854DFF",
                fontWeight: "bold"
              }}
              variant="h4"
              component="h4"
              gutterBottom
              noWrap
            >
              Simplified.
            </Typography>
            <Typography
              style={{
                fontSize: "25px",
                marginTop: "50px",
                marginLeft: "0px "
              }}
              variant="h6"
              component="h6"
              noWrap
            >
              Use Blacklight's AI to
            </Typography>
            <Typography
              style={{ fontSize: "25px", marginLeft: "0px " }}
              variant="h6"
              component="h6"
              gutterBottom
              noWrap
            >
              protect against:
            </Typography>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: "7px" }}
              noWrap
            >
              <Grid item noWrap>
                <ErrorLogo
                  style={{
                    marginLeft: "25px",
                    marginRight: "10px",
                    color: "#854DFF",
                    verticalAlign: "middle"
                  }}
                />
              </Grid>
              <Grid item noWrap>
                <Typography style={{ verticalAlign: "middle" }}>
                  Unwanted Data Sale
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: "7px" }}
              noWrap
            >
              <Grid item noWrap>
                <ErrorLogo
                  style={{
                    marginLeft: "25px",
                    marginRight: "10px",
                    color: "#854DFF",
                    verticalAlign: "middle"
                  }}
                />
              </Grid>
              <Grid item noWrap>
                <Typography style={{ verticalAlign: "middle" }}>
                  Unwanted Location Sharing
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: "7px" }}
              noWrap
            >
              <Grid item noWrap>
                <ErrorLogo
                  style={{
                    marginLeft: "25px",
                    marginRight: "10px",
                    color: "#854DFF",
                    verticalAlign: "middle"
                  }}
                />
              </Grid>
              <Grid item noWrap>
                <Typography style={{ verticalAlign: "middle" }}>
                  Misleading Language
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ marginBottom: "7px" }}
              noWrap
            >
              <Grid item noWrap>
                <ErrorLogo
                  style={{
                    marginLeft: "25px",
                    marginRight: "10px",
                    color: "#854DFF",
                    verticalAlign: "middle"
                  }}
                />
              </Grid>
              <Grid item noWrap>
                <Typography style={{ verticalAlign: "middle" }}>
                  Much, Much More
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item noWrap>
            {/*<PhoneLockLogo
              style={{
                height: "300px",
                width: "300px",
                marginLeft: "30px",
                marginTop: "30px",
                color: "#606060"
              }}
            /> */}
            <img
              src={LockDockLogo}
              style={{ marginTop: "40px", marginLeft: "50px" }}
            />
            <Typography
              style={{
                marginLeft: "130px",
                fontSize: "20px"
              }}
              noWrap
            >
              Keep Us Humble.
            </Typography>
            <Button
              variant="outlined"
              label="Scan Our Policy"
              size="large"
              style={{
                marginTop: "5px",
                marginLeft: "110px",
                borderRadius: 35,
                fontWeight: "bolder",
                fontSize: "17px",
                backgroundColor: "#854DFF",
                color: "#DBDBDB"
              }}
              onClick={() => goTo(PrivacyPolicyScreen)}
            >
              SCAN OUR POLICY
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default HomeScreen;
