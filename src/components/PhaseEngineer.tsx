import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from '../api/types';
import phaseService from '../api/services/phase.service';
import Spinner from '../UI/Spinner';
import Comments from './Comment/Comments';

const PhaseEngineer = () => {
  const { phaseId } = useParams();
  const [engineers, setEngineers] = useState<UserType[]>([]);
  const [spinnerShow, setSpinnerShow] = useState(true);

  useEffect(() => {
    const extractEngOfPhaseHandler = async () => {
      const response = await phaseService.getEngineersOfPhase(phaseId!);
      if (response?.status === 200) {
        setEngineers(response.data);
      }
      setSpinnerShow(false);
    };
    extractEngOfPhaseHandler();
  }, [phaseId]);

  const engineersData = (
    <div>
      {engineers.length === 0 ? (
        <p className="text-center my-5 font-medium text-2xl">
          Right Now., No Engineers are Working on this Phase
        </p>
      ) : (
        engineers.map((e, i) => (
          <div key={i} className="shadow-md my-3 px-3 py-4">
            <p>
              <strong>EMP ID: </strong>
              {e.id}
            </p>
            <p>
              <strong>Eamil: </strong>
              {e.email}
            </p>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div>
      <h1 className="bg-gray-600 inline-block text-white font-medium px-3 py-1 rounded-md my-3">
        Engineers working on this Phase
      </h1>
      {spinnerShow ? <Spinner /> : engineersData}
      <Comments id={phaseId!} commentType="/phases/" />
    </div>
  );
};

export default PhaseEngineer;
