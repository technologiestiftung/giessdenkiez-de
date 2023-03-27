import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Database } from '../../../common/database';
import ButtonSubmitRound from '../../Forms/Buttons/ButtonSubmitRound';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import SidebarTitle from '../SidebarTitle';
import { SidebarSubTitle, StyledForm, StyledFormRow } from '../../Forms';
import { UserNotificationObjectType } from './Notification';
import { StyledLabel } from '../../Forms/Labels';
import { StyledFormTextInput } from '../../Forms/Inputs';

const StyledTitleWrapper = styled.div`
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding: 8px 0;
`;

export const UpdateUserDataForm = ({
  setNotification,
}: {
  setNotification: React.Dispatch<
    React.SetStateAction<UserNotificationObjectType | null>
  >;
}) => {
  // const [message, setMessage] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (session) {
      const getUserProfile = async () => {
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
          setFormData({
            name: data.username ?? formData.email.split('@')[0],
            email: session.user?.email || '',
          });
        }
      };
      setFormData({
        name: '',
        email: session.user?.email || '',
      });
      getUserProfile().catch(console.error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Update');

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
            setNotification({
              message: 'Benutzername geändert',
              type: 'success',
            });
          }
        }
      }
    };
    updateUser().catch(console.error);
  };
  return (
    <>
      {session ? (
        <>
          <StyledTitleWrapper>
            <SidebarTitle>Account</SidebarTitle>
            <SidebarSubTitle>Bearbeiten</SidebarSubTitle>
          </StyledTitleWrapper>
          <ExpandablePanel isExpanded title='Benutzername/E-Mail'>
            <StyledForm onSubmit={handleSubmit}>
              <StyledFormRow>
                <StyledLabel htmlFor='name'>
                  <SmallParagraph>Benutzername</SmallParagraph>
                </StyledLabel>
                <StyledFormTextInput
                  type='text'
                  name='name'
                  minLength={3}
                  maxLength={20}
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </StyledFormRow>
              <StyledFormRow>
                <StyledLabel htmlFor='email'>
                  <SmallParagraph>E-Mail</SmallParagraph>
                </StyledLabel>
                <StyledFormTextInput
                  type='email'
                  name='email'
                  onChange={handleInputChange}
                  value={formData.email}
                />
              </StyledFormRow>
              <StyledFormRow>
                <ButtonSubmitRound type='submit'>
                  Änderungen speichern
                </ButtonSubmitRound>
              </StyledFormRow>
            </StyledForm>
          </ExpandablePanel>
        </>
      ) : null}
    </>
  );
};
