import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
});

class InverterCommands extends React.Component {

    sendCmd = (command) => {
        console.log(command);
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Save')}}>
                    Save Parameters To Flash
                </Button>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Restore from flash')}}>
                    Restore Parameters From Flash
                </Button>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Restore def')}}>
                    Restore Defaults
                </Button>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Start')}}>
                    Start Inverter In Manual Mode
                </Button>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Stop')}}>
                    Stop Inverter
                </Button>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Display error')}}>
                    Display Error Memory
                </Button>
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Reset CAN')}}>
                    Reset CAN Mapping
                </Button>
                <br />
                <TextField
                    id="customCmd"
                    label="Custom Command"
                    className={classes.textField}
                    margin="normal"
                />
                <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Custom cmd')}}>
                    Send Custom Command
                </Button>
            </div>
        );
    }
}

InverterCommands.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(InverterCommands);