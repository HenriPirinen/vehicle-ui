import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

// eslint-disable-next-line
import ToggleButton from './components/toggleButton';
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
import GraphContainer from './components/graphContainer';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import api from './keys.js';

/**
 * App.js holds state of every child component.
 * If child component is not rendered, it does not remember it's last state when it is re-rendered
 */

//---Variables---//

var showNotification = false;

var dataLimit = 100;

var location = {
  latitude: 60.733852,
  longitude: 24.761049,
  accuracy: 20
}

var updateProgress = 'Update microcontroller';

//---Constants---//

const geoLocOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

/*3D array, Group(int) -> cell(int) -> datapoint object {'x': time, 'y': voltage value}.
Get latest value from Group 0, cell 3: cellDataPoints[0][3][cellDataPoints[0][3].length - 1].y
Each group hold graph datapoint voltage values for 8 cells.*/

var cellDataPoints =
  [
    [ //Voltage
      [ //Group 0
        [], [], [], [], [], [], [], []
      ],
      [ //Group 1
        [], [], [], [], [], [], [], []
      ],
      [ //Group 2
        [], [], [], [], [], [], [], []
      ],
      [ //Group 3
        [], [], [], [], [], [], [], []
      ],
      [ //Group 4
        [], [], [], [], [], [], [], []
      ],
      [ //Group 5
        [], [], [], [], [], [], [], []
      ],
      [ //Group 6
        [], [], [], [], [], [], [], []
      ],
      [ //Group 7
        [], [], [], [], [], [], [], []
      ],
      [ //Group 8
        [], [], [], [], [], [], [], []
      ],
    ],
    [ //Temperature
      [ //Group 0
        [], [], [], [], [], [], [], []
      ],
      [ //Group 1
        [], [], [], [], [], [], [], []
      ],
      [ //Group 2
        [], [], [], [], [], [], [], []
      ],
      [ //Group 3
        [], [], [], [], [], [], [], []
      ],
      [ //Group 4
        [], [], [], [], [], [], [], []
      ],
      [ //Group 5
        [], [], [], [], [], [], [], []
      ],
      [ //Group 6
        [], [], [], [], [], [], [], []
      ],
      [ //Group 7
        [], [], [], [], [], [], [], []
      ],
      [ //Group 8
        [], [], [], [], [], [], [], []
      ],
    ]
  ];

for (let i = 0; i < cellDataPoints[0].length; i++) { //Fill array with default values.
  for (let x = 0; x < cellDataPoints[0][i].length; x++) { //Voltage and temperature array lenght is equal
    cellDataPoints[0][i][x].push({ x: new Date().getTime(), y: 0 });
    cellDataPoints[1][i][x].push({ x: new Date().getTime(), y: 21 });
  }
}

const socket = openSocket('192.168.2.45:4000');
//const socket = openSocket('37.33.214.149:4000');

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
  flex: {
    flex: 1,
  }
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

// eslint-disable-next-line
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(gotGeoLoc, geoLocErr, geoLocOptions);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function gotGeoLoc(pos) {
  location.latitude = pos.coords.latitude;
  location.longitude = pos.coords.longitude;
  location.accuracy = pos.coords.accuracy;
}

function geoLocErr(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
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
  /**
   * Event: When client receives websocket package 'dataset' from the server.
   * Dataset message should be in JSON format.
   * Validate JSON -> If valid -> Parse JSON -> Write values to cellData array.
   * Example dataset:
   * {
   *  "Group":2,
   *  "voltage":[6.10,6.20,6.30,6.40,6.50,6.60,6.70,6.80],
   *  "temperature":[20,20,20,20,20,20,20,20]
   * }
   */
  let input = data.message.toString();

  if (validateJSON(input)) {
    let validData = JSON.parse(input);

    for (let i = 0; i < validData.voltage.length; i++) {
      cellDataPoints[0][validData.Group][i].push({ x: new Date().getTime(), y: validData.voltage[i] });
      if (cellDataPoints[0][validData.Group][i].length > dataLimit) cellDataPoints[0][validData.Group][i].shift();
    }
  }
});

socket.on('serverLog', function (data) {
  let input = data.message.toString();
  updateProgress = input;
});

socket.on('driver', function (data) {
  let input = data.message.toString();
  showNotification = true;
  console.log(input);
});

//---Build page---//

class App extends Component {
  constructor(props) {
    super(props)

    this.contentHandler = this.contentHandler.bind(this) //Used @ DrawerList component
    this.handleSettings = this.handleSettings.bind(this) //Used @ settings component
    this.changeDirection = this.changeDirection.bind(this) //Used @ main component
  }

  state = {
    mobileOpen: false,
    selectedTab: 'Main', //This is set to current tab
    enabledGraphs: [[true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true]], //0 = voltage, 1 = temperature
    graphIntreval: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
    isFullscreenEnabled: false,
    fullscreenTxt: 'Enable Fullscreen',
    weatherData: { 'default': null },
    contentWidth: document.getElementById('root').offsetWidth - 300,
    forward: true,
    vertical: 'top',
    horizontal: 'center',
  };

  componentDidMount() {
    //getLocation();
    fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + location.latitude + "&lon=" + location.longitude + "&APPID=" + api.api.weather + "") //TODO: get lat and lon from gps
      .then(res => res.json())
      .then(
      (result) => {
        this.setState({
          weatherData: result
        });
      },
      (error) => {
        console.log('Error fetching weather...');
      }
      )
  }

  contentHandler = (content) => { //Change tab
    if (content !== 'Fullscreen') //Temporary solution
    {
      this.setState({ selectedTab: content });
    } else {
      this.setState({
        isFullscreenEnabled: !this.state.isFullscreenEnabled,
      });
      if (!document.fullscreenElement) {
        document.documentElement.webkitRequestFullScreen();
        this.setState({ fullscreenTxt: 'Exit Fullscreen' });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          this.setState({ fullscreenTxt: 'Enable Fullscreen' });
        }
      }
    }
  }

  changeDirection = (direction) => {
    /**
     * @param {boolean} direction true = forward, false = reverse 
     */
    if (!direction === this.state.forward) this.setState({ forward: direction });
    socket.emit('command', { //Send update command to server
      command: direction,
      handle: 'client',
      target: 'driver'
    });
  }

  handleSettings = (group, setting, type, condition) => {
    /**
     * @param {integer} group Value between 0 - 8
     * @param {string} setting interval or state
     * @param {integer} type 0 = voltage, 1 = temperature
     * @param {integer,boolean} condition Interval = integer, enabledGraphs = boolean 
     */

    switch (setting) {
      case 'interval':
        let newIntervalState = this.state.graphIntreval.slice();
        newIntervalState[type][group] = condition;
        this.setState({
          graphIntreval: newIntervalState
        });
        break;
      case 'state':
        let newGraphState = this.state.enabledGraphs.slice();
        newGraphState[type][group] = condition;
        this.setState({
          enabledGraphs: newGraphState
        });
        break;
      default:
        console.log('Something went wrong...');
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen }); //Open / Close drawer
  };

  render() {
    const { classes, theme } = this.props;
    const { vertical, horizontal} = this.state;

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
            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
              {this.state.selectedTab} {/*Set appbar title*/}
            </Typography>
            <Button
              color="inherit"
              onClick={() => this.contentHandler('Fullscreen')}
            >
              {this.state.fullscreenTxt}
            </Button>
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
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={showNotification}
              autoHideDuration={2000}
              onClose={() => showNotification = false}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Execute commands</span>}
            />
            <div className={classes.toolbar} />
            <div style={{ height: 10 }}></div>

            {(() => {
              switch (this.state.selectedTab) {
                case 'Data':
                  return (
                    <div>
                      <GraphContainer
                        contentWidth={this.state.contentWidth}
                        enabledGraphs={this.state.enabledGraphs}
                        data={cellDataPoints}
                        interval={this.state.graphIntreval}
                      />
                    </div>
                  );
                case 'Main':
                  return (
                    <div>
                      <MainMenu
                        changeDirection={this.changeDirection}
                        forward={this.state.forward}
                      />
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
                      <LogTab webSocket={socket} />
                    </div>
                  );
                case 'Weather':
                  return (
                    <div>
                      <WeatherTab data={this.state.weatherData} />
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
                      <SystemUpdateTab
                        webSocket={socket}
                        systemUpdateProgress={updateProgress}
                      />
                    </div>
                  );
                case 'Settings':
                  return (
                    <div>
                      <SettingsTab
                        handleSettings={this.handleSettings}
                        enabledGraphs={this.state.enabledGraphs}
                        graphIntreval={this.state.enabledGraphs}
                      />
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
