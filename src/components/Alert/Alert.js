import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

const errorStyles = {
  overlay: {
    backgroundColor: 'none',
  },
  content: {
    top: '85%',
    left: '10%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: '#ffa5ac',
    padding: '10px',
  },
};

const validStyles = {
  overlay: {
    backgroundColor: 'none',
  },
  content: {
    top: '85%',
    left: '10%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: '#92ff8e',
    padding: '10px',
  },
};

const iconStyles = {
  float: 'right',
};

Modal.setAppElement('#__next');

export default function Alert({ message, isError, clearAlert }) {
  const [showModal, setShowModal] = useState(true);
  let timeout = null;

  useEffect(() => {
    if (showModal) {
      timeout = setTimeout(() => {
        clearAlert();
        handleCloseModal();
      }, 4000);
    }
    return function cleanup() {
      clearAlert();
      clearTimeout(timeout);
    };
  }, [showModal]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      id="alert"
      contentLabel="alert"
      closeTimeoutMS={150}
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      style={isError ? errorStyles : validStyles}
    >
      <MdClose onClick={handleCloseModal} style={iconStyles} />
      <div className={message} style={{ padding: '0px 10px' }}>
        {message}
      </div>
    </Modal>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  clearAlert: PropTypes.func.isRequired,
};
