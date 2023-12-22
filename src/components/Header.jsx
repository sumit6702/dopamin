import { useRef, useState, useEffect } from "react";
import Search from "./Search";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex bg-white px-4 py-2 md:px-6 lg:px-10 md:py-3 justify-between dark:bg-gray-900">
      <NavLink to="/" className="flex items-center mb-4 sm:mb-0">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-4 h-8"
          alt="Flowbite Logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          DopaMin
        </span>
      </NavLink>
        <Search />
    </header>
  );
};

export default Header;
