import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
});

class SystemUpdateTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      updateComplete: 'Update microcontroller'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.webSocket.emit('update', { //Send update command to server
      handle: 'client',
      target: 'arduino'
    });
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
          <Typography variant="headline" component="h3">Update available for controller</Typography>
          <Typography variant="subheading">Build number 0000</Typography>
          <br />
          <Button onClick={this.handleClick} variant="raised" color="primary">
            {this.state.updateComplete}
          </Button>
        </Paper>
        </div>
        <div className={classes.content}>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">User interface is up to date</Typography>
          <Typography variant="subheading">Build number 0000</Typography>
          <br />
          <Button onClick={this.handleClick} variant="raised" color="primary" disabled>
            Check for update
          </Button>
        </Paper>
        </div>
        <div className={classes.content}>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3">Server is up to date</Typography>
          <Typography variant="subheading">Build number 0000</Typography>
          <br />
          <Button onClick={this.handleClick} variant="raised" color="primary" disabled>
            Check for update
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