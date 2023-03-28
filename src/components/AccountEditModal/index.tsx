import React, { FC, HTMLProps } from 'react';

import { Modal } from '../Modal';
import { PasswordEditForm } from '../Forms/PasswordEditForm';
import { AccountEditForm } from '../Forms/AccountEditForm';

export type ModalViewTypes = 'account' | 'password';

export interface AccountEditModalProps extends HTMLProps<HTMLElement> {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  view?: ModalViewTypes;
}
export const AccountEditModal: FC<AccountEditModalProps> = ({
  isOpen = false,
  setIsOpen,
  view = 'account',
}) => {
  return (
    <Modal
      title={view === 'account' ? 'Account bearbeiten' : 'Passwort ändern'}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={{ minWidth: '500px' }}
    >
      {view === 'account' ? (
        <AccountEditForm
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        ></AccountEditForm>
      ) : (
        <PasswordEditForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></PasswordEditForm>
      )}
    </Modal>
  );
};
