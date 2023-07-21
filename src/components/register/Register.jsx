/* 
  *NOTAS A TENER EN CUENTA* 
  ! Importaciones a los nuevos cambios estan en la linea 21 a 23
  ! 56 a 78 traemos los datos del endpoint y guardamos en estados para utilizarlos en 155 a 163 y 169 a 187
  ToDo: optimizar codigo , probar endpoints de login y fijarse de aplicarlo con redux
  ? Antes de pushear a la main, hacer una pr para ver que los cambios no vayan a romper todo!!!
*/

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardActions,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./Register.css";

import { getLanguages } from "../../services/cruds/language/language";
import { getCountries } from "../../services/cruds/country/country";
import { register } from "../../services/auth/auth";

const defaultValues = {
  usr_email: "",
  usr_password: "",
  confirm_usr_password: "",
  usr_address: "",
  usr_zip: 0,
  usr_phone: "123456",
  usr_country_id: 0,
  usr_language_id: 0,
};

const formSchema = yup.object({
  usr_email: yup
    .string()
    .trim()
    .min(3, "Ingresar al menos 3 caracteres")
    .required("Campo Obligatorio"),
  usr_address: yup
    .string()
    .trim()
    .min(3, "Ingresar al menos 3 caracteres")
    .required("Campo Obligatorio"),
  usr_password: yup
    .string()
    .trim()
    .min(6, "La contraseña debe ser minimo 6 caracteres")
    .required("Campo Obligatorio"),
});

const Register = () => {
  const [dataCountries, setDataCountries] = useState([]);
  const [dataLanguages, setDataLanguages] = useState([]);
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    const getOptionsData = async () => {
      try{
        const countries = await getCountries()
        setDataCountries(countries)
        const languages = await getLanguages()
        setDataLanguages(languages)
      }catch(error){
        setIsError(true)
      }
    } 
    getOptionsData()

  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit =  async (data) => {
    try {
      await register(data)
      console.log("registro existoso");
    }catch (error){
      console.log(error.response.data.detail)
    }
  };

  return (
    <>
      <Grid sx={{ textAlign: "center" }}>
        <Typography variant="h3"> Register </Typography>
      </Grid>
      <Grid sx={{ justifyContent: "center", display: "flex", m: 1 }}>
      {isError ? <Typography>Error en Base De datos </Typography> : 
        <Card >
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <Grid sx={{ margin: 1 }}>
              <Controller
                name="usr_email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    type="text"
                    sx={{ margin: 1 }}
                    {...field}
                  />
                )}
              />
              {errors.usr_email && (
                <Grid>
                  <Typography variant="caption">
                    {errors.usr_email.message}
                  </Typography>
                </Grid>
              )}
              <Controller
                name="usr_address"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Adress"
                    type="text"
                    sx={{ margin: 1 }}
                    {...field}
                  />
                )}
              />
              {errors.usr_address && (
                <Grid>
                  <Typography variant="caption">
                    {errors.usr_address.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid sx={{ margin: 1}}>
              <Controller
                
                name="usr_language_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onChange={field.onChange} sx={{width:"18vw", marginRight:1.5}} label="Language">
                    {
                      dataLanguages.map((language) => (
                        <MenuItem key={language.language_id} value={language.language_id}  >
                            {language.language_name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                )}
              />

              {errors.usr_language_id && (
                <Grid>
                  <Typography variant="caption">
                    {errors.usr_language_id.message}
                  </Typography>
                </Grid>
              )}
              <Controller
                name="usr_country_id"
                
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onChange={field.onChange} label="Country" sx={{width:"18vw", marginLeft:1.5}} >
                    {
                      dataCountries.map((country) => (
                        <MenuItem key={country.country_id} value={country.country_id} >
                            {country.country_name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                )}
              />
            </Grid>
            <Grid sx={{ margin: 1, display: "flex" }}>
              <Controller
                name="usr_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    sx={{ margin: 1, width:"100%" }}
                    type="password"
                    {...field}
                  />
                )}
              />
              {errors.usr_password && (
                <Grid>
                  <Typography variant="caption">
                    {errors.usr_password.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <CardActions sx={{display:"flex", justifyContent: "center"}}>
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="success"
                type="submit"
              >
                Register
              </Button>
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="warning"
                onClick={() => reset()}
              >
                Cancel
              </Button>
            </CardActions>
          </form>
        </Card>
      }
      </Grid>
          
    </>
  );
};

export default Register;
