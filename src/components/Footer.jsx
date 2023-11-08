import React from "react";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full sm:flex-row flex flex-col my-4 justify-between items-center">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full md:justify-evenly">
          <p className="text-white text-center text-base mx-2 cursor-pointer">
            Market
          </p>
          <p className="text-white text-center text-base mx-2 cursor-pointer">
            Exchange
          </p>
          <p className="text-white text-center text-base mx-2 cursor-pointer">
            Tutorials
          </p>
          <p className="text-white text-center text-base mx-2 cursor-pointer">
            Wallets
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">
          Come join us and hear for the unexpected miracle
        </p>
        <p className="text-white text-sm text-center font-medium mt-2">
          info@kryptomastery.com
        </p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5"></div>
      <div className="w-full sm:w-[90%] flex justify-between items-center mt-3">
        <p className="text-left text-white text-xs">@kryptomastery2022</p>
        <p className="text-right text-white text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
