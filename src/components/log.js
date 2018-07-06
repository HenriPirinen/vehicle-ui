import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  constructor(props) {
    super(props)

    this.state = {
      openDialog: false,
      dialogTitle: '',
      dialogLowID: 0,
      dialogMedID: 0,
      dialogHighID: 0,
      filter: [true, true, true, true, true, true, true, true, true, true, true, true,],
    }
  }

  generateLog = (logs, filter) => {
    let logTxt = '';
    for (let item of logs) {

      switch (item.importance) {
        case 'Low':
          if (filter[0] === true) logTxt += item.time + ' | Msg: ' + item.msg + ' | Importance: ' + item.importance + '\n'
          break;
        case 'Medium':
          if (filter[1] === true) logTxt += item.time + ' | Msg: ' + item.msg + ' | Importance: ' + item.importance + '\n'
          break;
        case 'High':
          if (filter[2] === true) logTxt += item.time + ' | Msg: ' + item.msg + ' | Importance: ' + item.importance + '\n'
          break;
        default:
          console.warn('Invalid log');
      }
    }
    return logTxt;
  }

  handleClose = () => {
    this.setState({ openDialog: false });
    this.props.logControl(null, 'filter', this.state.filter);
  }

  openDialog = (lowID, medID, highID, target) => {
    /**
     * @param {integer} lowID id for low checkbox
     * @param {integer} medID id for med checkbox
     * @param {integer} highID id for high checkbox
     * @param {string} target dialog title
     */

    this.setState({ dialogTitle: target });
    this.setState({ openDialog: true });
    this.setState({ dialogLowID: lowID });
    this.setState({ dialogMedID: medID });
    this.setState({ dialogHighID: highID });
  }

  handleChange = (target, index) => event => {
    let _selected = this.state.filter;
    _selected[parseInt(event.target.name, 10)] = event.target.checked;
    this.setState({ filter: _selected });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.content}>
          <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Filter {this.state.dialogTitle} Log</DialogTitle>
            <DialogContent>
              <FormControl component="fieldset">
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.filter[this.state.dialogLowID]}
                        onChange={this.handleChange(this.state.dialogTitle, 0)}
                        value="lowFilter"
                        name={this.state.dialogLowID.toString()}
                      />
                    }
                    label="Low"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.filter[this.state.dialogMedID]}
                        onChange={this.handleChange(this.state.dialogTitle, 1)}
                        value="mediumFilter"
                        name={this.state.dialogMedID.toString()}
                      />
                    }
                    label="Medium"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.filter[this.state.dialogHighID]}
                        onChange={this.handleChange(this.state.dialogTitle, 2)}
                        value="highFilter"
                        name={this.state.dialogHighID.toString()}
                      />
                    }
                    label="High"
                  />
                </FormGroup>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.handleClose()}>
                Cancel
              </Button>
              <Button color="primary" onClick={() => this.handleClose()}>
                Set
              </Button>
            </DialogActions>
          </Dialog>
          <Paper className={classes.root} elevation={4}>
            <Typography
              variant="display2"
              component="h3"
            >Server</Typography>
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.generateLog(this.props.logs[0], this.props.filter[0])}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.props.logControl(0, 'clear', null) }}>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.openDialog(0, 1, 2, 'server') }}>
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
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.generateLog(this.props.logs[1], this.props.filter[1])}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.props.logControl(1, 'clear', null) }}>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.openDialog(3, 4, 5, 'inverter') }}>
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
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.generateLog(this.props.logs[3], this.props.filter[3])}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.props.logControl(3, 'clear', null) }}>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.openDialog(9, 10, 11, 'driver') }}>
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
            <textarea style={{ width: '100%' }} rows="10" cols="50" readOnly value={this.generateLog(this.props.logs[2], this.props.filter[2])}></textarea>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.props.logControl(2, 'clear', null) }}>
                  Clear
                </Button>
              </div>
              &nbsp;
              <div className={classes.buttonFlex}>
                <Button variant="raised" color="primary" fullWidth onClick={() => { this.openDialog(6, 7, 8, 'controller') }}>
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