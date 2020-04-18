/**
 *
 * SingIn
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
import makeSelectSingIn from './selectors';
import reducer from './reducer';
import { toast } from 'react-toastify'
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

import { validateInputs, copyObj, apiPost, validEmailRegex } from '../Library'

/* eslint-disable react/prefer-stateless-function */
export class SingIn extends React.PureComponent {
  state = {
    email: '',
    password: ''
  }
  // onInputChnage
  onInputChange = (e) => {
    const { name, value } = e.target
    // console.log('name', name, value)
    this.setState({
      [name]: value
    })
  }

  loginForm = async () => {
    const inputs = copyObj(this.state)
    let errors = validateInputs(inputs)
    console.log('login errors', errors)

    if (Object.keys(errors).length === 0) {
      // this.setState({ errors: {}, loading: true })
      let data = {
        url: 'user/login/',
        body: inputs
      }
      let userObj = await apiPost(data)
      console.log("userObject", userObj)
      if (userObj.success) {
        const { data } = userObj
        localStorage.setItem('token', userObj.token)
        localStorage.setItem('user_id', userObj.id)
        this.props.history.push('/task')

        toast.success(userObj.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
        

      } else {
        toast.success("Something Went Wrong", {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  }
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={this.onInputChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={this.onInputChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.loginForm}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
          <Box mt={8}>
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

SingIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  singIn: makeSelectSingIn(),
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

const withReducer = injectReducer({ key: 'singIn', reducer });
const withSaga = injectSaga({ key: 'singIn', saga });

export default compose(
  withReducer,
  withSaga,
  withRouter,
  withConnect,
)(SingIn);
