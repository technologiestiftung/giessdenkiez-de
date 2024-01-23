import {
  Session,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';

const supabase = createPagesBrowserClient<Database>();

export const isUsernameUnique = async (
  username: string
): Promise<boolean | undefined> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username);

    if (error || !data) {
      console.error(error || 'Failed to validate username uniqueness');
      return;
    }

    const userNameExists = data
      .map(({ username }) => username)
      .includes(username);

    return !userNameExists;
  } catch (error) {
    console.error(error);
    return error;
  }
};
