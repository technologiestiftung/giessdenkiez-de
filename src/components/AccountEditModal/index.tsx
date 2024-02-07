import React, { FC, useState } from 'react';
import { Modal } from '../Modal';
import { AccountEditForm } from '../Forms/AccountEditForm';
import ButtonRound from '../ButtonRound';
import { UserNotification } from '../Notification';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

export interface AccountEditModalProps {
  onClose: () => void;
}
export const AccountEditModal: FC<AccountEditModalProps> = ({ onClose }) => {
  const content = useLocalizedContent();
  const { editTitle, editClose } = content.sidebar.account;

  const [successMessages, setSuccessMessages] = useState<string[] | null>(null);
  return (
    <Modal title={editTitle} isOpen={true} setIsOpen={onClose}>
      {successMessages ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            placeContent: 'space-between',
          }}
        >
          <div style={{ display: 'grid', gap: '16px' }}>
            {successMessages.map(msg => {
              return (
                <UserNotification key={msg} message={msg} type='success' />
              );
            })}
          </div>
          <div style={{ paddingTop: '40px' }}>
            <ButtonRound width='fit-content' onClick={onClose}>
              {editClose}
            </ButtonRound>
          </div>
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
