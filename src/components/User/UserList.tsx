import React, { useEffect, useState } from 'react';
import { UserType } from '../../api/types';
import Spinner from '../../UI/Spinner';
import UserRolesComponent from './UserRolesComponent';
import { RolesLabel } from '../../data/data-mapping';
import { optionsForSelect } from '../../data/generic-types';
import userService from '../../api/services/user.service';
import Modal from '../../UI/Modal';
import UserRoleForm from './UserRoleForm';

interface UserListProp {
  loggedInUser: UserType;
}

const UserList: React.FC<UserListProp> = ({ loggedInUser }) => {
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [spinnerShow, setSpinnerShow] = useState(true);
  const [userRole, setUserRole] = useState<optionsForSelect[]>([]);

  const showFormForRole = (user: UserType) => {
    setCurrentUser(user);
    setShowForm(true);
    setModalShow(true);
    AdjustDateForSelectField(user);
  };

  const AdjustDateForSelectField = (user: UserType) => {
    const currentUserRoles = user!.roles?.map((role) => ({
      value: role.name,
      label: RolesLabel[role.name],
    }));
    setUserRole(currentUserRoles!);
  };

  const deleteUser = async (userId: number) => {
    const response = await userService.deleteUser(userId);
    if (response?.status === 200) {
      setUsersList(usersList.filter((obj) => obj.id !== userId));
    }
  };

  useEffect(() => {
    const extractUsersHandler = async () => {
      const response = await userService.getAll();
      if (response?.status === 200) {
        setUsersList(response.data);
      }
      setSpinnerShow(false);
    };
    extractUsersHandler();
  }, []);

  return (
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
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Roles
              </th>
              <th scope="col" colSpan={2} className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.id}
                </th>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  <UserRolesComponent user={user} />
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => showFormForRole(user)}
                    className="border-2 border-blue-600 py-1 px-3 rounded-xl ease-in-out duration-200 hover:text-white hover:bg-blue-600"
                  >
                    Add / Remove Role
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    className={`py-1 px-3 rounded-xl ease-in-out duration-200 text-white bg-red-600 ${
                      loggedInUser.id === user.id ? 'hidden' : 'block'
                    }`}
                    onClick={(e) => {
                      if (
                        window.confirm(
                          'Are you sure you wish to delete this user?'
                        )
                      )
                        deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {showForm && (
            <UserRoleForm
              currentUser={currentUser!}
              setModalShow={setModalShow}
              setUsersList={setUsersList}
              userRole={userRole!}
              usersList={usersList}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default UserList;
