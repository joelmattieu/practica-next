/* 
  ! lineas 45 a 52 es donde se manda username y password al endpoint post de auth/login
  ! devuelve el error 422 del catch, no manda ni username ni password al endpoint
  ! se crea el componente login importado en la 15 , donde hacemos el axios.post 
  ToDo: verificar con BK el endpoint de auth/login y seguir retocando el formulario , button disabled si isLoggedIn es True, etc
*/


import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuth } from "@/hooks/useAuth";



const defaultValues = {
  username: "",
  password: "",
};

const formSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Campo Obligatorio"),

  password: yup
    .string()
    .trim()
    .min(6, "La contraseña debe ser minimo 6 caracteres")
    .required("Campo Obligatorio"),
});

const LoginForm = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const auth =  useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data) => {
    auth.login(data);
    
  };

  console.log(errors)
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <Grid sx={{ display: "flex", alignItems: "center", m: 1 }}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField sx={{ m: 1 }} label="Email" {...field} />
            )}
          />
          {errors.username && (
            <Grid>
              <Typography variant="caption">
                {errors.username.message}
              </Typography>
            </Grid>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField type="password" label="password" {...field} />
            )}
          />
          {errors.password && (
            <Grid>
              <Typography variant="caption">
                {errors.password.message}
              </Typography>
            </Grid>
          )}

          <Button variant="contained" type="submit" sx={{ m: 1 }}>
            Send
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
