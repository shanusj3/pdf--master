import { Link } from "react-router-dom";
import shapeOne from "../assets/shape-01.svg";
import shapeTwo from "../assets/shape-02.svg";
import { useAuth } from "../context/AuthContect";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const auth = useAuth();
  const user = auth?.isLoggedIn;
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="h-full w-full ">
        <div className="container mx-auto flex flex-col items-center p-2 justify-center py-40 bg-[#090E34] rounded-lg relative z-10">
          <img
            src={shapeOne}
            className="absolute top-0 right-0 z-0"
            alt="Shape One"
          />
          <img
            src={shapeTwo}
            className="absolute bottom-0 left-0 z-0"
            alt="Shape Two"
          />
          <div className="relative flex flex-col space-y-6 items-center justify-center z-10 text-center">
            <h1 className="text-3xl md:max-w-2xl w-full md:text-5xl text-white font-bold md:mt-42">
              Create Your Own Custom PDF file for FREE
            </h1>
            {user ? (
              <>
                {" "}
                <Link
                  to="/dashboard"
                  className="mt-6 p-2 w-full text-center text-white bg-indigo-600 hover:bg-indigo-500 rounded-md md:max-w-md"
                >
                  Go To Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="mt-6 p-2 w-full text-center text-white bg-indigo-600 hover:bg-indigo-500 rounded-md md:max-w-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
