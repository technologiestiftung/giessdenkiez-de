import { UserProfile } from '../../common/interfaces';
import { useAuth0 } from '../auth/auth0';
import { useAuth0Token } from './useAuth0Token';
import { useUserData } from './useUserData';
import { createUserProfile } from '../requests/createUserProfile';
import { updateUserProfile } from '../requests/updateUserProfile';

export const useUserProfileActions = (): {
  createUserProfile: () => Promise<UserProfile | undefined>;
  changeUsername: (username: string) => Promise<void | undefined>;
} => {
  const { user } = useAuth0();
  const token = useAuth0Token();
  const { userData, invalidate: invalidateUserData } = useUserData();

  return {
    createUserProfile: async () => {
      if (!user?.sub || !token || !userData) return;      
      if (!userData.userProfile && userData.username && user.email) {
        const newUserProfile = await createUserProfile({ token, userId: user?.sub, username: userData.username, email: user.email })
        invalidateUserData();
        return newUserProfile;
      } else {
        return userData.userProfile;
      }
    },
    changeUsername: async (username: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, preferedUserName: username })
      invalidateUserData();
    },
  };
};
