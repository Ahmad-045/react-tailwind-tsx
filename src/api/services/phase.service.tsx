import { defaultPhaseFormType, PhaseType, UserType } from '../types';
import http from '../http-common';
import { checkUnauthorizationStatus } from '../helper-functions';
import { messages } from '../../data/constants';

class PhaseService {
  getPhases = async (id: string) => {
    try {
      const response = await http.get<PhaseType[]>(`/leads/${id}`);
      return response;
    } catch (error) {
      alert(error);
    }
  };

  getEngineers = async (phaseId: number) => {
    try {
      const response = await http.get<UserType>(
        `/get_engineer_users/${phaseId}`
      );
      return response;
    } catch (error) {
      alert(error);
    }
  };

  createNewPhase = async (formData: defaultPhaseFormType) => {
    try {
      const response = await http.post(`/phases`, formData);
      return response;
    } catch (error) {
      alert(error);
    }
  };

  assignEngineer = async (engIds: (number | string)[], id: number) => {
    try {
      const response = await http.post(`/assign_engineer`, {
        data: { engIds, id },
      });
      if (!checkUnauthorizationStatus(response.data.status)) {
        alert(messages.phase.success_added_eng);
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };

  deletePhase = async (phaseId: number) => {
    try {
      const response = await http.delete(`/phases/${phaseId}`);
      if (!checkUnauthorizationStatus(response.data.status)) {
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };
}

export default new PhaseService();
