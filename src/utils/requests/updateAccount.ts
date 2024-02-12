import { Session } from '@supabase/auth-helpers-react';
import { updateEmail } from './updateEmail';
import { updateUsername } from './updateUsername';
import { getUsernameBySession } from './getUsernameBySession';

interface updateAccountPropType {
  newEmail: string;
  newUsername: string;
  currentSession: Session | null;
  emailSuccessMessageText: string;
  usernameSuccessMessageText: string;
  usernameErrorMessage: string;
  alreadyRegisteredHint: string;
}

interface UpdateAccountReturnType {
  successMessages: string[];
  errorMessages: string[];
}

/**
 * Updates the email (`users` table) and the username (`profiles` table)
 * if the new values differ from the existing ones.
 */
export const updateAccount = async ({
  currentSession,
  newUsername,
  newEmail,
  emailSuccessMessageText,
  usernameSuccessMessageText,
  usernameErrorMessage,
  alreadyRegisteredHint,
}: updateAccountPropType): Promise<UpdateAccountReturnType> => {
  try {
    const successMessages: string[] = [];
    const errorMessages: string[] = [];

    if (!currentSession) {
      return {
        successMessages: [],
        errorMessages: ['Du bist im Moment nicht authentifiziert'],
      };
    }

    if (newEmail !== currentSession.user.email) {
      try {
        const emailSuccessMessage = await updateEmail({
          oldEmail: currentSession.user.email ?? '',
          newEmail,
          emailSuccessMessageText,
        });
        emailSuccessMessage && successMessages.push(emailSuccessMessage);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        errorMessages.push(errorMessage);
      }
    }

    const currentUsername = await getUsernameBySession(currentSession);

    if (newUsername !== currentUsername) {
      try {
        const usernameSuccessMessage = await updateUsername(
          newUsername,
          currentSession,
          usernameSuccessMessageText,
          usernameErrorMessage,
          alreadyRegisteredHint
        );
        usernameSuccessMessage && successMessages.push(usernameSuccessMessage);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        errorMessages.push(errorMessage);
      }
    }

    return {
      successMessages: successMessages,
      errorMessages: errorMessages,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};
