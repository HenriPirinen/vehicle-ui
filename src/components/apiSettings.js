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
      width: 200,
    },
    menu: {
      width: 200,
    },
});

class ApiSettings extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        weatherAPI: props.weatherAPI,
        mapAPI: props.mapAPI,
        localServerAddress: props.localServerAddress,
        remoteServerAddress: props.remoteServerAddress,
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
            <Typography variant="title" noWrap>
              API Configuration
            </Typography>
            <form noValidate autoComplete="off">
                <TextField
                    id="weatherAPI"
                    label="Weather API key"
                    className={classes.textField}
                    value={this.state.weatherAPI}
                    onChange={this.handleChange('weatherAPI')}
                    onBlur={() => this.props.confApi('weatherAPI',document.getElementById('weatherAPI').value)}
                    margin="normal"
                />
                <TextField
                    id="mapAPI"
                    label="Maps API key"
                    className={classes.textField}
                    value={this.state.mapAPI}
                    onChange={this.handleChange('mapAPI')}
                    onBlur={() => this.props.confApi('mapAPI',document.getElementById('mapAPI').value)}
                    margin="normal"
                />
                <Divider/>
                <TextField
                    id="localServerAddress"
                    label="Regni API IP Adress"
                    className={classes.textField}
                    value={this.state.localServerAddress}
                    onChange={this.handleChange('localServerAddress')}
                    onBlur={() => this.props.confApi('localServerAddress',document.getElementById('localServerAddress').value)}
                    margin="normal"
                />
                <TextField
                    id="remoteServerAddress"
                    label="Remote Server IP Adress"
                    className={classes.textField}
                    value={this.state.remoteServerAddress}
                    onChange={this.handleChange('remoteServerAddress')}
                    onBlur={() => this.props.confApi('remoteServerAddress',document.getElementById('remoteServerAddress').value)}
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