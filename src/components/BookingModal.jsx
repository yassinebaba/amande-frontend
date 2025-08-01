import React, { useState, useEffect, useRef } from "react";
import "../styles/modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import dayjs from "dayjs";
import EstheticianSelect from "./EstheticianSelect";

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
            <input
              type="text"
              placeholder="Nom complet *"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              onInvalid={(e) => e.target.setCustomValidity("Veuillez entrer une adresse email valide")}
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <div className="phone-group">
              <input
                type="text"
                value="+212 (0)"
                disabled
                style={{ width: "80px", fontWeight: "bold", textAlign: "center" }}
              />
              <input
                type="tel"
                placeholder="Numéro de téléphone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                pattern="^\d{9}$"
                title="Veuillez entrer un numéro de téléphone valide (9 chiffres)"
                required
                onInvalid={(e) => e.target.setCustomValidity("Veuillez entrer un numéro de téléphone valide (9 chiffres)")}
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </div>

            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              dateFormat="yyyy-MM-dd"
              placeholderText="Choisir une date"
              required
              minDate={new Date()}
            />

            <div className="time-slots">
              {heuresDispo.map((heure) => {
                const count = countAtTime(heure);
                const isFull = count >= 4;
                const disabled = isFull || isPastHour(heure);
                return (
                  <button
                    key={heure}
                    type="button"
                    className={`slot ${formData.heure === heure ? "selected" : ""}`}
                    onClick={() => setFormData({ ...formData, heure })}
                    disabled={disabled}
                  >
                    {heure}
                  </button>
                );
              })}
            </div>

            {allOccupied && (
              <div style={{ color: "crimson", fontWeight: "bold", marginBottom: "10px" }}>
                Toutes les esthéticiennes sont déjà réservées à ce créneau. Veuillez choisir une autre heure ou date.
              </div>
            )}

            <EstheticianSelect
              selected={formData.estheticienne}
              onChange={(val) => setFormData({ ...formData, estheticienne: val })}
              disabledList={occupiedSlots}
              disabled={!canSelectEstheticienne}
            />

            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              required
              disabled={!canSelectEstheticienne}
            >
              <option value="">Choisir un service</option>
              <option value="Hammam">Hammam</option>
              <option value="Massage">Massage</option>
              <option value="Cellulite treatment">Cellulite treatment</option>
              <option value="Kobido facial">Kobido facial</option>
              <option value="Microneedling">Microneedling</option>
              <option value="Microblading">Microblading</option>
              <option value="Coiffure">Coiffure</option>
            </select>

            <textarea
              placeholder="Commentaire (optionnel)"
              value={formData.commentaire}
              onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
            />

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={sending}>
              {sending ? "Envoi en cours..." : "Confirmer la réservation"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
