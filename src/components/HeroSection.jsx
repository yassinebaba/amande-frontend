import React, { useState } from "react";
import backgroundVideo from "../assets/video.mp4";
import BookingModal from "./BookingModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden" id="hero">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>

      {/* Overlay sur texte uniquement */}
      <div className="relative z-10 w-full h-full flex items-center justify-center sm:justify-start px-4 sm:px-6 md:px-20">
        <div className="max-w-xl bg-white bg-opacity-70 p-5 sm:p-6 rounded-md text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Votre beauté,<br />
            <span className="text-[#cba670]">notre passion</span>
          </h1>
          <p className="mt-4 text-gray-700 text-sm sm:text-base md:text-lg">
            Découvrez l'expérience unique d'Amande Douce, votre salon de beauté
            où élégance et bien-être se rencontrent.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-start gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="transition duration-300 text-white font-medium text-sm sm:text-base py-3 px-6 sm:px-8 rounded-md border-2 border-transparent text-center"
              style={{ backgroundColor: "hsl(334, 82%, 65%)" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#7d0032")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "hsl(334, 82%, 65%)")
              }
            >
              Prendre rendez-vous
            </button>

            <a
              href="#services"
              className="transition duration-300 text-sm sm:text-base font-medium py-3 px-6 sm:px-8 rounded-md border-2 text-center"
              style={{
                backgroundColor: "hsl(35, 45%, 65%)",
                color: "hsl(24, 9.8%, 10%)",
                borderColor: "hsl(35, 45%, 65%)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#7d0032";
                e.currentTarget.style.borderColor = "#7d0032";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "hsl(35, 45%, 65%)";
                e.currentTarget.style.color = "hsl(24, 9.8%, 10%)";
                e.currentTarget.style.borderColor = "hsl(35, 45%, 65%)";
              }}
            >
              Nos services
            </a>
          </div>
        </div>
      </div>

      {/* Modal de réservation */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
