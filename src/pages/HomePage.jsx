import React, { useEffect, useRef, useState } from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import EquipeSection from "../components/EquipeSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import GallerySection from "../components/GallerySection";
import { FaArrowUp } from "react-icons/fa";

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollTop(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4, // un petit scroll déclenche l’apparition
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={heroRef} id="hero">
        <HeroSection />
      </div>
      <ServicesSection />
      <EquipeSection />
      <GallerySection />
      <ContactSection />
      <Footer />

      {/* 🔝 Bouton retour en haut – visible uniquement en dehors de Hero */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Retour en haut"
        className={`fixed bottom-4 right-4 z-[9999] bg-pink-500 hover:bg-[#842749] text-white p-3 rounded-full shadow-lg transition-all duration-500 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
        }`}
      >
        <FaArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
