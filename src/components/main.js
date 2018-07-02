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
import CheckIcon from '@material-ui/icons/Check';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
// eslint-disable-next-line
import PeugeotLogo from '../media/Peugeot_logo.svg';

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
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
      },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
      },
});

class MainMenu extends React.Component {
    render() {
        const { classes } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: this.props.vehicleStarted,
          });
        return (
            <div>
                <div className={classes.content}>
                {this.props.vehicleStarted ? (                
                    <Paper className={classes.root} elevation={4}>
                        {/*<img src={PeugeotLogo} alt='logo'/>*/}
                        <Typography
                            variant="headline"
                            component="h3"
                            color= {
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
                            color= {
                                this.props.editing ? (
                                    this.props.driveDirection === 'drive' ? 'secondary' : 'disabled'
                                ) : (
                                    this.props.driveDirection === 'drive' ? 'primary' : 'disabled'
                                )
                            }
                            style={{ fontSize: 120 }}
                            onClick={() => this.props.changeDirection('drive')} //Drive
                        />
                        <br />
                        {this.props.driveDirection === 'neutral' ?
                            (
                                <RadioButtonCheckedIcon
                                    style={{ fontSize: 100 }}
                                    color={this.props.editing ? 'secondary' : 'primary'}
                                    onClick={() => this.props.changeDirection('neutral')}
                                />) : (
                                <RadioButtonUncheckedIcon
                                    style={{ fontSize: 100 }}
                                    color={'disabled'}
                                    onClick={() => this.props.changeDirection('neutral')}
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
                            onClick={() => this.props.changeDirection('reverse')} //Reverse
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
                     ) : (
                        <Paper className={classes.root} elevation={4}>
                        <Button
                            variant="fab"
                            color="primary"
                            className={buttonClassname}
                            onClick={() => this.props.vehicleMode()}
                        >
                        {this.props.vehicleStarted ? <CheckIcon /> : <PowerSettingsIcon />}
                        </Button>
                        {this.props.starting && <CircularProgress size={150} className={classes.fabProgress} />}
                            <PowerSettingsIcon 
                                style={{ fontSize: 150 }}
                                color={'primary'}
                            />
                            <Typography
                                variant="headline"
                                component="h3"
                                color={'primary'}
                            >
                            Start
                            </Typography>
                        </Paper>
                     )}
                </div>
            </div>
        );
    }
}

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);