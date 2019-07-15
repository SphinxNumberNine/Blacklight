import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Grid } from "@material-ui/core";
import { primary_purple } from "../colors";

class ResourcesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false, expanded2: false };
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleExpandClick2 = this.handleExpandClick2.bind(this);
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  handleExpandClick2() {
    this.setState({ expanded2: !this.state.expanded2 });
  }

  render() {
    const bull = (
      <span
        style={{
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)"
        }}
      >
        •
      </span>
    );
    return (
      <Container>
        <Typography variant="h4" style={{ marginBottom: "10px" }}>
          Resources
        </Typography>
        <Card style={{ minWidth: 275, marginBottom: "20px" }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{ color: primary_purple }}
            >
              Privacy Policy
            </Typography>
            <Typography style={{ marginBottom: 12 }} color="textSecondary">
              noun
            </Typography>
            <Typography variant="body2" component="p">
              a legal document that outlines and discloses all of the ways a
              party gathers, uses, discloses, and manages a customer or client's
              data. Most firms will require the privacy policy to be read or
              signed upon use of the firms service or product.
            </Typography>
          </CardContent>
        </Card>
        <Grid
          container
          direction="column"
          alignItems="center"
          alignContent="center"
          spacing={2}
        >
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontSize: 25, color: primary_purple }}>
                  Why Does Privacy Matter?
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography style={{ textAlign: "left" }}>
                  The world has been increasingly driven by information.
                  Websites and apps collect a broad array of data. The reasoning
                  behind the collection of your data can sometimes be confusing,
                  deceiving, and hidden within their misleading privacy
                  policies. The sharing of data can lead to various risks
                  including identity theft and spam. It is important that we
                  maintain control of our data and know our right associated
                  with maintaining its safety. In this day and age, our devices
                  contain our livelihoods and it is essential that we protect it
                  just as we protect or valuables.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography style={{ fontSize: 25, color: primary_purple }}>
                  Misleading Language
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography style={{ textAlign: "left" }}>
                  Often times, privacy policies will be written to be ambiguous.
                  Adding words such as may, might and could, provide the service
                  provider power over your data. The company is not saying they
                  will use your data for a specific use but nor are they saying
                  it won’t ever happen. Sound pretty suspect right? As a
                  consumer you want to be aware of what they could possibly do,
                  even if they are not currently.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontSize: 25, color: primary_purple }}>
                  Unwanted Data Sharing
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography style={{ textAlign: "left" }}>
                  Companies often sell your data to third parties. This could be
                  in the form of emails and content preferences to your browser
                  history. Sure, this allows companies to provide you valuable
                  features and enhance your experience, but it is important to
                  know what data is being shared and to who. Understanding this
                  could protect you from having your sensitive data shared with
                  unwanted third parties and protect you from risks such as spam
                  and identity fraud.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontSize: 25, color: primary_purple }}>
                  Location Sharing
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography style={{ textAlign: "left" }}>
                  Applications frequently request to use your current location
                  to enhance the user experience. Although this is often
                  completely safe and may be required depending on the app,
                  users should be aware of when they can turn this feature off
                  and how exactly their locations add to the services the
                  provider offers.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Grid item>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontSize: 25, color: primary_purple }}>
                  Revision Clauses
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Most privacy policies conclude with a statement giving the
                  company the right to alter the privacy policy at any time
                  without having to notify you of the change. Although it is
                  understandable why companies may amend their policies,
                  consumers should be aware of the changes. It is possible that
                  a privacy change could be something that may impact your
                  experience and put your data at risk.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ResourcesScreen;
