import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { HTMLProps, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Database } from '../../../common/database';
import { useUserData } from '../../../utils/hooks/useUserData';
import { useUserProfile } from '../../../utils/hooks/useUserProfile';
import ButtonRound from '../../ButtonRound';
import {
  createUserNotification,
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
  }, [session, profile, refetch, isOpen, notification]);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timeout = setTimeout(() => {
      setNotification(prev => null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [notification]);

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
      if (formData.email !== session?.user?.email) {
        const { data, error } = await supabase.auth.updateUser({
          email: formData.email,
        });
        if (error) {
          setNotification(prev =>
            createUserNotification({
              message: error.message,
              type: 'error',
            })
          );
          console.error(error);
        }
        if (data) {
          setNotification(prev =>
            createUserNotification({
              message:
                'E-Mail wurde geändert. Bitte bestätige die Änderung über den Link in der E-Mail, die wir dir geschickt haben.',
              type: 'success',
            })
          );
        }
      }

      //check if the user name is already in use
      const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', formData.name);

      if (usernameError) {
        setNotification(prev =>
          createUserNotification({
            message:
              'Interner Fehler username. Bitte versuch es später erneut.',
            type: 'error',
          })
        );
        console.error(usernameError);
        return;
      }
      if (usernameData && usernameData.length > 0) {
        if (usernameData[0].username === formData.name) {
          const notif = createUserNotification({
            message: 'Dieser Benutzername ist bereits vergeben.',
            type: 'error',
          });
          console.error('user name already in use', usernameData, notification);
          setNotification(prev => notif);
          return;
        }
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('id,username')
        .eq('id', session?.user?.id);

      if (error) {
        setNotification(prev =>
          createUserNotification({
            message: 'Interner Fehler. Bitte versuch es später erneut.',
            type: 'error',
          })
        );
        console.error(error);
        return;
      }
      if (data && data.length > 0) {
        if (data[0].username !== formData.name) {
          const { data, error } = await supabase
            .from('profiles')
            .update({ username: formData.name })
            .eq('id', session?.user?.id)
            .select();
          if (error) {
            setNotification(prev =>
              createUserNotification({
                message:
                  'Interner Fehler beim speichern des neuen Namens. Bitte versuch es später erneut.',
                type: 'error',
              })
            );
            console.error(error);
            return;
          }
          if (data) {
            invalidate();
            refetch();
            setNotification(prev =>
              createUserNotification({
                message: 'Benutzername geändert',
                type: 'success',
              })
            );
          }
        }
      }
      setIsOpen(false);
    };
    updateUser().catch(console.error);
    setIsBeeingSaved(false);
  };

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
            setNotification(prev => null);
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
