/* global chrome */
import React, { Component } from 'react';
import { Container, Typography, Button } from '@material-ui/core';

class PrivacyPolicyScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Typography variant='h4' style={{ marginBottom: '10px' }}>
          Privacy Policy
        </Typography>
        <Typography
          style={{ fontSize: '20px', color: '#854DFF', fontWeight: 'normal' }}
        >
          We are in the business of helping you protect your privacy and data.
          For this reason, we have made a commitment to ensure that our own
          Privacy Policy is easy to understand. We want to empower you to make
          the decision of what information you wish to share with us.
        </Typography>
        <Typography
          style={{ fontSize: '20px', color: '#2F2E2E', fontWeight: 'normal' }}
        >
          Our Privacy Policy, in full, can be viewed on our website. We
          encourage you to read it carefully, as we encourage for every site you
          visit.
        </Typography>
        <Button
          variant='outlined'
          label='View Our Policy'
          size='large'
          style={{
            marginTop: '30px',
            borderRadius: 35,
            fontWeight: 'bolder',
            fontSize: '17px',
            backgroundColor: '#854DFF',
            color: '#DBDBDB'
          }}
          onClick={() =>
            chrome.tabs.create({
              url: 'https://www.blacklightai.com/privacy-policy'
            })
          }
        >
          View Our Policy
        </Button>
      </Container>
    );
  }
}

export default PrivacyPolicyScreen;
