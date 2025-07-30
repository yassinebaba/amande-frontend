import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/logo.png";
import BookingModal from "./BookingModal";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo à gauche */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo Amande Douce" className="h-10 w-auto" />
        </div>

        {/* Burger pour <768px */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu desktop (≥768px) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800">
          <Link to="hero" smooth duration={500} className="cursor-pointer hover:text-[#7f4a44]">Accueil</Link>
          <Link to="services" smooth duration={500} className="cursor-pointer hover:text-[#7f4a44]">Services</Link>
          <Link to="equipe" smooth duration={500} className="cursor-pointer hover:text-[#7f4a44]">Équipe</Link>
          <Link to="gallery" smooth duration={500} className="cursor-pointer hover:text-[#7f4a44]">Galerie</Link>
          <Link to="contact" smooth duration={500} className="cursor-pointer hover:text-[#7f4a44]">Contact</Link>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#f8538d] hover:bg-[#7f4a44] text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Réserver
          </button>
        </nav>
      </div>

      {/* Menu mobile (<768px) */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 text-sm font-medium text-gray-800 flex flex-col space-y-2">
          <Link to="hero" smooth duration={500} onClick={() => setMenuOpen(false)} className="hover:text-[#7f4a44]">Accueil</Link>
          <Link to="services" smooth duration={500} onClick={() => setMenuOpen(false)} className="hover:text-[#7f4a44]">Services</Link>
          <Link to="equipe" smooth duration={500} onClick={() => setMenuOpen(false)} className="hover:text-[#7f4a44]">Équipe</Link>
          <Link to="gallery" smooth duration={500} onClick={() => setMenuOpen(false)} className="hover:text-[#7f4a44]">Galerie</Link>
          <Link to="contact" smooth duration={500} onClick={() => setMenuOpen(false)} className="hover:text-[#7f4a44]">Contact</Link>

          <button
            onClick={() => {
              setShowModal(true);
              setMenuOpen(false);
            }}
            className="mt-2 bg-[#f8538d] hover:bg-[#7f4a44] text-white font-semibold py-2 px-4 rounded text-center"
          >
            Réserver
          </button>
        </div>
      )}

      {/* Modal réservation */}
      <BookingModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}
