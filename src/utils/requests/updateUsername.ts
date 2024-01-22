import {
  Session,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';
import { isUsernameUnique } from './validateUsernameUniqueness';

const supabase = createPagesBrowserClient<Database>();

export const updateUsername = async (
  newUsername: string,
  session?: Session | null
): Promise<string> => {
  const newUsernameIsUnique = await isUsernameUnique(newUsername);

  if (!newUsernameIsUnique) {
    throw new Error('Benutzername ist bereits vergeben');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ username: newUsername })
    .eq('id', session?.user?.id)
    .select();

  if (error || !data) {
    throw new Error(
      'Interner Fehler beim Speichern des neuen Namens. Bitte versuch es später erneut.'
    );
  }

  return 'Benutzername geändert.';
};
