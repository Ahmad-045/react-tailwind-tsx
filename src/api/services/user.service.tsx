import { UserType } from '../types';
import http from '../http-common';

class UserService {
  getUsersWithRole = async (role: string) => {
    try {
      const response = await http.get<UserType[]>(
        `/user_with_role?role=${role}`
      );
      return response;
    } catch (error) {
      alert(error);
    }
  };
}

export default new UserService();
