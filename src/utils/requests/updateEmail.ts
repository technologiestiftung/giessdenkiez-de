import {
  createBrowserSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';

const supabase = createBrowserSupabaseClient<Database>();

export const updateEmail = async ({
  oldEmail,
  newEmail,
}: {
  oldEmail: string;
  newEmail: string;
}): Promise<string> => {
  await supabase.auth.updateUser({
    email: newEmail,
  });

  return `Um die Änderung zu bestätigen, bitte klicke auf die Links die per Mail jeweils an deine alte E-Mail-Adresse „${oldEmail}“ und neue E-Mail-Adresse „${newEmail}“ verschickt wurde.`;
};
