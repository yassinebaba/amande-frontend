import React from "react"
const services = [
  { title: "Épilation", img: "https://source.unsplash.com/600x400/?waxing" },
  { title: "Massage", img: "https://source.unsplash.com/600x400/?massage" },
  { title: "Soin visage", img: "https://source.unsplash.com/600x400/?facial" }
];

const Services = () => {
  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">Nos Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-white rounded shadow p-4 text-center">
            <img src={s.img} alt={s.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold text-pink-600">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
