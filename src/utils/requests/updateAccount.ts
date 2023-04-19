import { Session } from '@supabase/auth-helpers-react';
import { updateEmail } from './updateEmail';
import { updateUsername } from './updateUsername';
import { getUsernameBySession } from './getUsernameBySession';

interface updateAccountPropType {
  newEmail: string;
  newUsername: string;
  currentSession: Session | null;
}

interface UpdateAccountReturnType {
  successMessages: string[];
  errorMessages: string[];
}

export const updateAccount = async ({
  currentSession,
  newUsername,
  newEmail,
}: updateAccountPropType): Promise<UpdateAccountReturnType> => {
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
      const emailSuccessMessage = await updateEmail(newEmail);
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
        currentSession
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
};
