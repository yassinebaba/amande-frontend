import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const ServiceCard = ({ title, description, price, image, onReserve }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 overflow-hidden border border-gray-200">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#cba670] font-semibold">{price}</span>
          <button
            className="bg-pink-500 hover:bg-[#842749] text-white p-3 rounded-full transition-colors duration-300 shadow-md"
            onClick={() => onReserve(title)} // 🔁 Ouvre le modal avec service pré-sélectionné
            title="Réserver"
          >
            <FaCalendarAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
