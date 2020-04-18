import React from 'react';
import jQuery from 'jquery';
import { localUrl } from './constants';
import { Route, Redirect } from 'react-router-dom';


export const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
export const validateUserInputs = obj => {
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );
  const items = Object.keys(obj);
  const regPwd = obj.password;
  const errors = {};
  items.map(key => {
    const value = obj[key];
    switch (key) {
      case 'email':
        if (!validEmailRegex.test(value)) {
          errors[key] = 'Email is not Valid';
        }
        break;
      case 'password':
        if (value.length <= 6) {
          errors[key] = 'Password must contains 6 characters';
        }
        break;
      case 'retype_password':
        if (regPwd.localeCompare(value) !== 0) {
          errors[key] = 'Password Mismatched';
        }
        break;
      case 'last_name':
        if (value.length <= 3) {
          errors[key] = 'Lastname atleast contains 4 characters';
        }
        break;
      case 'first_name':
        if (value.length <= 3) {
          errors[key] = 'Firstname atleast contains 4 characters';
        }
        break;
      case 'acc_type':
        console.log('val', value)
        if (value !== 0 && value !== 1 && value !== 2) {
          errors[key] = 'Required';
        }
      default:
        break;
    }
  });
  return errors;
};

export const validateInputs = obj => {
  const items = Object.keys(obj);
  const errors = {};
  items.map(key => {
    const value = obj[key];
    if (!value) {
      errors[key] = 'Required';
    }
  });
  return errors;
};

export const copyObj = obj =>
  obj
    ? Object.prototype.toString.call(obj) === '[object Object]'
      ? jQuery.extend(true, {}, obj)
      : JSON.parse(JSON.stringify(obj))
    : obj;

export const toFormData = (obj, form, namespace) => {
  console.log('to form get obj', obj)
  let fd = form || new FormData();
  let formKey;
  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File, use recursivity.
      if (obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      }
      else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        toFormData(obj[property], fd, formKey);
      } else { // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }
  console.log('fd', fd)
  return fd;
}


export const apiPost = async data => {
  console.log('ApiPost fetch before >>>', data);
  var bodyObj;
  var headerObj;

  headerObj = {
    'Content-type': 'application/json',
    Authorization: localStorage.getItem('token'),
    _id : localStorage.getItem('user_id')
  }

  bodyObj = JSON.stringify(data.body)

  try {
    const response = await fetch(localUrl + data.url, {
      method: 'POST',
      headers: headerObj,
      body: bodyObj,
    });
    console.log('response', response);
    return response.json();
  } catch (err) {
    console.log('apiPost json error', err);
    return err;
  }
}

export const apiPut = async data => {
  console.log('ApiPut fetch before', data);

  var bodyObj;
  var headerObj;
  if ('image' in data.body) {
    console.log("Image Data")
    const newObj = await toFormData(data.body)
    //Object.keys(data.body).forEach(key => formData.append(key, data.body[key]));
    const h = {}; //headers
    h.Accept = 'application/json';
    headerObj = h
    bodyObj = newObj
  } else {
    headerObj = {
      'Content-type': 'application/json',
    }
    bodyObj = JSON.stringify(data.body)
  }

  try {
    const response = await fetch(localUrl + data.url, {
      method: 'PUT',
      headers: headerObj,
      body: bodyObj,
    });
    console.log('response', response);
    return response.json();
  } catch (err) {
    console.log('apiPut json error', err);
    return err;
  }
};

export const apiDelete = async data => {
  console.log('delete fetch before', data);
  try {
    const response = await fetch(localUrl + data.url, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-type': 'application/json',
      },
    });
    console.log('delete response', response);
    return response.json();
  } catch (err) {
    console.log('apiDelete json error', err);
    return err;
  }
};


export const apiGet = async data => {
  console.log('api get fetch before', data);
  try {
    const response = await fetch(localUrl + data.url, {
      method: 'Get',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-type': 'application/json',
      },
    });
    console.log('get response', response);
    return response.json();
  } catch (err) {
    console.log('get json error', err);
    // return err;
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      CheckToken() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export const PrivateRouteLogin = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      CheckToken() ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

export const CheckToken = () => {
  var token = localStorage.getItem('token');
  // var id = localStorage.getItem('id');
  // var acc_type = localStorage.getItem('type');
  // var last_name = localStorage.getItem('last_name');
  // var first_name = localStorage.getItem('first_name');

  if (token) {
    return true;
  }

  return false;

};