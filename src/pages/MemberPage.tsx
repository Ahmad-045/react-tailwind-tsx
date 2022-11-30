import React from 'react';
import { UserType } from '../api/types';
import { Route, Routes } from 'react-router-dom';
import Lead from '../components/Lead/Lead';
import NotFound from './NotFound';
import Phase from '../components/Phases/Phase';
import PhaseEngineer from '../components/PhaseEngineer';
import UserList from '../components/User/UserList';

interface IMemberPageProps {
  currentUser: UserType;
}

const MemberPage: React.FC<IMemberPageProps> = ({ currentUser }) => {
  return (
    <div className="p-1">
      <Routes>
        <Route path="lead" element={<Lead />} />
        <Route path="lead/:id/phases" element={<Phase />} />
        <Route
          path="lead/:leadId/phases/:phaseId/engineers"
          element={<PhaseEngineer />}
        />
        <Route
          path="/users"
          element={<UserList loggedInUser={currentUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default MemberPage;
