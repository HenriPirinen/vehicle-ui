import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

// eslint-disable-next-line
import ToggleButton from './components/toggleButton';
import VisGraph from './components/visVoltageLine';
import openSocket from 'socket.io-client';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerList from './components/controlDrawerList';
import MainMenu from './components/main';
import InverterTab from './components/inverter';
import LogTab from './components/log';
import WeatherTab from './components/weather';
import MapTab from './components/mapTab';
import SystemUpdateTab from './components/systemUpdate'
import SettingsTab from './components/settings';

//---Variables---//

var cellData = [
  /* 
    This 3D array stores latest measured value for each cell.
    Each value inside Group array represents measured cell value
    Z = 0; Voltage, Z = 1; Temperature
    Y = 0, Group 0; Y = 4, Group 4;
    X = 0, Cell index 0; X = 7, Cell index 7
            [Z][Y][X]
    cellData[0][1][5] = Latest measured voltage from Group 1, Cell 5.
    cellData[1][4][2] = Latest measured temperature from Group 4, Cell 2.
  */
  [ //Voltage
    [0, 0, 0, 0, 0, 0, 0, 0], //Group 0
    [0, 0, 0, 0, 0, 0, 0, 0], //Group 1 ...
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0] //... Group 9
  ],
  [ //Temperature
    [0, 0, 0, 0, 0, 0, 0, 0], //Group 0
    [0, 0, 0, 0, 0, 0, 0, 0], //Group 1 ...
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0] //... Group 9
  ]
];

//---Constants---//

const socket = openSocket('192.168.2.45:4000');

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    //height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //padding: theme.spacing.unit * 3,
    //margin: 15,
  },
});

//--Functions--//

function validateJSON(string) {
  /* Validate Json, beacause sometimes i get illegal character error at index 0... */
  try {
    JSON.parse(string);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}

//---Events---//

window.addEventListener("load", function () { //Will be replaced by fullscreen API
  setTimeout(function () {
    // This hides the address bar:
    window.scrollTo(0, 1);
  }, 0);
});

socket.on('webSocket', function (data) {
  console.log(data.handle + ' ' + data.message);
});

socket.on('dataset', function (data) {
  /*
    Event: When client receives websocket package 'dataset' from the server.
    Dataset message should be in JSON format.
    Validate JSON -> If valid -> Parse JSON -> Write values to cellData array.
    Example dataset:
    {
      "Group":2,
      "voltage":[6.10,6.20,6.30,6.40,6.50,6.60,6.70,6.80],
      "temperature":[20,20,20,20,20,20,20,20]
    }
  */
  let input = data.message.toString();

  if (validateJSON(input)) {
    let validData = JSON.parse(input);

    for (let i = 0; i < validData.voltage.length; i++) {
      cellData[0][validData.Group][i] = validData.voltage[i]; //Update latest voltage values
    }

    for (let i = 0; i < validData.temperature.length; i++) {
      cellData[1][validData.Group][i] = validData.temperature[i]; //Update latest temperature values
    }
  }
});

//---Build page---//

class App extends Component {
  constructor(props) {
    super(props)

    this.contentHandler = this.contentHandler.bind(this) //Used @ DrawerList component
  }

  state = {
    mobileOpen: false,
    selectedTab: 'Main', //This is set to current tab
    enabledGraphs: [[true, true, true, true, true], [true, true, true, true, true]], //0 = voltage, 1 = temperature
    isFullscreenEnabled: false
  };

  contentHandler = (content) => { //Change tab
    console.log(content);
    if(content !== 'Fullscreen') //Temporary solution
    {
      this.setState({ selectedTab: content });
    } else {
      this.setState({ isFullscreenEnabled: !this.state.isFullscreenEnabled });
      if (!document.fullscreenElement) {
        document.documentElement.webkitRequestFullScreen();
        //console.log(document.fullscreenEnabled);
      } else {
          if (document.exitFullscreen) {
            document.exitFullscreen(); 
            //console.log('Windowed');
          }
      }
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen }); //Open / Close drawer
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <DrawerList webSocket={socket} handleContent={this.contentHandler} />
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {this.state.selectedTab} {/*Set appbar title*/}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content} >
          <div id='appContent'>
            <div className={classes.toolbar} />
            <div style={{ height: 10 }}></div>

            {(() => {
              switch (this.state.selectedTab) {
                case 'Data':
                  return (
                    <div>
                      <VisGraph 
                          voltageData={cellData[0][0]} 
                          dataLimit={100} 
                          graphName={'Group 0'} 
                          isEnabled={this.state.enabledGraphs[0][0]}
                      />
                      <div style={{ height: 4 }}></div>
                      <VisGraph 
                          voltageData={cellData[0][1]} 
                          dataLimit={100} 
                          graphName={'Group 1'} 
                          isEnabled={this.state.enabledGraphs[0][1]}
                      />
                      <div style={{ height: 4 }}></div>
                      <VisGraph 
                          voltageData={cellData[0][2]} 
                          dataLimit={100} 
                          graphName={'Group 2'} 
                          isEnabled={this.state.enabledGraphs[0][2]}
                      />
                      <div style={{ height: 4 }}></div>
                      <VisGraph 
                          voltageData={cellData[0][3]} 
                          dataLimit={100} 
                          graphName={'Group 3'} 
                          isEnabled={this.state.enabledGraphs[0][3]}
                      />
                      <div style={{ height: 4 }}></div>
                      <VisGraph 
                          voltageData={cellData[0][4]} 
                          dataLimit={100} 
                          graphName={'Group 4'} 
                          isEnabled={this.state.enabledGraphs[0][4]}
                      />
                      <div style={{ height: 4 }}></div>
                    </div>
                  );
                case 'Main':
                  return (
                    <div>
                      <MainMenu handleContent={this.contentHandler}/>
                    </div>
                  );
                case 'Inverter':
                  return (
                    <div>
                      <InverterTab />
                    </div>
                  );
                case 'Log':
                  return (
                    <div>
                      <LogTab webSocket={socket}/>
                    </div>
                  );
                case 'Weather':
                  return (
                    <div>
                      <WeatherTab />
                    </div>
                  );
                case 'Map':
                  return (
                    <div>
                      <MapTab />
                    </div>
                  );
                case 'System Update':
                  return (
                    <div>
                      <SystemUpdateTab />
                    </div>
                  );
                case 'Settings':
                  return (
                    <div>
                      <SettingsTab />
                    </div>
                  );
                default:
                  return (
                    <div>
                      <ToggleButton socket={socket} />
                    </div>
                  );
              }
            })()}
          </div>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
