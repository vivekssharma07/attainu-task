/**
 *
 * TaskDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTaskDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import { validateInputs, copyObj, apiPost, apiDelete } from '../Library'
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import io from "socket.io-client";
import { localUrl } from '../Library/constants';
const socket = io(localUrl);

/* eslint-disable react/prefer-stateless-function */
export class TaskDetails extends React.PureComponent {
  state = {
    rows: []
  }

  editUser = async (row) => {
    let data = {
      url: `tasks/fetchTaskById/${row._id}`,
    }
    let taskDetails = await apiPost(data)
    if (taskDetails.status) {
      this.props.history.push('/task/edit/' + row._id)

    } else {
      toast.success('Edit Restricted for the user', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  }

  deleteUser = async (row) => {
    this.props.history.push('/task');

    let data = {
      url: `tasks/delete/${row._id}`,
    }
    let taskDel = await apiPost(data)

    if (taskDel.data > 0) {
      socket.emit("fetchAll");
      socket.on('taskDetails',(data) => {
        this.setState({ rows: data })
      })

      toast.success('Successfully Deleted!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });

    } else {
      toast.success('Delete Restricted for the user', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });

    }

  }

  componentDidMount = async () => {
    socket.emit("fetchAll");
    socket.on('taskDetails',(data) => {
      this.setState({ rows: data })
    })
    
    /* let data = {
      url: 'tasks/fetchAll'
    }

    let taskObj = await apiPost(data)
    console.log("userObject", taskObj)
    if (taskObj.status) {
      const { data } = taskObj
      this.setState({ rows: data })

    } else {
      console.log("API error something went wrong!")
    } */
  }

  render() {
    const { rows } = this.state;
    return (
      <React.Fragment>
        <NavLink to='task/add' className='link-class'>
          <Fab size="medium" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </NavLink>
        <div className='my-3'>
          <TableContainer component={Paper}>
            <Table className='table-style' aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className='text-capitalize'>Name</TableCell>
                  <TableCell className='text-capitalize'>Description</TableCell>
                  <TableCell className='text-capitalize'>Status</TableCell>
                  <TableCell className='text-capitalize'>Created By</TableCell>
                  <TableCell className='text-capitalize'>Created At</TableCell>
                  <TableCell className='text-capitalize'>Updated At</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell className='text-capitalize'>{row.name}</TableCell>
                    <TableCell className='text-capitalize'>{row.description}</TableCell>
                    <TableCell className='text-capitalize'>{row.status}</TableCell>
                    <TableCell className='text-capitalize'>{row.user_name}</TableCell>
                    <TableCell className='text-capitalize'>{row.createdAt}</TableCell>
                    <TableCell className='text-capitalize'>{row.updatedAt}</TableCell>
                    <TableCell className='edit-class'>
                      <Fab color="secondary" aria-label="edit">
                        <EditIcon onClick={() => this.editUser(row)}  />
                      </Fab>
                    </TableCell>
                    <TableCell className='edit-class'>
                      <IconButton aria-label="delete" >
                        <DeleteIcon onClick={() => this.deleteUser(row)} fontSize="large" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ React.Fragment>
    )
  };
}
TaskDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  taskDetails: makeSelectTaskDetails(),
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

const withReducer = injectReducer({ key: 'taskDetails', reducer });
const withSaga = injectSaga({ key: 'taskDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(TaskDetails);
