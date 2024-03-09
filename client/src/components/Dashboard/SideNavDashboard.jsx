import { Link } from "react-router-dom";
import routes from "../../routes";

import PropTypes from "prop-types";
import { setAdmin } from "../../toolkit/authSlice";
import { useDispatch } from "react-redux";

const SideNavDashboard = ({ setSidebar, activeLink, sidebar }) => {
  const dispatch = useDispatch();

  return (
    <aside
      className={`${
        sidebar
          ? "-translate-x-[0%]"
          : "-translate-x-[150%] lg:-translate-x-[0%]"
      }  fixed h-screen p-4 transition duration-500 lg:block `}
      style={{ zIndex: 2 }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(15,64,46,1) 87%, rgba(22,101,52,1) 100%)",
        }}
        className=" h-full rounded-xl text-white flex flex-col p-2"
      >
        <Link to="/">
          <div
            onClick={() => {
              setSidebar(false);
            }}
            className="p-4"
          >
            <h1 className="text-2xl font-semibold">Elasala AZ</h1>
          </div>
        </Link>
        <nav className="flex-1 flex flex-col gap-1 mt-6">
          <h3 className="text-sm text-slate-100 font-bold m-2">Gestion</h3>
          {routes.map(
            ({ path, title, icon }, index) =>
              !path.includes("products/:productID") && (
                <Link
                  key={index}
                  to={path}
                  onClick={() => {
                    setSidebar(false);
                  }}
                  className={`${
                    activeLink === title ? "bg-green-800" : ""
                  } flex w-full items-center justify-start gap-4 text-white rounded-lg py-2 px-4 active:scale-95 block py-2  text-white transition hover:bg-green-700`}
                >
                  {icon}
                  <p className="text-lg font-bold text-start">{title} </p>
                </Link>
              )
          )}

          <h3 className="text-sm text-slate-100 font-bold m-2">Account</h3>

          <div
            onClick={() => dispatch(setAdmin(null))}
            className={`cursor-pointer flex w-full items-center justify-start gap-4 text-white rounded-lg py-2 px-4 active:scale-95 block py-2  text-white transition hover:bg-green-700`}
          >
            <i className="fa-solid fa-right-from-bracket"></i>{" "}
            <p className="text-lg font-bold text-start">Déconnexion </p>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideNavDashboard;

SideNavDashboard.propTypes = {
  activeLink: PropTypes.string,
  sidebar: PropTypes.bool,
  setSidebar: PropTypes.func,
  setActiveLink: PropTypes.func,
};
