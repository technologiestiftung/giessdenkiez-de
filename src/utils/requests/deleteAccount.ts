import { requests } from '../requestUtil';

export const deleteAccount = async ({
  token,
  userId,
}: {
  token: string;
  userId: string;
}): Promise<boolean> => {
  try {
    const res = await requests<{ ok: boolean; text: () => Promise<string> }>(
      `${process.env.USER_DATA_API_URL}/api/user?userid=${userId}`,
      {
        token,
        override: {
          mode: 'cors',
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
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
