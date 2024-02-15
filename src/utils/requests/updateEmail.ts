import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../common/database';

const supabase = createPagesBrowserClient<Database>();

export const updateEmail = async ({
  oldEmail,
  newEmail,
  emailSuccessMessageText,
}: {
  oldEmail: string;
  newEmail: string;
  emailSuccessMessageText: (oldMail: string, newMail: string) => string;
}): Promise<string> => {
  try {
    await supabase.auth.updateUser({
      email: newEmail,
    });

    return emailSuccessMessageText(oldEmail, newEmail);
  } catch (error) {
    console.error(error);
    return error;
  }
};
