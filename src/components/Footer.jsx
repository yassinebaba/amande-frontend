import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold">Amande Douce</h4>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Tous droits réservés
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex space-x-6 justify-center">
          <a
            href="https://www.instagram.com/amandedoucerabat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-600 text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100028195435321#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-600 text-xl"
          >
            <FaFacebookF />
          </a>
        </div>

        {/* Right: Admin Access */}
<div className="text-center md:text-right">
  <a
    href="/admin/login"
    className="text-sm font-medium text-gray-700 hover:text-pink-600"
  >
    Accès Admin
  </a>
</div>

      </div>
    </footer>
  );
};

export default Footer;
