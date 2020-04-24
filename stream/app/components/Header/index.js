import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

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
        <div className="logo-text-wrapper">
          <h1 className="font-xl text-light ml-3">App</h1>
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

