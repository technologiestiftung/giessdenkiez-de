import React, { useCallback, useState } from "react";
import TextInput from "../../input/text-input.tsx";

interface PasswordErrors {
  enoughChars: boolean;
  upperAndLowerCase: boolean;
  number: boolean;
  special: boolean;
}

const PasswordInputWithValidation: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    enoughChars: false,
    upperAndLowerCase: false,
    number: false,
    special: false,
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    const enoughChars = e.target.value.length > 8;
    const upperAndLowerCase = /[a-zA-Z]/.test(e.target.value);
    const number = /[0-9]/.test(e.target.value);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(e.target.value);

    setPasswordErrors({
      enoughChars,
      upperAndLowerCase,
      number,
      special,
    });
  }, []);

  const checks: { name: keyof PasswordErrors; description: string }[] = [
    {
      name: "enoughChars",
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

  return (
    <>
      <label htmlFor="password" className="">
        Passwort
      </label>
      <TextInput
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={onChange}
        onBlur={() => console.log("should show warning if it has errors")}
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
