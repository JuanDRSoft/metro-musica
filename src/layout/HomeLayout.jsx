import React from "react";
import Logo from "/logo metromusica.svg";
import { menuPrincipal } from "../Data/Menu";
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomeLayout = () => {
  const location = useLocation().pathname;
  const { cerrarSesionAuth } = useAuth();

  return (
    <div className="flex">
      <div className="w-[300px] bg-[#343434] h-screen relative">
        <div className="p-10">
          <img src={Logo} />
        </div>

        <div className="grid  gap-5">
          {menuPrincipal.map((e) => (
            <Link
              to={e.url}
              className={`text-white ${
                e.url == location && "bg-red-500"
              } p-1 text-xl font-bold hover:bg-gray-600 w-full rounded-r-xl flex items-baseline gap-5 pl-5`}
            >
              {e.icon} {e.name}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-2 w-full">
          <button
            onClick={cerrarSesionAuth}
            className="p-1 text-white text-xl font-bold text-center hover:bg-gray-600 w-full rounded-r-xl"
          >
            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-[#343434e5] p-5 w-full h-[7vh]"></div>
        <div className="p-10 h-[93vh] bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
