import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUserProfile } from '../../../utils/hooks/useUserProfile';
import ButtonRound from '../../ButtonRound';
import { UserNotification } from '../../Notification';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';
import { updateAccount } from '../../../utils/requests/updateAccount';
import debounce from 'lodash/debounce';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

// We constrain the username to 20 characters
// in the database we have 50. In case the username already exists
// we need to add a number to the end of the username
// this happens only on signup. Here we check the database and warn the user
const maxUsernameLength = 20;
const minUsernameLength = 3;

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

interface AccountEditFormProps {
  onSuccess: (messages: string[]) => void;
  onCancel: () => void;
}
export const AccountEditForm: FC<AccountEditFormProps> = ({
  onSuccess,
  onCancel,
}: AccountEditFormProps) => {
  const content = useLocalizedContent();
  const {
    editSave,
    editSaving,
    editClose,
    username,
    registeredMail,
    editUsernameSuccess,
    editUsernameError,
    editEmailSuccess,
  } = content.sidebar.account;

  const supabase = useSupabaseClient();
  const session = useSession();
  const { userProfile: profile, refetch } = useUserProfile();
  const [isBeingSaved, setIsBeingSaved] = useState(false);
  const [errorNotifications, setErrorNotifications] = useState<string[] | null>(
    null
  );
  const [isVerifyingUsername, setIsVerifyingUsername] = useState(false);
  const [successNotifications, setSuccessNotifications] = useState<
    string[] | null
  >(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

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

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorNotifications(null);

    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name !== 'name') {
      return;
    }

    setIsVerifyingUsername(true);

    await checkIfUsernameIsNotTaken(value, setErrorNotifications);
  };

  const checkIfUsernameIsNotTaken = debounce(
    async (
      username: string,
      setErrorNotifications: React.Dispatch<
        React.SetStateAction<string[] | null>
      >
    ): Promise<void> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username);

      if (error) {
        console.error(error);
        setIsVerifyingUsername(false);
        return;
      }

      if (!data) {
        setIsVerifyingUsername(false);
        throw new Error('could not check username');
      }

      if (data.length === 0) {
        setIsVerifyingUsername(false);
        setErrorNotifications(null);
        return;
      }

      setIsVerifyingUsername(false);
      setErrorNotifications([
        `Benutzername ${username} bereits vergeben. Bitte wähle einen anderen.`,
      ]);
    },
    500
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBeingSaved(true);

    const { successMessages, errorMessages } = await updateAccount({
      currentSession: session,
      newEmail: formData.email,
      newUsername: formData.name,
      emailSuccessMessageText: editEmailSuccess,
      usernameSuccessMessageText: editUsernameSuccess,
      usernameErrorMessage: editUsernameError,
      alreadyRegisteredHint: content.auth.alreadyRegisteredHint,
    });

    setIsBeingSaved(false);

    if (errorMessages.length >= 1) {
      setErrorNotifications(errorMessages);
      setSuccessNotifications(successMessages);
    }

    if (errorMessages.length === 0 && successMessages.length >= 1) {
      // Refetching necessary to update other parts of the UI with user details:
      refetch();
      onSuccess(successMessages);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledGrid>
        <StyledInputContainer>
          <StyledLabel htmlFor='name'>{username}</StyledLabel>
          <StyledFormTextInputExtended
            type='text'
            name='name'
            id='name'
            minLength={minUsernameLength}
            maxLength={maxUsernameLength}
            onChange={handleInputChange}
            value={formData.name}
            required
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor='email'>
            <>{registeredMail}</>
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
        {successNotifications &&
          successNotifications.map(successNotification => {
            return (
              <UserNotification
                key={successNotification}
                message={successNotification}
                type='success'
              />
            );
          })}
        {errorNotifications &&
          errorNotifications.map(errorNotification => {
            return (
              <UserNotification
                key={errorNotification}
                message={errorNotification}
                type='error'
              />
            );
          })}
      </StyledGrid>
      <StyledButtonsContainer>
        <ButtonRound
          key={`cancel-account-edit`}
          width='fit-content'
          onClick={onCancel}
        >
          {editClose}
        </ButtonRound>
        <ButtonSubmitRound
          key={`save-account-edit`}
          width='fit-content'
          type='submit'
          disabled={isVerifyingUsername || errorNotifications !== null}
          $colorType='primary'
        >
          {isBeingSaved ? editSaving : editSave}
        </ButtonSubmitRound>
      </StyledButtonsContainer>
    </form>
  );
};
