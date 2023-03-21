import { requests } from '../requestUtil';

export const deleteAccount = async ({
  token,
}: {
  token: string;
}): Promise<boolean> => {
  try {
    const res = await requests<{ ok: boolean; text: () => Promise<string> }>(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/remove_account`,
      {
        token,
        override: {
          mode: 'cors',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          },
        },
      }
    );
    if (res.ok) {
      return true;
    } else {
      const text = await res.text();
      console.error(text);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
