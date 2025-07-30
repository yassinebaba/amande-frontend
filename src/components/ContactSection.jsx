import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center bg-[#fff8f2] px-4 py-16"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">
        Nous Trouver
      </h2>
      <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl">
        Située au cœur de la ville, venez découvrir notre salon
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Bloc Infos Contact */}
        <div className="bg-white rounded-lg shadow-md p-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Informations de Contact
          </h3>
          <p className="mb-2">
            <span className="font-semibold text-pink-600">📍 Adresse</span>
            <br />
            155, avenue Mohammed 6, Galerie La pinède, Rabat, Morocco
          </p>
          <p className="mb-2">
            <span className="font-semibold text-pink-600">📞 Téléphone</span>
            <br />
            05377-57510
          </p>
          <p>
            <span className="font-semibold text-pink-600">📧 Email</span>
            <br />
            contact@amandedouce.fr
          </p>
        </div>

        {/* Carte Google Maps */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <iframe
            title="Salon Amande Douce"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26466.402552797615!2d-6.879740529077581!3d33.984819076489636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b5d8c3b4e61%3A0xfd8fdd9dabd9a0f1!2samande%20douce!5e0!3m2!1sen!2sma!4v1752890872492!5m2!1sen!2sma"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "100%", minWidth: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Horaires */}
      <div className="bg-pink-100 rounded-lg shadow-md p-6 mt-10 w-full max-w-3xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Horaires d'Ouverture
        </h3>
        <div className="flex justify-between text-gray-700">
          <div>
            <p>Lundi - Vendredi</p>
            <p>Samedi</p>
            <p>Dimanche</p>
          </div>
          <div className="text-right">
            <p>9h00 - 19h00</p>
            <p>9h00 - 18h00</p>
            <p>Fermé</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
