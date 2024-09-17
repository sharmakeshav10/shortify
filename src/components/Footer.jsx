import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className=" text-center">
      <h2>Made with 🍵 by Keshav Sharma</h2>
      <div className="flex items-center justify-center gap-2 mt-2">
        <FaGithub size={20} className="cursor-pointer" />
        <FaLinkedin size={20} className="cursor-pointer" />
        <FaTwitter size={20} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
