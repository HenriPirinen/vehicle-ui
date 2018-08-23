import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  content: theme.mixins.gutters({
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  reqBtn: {
    margin: theme.spacing.unit * 3,
  },
  appTitle: {
    flex: 1,
    paddingTop: theme.spacing.unit * 3,

  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: '',
      tokenRequested: false,
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  activateInput = () => {
    this.setState({ tokenRequested: true });
  }

  render() {
    const { classes } = this.props;
    if (this.props.verified) {
      return <Redirect to="/" />
    }
    return (
      <div className={classes.content}>
        <Paper className={classes.root}>
          <Typography variant="display1" noWrap className={classes.appTitle}>
            <a className={classes.link} href="https://github.com/HenriPirinen/vehicle-ui">Regni UI</a>
          </Typography>
          <Typography variant="caption" noWrap className={classes.appTitle}>
            <a className={classes.link} href="https://github.com/HenriPirinen/vehicle-ui/releases">v0.1.0</a>
          </Typography>
          {this.state.tokenRequested ? (
            <React.Fragment>
              <TextField
                id="token"
                label="Session token"
                className={classes.textField}
                value={this.state.token}
                onChange={this.handleChange('token')}
                margin="normal"
              />
              <br />
              <Button
                color="primary"
                className={classes.reqBtn}
                variant="contained"
                onClick={() => this.props.authToken('verify', this.state.token)}>
                Verify
              </Button>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Button
                  className={classes.reqBtn}
                  color="primary"
                  variant="contained"
                  onClick={() => { this.activateInput(); this.props.authToken('request', null) }}>
                  Request token
              </Button>
              </React.Fragment>
            )}
        </Paper>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);