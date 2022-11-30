import { LeadType } from '../types';
import http from '../http-common';

class LeadService {
  getAll = async () => {
    try {
      const response = await http.get<LeadType[]>('/leads');
      return response;
    } catch (error) {
      alert(error);
    }
  };
}

export default new LeadService();
