import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DotLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { login, signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlLink = searchParams.get("newUrl");

  const { data, error, loading, fn: loginFn } = useFetch(login, formData);

  useEffect(() => {
    console.log("DATA", data);
    if (data && error === null) {
      navigate(`/dashboard?${urlLink ? `newUrl=${urlLink}` : ""}`);
    }
  }, [data, error]);

  const handleInputChange = (e) => {
    console.log("res", e.target.name, e.target.value);
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      //login api call
      await loginFn();
    } catch (e) {
      const formErrors = {};

      e?.inner?.forEach((error) => {
        formErrors[error.path] = error.message;
      });

      setErrors(formErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter with your login credentials</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Please enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Please enter password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <div className="justify-center">
            <Button onClick={handleLoginSubmit}>
              {loading ? <DotLoader size={25} color="#FFFFFF" /> : "Login"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
