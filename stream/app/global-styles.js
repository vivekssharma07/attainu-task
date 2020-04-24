import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .paper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar: {
    background-color: #fafafa;
  }
  .form {
    width: 100%;
    }
  .submit: {
    margin: theme.spacing(3, 0, 2),
  }
  /* // footer */
  .footer-wrapper {
    background: #353535;
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px 20px;
  }
  .official-logo {
    width: 48px;
    height: 48px;
  }
  .logo-text-wrapper {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 75px;
    margin: 0px 5px;
  }
  .mb-0, .my-0 {
    margin-bottom: 0!important;
  }
  .mr-2, .mx-2 {
    margin-right: .5rem!important;
  }
  .ml-2, .mx-2 {
    margin-left: .5rem!important;
  }
  .text-light {
    color: #f8f9fa!important;
  }
  .cursor {
    cursor: pointer;
  }
  .menu-icon {
    display: none;
    z-index: 5;
  }
  .res-navbar {
    display: none;
  }
  .navbar-wrapper {
    display: none;
  }
  .navbar-container {
    position: relative;
    height: 80px;
    padding: 10px 40px;
    display: flex;
    color: #ffffff;
    background: #060606;
    justify-content: space-between;
    align-items: center;
  }
  .official-logo {
    width: 48px;
    height: 48px;
  }
  .logo-text-wrapper {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 75px;
    margin: 0px 5px;
  }
  .menu-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .menu-link {
    margin: 0px 10px;
    cursor: pointer;
    font-size: 20px;
    text-decoration: none;
    padding: 20px 0px;
    color: var(--light-bg);
  }
  .menu-link:hover {
    padding-top: 10px;
    color: white;
    text-decoration: none;
  }
  .selected-Link {
    color: var(--primary-color);
    font-weight: bolder;
  }
  .menu-search-field {
    background: var(--primary-color);
    border-radius: 50%;
    height: 40px;
    margin-right: 25px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fa-search {
    color: var(--dark-bg);
    font-size: 22px;
    font-weight: normal;
  }
  .profile-popover-wrapper {
    background: #ffffff;
    z-index: 6;
    position: absolute;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    color: #094a55;
    list-style: none;
    top: 100%;
    right: 0;
    min-width: 200px;
  }
  .profile-box-link {
    margin: 3px 0px;
    cursor: pointer;
    transition: all 0.5s;
  }
  .profile-box-link:hover {
    padding-left: 5px;
  }
  .profile-page-container{
    background: #F7F7F7;
    min-height: 100vh;
  }
  .profile-page-body {
    display: flex;
    margin-top: 50px;
  }
  .profile-page-col1 {
    width: 22%;
  }
  .profile-page-col2 {
    width: 78%;
    background: #ffffff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
    border-radius: 6px;
  }
`;

export default GlobalStyle;
