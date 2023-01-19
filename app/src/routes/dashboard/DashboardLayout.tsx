import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../api/account";

export const DashboardLayout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout().then(() => navigate("/"));
  };
  return (
    <>
      <nav className="flex justify-between items-center h-20">
        <div className="inline-flex md:hidden gap-4">
          <button
            onClick={() => setIsNavOpen((current) => !current)}
            className="items-center p-2 ml-3 text-sm rounded-lg focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={
            isNavOpen
              ? "absolute top-20 overflow-auto w-full justify-center z-50"
              : "p-4 hidden w-full md:block md:w-auto"
          }
        >
          <ul
            className={
              isNavOpen
                ? "flex flex-col p-24 h-[calc(100vh-theme(space.20))] justify-around bg-zinc-800 text-2xl whitespace-nowrap"
                : "flex space-x-8 items-center"
            }
          >
            <li
              className="flex justify-center"
              onClick={() => setIsNavOpen(false)}
            >
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-4" : undefined
                }
              >
                USERS
              </NavLink>
            </li>
            <li
              className="flex justify-center"
              onClick={() => setIsNavOpen(false)}
            >
              <NavLink
                to="/dashboard/cats"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-4" : undefined
                }
              >
                CATS
              </NavLink>
            </li>
            <li
              className="flex justify-center"
              onClick={() => setIsNavOpen(false)}
            >
              <NavLink
                to="/dashboard/dogs"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-4" : undefined
                }
              >
                DOGS
              </NavLink>
            </li>
            <li
              className="flex justify-center"
              onClick={() => setIsNavOpen(false)}
            >
              <NavLink
                to="/dashboard/clients"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-4" : undefined
                }
              >
                CLIENTS
              </NavLink>
            </li>
          </ul>
        </div>
        <button
          className="bg-cyan-700 hover:bg-cyan-600 py-2 px-4 rounded-md font-bold text-sm mx-2"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </nav>
      <Outlet />
    </>
  );
};
