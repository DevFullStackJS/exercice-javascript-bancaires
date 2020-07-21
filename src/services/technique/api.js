import axios from 'axios';
import config from '../config';

import store from '../redux/store';

export const headers = (token) => {
  const users = store.getState().users;
  console.log({ users });
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'auth-token': `${users && users.user ? users.user.token : ''}`,
    Authorization: `Bearer ${token}`,
  };
};

export const get = async (url, token) => {
  try {
    const res = await axios.get(`${config.baseURL}${url}`, {
      headers: token ? headers(token) : headers(),
    });
    console.log('get res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    console.log('get errors ------------>', errors);
    return errors;
  }
};

export const post = async (url, data, token) => {
  try {
    const res = await axios.post(`${config.baseURL}${url}`, data, {
      headers: headers(token),
    });
    console.log('post res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    console.log('post errors ------------>', errors);
    return errors;
  }
};

export const put = async (url, data = {}, token) => {
  try {
    const res = await axios.put(`${config.baseURL}${url}`, data, {
      headers: token ? headers(token) : headers(),
    });
    console.log('put res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    console.log('put errors ------------>', errors);
    return errors;
  }
};

export const remove = async (url, token) => {
  try {
    const res = await axios.delete(`${config.baseURL}${url}`, {
      headers: headers(token),
    });
    console.log('remove res ------------>', res);
    return res;
  } catch (e) {
    const errors = e ? JSON.parse(JSON.stringify(e)) : { error: true };
    console.log('remove errors ------------>', errors);
    return errors;
  }
};

export const patch = async () => {};

export default {
  get,
  patch,
  post,
  put,
  remove,
};
