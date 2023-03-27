import React, { FC, HTMLProps, useEffect, useState } from 'react';
import ButtonRound from '../ButtonRound';
import styled from 'styled-components';

import { Modal } from '../Modal';

import { StyledFormTextInput } from '../Forms/Inputs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../../common/database';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../Sidebar/SidebarAuth/Notification';
import { StyledLabel } from '../Forms/Labels';
import ButtonSubmitRound from '../Forms/Buttons/ButtonSubmitRound';
import { useUserData } from '../../utils/hooks/useUserData';
import { useUserProfile } from '../../utils/hooks/useUserProfile';

const StyledFormTextInputExtended = styled(StyledFormTextInput)`
  padding: 10px;
`;
const TwoColumnGrid = styled.div`
  width: 100%;
  display: grid;

  gap: 16px;
`;

const ButtonsContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`;

const StyledError = styled.p`
  grid-column: 1 / 2;
  color: ${p => p.theme.colorAlarm};
  margin: 0;

  @media (min-width: ${p => p.theme.screenWidthS}) {
    grid-column: 1 / 3;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
`;
export interface AccountEditModalProps extends HTMLProps<HTMLElement> {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}
export const AccountEditModal: FC<AccountEditModalProps> = ({
  isOpen = false,
  setIsOpen = () => undefined,

  children,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const { userProfile: profile, refetch } = useUserProfile();
  const [error, setError] = useState<string | undefined>(undefined);
  const { invalidate } = useUserData();
  const [isBeeingSaved, setIsBeeingSaved] = useState(false);
  const [
    notification,
    setNotification,
  ] = useState<UserNotificationObjectType | null>(null);
  const supabase = useSupabaseClient<Database>();

  const session = useSession();
  useEffect(() => {
    if (session && profile) {
      setFormData({
        name: profile.username ?? '',
        email: session.user?.email ?? '',
      });
    }
    if (!profile) {
      refetch();
    }
  }, [session, profile, refetch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBeeingSaved(true);

    const updateUser = async () => {
      if (formData.name.length < 3) {
        setNotification({
          message: 'Der Benutzername muss mindestens 3 Zeichen lang sein',
          type: 'error',
        });
        return;
      }
      if (formData.email !== session?.user?.email) {
        const { data, error } = await supabase.auth.updateUser({
          email: formData.email,
        });
        if (error) {
          setNotification({
            message: error.message,
            type: 'error',
          });
          throw error;
        }
        if (data) {
          setNotification({
            message:
              'E-Mail wurde geändert. Bitte bestätigen Sie die Änderung über den Link in der E-Mail, die wir Ihnen geschickt haben. Sie werden automatisch ausgeloggt.',
            type: 'success',
          });
        }
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('id,username')
        .eq('id', session?.user?.id)
        .single();
      if (error) {
        setNotification({
          message: error.message,
          type: 'error',
        });
        throw error;
      }
      if (data) {
        if (data.username !== formData.name) {
          const { data, error } = await supabase
            .from('profiles')
            .update({ username: formData.name })
            .eq('id', session?.user?.id)
            .select();
          if (error) {
            setNotification({
              message: error.message,
              type: 'error',
            });
            throw error;
          }
          if (data) {
            invalidate();
            refetch();
            setNotification({
              message: 'Benutzername geändert',
              type: 'success',
            });
          }
        }
      }
    };
    updateUser().catch(console.error);

    setIsBeeingSaved(false);
    setIsOpen(false);
  };
  return (
    <Modal
      title='Account Bearbeiten'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      style={{ minWidth: '500px' }}
    >
      <form onSubmit={handleSubmit}>
        <TwoColumnGrid>
          <InputContainer>
            <StyledLabel htmlFor='name'>Benutzername</StyledLabel>
            <StyledFormTextInputExtended
              type='text'
              name='name'
              id='name'
              minLength={3}
              maxLength={20}
              onChange={handleInputChange}
              value={formData.name}
            />
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor='email'>
              <>E-Mail</>
            </StyledLabel>
            <StyledFormTextInputExtended
              type='email'
              name='email'
              id='email'
              onChange={handleInputChange}
              value={formData.email}
            />
          </InputContainer>
          {notification && <UserNotification {...notification} />}
          {children}
        </TwoColumnGrid>
        <ButtonsContainer>
          <ButtonRound
            key={`cancel-account-edit`}
            width='fit-content'
            onClick={() => {
              setError(undefined);
              setIsOpen(false);
            }}
          >
            Abbrechen
          </ButtonRound>
          <ButtonSubmitRound
            key={`save-account-edit`}
            width='fit-content'
            type='submit'
            colorType='primary'
          >
            {isBeeingSaved ? 'Wird eingetragen ...' : 'Speichern'}
          </ButtonSubmitRound>
        </ButtonsContainer>
      </form>
    </Modal>
  );
};
