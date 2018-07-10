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

import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

import BatteryCharging20Icon from '@material-ui/icons/BatteryCharging20';
import BatteryCharging30Icon from '@material-ui/icons/BatteryCharging30';
import BatteryCharging50Icon from '@material-ui/icons/BatteryCharging50';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import BatteryCharging80Icon from '@material-ui/icons/BatteryCharging80';
import BatteryCharging90Icon from '@material-ui/icons/BatteryCharging90';

/**
 * App.js holds state of every child component.
 */

//--Functions--//

function validateJSON(string) {
  /* Validate Json, beacause sometimes i get illegal character error at index 0... */
  try {
    JSON.parse(string);
  } catch (e) {
    console.warn(e);
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
  console.warn('Error ' + err.code + ': ' + err.message + '');
}

var currentIndex = 0;
function alterChargeIcon(){
  switch(currentIndex){
    case 20:
      currentIndex = 30;
      return <BatteryCharging20Icon />
    case 30:
      currentIndex = 50;
      return <BatteryCharging30Icon />
    case 50:
      currentIndex = 60;
      return <BatteryCharging50Icon />
    case 60:
      currentIndex = 80;
      return <BatteryCharging60Icon />
    case 80:
      currentIndex = 90;
      return <BatteryCharging80Icon />
    case 90:
      currentIndex = 100;
      return <BatteryCharging90Icon />
    default:
      currentIndex = 20;
      return <BatteryChargingFullIcon />
  }
}

function checkValues(group){
  return group === true;
}

//---Variables---//
var location = {
  latitude: 60.733852,
  longitude: 24.761049,
  accuracy: 20
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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobileOpen: false,
      selectedTab: 'Main', //This is set to current tab
      enabledGraphs: [[true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true]], //[0] = voltage, [1] = temperature
      graphIntreval: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
      isFullscreenEnabled: false,
      weatherData: { 'default': null },
      contentWidth: document.getElementById('root').offsetWidth - 300,
      driveDirection: 'neutral',
      vertical: 'top',
      horizontal: 'center',
      dataLimit: 100,
      showNotification: false,
      updateProgress: 'Update microcontroller',
      editing: false,
      cruiseON: false,
      cruiseSpeed: 25,
      inverterValues: '',
      vehicleStarted: false,
      starting: false,
      charging: false,
      sysLogFilter: [[true, true, true], [true, true, true], [true, true, true], [true, true, true]], //systemLog[0] = Server, [1] = Inverter, [2] = Controller, [3] = Driver. [LOW,MEDIUM,HIGH]
      systemLog: [[], [], [], []], //systemLog[0] = Server, [1] = Inverter, [2] = Controller, [3] = Driver.
      //groupChargeStatus:[false, false, false, false, false, false, false, false, false],
      groupChargeStatus:[false, false, false, false, false],
      /**
       * 3D array, Group(int) -> cell(int) -> datapoint object {'x': time, 'y': voltage value}.
       * Get latest value from Group 0, cell 3: cellDataPoints[0][3][cellDataPoints[0][3].length - 1].y
       * Each group hold graph datapoint voltage values for 8 cells.
       */
      cellDataPoints: [[[[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []],], [[[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []],]]
    };

    this.contentHandler = this.contentHandler.bind(this); //Used @ DrawerList component
    this.handleSettings = this.handleSettings.bind(this); //Used @ settings component
    this.changeDirection = this.changeDirection.bind(this); //Used @ main component
    this.vehicleMode = this.vehicleMode.bind(this); //Used @ main component
    this.setCruise = this.setCruise.bind(this); //Used @ main component
    this.logControl = this.logControl.bind(this); //Used @ log components
    this.toggleCharging = this.toggleCharging.bind(this); //Used @ graph component
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

    let _updateCellDataPoints = this.state.cellDataPoints;
    for (let i = 0; i < _updateCellDataPoints[0].length; i++) { //Fill array with default values.
      for (let x = 0; x < _updateCellDataPoints[0][i].length; x++) { //Voltage and temperature array lenght is equal
        _updateCellDataPoints[0][i][x].push({ x: new Date().getTime(), y: 0 });
        _updateCellDataPoints[1][i][x].push({ x: new Date().getTime(), y: 21 });
      }
    };

    this.setState({ cellDataPoints: _updateCellDataPoints });

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
        console.warn('Error fetching weather...');
      }
      )

    this.socket = openSocket('192.168.1.36:4000');

    this.socket.on('webSocket', (data) => {
      this.socket.emit('command', { //Request driver settings from the server.
        command: 'getSettings',
        handle: 'client',
        target: 'driver'
      });

      /*this.socket.emit('command', { //Request inverter settings from the server
        command: 'json',
        handle: 'client',
        target: 'inverter'
      });*/
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
      let _input = data.message.toString();
      let _updateCellDataPoints = this.state.cellDataPoints;

      if (validateJSON(_input)) {
        let _validData = JSON.parse(_input);

        for (let i = 0; i < _validData.voltage.length; i++) {
          _updateCellDataPoints[0][_validData.Group][i].push({ x: new Date().getTime(), y: _validData.voltage[i] });
          if (_updateCellDataPoints[0][_validData.Group][i].length > this.state.dataLimit) _updateCellDataPoints[0][_validData.Group][i].shift();
        }
        this.setState({ cellDataPoints: _updateCellDataPoints });
      }
    });

    //Combine all logs to one websocket message ('log'). Add origin parameter to message.
    //WebSocket message types: dataset (for graphs), log & response (init values, get values from the inverter)

    this.socket.on('serverLog', (data) => {
      let _input = JSON.parse(data.message.toString());
      let _systemLog = this.state.systemLog;
      _systemLog[0].push(JSON.parse('{"time":"' + this.timestamp() + '","msg":"' + _input.msg + '","importance":"' + _input.importance + '"}'));
      this.setState({ systemLog: _systemLog });
      //this.setState({ updateProgress: _input });
    });

    this.socket.on('controllerLog', (data) => {
      let _input = JSON.parse(data.message.toString());
      let _systemLog = this.state.systemLog;
      _systemLog[2].push(JSON.parse('{"time":"' + this.timestamp() + '","msg":"' + _input.msg + '","importance":"' + _input.importance + '"}'));
      console.log(_input);
    });

    this.socket.on('inverterResponse', (data) => {
      let _input = data.message.toString();
      _input.length > 300 ? console.log('Inverter values') : console.log('Regular');
      console.log("Inverter response: " + _input);
      this.setState({ inverterValues: _input });
    });

    this.socket.on('driver', (data) => {
      /**
       * Add message to driver log
       * Show snackbar
       * Initialize main tab
       */
      let _input = data.message.toString();
      let _message = JSON.parse(_input);
      if (_message.type === 'param') {
        switch (_message.direction) {
          case 0:
            this.setState({ driveDirection: 'neutral' });
            break;
          case 1:
            this.setState({ driveDirection: 'reverse' });
            break;
          case 2:
            this.setState({ driveDirection: 'drive' });
            break;
          default:
            console.warn('Something went wrong at driver: Direction = ' + _message.direction);
        }
      }

      if (_message.type === 'log') {
        let _updateSystemLog = this.state.systemLog;
        //_updateSystemLog[3].push(this.timestamp() + " | Message: " + _message.msg + " | Importance: " + _message.importance + "\n");
        _updateSystemLog[3].push(JSON.parse('{"time":"' + this.timestamp() + '","msg":"' + _message.msg + '","importance":"' + _message.importance + '"}'));
        this.setState({ systemLog: _updateSystemLog });
      }

      this.setState({ showNotification: true });
      this.setState({ editing: false });
    });
  }

  contentHandler = (content) => { //Change tab
    this.setState({ selectedTab: content });
  }

  toggleFullscreen = () => {
    this.setState({
      isFullscreenEnabled: !this.state.isFullscreenEnabled,
    });
    if (!document.fullscreenElement) {
      if(document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
      else if(document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen(); //Firefox
      else if(document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullScreen(); //Chrome, Safari, Opera
      else if(document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen(); //Edge
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen(); //Firefox
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); //Chrome, Safari, opera
      else if (document.msExitFullscreen) document.msExitFullscreen(); //Edge
    }
  }

  changeDirection = (direction) => {
    /**
     * @param {string} direction neutral, drive, reverse 
     */
    this.setState({ editing: true });
    this.setState({ driveDirection: direction });
    this.socket.emit('command', { //Send update command to server
      command: direction,
      handle: 'client',
      target: 'driver'
    });
  }

  vehicleMode = () => {

    this.setState({ starting: true });
    setTimeout(() => { //Simulate starting
      this.setState({
        vehicleStarted: !this.state.vehicleStarted,
        starting: false
      });
    }, 2000);
  }

  setCruise = () => {
    /**
     * Toggle cruise mode.
     * Update status on the server
     */
    this.setState({ cruiseON: !this.state.cruiseON });

    this.socket.emit('command', { //Temporary, for testing
      command: 'set cruisemode ' + this.state.cruiseON ? '1' : '0',
      handle: 'client',
      target: 'inverter'
    });
  }

  logControl = (target, action, filter) => {
    /**
     * @param {integer} target Server, Inverter, Driver or Controller
     * @param {string} action clear or filter
     * @param {boolean[]} filter null or bool array
     */

    switch (action) {
      case 'clear':
        let _systemLog = this.state.systemLog;
        _systemLog[target] = '';
        this.setState({ _systemLog });
        break;
      case 'filter':
        let _systemLogFilter = this.state.sysLogFilter;

        for (let i = 0, y = 0; i <= 3; i++) {
          for (let x = 0; x <= 2; x++ , y++) {
            _systemLogFilter[i][x] = filter[y];
          }
        }

        this.setState({ sysLogFilter: _systemLogFilter });
        break;
      default:
        console.warn('Invalid action');
    }
  }

  setCharge = (state) => { //Global
    /**
     * @param {boolean} state charging state. true = charging
     */
    if(state){
      this.setState({charging: true});

    } else {
      this.setState({charging: false});
    }
  }

  toggleCharging = (target) => { //Group
    let _groupChargeStatus = this.state.groupChargeStatus;
    _groupChargeStatus[target] = !_groupChargeStatus[target];
    this.setState({groupChargeStatus: _groupChargeStatus});
    if(_groupChargeStatus.every(checkValues))this.setState({charging: false});
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
        let _newIntervalState = this.state.graphIntreval;
        _newIntervalState[type][group] = condition;
        this.setState({
          graphIntreval: _newIntervalState
        });
        break;
      case 'state':
        let _newGraphState = this.state.enabledGraphs;
        _newGraphState[type][group] = condition;
        this.setState({
          enabledGraphs: _newGraphState
        });
        break;
      default:
        console.warn('Something went wrong...');
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
            {this.state.charging ? (
              alterChargeIcon()
            ) : (
                <BatteryFullIcon />
              )
            }
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => this.toggleFullscreen()}
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
              onClose={() => this.setState({ showNotification: false })}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Execute commands</span>}
            />
            <div className={classes.toolbar} />

            {(() => {
              switch (this.state.selectedTab) {
                case 'Voltage':
                case 'Temperature':
                  return (
                    <React.Fragment>
                      <GraphContainer
                        toggleCharging={this.toggleCharging}
                        contentWidth={this.state.contentWidth}
                        enabledGraphs={this.state.enabledGraphs}
                        data={this.state.cellDataPoints}
                        interval={this.state.graphIntreval}
                        chargeStatus={this.state.groupChargeStatus}
                        charging={this.state.charging}
                        type={this.state.selectedTab}
                      />
                    </React.Fragment>
                  );
                case 'Main':
                  return (
                    <React.Fragment>
                      <MainMenu
                        changeDirection={this.changeDirection}
                        vehicleMode={this.vehicleMode}
                        setCruise={this.setCruise}
                        driveDirection={this.state.driveDirection}
                        editing={this.state.editing}
                        cruise={this.state.cruiseSpeed}
                        vehicleStarted={this.state.vehicleStarted}
                        starting={this.state.starting}
                        cruiseON={this.state.cruiseON}
                      />
                    </React.Fragment>
                  );
                case 'Inverter':
                  return (
                    <React.Fragment>
                      <InverterTab
                        webSocket={this.socket}
                        values={this.state.inverterValues}
                      />
                    </React.Fragment>
                  );
                case 'Log':
                  return (
                    <React.Fragment>
                      <LogTab
                        logs={this.state.systemLog}
                        logControl={this.logControl}
                        filter={this.state.sysLogFilter}
                      />
                    </React.Fragment>
                  );
                case 'Weather':
                  return (
                    <React.Fragment>
                      <WeatherTab data={this.state.weatherData} />
                    </React.Fragment>
                  );
                case 'Map':
                  return (
                    <React.Fragment>
                      <MapTab />
                    </React.Fragment>
                  );
                case 'System Update':
                  return (
                    <React.Fragment>
                      <SystemUpdateTab
                        webSocket={this.socket}
                        systemUpdateProgress={this.state.updateProgress}
                      />
                    </React.Fragment>
                  );
                case 'Settings':
                  return (
                    <React.Fragment>
                      <SettingsTab
                        handleSettings={this.handleSettings}
                        enabledGraphs={this.state.enabledGraphs}
                        graphIntreval={this.state.enabledGraphs}
                      />
                    </React.Fragment>
                  );
                default:
                  return (
                    <React.Fragment>
                      <ToggleButton socket={this.socket} />
                    </React.Fragment>
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
