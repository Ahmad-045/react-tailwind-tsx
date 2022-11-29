import axios from 'axios';
import { DataType } from './types';

export const setAuthToken = () => {
  let auth_token = axios.defaults.headers.common['Authorization'];
  if (!auth_token) {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('auth_token');
  }
};

export const checkUnauthorizationStatus = (status: string) => {
  if (status === 'unauthorized') {
    alert('Not Authorized to Perform this action!');
    return true;
  }
  return false;
};

export const matchUserToSelectFields = (data: DataType[]) => {
  const newOptions = data.map((option) => ({
    value: option.id,
    label: option.email,
  }));
  return newOptions;
};
