import React, { useState } from 'react';
import { FC } from 'react';
import ButtonRound from '../ButtonRound';
import { PasswordEditForm } from '../Forms/PasswordEditForm';
import { Modal } from '../Modal';
import { UserNotification } from '../Notification';

interface PasswordEditModalType {
  onClose: () => void;
}

export const PasswordEditModal: FC<PasswordEditModalType> = ({ onClose }) => {
  const [passwordEditCompleted, setPasswordEditCompleted] = useState(false);
  return (
    <Modal
      title='Passwort ändern'
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
          <UserNotification
            message='Dein Passwort wurde erfolgreich geändert'
            type='success'
          />
          <ButtonRound width='fit-content' onClick={onClose}>
            Schließen
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
