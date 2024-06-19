import { Outlet } from "react-router";
import { Header } from "..";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
