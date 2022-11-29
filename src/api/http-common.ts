import axios from 'axios';
import { BASE_URL } from '../data/constants';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : localStorage.getItem('auth_token')
  }
})
