import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "./Error";
import { DotLoader } from "react-spinners";
import { UserState } from "@/context";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlLink = searchParams.get("newUrl");

  const { data, error, loading, fn: signupFn } = useFetch(signup, formData);
  const { fetchUser } = UserState();

  useEffect(() => {
    if (data && error === null) {
      console.log("DATA SINGUPPP", data);
      navigate(`/dashboard?${urlLink ? `newUrl=${urlLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignupSubmit = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile pic is required"),
      });

      //input validation
      await schema.validate(formData, { abortEarly: false });

      console.log("Signup Data:", formData);

      //api call
      await signupFn();
      console.log("Signup Data after call:", formData);
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
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Sign up now to get started</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Please enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Please enter your email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div>
            <Input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Please enter your password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div>
            <Input
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignupSubmit}>
            {loading ? <DotLoader size={25} color="#FFFFFF" /> : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
