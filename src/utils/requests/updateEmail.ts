import {
  Session,
  createBrowserSupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';

const supabase = createBrowserSupabaseClient<Database>();

export const updateEmail = async (newEmail: string): Promise<string> => {
  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  });
  if (error) throw new Error('E-Mail konnte nicht gespeichert werden');

  return 'E-Mail geändert. Bitte klicke die Links in den Mails an deine alte UND neue E-Mail-Adresse, um die Änderung zu bestätigen.';
};
