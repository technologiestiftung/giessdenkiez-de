import { UserProfile } from '../../common/interfaces';
import { useAuth0 } from '../auth/auth0';
import { useAuth0Token } from './useAuth0Token';
import { useUserData } from './useUserData';
import { createUserProfile } from '../requests/createUserProfile';
import { updateUserProfile } from '../requests/updateUserProfile';

export const useUserProfileActions = (): {
  createUserProfile: () => Promise<UserProfile | undefined>;
  changeUsername: (username: string) => Promise<void | undefined>;
  changeSalutation: (salutation: string) => Promise<void | undefined>;
  changeGivenName: (given_name: string) => Promise<void | undefined>;
  changeFamilyName: (family_name: string) => Promise<void | undefined>;
  changeStreetWithNumber: (street_with_number: string) => Promise<void | undefined>;
  changeZipcode: (zipcode: string) => Promise<void | undefined>;
  changePhoneNumber: (phone_number: string) => Promise<void | undefined>;
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
      await updateUserProfile({ token, userId: user?.sub, name: "preferedUserName", value: username })
      invalidateUserData();
    },
    changeSalutation: async (salutation: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, name: "salutation", value: salutation })
      invalidateUserData();
    },
    changeGivenName: async (given_name: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, name: "given_name", value: given_name })
      invalidateUserData();
    },
    changeFamilyName: async (family_name: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, name: "family_name", value: family_name })
      invalidateUserData();
    },
    changeStreetWithNumber: async (street_with_number: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, name: "street_with_number", value: street_with_number })
      invalidateUserData();
    },
    changeZipcode: async (zipcode: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, name: "zipcode", value: zipcode })
      invalidateUserData();
    },
    changePhoneNumber: async (phone_number: string) => {
      if (!user?.sub || !token || !userData || !userData.userProfile) return;
      await updateUserProfile({ token, userId: user?.sub, name: "phone_number", value: phone_number })
      invalidateUserData();
    },
  };
};
