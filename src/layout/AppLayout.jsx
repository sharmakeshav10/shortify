import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="w-[80%] mx-auto ">
      <Header />
      <Outlet />
      {/* footer */}
    </div>
  );
};

export default AppLayout;
