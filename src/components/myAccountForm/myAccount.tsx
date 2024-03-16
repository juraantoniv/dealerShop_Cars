import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

import { userService } from "../../services/auth.service";
import { selectUser } from "../../store/store";
import s from "./myAccount.module.css";
const Schema = z.object({
  name: z.string().min(1),
  age: z.number().min(16).max(99),
  city: z.string().min(1, { message: "error" }),
  // file: z.any(),
});

export type FormTypeForUpdate = z.infer<typeof Schema>;
export function MyAccount() {
  const [disabled, setDisabled] = useState<boolean>(true);

  const user = useSelector(selectUser);

  const editMode = () => {
    setDisabled(false);
  };

  const {
    handleSubmit,
    register,
    // control,
    formState: { errors },
  } = useForm<FormTypeForUpdate>({
    resolver: zodResolver(Schema),
  });

  console.log(errors);

  const save = () => {
    setDisabled(true);
  };

  const onSubmit = async (data: FormTypeForUpdate) => {
    try {
      const user = await userService.updateUserData(data);
      toast.info(`data was saved`);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Box className={s.box}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10px",
            gap: "10px",
          }}
        >
          <TextField
            {...register("name")}
            name={"name"}
            size={"small"}
            label="name"
            defaultValue={user.name}
            disabled={disabled}
          />
          <TextField
            {...register("city")}
            name={"city"}
            size={"small"}
            label="city"
            defaultValue={user.city}
            disabled={disabled}
          />
          <TextField
            {...register("age", { valueAsNumber: true })}
            name={"age"}
            size={"small"}
            label="age"
            defaultValue={Number(user.age)}
            disabled={disabled}
          />
          <Button onClick={editMode}>Edit account</Button>
          <Button type={"submit"} onClick={save}>
            Save
          </Button>
        </form>
      </Box>
    </React.Fragment>
  );
}
