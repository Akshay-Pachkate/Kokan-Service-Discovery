import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {

  const {user} = useContext(UserContext);

  return (
    <header className=" h-20 flex items-center ">
      <div className="flex justify-between flex-grow">
        <Link to="/" className="flex gap-1 justify-center items-center">
          <img
            src="/images/logo_airbnb.png"
            alt="brand logo"
            className="h-7"
          />
          <span className="font-semibold text-primary text-2xl">airbnb</span>
        </Link>

        <div className="flex text-sm  gap-4 pb-2 pt-3 px-4 rounded-full max-[800px]:hidden shadow-md border border-gray-200 ">
          <div>Anywhere</div>
          <div className="border-l "></div>

          <div>Any week</div>
          <div className="border-l "></div>

          <div>Add guests</div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 bg-primary rounded-full p-1 text-white cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <Link to={user ? "/account" : "/login"} className="flex gap-[6px] py-2 px-4 items-center justify-center rounded-full hover:shadow-md border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-[#717171] flex justify-center border border-gray-500 overflow-hidden rounded-full h-6 w-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6  text-white relative  top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && user.name}
        </Link>
      </div>
    </header>
  );
};

export default Header;
