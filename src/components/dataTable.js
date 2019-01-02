import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {parameters} from './parameterDesc';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
  content: theme.mixins.gutters({
    display: 'flex',
    textAlign: 'center'
  }),
});

let id = 0;
function createData(name, value, unit, min, max, desc) {
  id += 1;
  return { id, name, value, unit, min, max, desc };
}

var data = [];

for(let param of parameters){
  data.push(createData(param.name, param.default, param.unit, param.minimum, param.maximum, param.description));
}

class InverterManagmentTable extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      openDialog: false,
      dialogId: 0,
      dialogTitle: '',
      dialogDesc: '',
      dialogMin: '',
      dialogMax: ''
    }

    if(props.values !== null){
      let initialValues = JSON.parse(props.values);
      /*for(let item of data){ //After table data has been created, read current inverter values from the props.values and update correct values to the object
          //item.value = initialValues[item.name].value;
          //if(initialValues[item.name].value !== undefined){
          //console.log(`${item.name} = ${initialValues[item.name].value}`);
          //}
          console.log(item);
      }*/
      for(let i = 1; i < data.length; i++){
        //console.log(data[i].name);
        data[i].value = initialValues[data[i].name].value;
        //console.log(`${data[i].name} = ${initialValues[data[i].name].value}`);
      }
    }
  }

  handleClickOpen = (id, item, desc, min, max) => {
    this.setState({dialogId: id});
    this.setState({dialogDesc: desc});
    this.setState({dialogMin: min});
    this.setState({dialogMax: max});
    this.setState({dialogTitle: item});
    this.setState({ openDialog: true });
  };

  handleClose = (value) => {
    if(value != null)  {
      document.getElementById(this.state.dialogId.toString()).innerHTML = value;
      this.props.webSocket.emit('command', { //Send update command to server
        command: 'set ' + this.state.dialogTitle + ' ' + value,
        handle: 'client',
        target: 'inverter'
      });
    }
    this.setState({ openDialog: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
      <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Set {this.state.dialogTitle} value</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogDesc} &nbsp;
              Min: {this.state.dialogMin} &nbsp;
              Max: {this.state.dialogMax}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="paramValue"
              label="Value"
              type="number"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.handleClose(null)}} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {this.handleClose(document.getElementById('paramValue').value)}} color="primary">
              Set
            </Button>
          </DialogActions>
        </Dialog>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Parameter</TableCell>
                <TableCell numeric>Value</TableCell>
                <TableCell numeric>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow hover key={n.id} onClick={() => {this.handleClickOpen(n.id, n.name, n.desc, n.min, n.max)}}>
                    <TableCell component="th" scope="row">
                      {n.name}
                    </TableCell>
                    <TableCell numeric id={n.id}>{n.value}</TableCell>
                    <TableCell numeric>{n.unit}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

InverterManagmentTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InverterManagmentTable);