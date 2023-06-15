import { useForm } from "@mantine/form";
import { useState } from "react";
import { Button } from "@gear-js/ui";
import { useAlert } from "@gear-js/react-hooks";
import { ADDRESS } from "../../consts";
import { IUsersTokens } from "../../types/admin";

type AdminGetTokensProps = {
  updateData: React.Dispatch<React.SetStateAction<IUsersTokens>>;
};

const initialValues = { password: "" };

export function AdminGetTokens({ updateData }: AdminGetTokensProps) {
  const alert = useAlert();
  const { getInputProps, onSubmit } = useForm({ initialValues });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = onSubmit(({ password }) => {
    setLoading(true);
    fetch(`${ADDRESS.API}/tokens/request`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);

        return response.json();
      })
      .then((data) => {
        updateData(data);
      })
      .catch((error: Error) => {
        alert.error(error.message || "Access denied");
        // eslint-disable-next-line no-console
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return <Button text="Requset balance" />;
}
