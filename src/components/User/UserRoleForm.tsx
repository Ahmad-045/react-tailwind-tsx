import React, { FormEvent, Fragment, useState } from 'react';
import { UserType } from '../../api/types';
import { optionsForSelect } from '../../data/generic-types';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import userService from '../../api/services/user.service';
import Spinner from '../../UI/Spinner';

import { AVAL_ROLES } from '../../data/data-mapping';

const animatedComponents = makeAnimated();

interface UserRoleFormProps {
  currentUser: UserType;
  userRole: optionsForSelect[];
  usersList: UserType[];
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUsersList: React.Dispatch<React.SetStateAction<UserType[]>>;
}

const UserRoleForm: React.FC<UserRoleFormProps> = ({
  currentUser,
  userRole,
  usersList,
  setModalShow,
  setUsersList,
}) => {
  const [newroles, setNewroles] = useState<optionsForSelect[]>([]);
  const [spinnerShow, setSpinnerShow] = useState(false);

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    setSpinnerShow(true);

    const response = await userService.assignRolesToUser(
      currentUser.id,
      newroles
    );
    if (response?.status === 200) {
      const changedUserIndex = usersList.findIndex(
        (obj) => obj.id === currentUser.id
      );
      const newlist = usersList;
      newlist[changedUserIndex] = response.data;
      setUsersList(newlist);
    }
    setModalShow(false);
    setSpinnerShow(false);
  };

  return (
    <Fragment>
      {spinnerShow ? (
        <Spinner />
      ) : (
        <form onSubmit={submitFormHandler}>
          <>
            <h1 className="mb-5 font-medium underline text-xl">
              Available Roles in the Company
            </h1>
            <Select
              defaultValue={userRole}
              options={AVAL_ROLES}
              components={animatedComponents}
              isMulti
              closeMenuOnSelect={true}
              // onChange={setNewroles}
            />
            <button
              type="submit"
              className="float-right my-5 mr-5 bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Update Roles
            </button>
          </>
        </form>
      )}
    </Fragment>
  );
};

export default UserRoleForm;
