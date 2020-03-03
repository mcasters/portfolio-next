import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const errorCustomStyles = {
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
  },
};

const validCustomStyles = {
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
  },
};

Modal.setAppElement('#__next');

class Alert extends React.Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.isMounted = true;

    this.handleOpenModal();
    this.timeout = setTimeout(() => {
      if (this.isMounted) {
        this.handleCloseModal();
        this.props.clearAlert();
      }
    }, 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isMounted = false;
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { message, isError } = this.props;
    return (
      <Modal
        id="alert"
        contentLabel="alert"
        closeTimeoutMS={150}
        isOpen={this.state.showModal}
        onRequestClose={this.handleCloseModal}
        style={isError ? errorCustomStyles : validCustomStyles}
      >
        <div>{message}</div>
      </Modal>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

export default Alert;
