import React, { FC, useState } from 'react';
import { Modal } from '../Modal';
import { AccountEditForm } from '../Forms/AccountEditForm';
import ButtonRound from '../ButtonRound';
import { UserNotification } from '../Notification';

export interface AccountEditModalProps {
  onClose: () => void;
}
export const AccountEditModal: FC<AccountEditModalProps> = ({ onClose }) => {
  const [successMessages, setSuccessMessages] = useState<string[] | null>(null);
  return (
    <Modal title={'Account bearbeiten'} isOpen={true} setIsOpen={onClose}>
      {successMessages ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'space-between',
          }}
        >
          {successMessages.map(msg => {
            return <UserNotification key={msg} message={msg} type='success' />;
          })}

          <ButtonRound width='fit-content' onClick={onClose}>
            Schließen
          </ButtonRound>
        </div>
      ) : (
        <AccountEditForm
          onSuccess={messages => setSuccessMessages(messages)}
          onCancel={onClose}
        ></AccountEditForm>
      )}
    </Modal>
  );
};
