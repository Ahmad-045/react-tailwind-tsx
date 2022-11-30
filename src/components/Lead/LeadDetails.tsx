import React from 'react';
import { LeadType } from '../../api/types';
import { LEAD_DETAILS_MAPPING } from '../../data/data-mapping';

interface LeadProps {
  singleleadData: LeadType;
}

const LeadDetails: React.FC<LeadProps> = ({ singleleadData }) => {
  const keys: string[] = Object.keys(singleleadData);
  const filteredKeys: string[] = keys.filter((key) => key !== 'user');

  return (
    <div className="grid grid-cols-1 gap-4">
      <p>
        <strong>Created By: </strong>
        {singleleadData.user.email}
      </p>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {singleleadData &&
              filteredKeys.map((key: string, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {LEAD_DETAILS_MAPPING[key]}
                  </th>
                  <td className="py-4 px-6">
                    {`${singleleadData[key as keyof typeof singleleadData]}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadDetails;
