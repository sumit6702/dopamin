import { useRef, useState, useEffect } from "react";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="lg:flex bg-white px-4 py-2 md:px-6 lg:px-10 md:py-3 justify-between dark:bg-gray-900">
      <NavLink to="/dopamin" className="flex justify-center lg:justify-normal items-center mb-4 sm:mb-0">
        <Logo width={128} />
      </NavLink>
      <Search />
    </header>
  );
};

export default Header;
