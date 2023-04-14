import React, { FC, HTMLProps } from 'react';
import { Modal } from '../Modal';
import { AccountEditForm } from '../Forms/AccountEditForm';

export interface AccountEditModalProps extends HTMLProps<HTMLElement> {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AccountEditModal: FC<AccountEditModalProps> = ({
  isOpen = false,
  setIsOpen,
}) => {
  return (
    <Modal title={'Account bearbeiten'} isOpen={isOpen} setIsOpen={setIsOpen}>
      <AccountEditForm isOpen={isOpen} setIsOpen={setIsOpen}></AccountEditForm>
    </Modal>
  );
};
