import React, { Fragment } from 'react';
import { LeadType, MakeItSaleType } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import leadService from '../../api/services/lead.service';

interface LeadProp {
  leadslist: LeadType[];
  setLeadsList: React.Dispatch<React.SetStateAction<LeadType[]>>;
  showLeadDetails: (lead: LeadType) => void;
  setSpinnerShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeadLists: React.FC<LeadProp> = ({
  leadslist,
  setLeadsList,
  showLeadDetails,
  setSpinnerShow,
}) => {
  const navigate = useNavigate();

  const makeItASale = async (leadId: number) => {
    const data: MakeItSaleType = {
      lead_id: leadId,
      conversion_date: new Date(),
    };
    const response = await leadService.leadToProjectConversion(data);
    if (response?.status === 200) {
      setLeadsList((prevState) => {
        let data = [...prevState];
        let indexOfChangedList = leadslist.findIndex(
          (list) => list.id === response.data.lead_id
        );
        data[indexOfChangedList] = {
          ...data[indexOfChangedList],
          sale: response.data.conversion_date,
        };
        return data;
      });
    }

    setSpinnerShow(false);
  };

  const deleteLeadHandler = async (leadId: number) => {
    const response = await leadService.deleteLead(leadId);
    if (response?.status === 200) {
      setLeadsList(leadslist.filter((obj) => obj.id !== leadId));
    }
  };

  return (
    <Fragment>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Sr No.
              </th>
              <th scope="col" className="py-3 px-6">
                Project Name
              </th>
              <th scope="col" className="py-3 px-6">
                Client Eamil
              </th>
              <th scope="col" className="py-3 px-6">
                Created At
              </th>
              <th scope="col" className="py-3 px-6">
                Created by
              </th>
              <th scope="col" className="py-3 px-6">
                No. of Phases
              </th>
              <th scope="col" colSpan={2} className="py-3 px-6">
                Actions
              </th>
              <th scope="col" className="py-3 px-6">
                Sale
              </th>
            </tr>
          </thead>
          <tbody>
            {leadslist.map((lead) => (
              <tr
                key={lead.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {lead.id}
                </th>
                <td className="py-4 px-6">{lead.project_name}</td>
                <td className="py-4 px-6">{lead.client_email}</td>
                <td className="py-4 px-6">
                  {lead.created_at.substring(0, 10)}
                </td>
                <td className="py-4 px-6">{lead.user.email}</td>
                <td className="py-4 px-6">{lead.phasesCount}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => showLeadDetails(lead)}
                    className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                  >
                    Lead Details
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => navigate(`${lead.id}/phases`)}
                    className="border-2 border-zinc-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-zinc-600"
                  >
                    Phases & Comments
                  </button>
                </td>
                <td className="py-4 px-6">
                  {lead.sale ? (
                    <p>{lead.sale}</p>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 py-1 px-3 text-white rounded-md"
                      onClick={() => makeItASale(lead.id)}
                    >
                      Make it a Sale
                    </button>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button
                    className="py-1 px-3 rounded-xl ease-in-out duration-200 text-white bg-red-600"
                    onClick={(e) => {
                      if (
                        window.confirm(
                          'Are you sure you wish to delete this item?'
                        )
                      )
                        deleteLeadHandler(lead.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default LeadLists;
