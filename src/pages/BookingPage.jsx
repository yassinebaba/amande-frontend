import React from "react"
import BookingForm from "../components/BookingForm";

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-700">
        Prendre Rendez-vous
      </h1>
      <BookingForm />
    </div>
  );
};

export default BookingPage;
