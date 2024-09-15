import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      {/* header */}
      <Outlet />
      {/* footer */}
    </div>
  );
};

export default AppLayout;
