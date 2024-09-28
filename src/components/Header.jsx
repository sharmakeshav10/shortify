import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { UserState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { DotLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  // const user = true;
  const { data, isAuthenticated, fetchUser } = UserState();

  const { loading, error, fn: userLogout } = useFetch(logout);

  const handleLogout = async () => {
    try {
      await userLogout();
      console.log("logout successs");

      fetchUser();
      navigate("/");
    } catch (e) {}
  };

  return (
    <>
      <div className="flex justify-between pt-2 sticky">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">SHORTIFY.</h1>
        </Link>
        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src={data?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>KS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {data?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"/dashboard"}>
                  <DropdownMenuItem className="cursor-pointer">
                    My Links
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span className="ml-2">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
