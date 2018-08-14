import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PowerSettingsIcon from '@material-ui/icons/PowerSettingsNew';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
//import AddCircleIcon from '@material-ui/icons/AddCircle';
//import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
//import PeugeotLogo from '../media/Peugeot_logo.svg';

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
        textAlign: 'center',
    }),
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    cruiseStatusON: {
        color: green[500],
        fontSize: 100
    },
    cruiseStatusOFF: {
        color: grey[500],
        fontSize: 100
    },
});

class MainMenu extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                {this.props.vehicleStarted ? (
                    <React.Fragment>
                        <Paper className={classes.root} elevation={4}>
                            <Typography
                                variant="headline"
                                component="h3"
                                color={
                                    this.props.editing ? (
                                        this.props.driveDirection === 'drive' ? 'secondary' : 'default'
                                    ) : (
                                            this.props.driveDirection === 'drive' ? 'primary' : 'default'
                                        )
                                }
                            >
                                Drive
                            </Typography>
                            <ArrowUpwardIcon
                                color={
                                    this.props.editing ? (
                                        this.props.driveDirection === 'drive' ? 'secondary' : 'disabled'
                                    ) : (
                                            this.props.driveDirection === 'drive' ? 'primary' : 'disabled'
                                        )
                                }
                                style={{ fontSize: 120 }}
                                onClick={() => this.props.setDriverState('0100')} //Drive
                            />
                            <br />
                            {this.props.driveDirection === 'neutral' ?
                                (
                                    <RadioButtonCheckedIcon
                                        style={{ fontSize: 100 }}
                                        color={this.props.editing ? 'secondary' : 'primary'}
                                        onClick={() => this.props.setDriverState('0000')}
                                    />) : (
                                    <RadioButtonUncheckedIcon
                                        style={{ fontSize: 100 }}
                                        color={'disabled'}
                                        onClick={() => this.props.setDriverState('0000')}
                                    />
                                )
                            }
                            <br />
                            <ArrowDownwardIcon
                                color={this.props.editing ? (
                                    this.props.driveDirection === 'reverse' ? 'secondary' : 'disabled'
                                ) : (
                                        this.props.driveDirection === 'reverse' ? 'primary' : 'disabled'
                                    )}
                                style={{ fontSize: 120 }}
                                onClick={() => this.props.setDriverState('1000')} //Reverse
                            />
                            <Typography
                                variant="headline"
                                component="h3"
                                color={this.props.editing ? (
                                    this.props.driveDirection === 'reverse' ? 'secondary' : 'default'
                                ) : (
                                        this.props.driveDirection === 'reverse' ? 'primary' : 'default'
                                    )}
                            >
                                Reverse
                            </Typography>
                        </Paper>
                        <Paper className={classes.root} elevation={4}>
                            <Typography
                                variant="display3"
                                component="h1"
                                color={'primary'}
                            >
                                Cruise
                            </Typography>
                            <CheckCircleIcon 
                                className={this.props.cruiseON ? classes.cruiseStatusON : classes.cruiseStatusOFF} 
                                onClick={() => {this.props.setCruise()}}
                            />
                        </Paper>
                    </React.Fragment>
                ) : (   
                        //Remove ?
                        <React.Fragment>
                            <Paper className={classes.root} elevation={4}>
                                <div className={classes.wrapper}>
                                    {this.props.starting && <CircularProgress size={165} className={classes.fabProgress} />}
                                    <PowerSettingsIcon
                                        style={{ fontSize: 150 }}
                                        color={'primary'}
                                        onClick={() => this.props.vehicleMode()}
                                    />
                                </div>
                                <Typography
                                    variant="headline"
                                    component="h3"
                                    color={'primary'}
                                >
                                    Start
                                </Typography>
                            </Paper>
                        </React.Fragment>
                    )}
            </div>
        );
    }
}

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);