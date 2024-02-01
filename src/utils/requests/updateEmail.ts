import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';

const supabase = createPagesBrowserClient<Database>();

export const updateEmail = async ({
  oldEmail,
  newEmail,
}: {
  oldEmail: string;
  newEmail: string;
}): Promise<string> => {
  try {
    await supabase.auth.updateUser({
      email: newEmail,
    });

    return `Um die Änderung zu bestätigen, bitte klicke auf die Links die per Mail jeweils an Deine alte E-Mail-Adresse „${oldEmail}“ und neue E-Mail-Adresse „${newEmail}“ verschickt wurde.`;
  } catch (error) {
    console.error(error);
    return error;
  }
};
