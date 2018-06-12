import React from 'react';
import GraphIntervalSelect from './graphIntervalSelect';
import EnableGroupMonitor from './enableGroupMonitor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    textAlign: 'center'
  }),
});

class InterfaceSettings extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <EnableGroupMonitor
              enabled={this.props.handleSettings}
              currentState={this.props.enabledGraphs}
            />
          </Paper>
        </div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <GraphIntervalSelect groups={[0, 1, 2, 3, 4]} />
            <GraphIntervalSelect groups={[5, 6, 7, 8, 9]} />
          </Paper>
        </div>
      </div>
    );
  }
}

InterfaceSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InterfaceSettings);