import React from "react"; // ← ⚠️ à ajouter
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded hover:bg-pink-100 ${
      location.pathname === path ? "bg-pink-600 text-white" : "text-pink-700"
    }`;

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-700">Amande Douce</h1>
        <nav className="flex gap-3">
          <Link to="/" className={linkClass("/")}>Accueil</Link>
          <Link to="/reserver" className={linkClass("/reserver")}>Réserver</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
