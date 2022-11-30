import {
  defaultLeadFormType,
  LeadType,
  LoginInFormType,
  MakeItSaleType,
} from '../types';
import http from '../http-common';
import { checkUnauthorizationStatus } from '../helper-functions';
import { messages } from '../../data/constants';

class LoginService {
  loginRequest = async (user: LoginInFormType) => {
    try {
      const response = await http.post(`/users/sign_in`, { data: user });

      if (response.data.status === 'unauthorized') {
        alert(messages.incorrect_credentails);
        return false;
      }

      http.defaults.headers.common['Authorization'] =
        response.headers.authorization;

      return response;
    } catch (error) {
      alert(error);
    }
  };

  logoutRequest = async (authToken: string) => {
    const config = {
      data: {
        authorization: authToken,
      },
    };

    try {
      const response = await http.delete(`/users/sign_out`, config);
      if (response?.status === 200) {
        alert(messages.success_logout);
        http.defaults.headers.common['Authorization'] = null;
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };
}

export default new LoginService();
