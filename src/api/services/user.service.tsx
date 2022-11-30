import { UserType } from '../types';
import http from '../http-common';
import { checkUnauthorizationStatus } from '../helper-functions';
import { optionsForSelect } from '../../data/generic-types';
import { messages } from '../../data/constants';

class UserService {
  getAll = async () => {
    try {
      const response = await http.get(`/users`);
      if (!checkUnauthorizationStatus(response.data.status)) {
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };

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

  assignRolesToUser = async (
    currentUserId: number,
    newroles: optionsForSelect[]
  ) => {
    let rolesValue = newroles.map((role) => role.value);

    try {
      const response = await http.patch(`/users/${currentUserId}`, {
        data: rolesValue,
      });
      alert(messages.user.success_updated_role);
      return response;
    } catch (error) {
      alert(error);
    }
  };

  deleteUser = async (userId: number) => {
    try {
      const response = await http.delete(`/users/${userId}`);
      if (!checkUnauthorizationStatus(response.data.status)) {
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };
}

export default new UserService();
