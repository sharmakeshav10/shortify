import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useEffect } from "react";

const AuthPage = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="mt-20 flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold">
        {searchParams.get("newUrl")
          ? "Almost there! Please log in to proceed."
          : "Login / SignUp"}
      </h2>
      <Tabs defaultValue="login" className="w-[450px]">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
