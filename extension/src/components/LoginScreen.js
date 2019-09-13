import React, { Component } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import { goTo } from 'route-lite';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

import BlacklightLogo from '../assets/BLACKLIGHT-2.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
  }

  render() {
    return (
      <Container style={{ textAlign: 'center' }}>
        <img
          alt='logo'
          src={BlacklightLogo}
          style={{ width: '80%', marginTop: '50px', marginBottom: '50px' }}
        />
        <Typography
          variant='body1'
          style={{ fontSize: '20px', marginBottom: '10px' }}
        >
          Login
        </Typography>
        <Grid
          container
          alignItems='center'
          alignContent='center'
          justify='center'
          direction='row'
          noWrap
          style={{ marginTop: '10px' }}
        >
          <Grid item>
            <TextField
              variant='outlined'
              label='Email'
              style={{ marginRight: '5px' }}
              onChange={e => this.setState({ username: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              type='password'
              label='Password'
              style={{ marginLeft: '5px' }}
              onChange={e => this.setState({ password: e.target.value })}
            ></TextField>
          </Grid>
        </Grid>
        <Button
          variant='outlined'
          style={{
            marginTop: '10px',
            borderRadius: 35,
            fontWeight: 'bolder',
            fontSize: '17px',
            backgroundColor: '#854DFF',
            color: '#DBDBDB'
          }}
          onClick={e => this.logIn()}
        >
          Log In to Blacklight
        </Button>
        <div>
          <Typography style={{ marginTop: '30px' }}>
            Don't have an account?
          </Typography>
          <Button
            variant='outlined'
            style={{
              marginTop: '10px',
              borderRadius: 35,
              fontWeight: 'bolder',
              fontSize: '17px',
              backgroundColor: '#854DFF',
              color: '#DBDBDB'
            }}
          >
            Sign Up for Blacklight
          </Button>
        </div>
        {this.state.loggedIn ? <Redirect to='/dashboard' /> : <div />}
      </Container>
    );
  }

  async logIn() {
    var { username, password } = this.state;
    var res = await axios.post(
      'http://localhost:5000/api/login',
      {
        email: username,
        password
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        }
      }
    );

    console.log(res);

    if (res.data.token) {
      console.log('logged in');
      this.setState({ loggedIn: true });
    }
  }

  signUp() {}
}

export default LoginScreen;
