import React, { Fragment } from 'react';
import { UserType } from '../../api/types';
import { USER_DETAILS_MAPPING } from '../../data/data-mapping';

interface PhaseManagerProps {
  phaseManager: UserType;
}

const PhaseManagerDetail: React.FC<PhaseManagerProps> = ({ phaseManager }) => {
  let userKeys: string[] = Object.keys(phaseManager);
  const forDeletion = ['created_at', 'updated_at'];
  userKeys = userKeys.filter((x) => !forDeletion.includes(x));

  return (
    <Fragment>
      <div className="overflow-x-auto relative">
        <h1 className="text-lg font-medium mt-3 underline">Manager Details</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {userKeys.map((key, index) => (
              <tr
                key={key + index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {USER_DETAILS_MAPPING[key]}
                </th>
                <td className="py-4 px-6">
                  {`${phaseManager[key as keyof typeof phaseManager]}`}{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default PhaseManagerDetail;
