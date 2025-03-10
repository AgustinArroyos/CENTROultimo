import React from "react";
import logo from "../assets/logo1.png";

const MyFooter = () => {
  return (
    <footer className="bg-neutralBlack text-white">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto py-12">
        <div className="grid w-full justify-between gap-8 sm:flex sm:items-start sm:justify-between md:flex md:grid-cols-1">
          <div className="mt-2">
            <a
              href=""
              className="text-2xl font-semibold flex items-center space-x-3"
            >
              <img
                src={logo}
                alt=""
                className="w-10 inline-block items-center"
              />
              <span>Centro formación Profesional</span>
            </a>
            <div className="my-8">
              <p className="mb-1"> Copyright © 2024 Centro formación Profesional ltd.</p>
              <p>All rights reserved</p>
            </div>

            
          </div>
          <div className="md:w-2/3 grid grid-cols-2 gap-8 items-start sm:mt-4 sm:grid-cols-3 sm:gap-6 text-white">
          
            
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
