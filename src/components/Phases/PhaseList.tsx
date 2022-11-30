import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner';

import UserContext from '../../store/user-context';
import { PhaseType } from '../../api/types';
import { STATUS_LIST } from '../../data/data-mapping';
import { optionsForSelect } from '../../data/generic-types';
import phaseService from '../../api/services/phase.service';
import EngineerForm from '../EngineerForm';

interface PhaseProps {
  phaselist: PhaseType[];
  id: string;
  showManagerDetails: (phase: PhaseType) => void;
  setPhases: React.Dispatch<React.SetStateAction<PhaseType[]>>;
}

const PhaseList: React.FC<PhaseProps> = ({
  phaselist,
  id,
  showManagerDetails,
  setPhases,
}) => {
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [phaseId, setPhaseId] = useState<number>();
  const [spinnerShow, setSpinnerShow] = useState<boolean>(false);
  const [canUpdate, setCanUpdate] = useState<boolean>(false);

  useEffect(() => {
    userCtx.user.roles.forEach((role) => {
      if (role.name !== 'engineer') {
        setCanUpdate(true);
      }
    });
  }, [userCtx.user]);

  const reshapePhaseStatus = (status: string) => {
    let obj = STATUS_LIST.find((o) => o.label === status);
    return obj;
  };

  const addEngieersForm = (id: number) => {
    setModalShow(true);
    setPhaseId(id);
  };

  const deletePhase = async (phaseId: number) => {
    const response = await phaseService.deletePhase(phaseId);
    if (response?.status === 200) {
      setPhases(phaselist.filter((obj) => obj.id !== phaseId));
    }
  };

  return (
    <Fragment>
      {phaselist.length === 0 ? (
        <p className="text-center my-5 font-medium text-2xl">
          Right Now., There are no Phase for this
        </p>
      ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
          {spinnerShow ? (
            <Spinner />
          ) : (
            <table>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Sr No.
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Phase Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Start Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    End Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Created At
                  </th>
                  <th scope="col" colSpan={4} className="py-3 px-6">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {phaselist?.map((phase) => (
                  <tr
                    key={phase.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {phase.id}
                    </th>
                    <td className="py-4 px-6">{phase.phase_name}</td>
                    <td className="py-4 px-6">{phase.start_date}</td>
                    <td className="py-4 px-6">{phase.end_date}</td>
                    {/* <td className="py-4 px-6">
                      <Select
                        isDisabled={!canUpdate}
                        options={STATUS_LIST}
                        defaultValue={reshapePhaseStatus(phase.status)}
                        onChange={(e) => updatePhaseStatus(e, phase.id)}
                      />
                    </td> */}
                    <td className="py-4 px-6">
                      {phase.created_at.substring(0, 10)}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => showManagerDetails(phase)}
                        className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                      >
                        Manager
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => addEngieersForm(phase.id)}
                        className="border-2 border-zinc-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-zinc-600"
                      >
                        Add Engineers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          <EngineerForm hideModal={setModalShow} phaseid={phaseId} />
        </Modal>
      )}
    </Fragment>
  );
};

export default PhaseList;
