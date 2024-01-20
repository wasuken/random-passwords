// PasswordGenerator.tsx
import React, { useState } from "react";
import styles from "./App.module.css";

const generatePassword = (
  length: number,
  hasNumbers: boolean,
  hasSymbols: boolean,
): string => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;':\",.<>/?";

  let characters = lowercaseChars;
  if (hasNumbers) characters += numberChars;
  if (hasSymbols) characters += symbolChars;
  characters += uppercaseChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

const generatePasswords = (
  length: number,
  hasNumbers: boolean,
  hasSymbols: boolean,
  n: number,
) => {
  let rst = [];
  for (let i = 0; i < n; i++)
    rst.push(generatePassword(length, hasNumbers, hasSymbols));
  return rst;
};

const App = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [minLength, setMinLength] = useState<number>(8);
  const [maxLength, setMaxLength] = useState<number>(16);
  const [passwords, setPasswords] = useState<number>(10);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);

  const handlePasswordClick = (password: string) => {
    navigator.clipboard
      .writeText(password)
      .then(() => alert("パスワードがコピーされました: " + password))
      .catch((err) => console.error("コピーできませんでした", err));
  };

  const handleGenerate = () => {
    const hasNumberHasSymPwds = generatePasswords(
      passwordLength,
      true,
      true,
      passwords,
    );
    const hasSymPwds = generatePasswords(
      passwordLength,
      false,
      true,
      passwords,
    );
    const pwds = generatePasswords(passwordLength, false, false, passwords);
    setGeneratedPasswords((prevPasswords) => [
      ...pwds,
      ...hasNumberHasSymPwds,
      ...hasSymPwds,
    ]);
  };

  return (
    <div className={styles.passwordGenerator}>
      <label htmlFor="minLength" className={styles.label}>
        最小長：
      </label>
      <input
        id="minLength"
        type="number"
        value={minLength}
        onChange={(e) => setMinLength(parseInt(e.target.value))}
        className={styles.input}
      />

      <label htmlFor="maxLength" className={styles.label}>
        最大長：
      </label>
      <input
        id="maxLength"
        type="number"
        value={maxLength}
        onChange={(e) => setMaxLength(parseInt(e.target.value))}
        className={styles.input}
      />

      <button onClick={handleGenerate} className={styles.button}>
        Generate Password
      </button>
      {generatedPasswords.length > 0 && (
        <div className={styles.passwordDisplay}>
          {generatedPasswords.map((password, index) => (
            <div key={index} onClick={() => handlePasswordClick(password)}>
              {password}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
