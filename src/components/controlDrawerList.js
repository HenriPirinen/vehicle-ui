import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HomeIcon from '@material-ui/icons/Home';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RefreshIcon from '@material-ui/icons/Refresh';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import MapIcon from '@material-ui/icons/Map';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import Collapse from '@material-ui/core/Collapse';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import BatteryChargingFullIcon from '@material-ui/icons/BatteryChargingFull';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class DrawerList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isToggleOn: false,
      logNotifications: 0,
      updateNotifications: 0,
      dataExpanded: false
    };

    this.handleClick = this.handleSystemCommand.bind(this);
  }

  handleSystemCommand(command) {
    console.log("Send command");
    this.props.webSocket.emit('command', { //Send toggle command to server
      command: command,
      handle: 'client',
      target: 'server'
    });
  }

  expand = () => {
    this.setState({dataExpanded: !this.state.dataExpanded});
  };

  render(){
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <List component="nav">
      <ListItem button onClick={() => {this.props.handleContent('Main')}}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItem>
        <ListItem button onClick={() => this.expand()}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Data" />
          {this.state.dataExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.dataExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => {this.props.handleContent('Voltage')}}>
                <ListItemIcon>
                  <BatteryChargingFullIcon />
                </ListItemIcon>
                <ListItemText inset primary="Voltage" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => {this.props.handleContent('Temperature')}}>
                <ListItemIcon>
                  <WhatshotIcon />
                </ListItemIcon>
                <ListItemText inset primary="Temperature" />
              </ListItem>
            </List>
          </Collapse>
        <ListItem button onClick={() => {this.props.handleContent('Inverter')}}>
          <ListItemIcon>
            <FlashOnIcon />
          </ListItemIcon>
          <ListItemText primary="Inverter" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('Log')}}>
          <ListItemIcon>
            {this.state.logNotifications > 0 ? (
              <Badge badgeContent={this.state.logNotifications} color="primary">
                <ImportContactsIcon />
              </Badge>
              ):(
                <ImportContactsIcon />
                )
            }
          </ListItemIcon>
          <ListItemText primary="Log" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('Weather')}}>
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Weather" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('Map')}}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('System Update')}}>
          <ListItemIcon>
          {this.state.updateNotifications > 0 ? (
              <Badge badgeContent={this.state.updateNotifications} color="primary">
                <SystemUpdateIcon />
              </Badge>
              ):(
                <SystemUpdateIcon />
              )
          }
          </ListItemIcon>
          <ListItemText primary="System Update" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('Settings')}}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => this.handleSystemCommand('sudo bash restart.sh')}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Reload API" />
        </ListItem>
        <ListItem button onClick={() => this.handleSystemCommand('sudo reboot')}>
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          <ListItemText primary="Reboot" />
        </ListItem>
      </List>
    </div>
  );
}
}

DrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerList);