import { defaultLeadFormType, LeadType, MakeItSaleType } from '../types';
import http from '../http-common';
import { checkUnauthorizationStatus } from '../helper-functions';
import { messages } from '../../data/constants';

class LoginService {
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
