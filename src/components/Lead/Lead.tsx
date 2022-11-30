import React, { useContext, useEffect, useState } from 'react';
import leadService from '../../api/services/lead.service';
import { LeadType } from '../../api/types';
import UserContext from '../../store/user-context';
import Modal from '../../UI/Modal';
import Spinner from '../../UI/Spinner';
import LeadDetails from './LeadDetails';
import LeadForm from './LeadForm';
import LeadLists from './LeadLists';

const Lead = () => {
  const userCtx = useContext(UserContext);

  const [leadsList, setLeadsList] = useState<LeadType[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [singleleadData, setSingleleadData] = useState<LeadType | null>();
  const [spinnerShow, setSpinnerShow] = useState(true);

  const userRoles = [...userCtx.user.roles.map((x) => x.name)];

  useEffect(() => {
    const getLeadData = async () => {
      const response = await leadService.getAll();
      setLeadsList(response!.data);
    };
    getLeadData();
  }, []);

  const showLeadDetailsHandler = (lead: LeadType) => {
    setSingleleadData(lead);
    setModalShow(true);
  };

  const createNewLead = () => {
    setSingleleadData(null);
    setModalShow(true);
  };

  let buttonData;
  if (userRoles.includes('admin') || userRoles.includes('bd')) {
    buttonData = (
      <button
        className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md my-2"
        type="button"
        onClick={createNewLead}
      >
        Create New Lead
      </button>
    );
  }

  return (
    <div className="mt-3">
      {buttonData}
      {spinnerShow ? (
        <Spinner />
      ) : (
        <LeadLists
          leadslist={leadsList}
          setLeadsList={setLeadsList}
          showLeadDetails={showLeadDetailsHandler}
          setSpinnerShow={setSpinnerShow}
        />
      )}
      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {singleleadData && <LeadDetails singleleadData={singleleadData} />}
          {!singleleadData && (
            <LeadForm setModalShow={setModalShow} setLeadsList={setLeadsList} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Lead;
