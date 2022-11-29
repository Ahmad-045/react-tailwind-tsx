import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

interface IBackdrop {
  onhideDetails: React.MouseEventHandler<HTMLDivElement>;
}

interface IModalOverlay {
  children: React.ReactNode;
}

const Backdrop: React.FC<IBackdrop> = ({ onhideDetails }) => {
  return <div className={styles.backdrop} onClick={onhideDetails}></div>;
};

const ModalOverlay: React.FC<IModalOverlay> = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElement: HTMLElement = document.getElementById('overlays')!;

interface IModal {
  onhideDetails: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ onhideDetails, children }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onhideDetails={onhideDetails} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
