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
        thermoDevice: props.thermoDevice,
        interval: props.remoteUpdateInterval,
        voltageLimit: props.voltageLimit,
        temperatureLimit: props.temperatureLimit,
        mqttUName: props.mqttUName,
        mqttPWord: props.mqttPWord
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
                    label="Regni API Adress"
                    className={classes.textField}
                    value={this.state.localServerAddress}
                    onChange={this.handleChange('localServerAddress')}
                    onBlur={() => this.props.updateParentState('localServerAddress',document.getElementById('localServerAddress').value)}
                    margin="normal"
                />
                <TextField
                    id="remoteServerAddress"
                    label="MQTT Broker Adress"
                    className={classes.textField}
                    value={this.state.remoteServerAddress}
                    onChange={this.handleChange('remoteServerAddress')}
                    onBlur={() => this.props.updateParentState('remoteServerAddress',document.getElementById('remoteServerAddress').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="mqttUName"
                    label="MQTT Username"
                    className={classes.textField}
                    value={this.state.mqttUName}
                    onChange={this.handleChange('mqttUName')}
                    onBlur={() => this.props.updateParentState('mqttUName',document.getElementById('mqttUName').value)}
                    margin="normal"
                />
                <TextField
                    id="mqttPWord"
                    label="MQTT Password"
                    className={classes.textField}
                    value={this.state.mqttPWord}
                    onChange={this.handleChange('mqttPWord')}
                    onBlur={() => this.props.updateParentState('mqttPWord',document.getElementById('mqttPWord').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="controller.1"
                    label="Controller 1 device"
                    className={classes.textField}
                    value={this.state.controller1port}
                    onChange={this.handleChange('controller1port')}
                    onBlur={() => this.props.updateParentState('controller1port',document.getElementById('controller.1').value)}
                    margin="normal"
                />
                <TextField
                    id="controller.2"
                    label="Controller 2 device"
                    className={classes.textField}
                    value={this.state.controller2port}
                    onChange={this.handleChange('controller1port')}
                    onBlur={() => this.props.updateParentState('controller2port',document.getElementById('controller.2').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="driver.1"
                    label="Driver device"
                    className={classes.textField}
                    value={this.state.driver1port}
                    onChange={this.handleChange('driver1port')}
                    onBlur={() => this.props.updateParentState('driver1port',document.getElementById('driver.1').value)}
                    margin="normal"
                />
                <TextField
                    id="thermo"
                    label="Thermocouple device"
                    className={classes.textField}
                    value={this.state.thermoDevice}
                    onChange={this.handleChange('thermoDevice')}
                    onBlur={() => this.props.updateParentState('thermoDevice',document.getElementById('thermo').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="tempLimit"
                    label="Thermocouple temperature limit"
                    className={classes.textField}
                    value={this.state.temperatureLimit}
                    onChange={this.handleChange('temperatureLimit')}
                    onBlur={() => this.props.updateParentState('temperatureLimit',document.getElementById('tempLimit').value)}
                    margin="normal"
                />
                <TextField
                    id="voltageLimit"
                    label="Serial charge voltage limit"
                    className={classes.textField}
                    value={this.state.voltageLimit}
                    onChange={this.handleChange('voltageLimit')}
                    onBlur={() => this.props.updateParentState('voltageLimit',document.getElementById('voltageLimit').value)}
                    margin="normal"
                />
                <Divider/>
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