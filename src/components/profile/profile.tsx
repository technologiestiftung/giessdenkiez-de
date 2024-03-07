import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import TertiaryButton from "../buttons/tertiary";
import DestructiveButton from "../buttons/destructive";
import WateringIcon from "../icons/watering-icon";

const Profile: React.FC = () => {
  const i18n = useI18nStore().i18n();
  return (
    <div className="p-4">
      <div className="mx-auto my-auto">{i18n.navbar.profile}</div>
      <PrimaryButton
        onClick={() => console.log("You clicked on the primary button")}
        label={
          <>
            <WateringIcon />
            Primary Button
          </>
        }
        disabled={false}
      />
      <SecondaryButton
        onClick={() => console.log("You clicked on the secondary button")}
        label="Secondary Button"
        disabled={false}
      />
      <TertiaryButton
        onClick={() => console.log("You clicked on the tertiary button")}
        label="Tertiary Button"
        disabled={false}
        destructive={false}
      />
      <DestructiveButton
        onClick={() => console.log("You clicked on the destructive button")}
        label="Destructive Button"
        disabled={false}
      />
    </div>
  );
};

export default Profile;
