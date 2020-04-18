/**
 *
 * Task
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify'
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { validateInputs, copyObj, apiPost, validEmailRegex } from '../Library'
import io from "socket.io-client";
import { localUrl } from '../Library/constants';
const socket = io(localUrl);

/* eslint-disable react/prefer-stateless-function */
export class Task extends React.PureComponent {
  state = {
    task: {
      name: '',
      description: '',
      status: '',
    },
    id: ''
  }

  componentDidMount = async () => {
    console.log('this.props', this.props)
    if (this.props.match.params && this.props.match.params.id) {

      let data = {
        url: `tasks/fetchTaskById/${this.props.match.params.id}`,
      }

      let editData = await apiPost(data)
      if (editData.status) {
        const { name, description, status, _id } = editData.data
        this.setState({
          task: {
            ...this.state.task, name: name, description: description, status: status,
          },
          id: _id,
        })
      } else {
        this.props.history.push('/task')

        toast.success('Error Occured', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  }

  onSubmitForm = async (e) => {
    const inputs = copyObj(this.state.task)
    let errors = validateInputs(inputs)

    if (Object.keys(errors).length === 0) {
      console.log("State Value", this.state)
      let data = {
        url: this.state.id ? `tasks/update/${this.state.id}` : 'tasks/create',
        body: inputs
      }
      let taskObj = await apiPost(data)

      if (taskObj.status) {
        this.props.history.push('/task')
        socket.emit("fetchAll");
        socket.on('taskDetails',(data) => {
          this.setState({ rows: data })
        })

        toast.success("Successfully Updated", {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        toast.success('Something went wrong', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  }

  onInputChange = (e) => {
    const { name, value } = e.target
     console.log('name', name, value)
     this.setState({
      task: { ...this.state.task, [name]: value },
    });
  }

  render() {
    const { task,id} = this.state
    return (
      <div>
        <Helmet>
          <title>Task</title>
          <meta name="description" content="Description of Task" />
        </Helmet>
        <h1 className=''>{id ? 'EDIT Task' : 'ADD Task'}</h1>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="paper">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Task Name"
              name="name"
              value={task.name}
              onChange={this.onInputChange}
              autoComplete="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="description"
              value={task.description}
              onChange={this.onInputChange}
              label="Task Description"
              id="description"
              autoComplete="description"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="status"
              value={task.status}
              onChange={this.onInputChange}
              label="Task Status"
              id="status"
              autoComplete="status"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.onSubmitForm}
            >
              Submit
           </Button>
          </div>
        </Container>
      </div>
    );
  }
}

Task.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  task: makeSelectTask(),
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

const withReducer = injectReducer({ key: 'task', reducer });
const withSaga = injectSaga({ key: 'task', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Task);
