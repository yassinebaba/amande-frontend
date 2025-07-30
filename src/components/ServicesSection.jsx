import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import BookingModal from "./BookingModal";

import hammam from "../assets/Hammam.jpg";
import massage from "../assets/massage.png";
import cellulite from "../assets/Cellulite treatment.png";
import kobido from "../assets/Kobido facial.png";
import microneedling from "../assets/Microneedling.png";
import microblading from "../assets/microblading.png";
import coiffure from "../assets/coiffure.png";

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openModalWithService = (serviceName) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const services = [
    {
      title: "Hammam",
      description: "Détente orientale dans un hammam traditionnel.",
      price: "150 DHS",
      image: hammam,
    },
    {
      title: "Massage",
      description: "Massage relaxant aux huiles essentielles.",
      price: "200 DHS",
      image: massage,
    },
    {
      title: "Cellulite treatment",
      description: "Traitement ciblé pour raffermir et lisser la peau.",
      price: "300 DHS",
      image: cellulite,
    },
    {
      title: "Kobido facial",
      description: "Soin japonais anti-âge et raffermissant du visage.",
      price: "350 DHS",
      image: kobido,
    },
    {
      title: "Microneedling",
      description: "Rajeunissement cutané pour une peau éclatante.",
      price: "400 DHS",
      image: microneedling,
    },
    {
      title: "Microblading",
      description: "Sourcils parfaits grâce à la dermopigmentation.",
      price: "500 DHS",
      image: microblading,
    },
    {
      title: "Coiffure",
      description: "Mise en beauté personnalisée de vos cheveux.",
      price: "250 DHS",
      image: coiffure,
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#fff6f0]" id="services">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#842749] mb-12">
          Nos Prestations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              price={service.price}
              image={service.image}
              onReserve={openModalWithService} // ✅ transmet fonction ici
            />
          ))}
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={selectedService} // ✅ transmet service sélectionné au modal
      />
    </section>
  );
};

export default ServicesSection;
