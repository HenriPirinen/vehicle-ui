import React from 'react';
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
    textAlign: 'center'
  }),
});

class LogTab extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Server</Typography>
            <textarea rows="10" cols="50"></textarea>
          </Paper>
        </div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Inverter</Typography>
            <textarea rows="10" cols="50"></textarea>
          </Paper>
        </div>
      </div>
    );
  }
}

LogTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogTab);