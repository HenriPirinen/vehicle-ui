import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MemoryIcon from '@material-ui/icons/Memory';
import grey from '@material-ui/core/colors/grey';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
      microcontroller: false, //Update status
      thermo: false,
      server: false,
      driver: false,
      updateInProgress: props.systemUpdateProgress
    }

    this.handleClick = this.handleClick.bind(this);
    this.selectedTargets = this.toggleSelection.bind(this);
  }

  toggleSelection(target) {
    this.setState({ [target]: !this.state[target] });
  }

  handleClick() {
    let devices = ``;
    if (this.state.server) devices += 'server ';
    if (this.state.microcontroller) devices += 'microcontroller ';
    if (this.state.driver) devices += 'driver ';
    if (this.state.thermo) devices += 'thermo';
    this.props.webSocket.emit('update', { //Send update command to server
      handle: 'client',
      target: devices
    });
    this.props.updateParentState("updateInProgress", true);
    localStorage.setItem('lastTimeChecked', this.props.timestamp());
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      updateInProgress: newProps.systemUpdateProgress
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Paper className={classes.root} elevation={4}>
          <div className={classes.header}>
            <Typography variant="headline" component="h3">{'Software Update'}</Typography>
            <MemoryIcon className={classes.icon} />
          </div>
          <br />
          <Typography variant="subheading">Last time updated: {localStorage.getItem('lastTimeChecked')}</Typography>
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Select updatable device</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.server}
                    onChange={() => this.toggleSelection('server')}
                    value={'server'}
                  />
                }
                label='Server'
              />
              {this.props.environment &&
                <React.Fragment>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.microcontroller}
                        onChange={() => this.toggleSelection('microcontroller')}
                        value={'microcontroller'}
                      />
                    }
                    label='Controllers'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.driver}
                        onChange={() => this.toggleSelection('driver')}
                        value={'driver'}
                      />
                    }
                    label='Driver'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.thermo}
                        onChange={() => this.toggleSelection('thermo')}
                        value={'thermo'}
                      />
                    }
                    label='Thermocouple'
                  />
                </React.Fragment>
              }
            </FormGroup>
          </FormControl>
          <br />
          {!this.state.server && this.state.updateInProgress ? <CircularProgress /> : null}
          <br />
          <Button onClick={() => this.handleClick()} variant="raised" color="primary">
            Update
          </Button>
        </Paper>
      </div>
    );
  }
}

SystemUpdateTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SystemUpdateTab);