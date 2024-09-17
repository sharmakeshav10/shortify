import React from "react";
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
import { CircleLoader, DotLoader, FadeLoader } from "react-spinners";

const Login = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter with your login credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input type="email" placeholder="Please enter email" />
          </div>
          <div className="space-y-1">
            <Input type="password" placeholder="Please enter password" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="justify-center">
            <Button>
              {" "}
              {true ? <DotLoader size={25} color="#FFFFFF" /> : "Login"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
