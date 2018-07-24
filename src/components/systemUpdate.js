import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import MemoryIcon from '@material-ui/icons/Memory';
import RouterIcon from '@material-ui/icons/Router';
import grey from '@material-ui/core/colors/grey';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  content: theme.mixins.gutters({
    display: 'flex',
  }),
  header: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 40,
    marginLeft: 40,
    color: grey[700],
  }
});

class SystemUpdateTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      controller: true, //Update status
      ui: true,
      server: true,
      controllerUpdateAvailable: false,
      uiUpdateAvailable: false,
      serverUpdateAvailable: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(target) {
    /*this.props.webSocket.emit('update', { //Send update command to server
      handle: 'client',
      target: 'arduino'
    });*/
    this.setState({[target]: !this.state[target]});
    localStorage.setItem(target, this.props.timestamp());
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      updateComplete: newProps.systemUpdateProgress
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.content}>
        <Paper className={classes.root} elevation={4}>
          <div className={classes.header}>
            <Typography variant="headline" component="h3">Controllers </Typography>
            <MemoryIcon className={classes.icon}/>
          </div>
          <Typography variant="subheading">Installed version 0.1.0</Typography>
          <Typography variant="subheading">Last checked: {localStorage.getItem('controller')}</Typography>
          {!this.state.controller ? <CircularProgress /> : null}
          <br />
          <Button onClick={() =>this.handleClick('controller')} variant="raised" color="primary">
            Check for updates
          </Button>
        </Paper>
        </div>
        <div className={classes.content}>
        <Paper className={classes.root} elevation={4}>
          <div className={classes.header}>
            <Typography variant="headline" component="h3">User interface</Typography>
            <TabletMacIcon className={classes.icon}/>
          </div>
          <Typography variant="subheading">Installed version 0.1.0</Typography>
          <Typography variant="subheading">Last checked: {localStorage.getItem('ui')}</Typography>
          {!this.state.ui ? <CircularProgress /> : null}
          <br />
          <Button onClick={() =>this.handleClick('ui')} variant="raised" color="primary">
            Check for updates
          </Button>
        </Paper>
        </div>
        <div className={classes.content}>
        <Paper className={classes.root} elevation={4}>
          <div className={classes.header}>
            <Typography variant="headline" component="h3">Local Server</Typography>
            <RouterIcon className={classes.icon}/>
          </div>
          <Typography variant="subheading">Installed version 0.1.0</Typography>
          <Typography variant="subheading">Last checked: {localStorage.getItem('server')}</Typography>
          {!this.state.server ? <CircularProgress /> : null}
          <br />
          <Button onClick={() =>this.handleClick('server')} variant="raised" color="primary">
            Check for updates
          </Button>
        </Paper>
        </div>
      </div>
    );
  }
}

SystemUpdateTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SystemUpdateTab);