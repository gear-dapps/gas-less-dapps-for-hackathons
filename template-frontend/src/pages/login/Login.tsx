import { useAlert } from "@gear-js/react-hooks";
import { Button, Input } from "@gear-js/ui";
import { useForm } from "@mantine/form";
import { ADDRESS } from "consts";
import { useNavigate } from "react-router-dom";
import { useAccount } from "contexts/Account";
import { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MoveLeft } from "lucide-react";
import styles from "./Login.module.scss";

const initialValues = { login: "", password: "" };

function Login() {
  const { getInputProps, onSubmit } = useForm({ initialValues });
  const alert = useAlert();
  const navigate = useNavigate();
  const { setAccount } = useAccount();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = onSubmit(({ login, password }) => {
    setLoading(true);
    fetch(`${ADDRESS.API}/user/get_keys`, {
      method: "POST",
      body: JSON.stringify({ nickname: login, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();
      })
      .then(({ publicKey, privateKey }) => {
        setAccount({ publicKey, privateKey, isAdmin: false });
        navigate("/");
      })
      .catch((error: Error) => {
        alert.error(error.message || "Something wrong. Try again later.");
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <Input label="Login:" direction="y" {...getInputProps("login")} />

          <Input
            type="password"
            label="Password:"
            direction="y"
            {...getInputProps("password")}
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
            text="Login"
            disabled={loading}
            className={loading ? "loading" : ""}
          />
        </div>
      </form>
    </div>
  );
}

export { Login };
