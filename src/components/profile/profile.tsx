import React from "react";
import { useI18nStore } from "../../i18n/i18n-store";
import PrimaryButton from "../buttons/primary";
import SecondaryButton from "../buttons/secondary";
import TertiaryButton from "../buttons/tertiary";
import PrimaryDestructiveButton from "../buttons/primary-destructive";
import WateringIcon from "../icons/watering-icon";
import TertiaryDestructiveButton from "../buttons/tertiary-destructive";

const Profile: React.FC = () => {
  const i18n = useI18nStore().i18n();
  return (
    <div className="pointer-events-auto p-4">
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
      <PrimaryDestructiveButton
        onClick={() =>
          console.log("You clicked on the primary destructive button")
        }
        label="Primary Destructive Button"
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
      />
      <TertiaryDestructiveButton
        onClick={() =>
          console.log("You clicked on the tertiary destructive button")
        }
        label="Tertiary destructive Button"
        disabled={false}
      />
    </div>
  );
};

export default Profile;
