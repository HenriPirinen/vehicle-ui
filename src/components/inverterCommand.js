import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
      },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
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
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
      },
      details: {
        alignItems: 'center',
      },
      column: {
        flexBasis: '33.33%',
      },
      helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
    }
});

//var commandsExapanded = false; // this.setState does not work for some reason... (temp solution)

class InverterCommands extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            commandsExapanded: false,
        }
    }
    sendCmd = (command) => {

        this.props.webSocket.emit('command', { //Send update command to server
            command: command,
            handle: 'client',
            target: 'inverter'
        });
    }
    
    setHint = () => {
        this.setState({commandsExapanded: !this.state.commandsExapanded});
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary onClick={() => {this.setHint()}} expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Commands</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>{this.state.commandsExapanded ? 'Hide commands' : 'Show commands'}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('start 2')}}>
                            Start Inverter In Manual Mode
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('stop')}}>
                            Stop Inverter
                        </Button>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelDetails>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Save')}}>
                            Save Parameters To Flash
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Restore from flash')}}>
                            Restore Parameters From Flash
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Restore def')}}>
                            Restore Defaults
                        </Button>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelDetails>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Display error')}}>
                            Display Error Memory
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Reset CAN')}}>
                            Reset CAN Mapping
                        </Button>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelDetails>
                        <TextField
                            id="customCmd"
                            label="Custom Command"
                            className={classes.textField}
                            margin="normal"
                        />
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd(document.getElementById('customCmd').value)}}>
                            Send Custom Command
                        </Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

InverterCommands.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(InverterCommands);