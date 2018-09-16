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
      mailAddress: '',
      password: ''
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
          <React.Fragment>
            <TextField
              id="mailAddress"
              label="Email"
              className={classes.textField}
              value={this.state.mailAddress}
              onChange={this.handleChange('mailAddress')}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
            />
            <br />
            <Button
              className={classes.reqBtn}
              color="primary"
              variant="contained"
              onClick={() => { this.props.logIn(this.state.mailAddress, this.state.password) }}>
              Log in
              </Button>
          </React.Fragment>
        </Paper>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);