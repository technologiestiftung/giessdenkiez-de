import {
  Session,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';

const supabase = createPagesBrowserClient<Database>();

export const getUsernameBySession = async (session: Session) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', session?.user?.id);

  if (error) throw new Error('Benutzername konnte nicht gefunden werden');

  if (data.length > 1)
    throw new Error('Benutzername konnte nicht eindeutig identifiziert werden');

  return data[0].username;
};
