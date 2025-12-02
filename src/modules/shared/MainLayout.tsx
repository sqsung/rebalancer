import { Sidebar } from "@/modules/shared";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex h-full min-h-screen bg-zinc-100">
      <Sidebar />
      <Outlet />
    </div>
  );
};
