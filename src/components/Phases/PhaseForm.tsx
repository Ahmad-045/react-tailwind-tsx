import React, { FormEvent, useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import Select, { SingleValue } from 'react-select';

import { defaultPhaseFormType, PhaseType, UserType } from '../../api/types';
import userService from '../../api/services/user.service';
import phaseService from '../../api/services/phase.service';
import { matchUserToSelectFields } from '../../api/helper-functions';
import { optionsForSelect } from '../../data/generic-types';
import { messages } from '../../data/constants';
import Spinner from '../../UI/Spinner';

interface PhaseFormProps {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setPhases: React.Dispatch<React.SetStateAction<PhaseType[]>>;
  leadId: string;
}

const defaultFormState: defaultPhaseFormType = {
  phase_name: '',
  start_date: new Date(),
  end_date: new Date(),
  manager_id: '',
  lead_id: 0,
};

const PhaseForm: React.FC<PhaseFormProps> = ({
  setModalShow,
  setPhases,
  leadId,
}) => {
  const [managers, setManagers] = useState<optionsForSelect[]>([]);
  const [spinnerShow, setSpinnerShow] = useState<boolean>(true);
  const [formData, setFormData] =
    useState<defaultPhaseFormType>(defaultFormState);

  useEffect(() => {
    const extractManagersHandler = async () => {
      const response = await userService.getUsersWithRole('manager');
      console.log(response);
      if (response!.status === 200) {
        setManagers(matchUserToSelectFields(response!.data));
      }
      setSpinnerShow(false);
    };
    extractManagersHandler();
  }, []);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSpinnerShow(true);

    formData.lead_id = parseInt(leadId);
    const isEmpty = Object.values(formData).every((x) => x !== '');

    if (!isEmpty) {
      alert(messages.form.required);
      return;
    }

    createNewPhaseHandler();
  };

  const createNewPhaseHandler = async () => {
    const response = await phaseService.createNewPhase(formData);
    if (response!.status === 201) {
      setPhases((prevState) => [...prevState, response!.data]);
    }
    setSpinnerShow(false);
    setModalShow(false);
  };

  const inputFieldChangeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value } = e.target as HTMLButtonElement;
    const updatedState = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedState);
  };

  const setDateHandler = (stateField: string, date: Date) => {
    setFormData({
      ...formData,
      [stateField]: date,
    });
  };

  const setManager = (manager: SingleValue<optionsForSelect>) => {
    setFormData({
      ...formData,
      manager_id: manager!.value,
    });
  };

  return (
    <div className="p-5">
      {spinnerShow ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="mb-4 font-medium text-xl underline">
            Create New Phase
          </h1>
          <form className="w-full max-w-lg" onSubmit={formSubmitHandler}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Start Date
                </label>
                <DatePicker
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={formData.start_date}
                  onChange={(date) => setDateHandler('start_date', date!)}
                  minDate={new Date()}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  End Date
                </label>
                <DatePicker
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={formData.end_date}
                  onChange={(date) => setDateHandler('end_date', date!)}
                  minDate={formData.start_date}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phase Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="phase_name"
                  onChange={() => inputFieldChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Manager
                </label>
                <Select options={managers} onChange={setManager} />
              </div>
            </div>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 ease-in-out duration-100"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PhaseForm;
