import React from "react"
import { useEffect, useState } from "react";
import axios from "axios";
import CountrySelect from "./CountrySelect";
import EstheticianSelect from "./EstheticianSelect";
import TimeSlotPicker from "./TimeSlotPicker";
import BookingSuccess from "./BookingSuccess";
import { API_BASE_URL } from "../utils/api";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+212",
    date: "",
    hour: "",
    esthetician: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (code) => {
    setFormData({ ...formData, countryCode: code });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        phone: `${formData.countryCode}${formData.phone}`
      };

      const res = await axios.post("http://localhost:5000/reservations", payload);
      if (res.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Erreur lors de la réservation.");
    }
  };

  if (success) return <BookingSuccess />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Réserver un soin</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Votre prénom"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <div className="flex gap-2">
        <CountrySelect value={formData.countryCode} onChange={handleCountryChange} />
        <input
          type="tel"
          name="phone"
          placeholder="Numéro WhatsApp"
          value={formData.phone}
          onChange={handleChange}
          required
          className="flex-1 border rounded p-2"
        />
      </div>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full border rounded p-2"
      />

      <TimeSlotPicker selectedDate={formData.date} selectedHour={formData.hour} onSelect={(h) => setFormData({ ...formData, hour: h })} esth={formData.esthetician} />

      <EstheticianSelect selected={formData.esthetician} onSelect={(e) => setFormData({ ...formData, esthetician: e })} date={formData.date} hour={formData.hour} />

      <button type="submit" className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 w-full">
        Confirmer la réservation
      </button>
    </form>
  );
};

export default BookingForm;
