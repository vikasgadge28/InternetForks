import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full text-center py-6 border-t">
      {/* Logo & Brand Name */}
      <div className="flex flex-col items-center">
        <Image
          src="/appLogo.png"
          alt="Mammothzy Logo"
          width={195}
          height={75}
          className="object-contain"
          priority
        />
      </div>

      {/* Tagline */}
      <p className="text-gray-600 text-base mt-2 mx-4">
        Marketplace for searching, filtering and instantly booking team activities
      </p>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 mt-4">
        <FaFacebook className="h-[20px] w-[20px] md:h-6 md:w-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        <FaInstagram className="h-[20px] w-[20px] md:h-6 md:w-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        <FaLinkedin className="h-[20px] w-[20px] md:h-6 md:w-6 text-gray-700 cursor-pointer hover:text-gray-900" />
        <FaEnvelope className="h-[20px] w-[20px] md:h-6 md:w-6 text-gray-700 cursor-pointer hover:text-gray-900" />
      </div>

      {/* Copyright */}
      <div className="mt-6 text-gray-500 text-sm border-t pt-4 mx-20">
        Copyright © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
