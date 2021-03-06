import React from 'react';
import GraphConfiguration from './graphConfig';
import ApiSettings from './apiSettings';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  title: {
    textAlign: 'center'
  }
});

class InterfaceSettings extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography variant="title" noWrap className={classes.title}>
              Graph Configuration
            </Typography>
            <GraphConfiguration
              enabled={this.props.handleSettings}
              currentState={this.props.enabledGraphs}
              updateParentState={this.props.updateParentState}
              dataLimit={this.props.dataLimit}
              graphIntreval={this.props.graphIntreval}
              heatmapRange={this.props.heatmapRange}
            />
          </Paper>
        </div>
        {this.props.uiType ? (
          <div className={classes.content}>
            <Paper className={classes.root} elevation={4}>
              <ApiSettings
                updateParentState={this.props.updateParentState}
                localServerAddress={this.props.localServerAddress}
                remoteServerAddress={this.props.remoteServerAddress}
                weatherAPI={this.props.weatherAPI}
                mapAPI={this.props.mapAPI}
                handleSystemCommand={this.props.handleSystemCommand}
                controller1port={this.props.controller1port}
                controller2port={this.props.controller2port}
                driver1port={this.props.driver1port}
                thermoDevice={this.props.thermoDevice}
                temperatureLimit={this.props.temperatureLimit}
                voltageLimit={this.props.voltageLimit}
                remoteUpdateInterval={this.props.remoteUpdateInterval}
                mqttUName={this.props.mqttUName}
                mqttPWord={this.props.mqttPWord}
              />
            </Paper>
          </div>
        ) : (
            null
          )
        }
      </React.Fragment>
    );
  }
}

InterfaceSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InterfaceSettings);