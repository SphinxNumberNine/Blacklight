import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import theme from '../theme';

const styles = {
  root: {
    colorDefault: '5804ff',
    colorPrimary: '5804ff'
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>Privacy Policy Helper</Typography>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Header);
