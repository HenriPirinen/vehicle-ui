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
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';
import MemoryIcon from '@material-ui/icons/Memory';
import RestorePageIcon from '@material-ui/icons/RestorePage';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
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
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

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
                            <PlayArrowIcon className={classes.rightIcon}>send</PlayArrowIcon>
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('stop')}}>
                            Stop Inverter
                            <StopIcon className={classes.rightIcon}>send</StopIcon>
                        </Button>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelDetails>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Save')}}>
                            Save Parameters To Flash
                            <SaveIcon className={classes.rightIcon}>send</SaveIcon>
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Restore from flash')}}>
                            Restore Parameters From Flash
                            <MemoryIcon className={classes.rightIcon}>send</MemoryIcon>
                        </Button>
                        <Button variant="raised" color="primary" className={classes.button} onClick={() => {this.sendCmd('Restore def')}}>
                            Restore Defaults
                            <RestorePageIcon className={classes.rightIcon}>send</RestorePageIcon>
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
                            <Icon className={classes.rightIcon}>send</Icon>
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