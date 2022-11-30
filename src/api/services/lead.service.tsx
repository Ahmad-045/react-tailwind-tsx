import { defaultLeadFormType, LeadType, MakeItSaleType } from '../types';
import http from '../http-common';
import { checkUnauthorizationStatus } from '../helper-functions';
import { messages } from '../../data/constants';

class LeadService {
  getAll = async () => {
    try {
      const response = await http.get<LeadType[]>('/leads');
      return response;
    } catch (error) {
      alert(error);
    }
  };

  createLead = async (formData: defaultLeadFormType) => {
    try {
      const response = await http.post(`/leads`, formData);
      if (!checkUnauthorizationStatus(response.data.status)) {
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };

  leadToProjectConversion = async (data: MakeItSaleType) => {
    try {
      const response = await http.post(`/projects`, data);
      if (!checkUnauthorizationStatus(response.data.status)) {
        alert(messages.lead.success_updation);
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };

  deleteLead = async (leadId: number) => {
    try {
      const response = await http.delete(`/leads/${leadId}`);
      if (!checkUnauthorizationStatus(response.data.status)) {
        return response;
      }
    } catch (error) {
      alert(error);
    }
  };
}

export default new LeadService();
