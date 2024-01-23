import { Database } from '../../common/database';

export const getUserProfile = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<NonNullable<Database['public']['Tables']['profiles']['Row']>> => {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY env variable');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'content-type': 'application/json',
        },
      }
    );
    if (!response.ok) throw new Error('Failed to fetch user profile');
    const data = (await response.json()) as Database['public']['Tables']['profiles']['Row'];

    return data[0];
  } catch (error) {
    console.error(error);
    return error;
  }
};
