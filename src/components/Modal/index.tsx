import React, { FC, HTMLProps } from 'react';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled(Dialog.Title)`
  margin-top: 0;
  color: ${p => p.theme.colorPrimary};
`;

const DialogContent = styled.div`
  display: block;
  width: 440px;
  background-color: white;
  padding: 24px;
  z-index: 10;
  @media screen and (min-width: 767px) {
    max-width: 600px;
  }
`;

const DialogWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  @media screen and (max-height: 700px) {
    align-items: flex-start;
  }
`;

export interface ModalType extends HTMLProps<HTMLDivElement> {
  title: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const Modal: FC<ModalType> = ({
  title,
  isOpen = false,
  setIsOpen = () => undefined,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999999,
      }}
    >
      <DialogWrapper>
        <StyledOverlay />
        <DialogContent>
          <StyledTitle>{title}</StyledTitle>
          <div>{children}</div>
        </DialogContent>
      </DialogWrapper>
    </Dialog>
  );
};
