import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { HTMLProps, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Database } from '../../../common/database';
import { useUserData } from '../../../utils/hooks/useUserData';
import { useUserProfile } from '../../../utils/hooks/useUserProfile';
import ButtonRound from '../../ButtonRound';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../../Notification';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';

export const StyledFormTextInputExtended = styled(StyledFormTextInput)`
  padding: 10px;
`;
export const StyledGrid = styled.div`
  width: 100%;
  display: grid;

  gap: 16px;
`;

export const StyledButtonsContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`;

export const StyledInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
`;

interface AccountEditFormProps extends HTMLProps<HTMLElement> {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}
export const AccountEditForm = ({
  children,
  setIsOpen,
  isOpen,
}: AccountEditFormProps) => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const { userProfile: profile, refetch } = useUserProfile();
  const { invalidate } = useUserData();
  const [isBeeingSaved, setIsBeeingSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [
    notification,
    setNotification,
  ] = useState<UserNotificationObjectType | null>(null);

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
    if (notification)
      setTimeout(() => {
        setNotification(null);
      }, 5000);
  }, [session, profile, refetch, isOpen, notification]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);
    return clearTimeout(timeout);
  }, [notification]);

  return (
    <form onSubmit={handleSubmit}>
      <StyledGrid>
        <StyledInputContainer>
          <StyledLabel htmlFor='name'>Benutzername</StyledLabel>
          <StyledFormTextInputExtended
            type='text'
            name='name'
            id='name'
            minLength={3}
            maxLength={20}
            onChange={handleInputChange}
            value={formData.name}
            required
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor='email'>
            <>E-Mail</>
          </StyledLabel>
          <StyledFormTextInputExtended
            type='email'
            name='email'
            id='email'
            onChange={handleInputChange}
            value={formData.email}
            required
          />
        </StyledInputContainer>
        {notification && <UserNotification {...notification} />}
        {children}
      </StyledGrid>
      <StyledButtonsContainer>
        <ButtonRound
          key={`cancel-account-edit`}
          width='fit-content'
          onClick={() => {
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
      </StyledButtonsContainer>
    </form>
  );
};
