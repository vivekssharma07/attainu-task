import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Switch, Route, NavLink } from 'react-router-dom'

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      display: false,
    };
  }

  componentDidMount() {

  }

  openPopover = () => {
    this.setState({
      display: !this.state.display,
    });
  };

  userLogout = () => {
    console.log("comessss")
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    window.location.href = '/'
  };

  render() {
    const token = localStorage.getItem('token')
    const { display } = this.state;

    return (
      <div className="navbar-container">
        <div>
          <h1 className="font-xl text-light ml-3">E-Learning</h1>
        </div>
        <div className="logo-text-wrapper">
          <NavLink exact activeClassName='selected-Link' to='/' className='menu-link'>Login</NavLink>
          <NavLink exact activeClassName='selected-Link' to='/register' className='menu-link'>SignUp</NavLink>
        </div>
        {token ? (<div className="menu-wrapper">
          <React.Fragment><NavLink exact activeClassName='selected-Link'
            to='/task' className='menu-link'>Task Details</NavLink>
            <a onClick={this.userLogout} className="menu-link selected-Link">Logout</a>
          </React.Fragment>
        </div>) : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //user: state.default.user,
})

const mapDispatchToProps = {

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))

