import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContect";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const DrawerAppBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div>
        <div className="container mx-auto flex items-center justify-between p-3 py-5">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-bold ">PDF-Master</h1>
          </Link>

          <div className="md:hidden">
            {auth?.isLoggedIn ? (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => auth.logout().then(() => navigate("/"))}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SignIn
              </Link>
            )}
          </div>

          <div className="space-x-3 items-center hidden md:flex">
            {auth?.isLoggedIn ? (
              <>
                <Link to="/dashboard">Dashboard</Link>

                <button
                  type="submit"
                  onClick={() => auth.logout().then(() => navigate("/"))}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="flex w-full justify-center rounded-md text-indigo-500  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  SignIn
                </Link>

                <Link
                  to="/signup"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerAppBar;
