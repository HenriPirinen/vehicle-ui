import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: theme.spacing.unit * 3,
  }),
  content: theme.mixins.gutters({
    width: '90%',
    textAlign: 'center',
  }),
  buttonContainer: theme.mixins.gutters({
    display: 'flex',
    alignItems: 'stretch',
  }),
  buttonFlex: theme.mixins.gutters({
    flexGrow: 5,
  }),
});

class LogTab extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Server</Typography>
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.props.logs[0]}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Filter
                </Button>
              </div>
            </div>
          </Paper>
        </div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Inverter</Typography>
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.props.logs[1]}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Filter
                </Button>
              </div>
            </div>
          </Paper>
        </div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Driver</Typography>
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.props.logs[3]}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Filter
                </Button>
              </div>
            </div>
          </Paper>
        </div>
        <div className={classes.content}>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Controller</Typography>
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.props.logs[2]}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth>
                  Filter
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

LogTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogTab);