import { useForm } from "@mantine/form";
import { Button, Input } from "@gear-js/ui";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { Keyring } from "@polkadot/api";
import { useAlert } from "@gear-js/react-hooks";
import { ADDRESS } from "consts";
import { useAccount } from "contexts/Account";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MoveLeft } from "lucide-react";
import styles from "./Register.module.scss";

const initialValues = { login: "", password: "", confirmPassword: "" };

function Register() {
  const { getInputProps, onSubmit } = useForm({
    initialValues,
    validate: {
      login: (value) =>
        value.length < 4 ? "Minimum length is 4 symbols" : null,
      password: (value) =>
        value.length < 6 ? "Minimum length is 6 symbols" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  const alert = useAlert();
  const { setAccount } = useAccount();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = onSubmit(({ login, password }) => {
    const keyring = new Keyring({ type: "sr25519" });
    const privateKey = mnemonicGenerate(12);

    const pair = keyring.addFromMnemonic(privateKey);
    const publicKey = pair.address;

    setLoading(true);

    fetch(`${ADDRESS.API}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        publicKey,
        privateKey,
        nickname: login,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        setAccount({ publicKey, privateKey, isAdmin: false });
        navigate("/info");
      })
      .catch((error: Error) => {
        alert.error(error.message);
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => setLoading(false));
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className={styles.inputs}>
        <Input label="Login:" direction="y" {...getInputProps("login")} />

        <Input
          type="password"
          label="Password:"
          direction="y"
          {...getInputProps("password")}
        />

        <Input
          type="password"
          label="Confirm Password:"
          direction="y"
          {...getInputProps("confirmPassword")}
        />
      </div>

      <div className={styles.footer}>
        <Button
          text="Back"
          icon={MoveLeft}
          color="light"
          onClick={() => navigate("/")}
        />
        <Button
          type="submit"
          text="Register"
          disabled={loading}
          className={loading ? "loading" : ""}
        />
      </div>
    </form>
  );
}

export { Register };
