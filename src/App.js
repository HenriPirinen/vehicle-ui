/*MIT License

Copyright (c) 2018 Henri Pirinen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

//Test update #2

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
import PowerIcon from '@material-ui/icons/Power';

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
function alterChargeIcon() {
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
    backgroundColor: '#EEEEEE',
  },
  flex: {
    flex: 1,
  },
  appTitle: {
    flex: 1,
    paddingLeft: theme.spacing.unit * 3,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
}
});

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobileOpen: false,
      weatherAPI: '',
      mapAPI: '',
      localServerAddress: '192.168.1.33',
      remoteServerAddress: '',
      driver1port: '',
      controller1port: '',
      controller2port: '',
      remoteUpdateInterval: 300000,
      selectedTab: 'Main', //This is set to current tab
      enabledGraphs: [[true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true]], //[0] = voltage, [1] = temperature
      graphIntreval: [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]],
      heatmapRange: [20,80],
      isFullscreenEnabled: false,
      weatherData: { 'default': null },
      weatherForecast: { 'default': null },
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
      charging: true,
      sysLogFilter: [[true, true, true], [true, true, true], [true, true, true], [true, true, true]], //systemLog[0] = Server, [1] = Inverter, [2] = Controller, [3] = Driver. [LOW,MEDIUM,HIGH]
      systemLog: [[], [], [], [], []], //systemLog[0] = Server, [1] = Inverter, [2] = Controller, [3] = Driver, [4] = UI.
      //groupChargeStatus:[false, false, false, false, false, false, false, false, false],
      groupChargeStatus:[false, false, false, false, false],
      /**
       * 3D array, Group(int) -> cell(int) -> datapoint object {'x': time, 'y': voltage value}.
       * Get latest value from Group 0, cell 3: cellDataPoints[0][3][cellDataPoints[0][3].length - 1].y
       * Each group hold graph datapoint voltage values for 8 cells.
       */
      cellDataPoints: [[[[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []],[[], [], [], [], [], [], [], []],], [[[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], []],[[], [], [], [], [], [], [], []],]]
    };

    this.contentHandler = this.contentHandler.bind(this); //Used @ DrawerList component
    this.handleSettings = this.handleSettings.bind(this); //Used @ settings component
    this.changeDirection = this.changeDirection.bind(this); //Used @ main component
    this.vehicleMode = this.vehicleMode.bind(this); //Used @ main component
    this.setCruise = this.setCruise.bind(this); //Used @ main component
    this.logControl = this.logControl.bind(this); //Used @ log components
    this.toggleCharging = this.toggleCharging.bind(this); //Used @ graph component
    this.handleSystemCommand = this.handleSystemCommand.bind(this) //Used @settings component
    this.updateParentState = this.updateParentState.bind(this) //Used @settings
    this.timestamp = this.timestamp.bind(this) //Used @ update component
  }

  timestamp = () => {
    var today = new Date();
    var y = today.getFullYear();
    var d = today.getDate();
    var mo = today.getMonth();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + m;
    if (d < 10) d = '0' + d;

    return `${d}-${mo + 1}-${y} ${h}:${m}:${s}`;
  };

  componentDidMount() {

    let _updateCellDataPoints = this.state.cellDataPoints;
    for (let i = 0; i < _updateCellDataPoints[0].length; i++) { //Fill array with default values.
      for (let x = 0; x < _updateCellDataPoints[0][i].length; x++) { //Voltage and temperature array lenght is equal
        _updateCellDataPoints[0][i][x].push({ x: new Date().getTime(), y: 3.0 });
        _updateCellDataPoints[1][i][x].push({ x: new Date().getTime(), y: 21 });
      }
    };

    this.setState({ cellDataPoints: _updateCellDataPoints });

    //getLocation();
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&APPID=${api.api.weather}`) //TODO: get lat and lon from gps
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

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&APPID=${api.api.weather}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            weatherForecast: result
          });
        },
        (error) => {
          console.warn('Error fetching forecast...');
        }
      )

    this.socket = openSocket('192.168.137.240:4000');

    /**
     * WebSocket topics:
     *  INPUT
     *    dataSet (message, handle)
     *    systemLog (message, handle)
     *    systemParam (message, handle)
     *  OUTPUT
     *    command (command, handle, target)
     */

    this.socket.on('systemParam', (data) => {
      let _message = JSON.parse(data.message.toString());

      this.setState({
        weatherAPI: _message.weatherAPI,
        mapAPI: _message.mapAPI,
        remoteServerAddress: _message.remoteAddress,
        driver1port: _message.driverPort,
        controller1port: _message.controller_1,
        controller2port: _message.controller_2,
        remoteUpdateInterval: _message.remoteUpdateInterval,
      });

      switch (_message.driveDirection) {
        case '0':
          this.setState({ driveDirection: 'neutral' });
          break;
        case '1':
          this.setState({ driveDirection: 'reverse' });
          break;
        case '2':
          this.setState({ driveDirection: 'drive' });
          break;
        default:
          console.warn('Something went wrong at driver: Direction = ' + _message.driveDirection);
      }

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
          _updateCellDataPoints[1][_validData.Group][i].push({ x: new Date().getTime(), y: _validData.temperature[i] });
        }
        this.setState({ cellDataPoints: _updateCellDataPoints });
        //console.log(this.state.cellDataPoints[1][0][0]);
      }
    });

    //Combine all logs to one websocket message ('systemLog'). Add origin parameter to message.
    //WebSocket message types: dataset (for graphs), log & response (init values, get values from the inverter)
    
    this.socket.on('systemLog', (data) => {
      let _message = JSON.parse(data.message.toString());
      let _systemLog = this.state.systemLog;
      let index = 4; //4 = UI Log

      if(_message.origin === 'Server'){index = 0}
      else if(_message.origin === 'Inverter'){index = 1}
      else if(_message.origin === 'Controller'){index = 2}
      else if(_message.origin === 'Driver'){index = 3}

       _systemLog[index].push(JSON.parse(`{"time":"${this.timestamp()}","msg":"${_message.msg}","importance":"${_message.importance}"}`));
       this.setState({ systemLog: _systemLog });

      if(_message.origin === 'Driver' && _message.msg.substring(0,10) === 'Set driver'){ //Add status ok / err to message?
        this.setState({ showNotification: true });
        this.setState({ editing: false });
      }
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
            console.warn(`Something went wrong at driver: Direction = ${_message.direction}`);
        }
      }
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
        _systemLog[target] = [];
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
    /**
     * @param {integer} target Target group for toggling charging on/off
     * Socket message: 0        1
     *                 ^        ^
     *               Target   State 
     * 50 = Group 5 -> Off
     * 51 = Group 5 -> On
     */

    let _groupChargeStatus = this.state.groupChargeStatus;
    let _state = 0;
    _groupChargeStatus[target] = !_groupChargeStatus[target];
    this.setState({groupChargeStatus: _groupChargeStatus});
    _state = _groupChargeStatus[target] === true ? '0' : '1';

    this.socket.emit('command', {
      command: target.toString() + _state,
      handle: 'client',
      target: target < 4 ? 'controller_1' : 'controller_2'
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

  updateParentState = (stateName, value, index = null, index2nd = null) => { //Replace handleSettings
    /**
     * If parameter @param index has a value = state is array
     * If parameter @param index2nd has a value = state is 2D array
     */

    if(index === null){
      this.setState({[stateName]: value});
    } else {
      let _state = this.state[stateName]
      if(index2nd !== null){
        _state[index][index2nd] = value;
      } else {
        _state[index] = value;
      }
      this.setState({[stateName]: _state});
    }
  }

  handleSystemCommand = (command) => {

    //Send values to server -> server writes values to conf file -> Reload server -> server reads new conf file
    this.socket.emit('reconfigure', { //Send toggle command to server
      command: command,
      weather: this.state.weatherAPI,
      map: this.state.mapAPI,
      address: this.state.remoteServerAddress,
      controller1port: this.state.controller1port,
      controller2port: this.state.controller2port,
      driverPort: this.state.driver1port,
      interval: this.state.remoteUpdateInterval,
      handle: 'client',
      target: 'server'
    });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen }); //Open / Close drawer
  };

  render() {
    const { classes, theme } = this.props;
    const { vertical, horizontal } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Typography variant="display1" noWrap className={classes.appTitle}>
              <a className={classes.link} href="https://github.com/HenriPirinen/vehicle-ui">Regni UI</a>
          </Typography>
          <Typography variant="caption" noWrap className={classes.appTitle}>
          <a className={classes.link} href="https://github.com/HenriPirinen/vehicle-ui/releases">v0.1.0</a>
          </Typography>
        </div>
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
            {this.state.charging &&
              <PowerIcon />
            }
            {this.state.charging ? (
              this.state.groupChargeStatus.every(checkValues) ? (
                <BatteryFullIcon />
              ) : (
                    alterChargeIcon()
                  )
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
                        dataLimit={this.state.dataLimit}
                        heatmapRange={this.state.heatmapRange}
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
                      <WeatherTab 
                        data={this.state.weatherData} 
                        forecast={this.state.weatherForecast}
                      />
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
                        timestamp={this.timestamp}
                        systemUpdateProgress={this.state.updateProgress}
                      />
                    </React.Fragment>
                  );
                case 'Settings':
                  return (
                    <React.Fragment>
                      <SettingsTab
                        updateParentState={this.updateParentState}
                        handleSystemCommand={this.handleSystemCommand}
                        handleSettings={this.handleSettings}
                        enabledGraphs={this.state.enabledGraphs}
                        dataLimit={this.state.dataLimit}
                        localServerAddress={this.state.localServerAddress}
                        remoteServerAddress={this.state.remoteServerAddress}
                        weatherAPI={this.state.weatherAPI}
                        mapAPI={this.state.mapAPI}
                        controller1port={this.state.controller1port}
                        controller2port={this.state.controller2port}
                        driver1port={this.state.driver1port}
                        remoteUpdateInterval={this.state.remoteUpdateInterval}
                        graphIntreval={this.state.graphIntreval}
                        heatmapRange={this.state.heatmapRange}
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
