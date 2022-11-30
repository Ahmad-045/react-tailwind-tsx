import React, { FormEvent, useContext, useState } from 'react';

import leadService from '../../api/services/lead.service';
import { defaultLeadFormType, LeadType } from '../../api/types';
import { messages } from '../../data/constants';
import UserContext from '../../store/user-context';
import Spinner from '../../UI/Spinner';

import InputMask from 'react-input-mask';

const defaultFormState: defaultLeadFormType = {
  project_name: '',
  client_name: '',
  client_address: '',
  client_email: '',
  client_contact: '',
  platform_used: '',
  test_type: 0,
  user_id: 0,
};

interface LeadFormProps {
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setLeadsList: React.Dispatch<React.SetStateAction<LeadType[]>>;
}

const LeadForm: React.FC<LeadFormProps> = ({ setModalShow, setLeadsList }) => {
  const userCtx = useContext(UserContext);

  const [formData, setFormData] = useState(defaultFormState);
  const [spinnerShow, setSpinnerShow] = useState(false);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    formData.user_id = userCtx.user.id as number;

    const isEmpty = Object.values(formData).every((x) => x !== '');

    if (!isEmpty) {
      alert(messages.form.required);
      return;
    }

    var pattern = new RegExp(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );
    if (
      !pattern.test(formData.client_contact) ||
      formData.client_contact.length !== 12
    ) {
      alert(messages.form.not_valid_number);
      return;
    }
    setSpinnerShow(true);
    createNewLeadHandler();
  };

  const createNewLeadHandler = async () => {
    formData.test_type = formData.test_type as number;

    const response = await leadService.createLead(formData);
    if (response?.status === 201) {
      setSpinnerShow(false);
      setModalShow(false);
      setLeadsList((prevState) => [...prevState, response.data]);
    }
  };

  const inputFieldChangeHandler = (e: FormEvent) => {
    const { name, value } = e.target as HTMLButtonElement;
    const updatedState = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedState);
  };

  return (
    <div className="p-5">
      {spinnerShow ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="mb-4 font-medium text-xl underline">
            Create New Lead
          </h1>
          <form className="w-full max-w-lg" onSubmit={formSubmitHandler}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Project Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Enter Your Project Name"
                  name="project_name"
                  onChange={inputFieldChangeHandler}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Client Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Enter Your Client Name"
                  name="client_name"
                  onChange={inputFieldChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Client Address
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="client_address"
                  onChange={inputFieldChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Client Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  name="client_email"
                  onChange={inputFieldChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Client Contact
                </label>
                <InputMask
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  mask="9999-9999999"
                  name="client_contact"
                  onChange={inputFieldChangeHandler}
                  value={formData.client_contact}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Platform Used:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  name="platform_used"
                  onChange={inputFieldChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Test Type
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="test_type"
                    onChange={inputFieldChangeHandler}
                  >
                    <option value={1}>Interview</option>
                    <option value={2}>Test Project</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
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

export default LeadForm;
