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

  return 'E-Mail wurde geändert. Bitte bestätige die Änderung über den Link in der E-Mail, die wir dir geschickt haben.';
};
