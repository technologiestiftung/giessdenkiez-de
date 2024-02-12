import React, { useState } from 'react';
import { FC } from 'react';
import ButtonRound from '../ButtonRound';
import { PasswordEditForm } from '../Forms/PasswordEditForm';
import { Modal } from '../Modal';
import { UserNotification } from '../Notification';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

interface PasswordEditModalType {
  onClose: () => void;
}

export const PasswordEditModal: FC<PasswordEditModalType> = ({ onClose }) => {
  const content = useLocalizedContent();
  const {
    editPasswordTitle,
    editClose,
    editPasswordSuccess,
  } = content.sidebar.account;
  const [passwordEditCompleted, setPasswordEditCompleted] = useState(false);
  return (
    <Modal
      title={editPasswordTitle}
      isOpen={true}
      setIsOpen={onClose}
      style={{ minHeight: '250px' }}
    >
      {passwordEditCompleted ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'space-between',
          }}
        >
          <UserNotification message={editPasswordSuccess} type='success' />
          <ButtonRound width='fit-content' onClick={onClose}>
            {editClose}
          </ButtonRound>
        </div>
      ) : (
        <PasswordEditForm
          onSuccess={() => setPasswordEditCompleted(true)}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
};
