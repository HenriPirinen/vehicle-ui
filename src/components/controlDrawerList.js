import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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

class DrawerList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggleOn: false,
      logNotifications: 0,
      updateNotifications: 0,
      dataExpanded: false,
      settingsExpanded: false,
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

  expand = (target, value = null) => {
    value === null ? this.setState({ [target]: !this.state[target] }) : this.setState({ [target]: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {this.props.uiType ? (
            <ListItem button onClick={() => { this.props.handleContent('Main'); this.expand('settingsExpanded', false) }}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Main" />
            </ListItem>
          ) : (
              null
            )
          }
          <ListItem button onClick={() => this.expand('dataExpanded')}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Data" />
            {this.state.dataExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.dataExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => { this.props.handleContent('Voltage'); this.expand('settingsExpanded', false) }}>
                <ListItemIcon>
                  <BatteryChargingFullIcon />
                </ListItemIcon>
                <ListItemText inset primary="Voltage" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={() => { this.props.handleContent('Temperature'); this.expand('settingsExpanded', false) }}>
                <ListItemIcon>
                  <WhatshotIcon />
                </ListItemIcon>
                <ListItemText inset primary="Temperature" />
              </ListItem>
            </List>
          </Collapse>
          {this.props.uiType ? (
            <ListItem button onClick={() => { this.props.handleContent('Inverter'); this.expand('settingsExpanded', false) }}>
              <ListItemIcon>
                <FlashOnIcon />
              </ListItemIcon>
              <ListItemText primary="Inverter" />
            </ListItem>
          ) : (
              null
            )}
          <ListItem button onClick={() => { this.props.handleContent('Log'); this.expand('settingsExpanded', false) }}>
            <ListItemIcon>
              {this.state.logNotifications > 0 ? (
                <Badge badgeContent={this.state.logNotifications} color="primary">
                  <ImportContactsIcon />
                </Badge>
              ) : (
                  <ImportContactsIcon />
                )
              }
            </ListItemIcon>
            <ListItemText primary="Log" />
          </ListItem>
          {this.props.uiType ? (
            <React.Fragment>
              <ListItem button onClick={() => { this.props.handleContent('Weather'); this.expand('settingsExpanded', false) }}>
                <ListItemIcon>
                  <WbSunnyIcon />
                </ListItemIcon>
                <ListItemText primary="Weather" />
              </ListItem>
              <ListItem button onClick={() => { this.props.handleContent('Map'); this.expand('settingsExpanded', false) }}>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Map" />
              </ListItem>
            </React.Fragment>
          ) : (
              null
            )
          }
          <ListItem button onClick={() => { this.props.handleContent('System Update'); this.expand('settingsExpanded', false) }}>
            <ListItemIcon>
              {this.state.updateNotifications > 0 ? (
                <Badge badgeContent={this.state.updateNotifications} color="primary">
                  <SystemUpdateIcon />
                </Badge>
              ) : (
                  <SystemUpdateIcon />
                )
              }
            </ListItemIcon>
            <ListItemText primary="System Update" />
          </ListItem>
          <ListItem button onClick={() => { this.expand('settingsExpanded'); this.props.handleContent('Settings'); }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {this.state.settingsExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.settingsExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested} button onClick={() => this.handleSystemCommand('sudo bash restart.sh')}>
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary="Reload API" />
              </ListItem>
            </List>
            <List component="div" disablePadding>
              {this.props.uiType ? (
                <ListItem className={classes.nested} button onClick={() => this.handleSystemCommand('sudo reboot')}>
                  <ListItemIcon>
                    <RefreshIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reboot" />
                </ListItem>
              ) : (
                  null
                )
              }
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

DrawerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerList);