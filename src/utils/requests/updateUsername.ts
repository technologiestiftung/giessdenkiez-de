import {
  Session,
  createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';
import { isUsernameUnique } from './validateUsernameUniqueness';

const supabase = createPagesBrowserClient<Database>();

export const updateUsername = async (
  newUsername: string,
  session: Session | null,
  successMessage: string,
  errorMessage: string,
  alreadyRegisteredHint: string
): Promise<string> => {
  try {
    const newUsernameIsUnique = await isUsernameUnique(newUsername);

    if (!newUsernameIsUnique) {
      throw new Error(alreadyRegisteredHint);
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ username: newUsername })
      .eq('id', session?.user?.id ?? '')
      .select();

    if (error || !data) {
      throw new Error(errorMessage);
    }

    return successMessage;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
