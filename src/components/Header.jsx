import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/tesla-logo.png";
import { TESLA_API } from "../utils/constant";
import SideBar from "./SideBar";

const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [primaryNavigationItems, setPrimaryNavigationItems] = useState([]);
  const [primaryNavigationRightItems, setPrimaryNavigationRightItems] =
    useState([]);
  const [primaryMobileNavigationRightItems, setMobileNavigationRightItems] =
    useState([]);
  const [primaryMobileNavigationItems, setMobileNavigationtItems] = useState(
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    try {
      const response = await fetch(TESLA_API);
      const data = await response.json();
      setPrimaryNavigationItems(data.primaryNavigationItems);
      setPrimaryNavigationRightItems(data.primaryNavigationRightItems);
      setMobileNavigationRightItems(
        data.primaryMobileNavigationRightItems[0].title
      );
      setMobileNavigationtItems(data.primaryMobileNavigationItems);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 md:px-9 px-4 bg-transparent text-white font-medium w-full z-50">
      <nav className="hidden lg:block">
        <div className="flex justify-between items-center w-full">
          <Link to="/">
            <img className="w-24 h-14 cursor-pointer " src={logo} alt="logo" />
          </Link>
          <ul className="flex item-center gap-6 lg:gap-1 xl:gap-6">
            {primaryNavigationItems.map((item, index) => (
              <Link key={index}>
                <li className="cursor-pointer py-1 px-2  hover:bg-[#242123] rounded transition-all ease-in delay-150">
                  {item?.title}
                </li>
              </Link>
            ))}
          </ul>
          <ul className="flex items-center gap-6 lg:gap-1 xl:gap-6">
            {primaryNavigationRightItems.map((item, index) => (
              <Link key={index}>
                <li className="cursor-pointer py-1 px-2  hover:bg-[#242123] rounded transition-all ease-in delay-150">
                  {item?.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>

      <nav className="block lg:hidden">
        <div className="flex items-center justify-between w-full ">
          <Link to="/">
            <img className="w-24 h-14 cursor-pointer" src={logo} alt="logo" />
          </Link>
          <div
            className="cursor-pointer py-1 px-2  hover:bg-[#242123] rounded transition-all ease-in delay-150"
            onClick={toggleSideBar}
          >
            {primaryMobileNavigationRightItems}
          </div>
        </div>
      </nav>
      <SideBar
        primaryMobileNavigationItems={primaryMobileNavigationItems}
        isOpen={isSideBarOpen}
        onClose={toggleSideBar}
      />
    </header>
  );
};

export default Header;