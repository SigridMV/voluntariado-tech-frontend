// src/components/layout/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const activeClass = "text-blue-600 underline";
  const inactiveClass = "text-gray-700 hover:text-blue-600 hover:underline";

  return (
    <nav className="bg-gray-100 border-b p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Izquierda: Inicio */}
        <ul className="flex gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              About this project
            </NavLink>
          </li>
        </ul>

        {/* Derecha: Login o Usuario */}
        <ul className="flex gap-6 items-center">
          {user ? (
            <>
              <li className="text-gray-800">Hello, {user.name}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded px-2 py-1 transition"
                  aria-label="Cerrar sesión"
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
