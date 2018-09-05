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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fabProgress: {
        color: '#f50057',
        position: 'absolute',
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
                {!this.props.webastoEnabled ? (
                    <React.Fragment>
                        <Paper className={classes.root} elevation={4}>
                            <Typography
                                variant="headline"
                                component="h3"
                                color={
                                    this.props.editing && this.props.editTarget === 'forward' ? (
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
                                    this.props.editing && this.props.editTarget === 'forward' ? (
                                        this.props.driveDirection === 'drive' ? 'secondary' : 'disabled'
                                    ) : (
                                            this.props.driveDirection === 'drive' ? 'primary' : 'disabled'
                                        )
                                }
                                style={{ fontSize: 120 }}
                                onClick={() => this.props.setDriverState('forward')} //Drive
                            />
                            <br />
                            {this.props.driveDirection === 'neutral' ?
                                (
                                    <RadioButtonCheckedIcon
                                        style={{ fontSize: 100 }}
                                        color={this.props.editing && this.props.editTarget === 'neutral' ? 'secondary' : 'primary'}
                                        onClick={() => this.props.setDriverState('neutral')}
                                    />
                                ) : (
                                    <RadioButtonUncheckedIcon
                                        style={{ fontSize: 100 }}
                                        color={'disabled'}
                                        onClick={() => this.props.setDriverState('neutral')}
                                    />
                                )
                            }
                            <br />
                            <ArrowDownwardIcon
                                color={this.props.editing && this.props.editTarget === 'reverse' ? (
                                    this.props.driveDirection === 'reverse' ? 'secondary' : 'disabled'
                                ) : (
                                        this.props.driveDirection === 'reverse' ? 'primary' : 'disabled'
                                    )}
                                style={{ fontSize: 120 }}
                                onClick={() => this.props.setDriverState('reverse')} //Reverse
                            />
                            <Typography
                                variant="headline"
                                component="h3"
                                color={this.props.editing && this.props.editTarget === 'reverse' ? (
                                    this.props.driveDirection === 'reverse' ? 'secondary' : 'default'
                                ) : (
                                        this.props.driveDirection === 'reverse' ? 'primary' : 'default'
                                    )}
                            >
                                Reverse
                            </Typography>
                        </Paper>
                        <div id="test">
                        {this.props.driveDirection !== `neutral` &&
                            <Paper className={classes.root} elevation={4}>
                                <Typography
                                    variant="display3"
                                    component="h1"
                                    color={'primary'}
                                >
                                    Cruise
                                </Typography>
                                <div className={classes.wrapper}>
                                    {this.props.editing && this.props.editTarget === 'cruise' ? (
                                        <CircularProgress size={100} className={classes.fabProgress}/>
                                        ) : (null)
                                    }
                                    <CheckCircleIcon
                                        className={this.props.cruiseON ? (
                                            classes.cruiseStatusON
                                        ) : (
                                                classes.cruiseStatusOFF
                                            )}
                                        onClick={() => { this.props.setDriverState('cruise') }}
                                    />
                                </div>
                            </Paper>
                        }
                        <br />
                        {this.props.driveDirection === `neutral` &&
                            <Paper className={classes.root} elevation={4}>
                                <Typography
                                    variant="display3"
                                    component="h1"
                                    color={'primary'}
                                >
                                    Webasto
                                </Typography>
                                <div className={classes.wrapper}>
                                    {this.props.toggleWebasto && <CircularProgress size={100} className={classes.fabProgress} />}
                                    <PowerSettingsIcon
                                        style={{ fontSize: 100 }}
                                        color={'disabled'}
                                        onClick={() => {this.props.setDriverState('webasto'); this.props.vehicleMode();}}
                                    />
                                </div>
                            </Paper>
                        }
                        </div>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <Paper className={classes.root} elevation={4}>
                                <Typography
                                    variant="display3"
                                    component="h1"
                                    color={'primary'}
                                >
                                    Webasto
                                </Typography>
                                <div className={classes.wrapper}>
                                    {this.props.toggleWebasto && <CircularProgress size={100} className={classes.fabProgress} />}
                                    <PowerSettingsIcon
                                        style={{ fontSize: 100 }}
                                        color={'primary'}
                                        onClick={() => {this.props.setDriverState('webasto'); this.props.vehicleMode();}}
                                    />
                                </div>
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