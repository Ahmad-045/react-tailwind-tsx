import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import phaseService from '../../api/services/phase.service';
import { PhaseType, UserType } from '../../api/types';
import UserContext from '../../store/user-context';
import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner';
import PhaseForm from './PhaseForm';
import PhaseList from './PhaseList';
import PhaseManagerDetail from './PhaseManagerDetail';

type PhaseParamsType = {
  id: string;
};

const Phase = () => {
  const userCtx = useContext(UserContext);
  const userRoles = [...userCtx.user.roles.map((x) => x.name)];

  const { id } = useParams<PhaseParamsType>();

  const [phases, setPhases] = useState<PhaseType[]>([]);
  const [manager, setManager] = useState<UserType | null>();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [spinnerShow, setSpinnerShow] = useState<boolean>(true);

  useEffect(() => {
    const getPhasesOfLead = async () => {
      const response = await phaseService.getPhases(id as string);
      setPhases(response!.data);
      setSpinnerShow(false);
    };
    getPhasesOfLead();
  }, [id]);

  const showManagerHandler = (phase: PhaseType) => {
    setManager(phase.manager);
    setModalShow(true);
  };

  const createNewPhase = () => {
    setManager(null);
    setModalShow(true);
  };

  let buttonData = null;
  if (userRoles.includes('admin') || userRoles.includes('bd')) {
    buttonData = (
      <button
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
        onClick={createNewPhase}
      >
        Create New Phase
      </button>
    );
  }

  return (
    <div className="mt-3">
      <h1 className="text-lg font-medium">Phases Of this Lead</h1>
      {buttonData}
      {spinnerShow ? (
        <Spinner />
      ) : (
        <PhaseList
          phaselist={phases}
          showManagerDetails={showManagerHandler}
          setPhases={setPhases}
          id={id!}
        />
      )}

      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {manager && <PhaseManagerDetail phaseManager={manager} />}
          {!manager && (
            <PhaseForm
              setModalShow={setModalShow}
              setPhases={setPhases}
              leadId={id as string}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Phase;
