import React from 'react';
import { UserType } from '../../api/types';

interface UserRoleProps {
  user: UserType;
}

const UserRolesComponent: React.FC<UserRoleProps> = ({ user }) => {
  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        {user!.roles?.length === 0 ? (
          <span className="text-xs bg-gray-200 p-1 rounded-md">
            No Role Assigned Yet
          </span>
        ) : (
          user!.roles?.map((role, index) => (
            <p key={index} className="text-xs bg-gray-200 p-1 rounded-md">
              {role.name}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRolesComponent;
