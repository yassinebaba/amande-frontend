import React, { useState, useEffect, useRef } from "react";
import "../styles/modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import EstheticianSelect from "./EstheticianSelect";
import { API_BASE_URL } from "../utils/api"; // ✅ ajout ici

const BookingModal = ({ isOpen, onClose, initialService = "" }) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    indicatif: "+212 (0)",
    telephone: "",
    date: null,
    heure: "",
    estheticienne: "",
    service: initialService,
    commentaire: "",
  });

  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const heuresDispo = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  const allEstheticiennes = ["Amina", "Leila", "Sofia", "Nora"];
  const allOccupied = allEstheticiennes.every((name) => occupiedSlots.includes(name));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        setConfirmed(false);
        setError("");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setConfirmed(false);
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialService && isOpen) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService, isOpen]);

  useEffect(() => {
    if (formData.date && formData.heure) {
      const formattedDate = dayjs(formData.date).format("YYYY-MM-DD");
      axios
        .get(`${API_BASE_URL}/api/bookings?date=${formattedDate}&time=${formData.heure}`)
        .then((res) => setOccupiedSlots(res.data || []))
        .catch(() => setOccupiedSlots([]));
    }
  }, [formData.date, formData.heure]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.date && formData.heure) {
        const formattedDate = dayjs(formData.date).format("YYYY-MM-DD");
        axios
          .get(`${API_BASE_URL}/api/bookings?date=${formattedDate}&time=${formData.heure}`)
          .then((res) => setOccupiedSlots(res.data || []))
          .catch(() => setOccupiedSlots([]));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [formData.date, formData.heure]);

  const today = dayjs();
  const selectedDate = dayjs(formData.date);
  const isToday = formData.date && selectedDate.isSame(today, "day");
  const nowHour = today.hour();
  const nowMinute = today.minute();

  const isPastHour = (heure) => {
    if (!formData.date) return false;
    const [h, m] = heure.split(":").map(Number);
    if (!isToday) return false;
    return h < nowHour || (h === nowHour && m <= nowMinute);
  };

  const countAtTime = (heure) => {
    if (!Array.isArray(occupiedSlots)) return 0;
    return occupiedSlots.filter((r) => r.heure === heure).length;
  };

  const validatePhone = (phone) => {
    return /^\d{9}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    if (!validatePhone(formData.telephone)) {
      setError("Veuillez entrer un numéro de téléphone valide (9 chiffres)");
      setSending(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        telephone: `${formData.indicatif}${formData.telephone}`,
        date: dayjs(formData.date).format("YYYY-MM-DD"),
      };
      const res = await axios.post(`${API_BASE_URL}/api/book`, payload);
      if (res.status === 200) {
        setConfirmed(true);
        setFormData({
          nom: "",
          email: "",
          indicatif: "+212",
          telephone: "",
          date: null,
          heure: "",
          estheticienne: "",
          service: "",
          commentaire: "",
        });
        setTimeout(() => {
          onClose();
          setConfirmed(false);
        }, 3000);
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Erreur lors de la réservation";
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  const canSelectEstheticienne = formData.date && formData.heure;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Réserver un soin</h2>

        {confirmed ? (
          <div className="confirmation-message">
            ✅ Votre réservation a bien été envoyée !
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* ...le reste de ton formulaire inchangé */}
            {/* Voir bloc complet précédent */}
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
