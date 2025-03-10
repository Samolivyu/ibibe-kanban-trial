import React from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./Signup";

const Home = () => {
  const navigate = useNavigate();
  console.log("Home rendered");

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
            Welcome to Ibibe Gaming Kanban
          </h1>
          
          <div className="flex items-center">
            <img
              className="w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[4rem] lg:h-[4rem] xl:w-[5rem] xl:h-[5rem] mr-2 object-contain"
              src="/ibibe-temp-logo.png"
              alt="logo"
            />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              Ibibe Gaming Task Manager
            </span>
          </div>
        </div>
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h2>
            
            <SignUp />
            
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signin");
                }}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;