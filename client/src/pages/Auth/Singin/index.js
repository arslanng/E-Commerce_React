import React from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validations from "./validation";
import { fetchLogin } from "../../../api";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";

function Singin() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, bag) => {
      console.log(values);
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);

        navigate("../profile");
        console.log("res", loginResponse);
      } catch (e) {
        bag.setErrors({
          general:
            e.response.data.message === "email or password not correct"
              ? "email veya parola hatalı"
              : e.response.data.message === "The email address was not found."
              ? "email bulunamadı"
              : e.response.data.message,
        });
      }
    },
    validationSchema: validations,
  });
  return (
    <div>
      <Flex align="center" justifyContent="center" width="full">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sing In</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <div>
                    <br />
                    <Alert status="error">{formik.errors.email}</Alert>
                  </div>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.errors.password && formik.touched.password}
                />
                {formik.errors.password && formik.touched.password && (
                  <div>
                    <br />
                    <Alert status="error">{formik.errors.password}</Alert>
                  </div>
                )}
              </FormControl>

              <Button mt={4} width="full" type="submit">
                Sing In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Singin;
