import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 250,
    },
    title: {
        textAlign: 'center'
    }
});

class ApiSettings extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        weatherAPI: props.weatherAPI,
        mapAPI: props.mapAPI,
        localServerAddress: props.localServerAddress,
        remoteServerAddress: props.remoteServerAddress,
        controller1port: props.controller1port,
        controller2port: props.controller2port,
        driver1port: props.driver1port,
        interval: props.remoteUpdateInterval
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
            <Typography variant="title" noWrap className={classes.title}>
              API Configuration
            </Typography>
            <form noValidate autoComplete="off">
                <TextField
                    id="weatherAPI"
                    label="Weather API key"
                    className={classes.textField}
                    value={this.state.weatherAPI}
                    onChange={this.handleChange('weatherAPI')}
                    onBlur={() => this.props.updateParentState('weatherAPI',document.getElementById('weatherAPI').value)}
                    margin="normal"
                />
                <TextField
                    id="mapAPI"
                    label="Maps API key"
                    className={classes.textField}
                    value={this.state.mapAPI}
                    onChange={this.handleChange('mapAPI')}
                    onBlur={() => this.props.updateParentState('mapAPI',document.getElementById('mapAPI').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="localServerAddress"
                    label="Regni API IP Adress"
                    className={classes.textField}
                    value={this.state.localServerAddress}
                    onChange={this.handleChange('localServerAddress')}
                    onBlur={() => this.props.updateParentState('localServerAddress',document.getElementById('localServerAddress').value)}
                    margin="normal"
                />
                <TextField
                    id="remoteServerAddress"
                    label="Remote Server IP Adress"
                    className={classes.textField}
                    value={this.state.remoteServerAddress}
                    onChange={this.handleChange('remoteServerAddress')}
                    onBlur={() => this.props.updateParentState('remoteServerAddress',document.getElementById('remoteServerAddress').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="controller.1"
                    label="Controller 1 Port"
                    className={classes.textField}
                    value={this.state.controller1port}
                    onChange={this.handleChange('controller1port')}
                    onBlur={() => this.props.updateParentState('controller1port',document.getElementById('controller.1').value)}
                    margin="normal"
                />
                <TextField
                    id="controller.2"
                    label="Controller 2 Port"
                    className={classes.textField}
                    value={this.state.controller2port}
                    onChange={this.handleChange('controller1port')}
                    onBlur={() => this.props.updateParentState('controller2port',document.getElementById('controller.2').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="driver.1"
                    label="Driver Port"
                    className={classes.textField}
                    value={this.state.driver1port}
                    onChange={this.handleChange('driver1port')}
                    onBlur={() => this.props.updateParentState('driver1port',document.getElementById('driver.1').value)}
                    margin="normal"
                />
                <TextField
                    id="interval"
                    label="Remote update interval"
                    className={classes.textField}
                    value={this.state.interval}
                    onChange={this.handleChange('interval')}
                    onBlur={() => this.props.updateParentState('remoteUpdateInterval',document.getElementById('interval').value)}
                    margin="normal"
                />
            </form>
            <Button variant="raised" color="primary" onClick={() => this.props.handleSystemCommand('sudo bash restart.sh')}>
                Reconfigure
            </Button>
        </React.Fragment>
    );
  }
}

ApiSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApiSettings);