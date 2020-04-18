/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ToasterStyle from './toaster';
import Header from 'components/Header';
import SignIn from 'containers/singIn/Loadable';
import SignUp from 'containers/signUp/Loadable';
import TaskDetails from 'containers/taskDetails/Loadable';
import Task from 'containers/task/Loadable';
import GlobalStyle from '../../global-styles';
import { PrivateRoute, CheckToken, PrivateRouteLogin } from '../Library';

const AppWrapper = styled.div`
  max-width: calc(900px + 150px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path="/" component={SignIn} />
        <PrivateRoute exact path="/register" component={SignUp} />
        <PrivateRoute exact path="/task" component={TaskDetails} />
        <PrivateRoute exact path="/task/add" component={Task} />
        <PrivateRoute exact path="/task/edit/:id" component={Task} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
      <ToastContainer />
      <ToasterStyle />
    </AppWrapper> 
  );
}
