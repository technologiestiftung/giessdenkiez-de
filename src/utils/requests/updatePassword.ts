import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { validatePassword } from '../validatePassword';
import { nonPersistentSupabaseClient as supabaseValidationClient } from '../nonPersistentSupabaseClient';
import { Session } from '@supabase/auth-helpers-react';
import { Database } from '../../common/database';

const supabaseClient = createPagesBrowserClient<Database>();

interface updatePasswordPropType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
  currentSession: Session | null;
}

export const updatePassword = async ({
  oldPassword,
  newPassword,
  newPasswordConfirmation,
  currentSession,
}: updatePasswordPropType): Promise<string> => {
  const { passwordIsValid } = validatePassword(newPassword);
  if (!passwordIsValid) {
    throw new Error('Dein neues Passwort ist nicht sicher genug');
  }

  const {
    data: verifyUserData,
    error: verifyUserError,
  } = await supabaseValidationClient.auth.signInWithPassword({
    email: currentSession?.user?.email ?? '',
    password: oldPassword,
  });
  if (verifyUserError) {
    const errorMessage = verifyUserError.message.includes(
      'Invalid login credentials'
    )
      ? 'Dein altes Passwort stimmt nicht'
      : verifyUserError.message;
    throw new Error(errorMessage);
  }

  if (!verifyUserData) {
    throw new Error('Fehler beim Verifizieren des Benutzers');
  }

  if (newPassword === oldPassword) {
    throw new Error('Neues Passwort kann nicht das gleiche wie das alte sein');
  }

  if (newPassword !== newPasswordConfirmation) {
    throw new Error('Passwörter stimmen nicht überein');
  }

  const { data, error } = await supabaseClient.auth.updateUser({
    password: newPassword,
  });
  if (error || !data) {
    throw new Error(
      'Fehler beim Ändern des Passworts. Versuch es später noch einmal.'
    );
  }
  return 'Passwort erfolgreich geändert';
};
