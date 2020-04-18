/**
 *
 * SignUp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSignUp from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from 'react-s-alert';
import { validateInputs, copyObj, apiPost, validEmailRegex } from '../Library'


/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.PureComponent {
  state = {
    user_details: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    errors: {}
  }

  // onInputChnage
  onInputChange = (e) => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    const { name, value } = e.target
    let errVal;
    switch (name) {
      case 'email':
        errVal = !validEmailRegex.test(value) ? 'Email is not Valid' : ''
        break;
      case 'password':
        errVal = value.length <= 7 ? 'Weak Password' : 'Strong Password';
        break;
      case 'retype_password':
        const comparePwd = this.state.user_details.password.localeCompare(value)
        errVal = comparePwd === 0 ? '' : 'Password is mismatched'
        break;
      default:
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: errVal !== 'undefined' ? errVal : '',
      },
    });
    this.setState({
      user_details: { ...this.state.user_details, [name]: value },
    });
  }

  SubmitRegisterForm = async () => {
    const inputs = copyObj(this.state.user_details)
    let errors = validateInputs(inputs)
    console.log('login errors', errors)

    if (Object.keys(errors).length === 0) {
      let data = {
        url: 'user/register/',
        body: inputs
      }
      let userObj = await apiPost(data)
      if (userObj.status) {
        const { data } = userObj
        this.props.history.push('/task')

        Alert.success(userObj.message, {
          position: 'top-right',
          effect: 'jelly',
          onShow() { },
          beep: true,
          timeout: 2000,
          offset: 50,
        });

      } else {
        Alert.error('Something Went Wrong try again', {
          position: 'top-right',
          effect: 'jelly',
          onShow() { },
          beep: true,
          timeout: 2000,
          offset: 50,
        });
      }
    }
  }

  render() {
    const { user_details,errors } = this.state;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
        </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="first_name"
                  onChange={this.onInputChange}
                  value={user_details.first_name}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  value={user_details.last_name}
                  onChange={this.onInputChange}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  value={user_details.email}
                  onChange={this.onInputChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  value={user_details.password}
                  onChange={this.onInputChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  value={user_details.confirm_password}
                  onChange={this.onInputChange}
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.SubmitRegisterForm}
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  signUp: makeSelectSignUp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga });

export default compose(
  withReducer,
  withRouter,
  withSaga,
  withConnect,
)(SignUp);
