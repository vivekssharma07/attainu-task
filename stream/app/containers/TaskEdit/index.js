/**
 *
 * TaskEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTaskEdit from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class TaskEdit extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>TaskEdit</title>
          <meta name="description" content="Description of TaskEdit" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

TaskEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  taskEdit: makeSelectTaskEdit(),
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

const withReducer = injectReducer({ key: 'taskEdit', reducer });
const withSaga = injectSaga({ key: 'taskEdit', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TaskEdit);
