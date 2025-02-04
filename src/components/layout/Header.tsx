/** @format */

import Image from "next/image";

const Header = () => {
  return (
    <header
      className=" bg-white top-0 z-50 ml-12  p-4"
     
    >
      <div className="flex items-center justify-between">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          <Image
            src="/appLogo.png"
            alt="Mammothzy Logo"
            width={195} // Adjusted width to an integer
            height={75}
            className="object-contain"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2 cursor-pointer mr-14">
          <div className="flex items-center space-x-2 justify-center rounded-full bg-gray-200 p-2">
          <img src="/userIcon.png" alt="Profile" width={20} height={20} />
          </div>
          <span className="text-gray-600">Profile</span>
         
        </div>
      </div>
    </header>
  );
};

export default Header;
