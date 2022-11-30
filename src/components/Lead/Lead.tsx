import React, { useEffect, useState } from 'react';
import leadService from '../../api/services/lead.service';
import { LeadType } from '../../api/types';
import Modal from '../../UI/Modal';
import LeadDetails from './LeadDetails';
import LeadLists from './LeadLists';

const Lead = () => {
  const [leadsList, setLeadsList] = useState<LeadType[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [singleleadData, setSingleleadData] = useState<LeadType>();

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

  return (
    <div className="mt-3">
      <LeadLists
        leadslist={leadsList}
        setLeadsList={setLeadsList}
        showLeadDetails={showLeadDetailsHandler}
      />
      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {singleleadData && <LeadDetails singleleadData={singleleadData} />}
        </Modal>
      )}
    </div>
  );
};

export default Lead;
