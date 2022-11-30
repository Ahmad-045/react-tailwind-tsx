import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import userService from '../api/services/user.service';
import { matchUserToSelectFields } from '../api/helper-functions';
import { optionsForSelect } from '../data/generic-types';
import phaseService from '../api/services/phase.service';
import Spinner from '../UI/Spinner';

import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface EngineerFormType {
  hideModal: React.Dispatch<React.SetStateAction<boolean>>;
  phaseid: number;
}

const EngineerForm: React.FC<EngineerFormType> = ({ phaseid, hideModal }) => {
  const [engineers, setEngineers] = useState<optionsForSelect[] | null>([]);
  const [selectedOptions, setSelectedOptions] = useState<optionsForSelect[]>(
    []
  );
  const [spinnerShow, setSpinnerShow] = useState<boolean>(true);

  useEffect(() => {
    const extractEngineersHandler = async () => {
      const response = await userService.getUsersWithRole('engineer');
      if (response!.status === 200) {
        setEngineers(matchUserToSelectFields(response!.data));
      }
      setSpinnerShow(false);
    };
    extractEngineersHandler();
  }, []);

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();

    setSpinnerShow(true);
    let engIds = selectedOptions.map((eng) => eng.value);
    const response = await phaseService.assignEngineer(engIds, phaseid);
    if (response!.status === 200) {
      setSpinnerShow(false);
      hideModal(false);
    }
  };

  const changeSelectedHandler = (newValue: MultiValue<optionsForSelect>) => {
    console.log(newValue);
    // setSelectedOptions({ newValue });
  };

  return (
    <Fragment>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <form onSubmit={submitFormHandler}>
          <h1 className="mb-5 font-medium underline text-xl">
            All Available Engineers in the Company
          </h1>
          {engineers && (
            <Select
              options={engineers}
              components={animatedComponents}
              isMulti
              closeMenuOnSelect={true}
              // onChange={changeSelectedHandler}
            />
          )}
          <button
            type="submit"
            className="float-right my-5 mr-5 bg-blue-600 text-white px-3 py-1 rounded-md"
          >
            Add Engineers
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default EngineerForm;
