import React, { useCallback, useState } from "react";
import TextInput from "../../input/text-input";
import { validatePassword } from "./validation";
import { PasswordErrors } from "./types";

const PasswordInputWithValidation: React.FC = () => {
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    validLength: false,
    upperAndLowerCase: false,
    number: false,
    special: false,
  });

  const checks: { name: keyof PasswordErrors; description: string }[] = [
    {
      name: "validLength",
      description: "mindestens 8 Zeichen",
    },
    {
      name: "upperAndLowerCase",
      description: "Klein- und Großbuchstaben",
    },
    {
      name: "special",
      description: "mindestens ein Sonderzeichen",
    },
    {
      name: "number",
      description: "eine Zahl",
    },
  ];

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const passwordErrors = validatePassword(target.value);

      setPasswordErrors(passwordErrors);

      const hasErrors = Object.values(passwordErrors).some((error) => !error);

      if (!hasErrors) {
        target.setCustomValidity("");
        return;
      }

      target.setCustomValidity("Bitte überprüfe Deine Eingabe");
    },
    [],
  );

  return (
    <>
      <label htmlFor="password">Passwort</label>
      <TextInput
        type="password"
        id="password"
        name="password"
        required
        onChange={onChange}
      />
      <p className="font-medium">Dein Passwort sollte enthalten:</p>
      <ul>
        {checks.map((check) => (
          <li key={check.name} className="flex gap-2">
            {passwordErrors[check.name] ? (
              <span className="text-blue-600">✓</span>
            ) : (
              <span>•</span>
            )}
            {check.description}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PasswordInputWithValidation;
