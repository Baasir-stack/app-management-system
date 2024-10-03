import React from 'react';
import { Modal, Button } from 'antd';

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirm Deletion"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this app?</p>
    </Modal>
  );
};

export default ConfirmationModal;
