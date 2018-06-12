import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
});

class MainMenu extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.content}>
                    <Paper className={classes.root} elevation={4}>
                        {/*<img src={PeugeotLogo} alt='logo'/>*/}
                        <Typography 
                            variant="headline" 
                            component="h3"
                            color={this.props.forward ? 'primary' : 'default'}
                        >
                            Drive
                        </Typography>
                        <ArrowUpwardIcon
                            color={this.props.forward ? 'primary' : 'disabled'}
                            style={{ fontSize: 120 }}
                            onClick={() => this.props.changeDirection(true)}
                        />
                        <br />
                        <ArrowDownwardIcon
                            color={this.props.forward ? 'disabled' : 'primary'}
                            style={{ fontSize: 120 }}
                            onClick={() => this.props.changeDirection(false)}
                        />
                        <Typography 
                            variant="headline" 
                            component="h3"
                            color={this.props.forward ? 'default' : 'primary'}
                        >
                            Reverse
                        </Typography>
                    </Paper>
                </div>
            </div>
        );
    }
}

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);