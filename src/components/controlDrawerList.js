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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class DrawerList extends React.Component{
  constructor(props){
    super(props)
    this.state = {isToggleOn: false};

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

  render(){
    const { classes } = this.props;

  return (
    <div className={classes.root}>
      <List component="nav">
      <ListItem button onClick={() => {this.props.handleContent('main')}}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Main" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('data')}} >
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Data" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('inverter')}}>
          <ListItemIcon>
            <FlashOnIcon />
          </ListItemIcon>
          <ListItemText primary="Inverter" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('log')}}>
          <ListItemIcon>
            <ImportContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Log" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('weather')}}>
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Weather" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('map')}}>
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText primary="Map" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('update')}}>
          <ListItemIcon>
            <SystemUpdateIcon />
          </ListItemIcon>
          <ListItemText primary="System Update" />
        </ListItem>
        <ListItem button onClick={() => {this.props.handleContent('settings')}}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => this.handleSystemCommand('sudo shutdown now')}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Shutdown" />
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