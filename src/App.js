import React, { Component } from 'react';
import './App.css';
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
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import DrawerList from './components/controlDrawerList';
import MainMenu from './components/main';
import InverterTab from './components/inverter';
import LogTab from './components/log';
import WeatherTab from './components/weather';
import MapTab from './components/mapTab';
import SystemUpdateTab from './components/systemUpdate'
import SettingsTab from './components/settings';
import GraphContainer from './components/graphContainer';
import Snackbar from '@material-ui/core/Snackbar';
import api from './keys.js';

/**
 * App.js holds state of every child component.
 * If child component is not rendered, it does not remember it's last state when it is re-rendered
 */

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

//---Variables---//
var location = {
  latitude: 60.733852,
  longitude: 24.761049,
  accuracy: 20
};

/**
 * systemLog[0] = Server, [1] = Inverter, [2] = Controller, [3] = Driver.
 */
var systemLog = [[], [], [],[]];

/**
 * 3D array, Group(int) -> cell(int) -> datapoint object {'x': time, 'y': voltage value}.
 * Get latest value from Group 0, cell 3: cellDataPoints[0][3][cellDataPoints[0][3].length - 1].y
 * Each group hold graph datapoint voltage values for 8 cells.
 */

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
};

//---Constants---//

const geoLocOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

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
  },
  flex: {
    flex: 1,
  },
});

//---Build page---//

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobileOpen: false,
      selectedTab: 'Main', //This is set to current tab
      enabledGraphs: [[true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true]], //[0] = voltage, [1] = temperature
      graphIntreval: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
      isFullscreenEnabled: false,
      fullscreenTxt: 'Enable Fullscreen',
      weatherData: { 'default': null },
      contentWidth: document.getElementById('root').offsetWidth - 300,
      forward: true,
      vertical: 'top',
      horizontal: 'center',
      dataLimit: 100,
      showNotification: false,
      updateProgress: 'Update microcontroller'
    };

    this.contentHandler = this.contentHandler.bind(this) //Used @ DrawerList component
    this.handleSettings = this.handleSettings.bind(this) //Used @ settings component
    this.changeDirection = this.changeDirection.bind(this) //Used @ main component
  }

  timestamp = () => {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + m;
  
    return '' + h + ':' + m + ':' + s + '';
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
      
      this.socket = openSocket('192.168.2.45:4000');

      this.socket.on('webSocket', (data) => {
        console.log(data.handle + ' ' + data.message);
        this.socket.emit('command', { //Send update command to server
          command: '99',
          handle: 'client',
          target: 'driver'
        });
      });

      this.socket.on('dataset', (data) => {
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
            if (cellDataPoints[0][validData.Group][i].length > this.state.dataLimit) cellDataPoints[0][validData.Group][i].shift();
          }
        }
      });
      
      this.socket.on('serverLog', (data) => {
        let input = data.message.toString();
        //systemLog[0].push({'time':timestamp(),'msg':input,'importance':'Low'});
        this.setState({updateProgress: input});
      });
      
      this.socket.on('driver', (data) => {
        /**
         * Add message to driver log
         * Show snackbar
         */
        let input = data.message.toString();
        let message = JSON.parse(input);
        if(message.type === 'param') message.direction === 1 ? this.setState({forward: true}) : this.setState({forward: false});
        if(message.type === 'log') systemLog[3].push(this.timestamp() + " | Message: " + message.msg + " | Importance: " + message.importance + "\n");
        this.setState({ showNotification: true });
      });
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
    this.socket.emit('command', { //Send update command to server
      command: direction ? 1 : 0,
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
    const { vertical, horizontal } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <DrawerList webSocket={this.socket} handleContent={this.contentHandler} />
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
            {/*webSocketStatus ? (
                <SyncIcon />
              ) : (
                <SyncDisabledIcon />
              )*/}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => this.contentHandler('Fullscreen')}
            >
              <FullscreenIcon />
            </IconButton>
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
              open={this.state.showNotification}
              autoHideDuration={2000}
              onClose={() => this.setState({showNotification: false})}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Execute commands</span>}
            />
            <div className={classes.toolbar} />

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
                      <LogTab logs={systemLog} />
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
                        webSocket={this.socket}
                        systemUpdateProgress={this.state.updateProgress}
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
                      <ToggleButton socket={this.socket} />
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
