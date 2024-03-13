import React, { useCallback, useState } from "react";
import TextInput from "../../input/text-input.tsx";

interface UsernameErrors {
  enoughChars: boolean;
  onlyNumberAndLetters: boolean;
}

const UsernameInputWithValidation: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [usernameErrors, setUsernameErrors] = useState<UsernameErrors>({
    enoughChars: false,
    onlyNumberAndLetters: false,
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);

    const enoughChars = e.target.value.length > 8;
    const onlyNumberAndLetters = /^[a-zA-Z0-9]*$/.test(e.target.value);

    setUsernameErrors({
      enoughChars,
      onlyNumberAndLetters,
    });
  }, []);

  const checks: { name: keyof UsernameErrors; description: string }[] = [
    {
      name: "enoughChars",
      description: "mindestens 8 Zeichen",
    },
    {
      name: "onlyNumberAndLetters",
      description: "nur aus Zeichen oder Zahlen ",
    },
  ];

  return (
    <>
      <label htmlFor="username" className="">
        Benutzername
      </label>
      <TextInput
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={onChange}
      />
      <p>
        <span className="font-medium">Dein Benutzername sollte enthalten:</span>
        <ul>
          {checks.map((check) => (
            <li key={check.name} className="flex gap-2">
              {usernameErrors[check.name] ? (
                <span className="text-blue-600">✓</span>
              ) : (
                <span>•</span>
              )}
              {check.description}
            </li>
          ))}
        </ul>
      </p>
    </>
  );
};

export default UsernameInputWithValidation;
