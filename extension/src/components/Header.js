/* global chrome */

import React from 'react';
import Router, { goTo, goBack, Link } from 'route-lite';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import ChartIcon from '@material-ui/icons/InsertChart';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import BlacklightLogo from '../assets/BLACKLIGHT-2.png';

// components
import HomeScreen from './HomeScreen';
import ResourcesScreen from './ResourcesScreen';
import WarningsScreen from './WarningsScreen';
import SettingsScreen from './SettingsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#DBDBDB'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#FFFFFF'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    color: '#854DFF'
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      // duration: theme.transitions.duration.enteringScreen
      duration: 225
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      // duration: theme.transitions.duration.leavingScreen
      duration: 225
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  icon: {
    color: '#854DFF'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [screen, setScreen] = React.useState('Home');

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function renderScreen() {
    switch (screen) {
      case 'Home':
        return <HomeScreen />;
      case 'Warnings':
        return <WarningsScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'Our Privacy Policy':
        return <PrivacyPolicyScreen />;
      case 'Resources':
        return <ResourcesScreen />;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <img
            alt='logo'
            src={BlacklightLogo}
            style={{ width: '40%' }}
            onClick={() => {
              /* console.log("2");
              chrome.runtime.sendMessage({
                subject: "link clicked",
                url: "https://blacklightlaw.wixsite.com/blacklight"
              }); */
              chrome.tabs.create({
                url: 'https://blacklightai.com'
              });
            }}
          />
          {/*<Typography variant="h6" noWrap>
            Blacklight
          </Typography>*/}
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <Typography>Menu</Typography>
          <IconButton onClick={handleDrawerClose} className={classes.icon}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='Home' onClick={() => goTo(HomeScreen)}>
            <ListItemIcon>
              <HomeIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary='Blacklight Home' />
          </ListItem>
          <ListItem button key='Warnings' onClick={() => goTo(WarningsScreen)}>
            <ListItemIcon>
              <FeedbackIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary='Warnings' />
          </ListItem>
          <ListItem
            button
            key='Our Privacy Policy'
            onClick={() => goTo(PrivacyPolicyScreen)}
          >
            <ListItemIcon>
              <LibraryBooksIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary='Our Privacy Policy' />
          </ListItem>
          <ListItem
            button
            key='Resources'
            onClick={() => goTo(ResourcesScreen)}
          >
            <ListItemIcon>
              <ChartIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary='Privacy Resources' />
          </ListItem>
          <ListItem button key='Settings' onClick={() => goTo(SettingsScreen)}>
            <ListItemIcon>
              <SettingsIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>{renderScreen()}</Router>
      </main>
    </div>
  );
}
