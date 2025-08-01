// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "../styles/admin.css";
import { API_BASE_URL } from "../utils/api";


export default function AdminPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterEsth, setFilterEsth] = useState("");
  const [viewTab, setViewTab] = useState("Toutes");
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("adminToken");
     const res = await fetch(`${API_BASE_URL}/api/admin/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setReservations(data);
    } catch (err) {
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatutChange = async (index, newStatus) => {
    const idReservation = reservations[index].idReservation;
    const token = localStorage.getItem("adminToken");
    try {
    const res = await fetch(`${API_BASE_URL}/api/book/${idReservation}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut: newStatus }),
      });
      if (res.ok) {
        setToast("✅ Statut mis à jour !");
        fetchReservations();
        setTimeout(() => setToast(""), 3000);
      } else {
        setToast("❌ Erreur lors de la mise à jour");
        setTimeout(() => setToast(""), 3000);
      }
    } catch (err) {
      setToast("❌ Erreur inattendue");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const sortedFilteredData = reservations
    .filter((r) => (viewTab === "Toutes" ? true : r.statut === viewTab))
    .filter((r) => (filterEsth ? r.estheticienne === filterEsth : true))
    .filter((r) =>
      Object.values(r)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (col) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortDirection("asc");
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(sortedFilteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reservations.csv";
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des réservations", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["ID", "Nom", "Téléphone", "Date", "Heure", "Esthéticienne", "Service", "Statut"]],
      body: sortedFilteredData.map((r) => [
        r.idReservation,
        r.nom,
        r.telephone,
        r.date,
        r.heure,
        r.estheticienne,
        r.service,
        r.statut,
      ]),
    });
    doc.save("reservations.pdf");
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const uniqueEsths = [...new Set(reservations.map((r) => r.estheticienne))];
  const countByStatut = (statut) => reservations.filter((r) => r.statut === statut).length;

  const statutData = ["En cours", "Approuvé", "Annulé"].map((s) => ({
    name: s,
    value: countByStatut(s),
  }));

  const COLORS = ["#facc15", "#10b981", "#ef4444", "#6366f1"];
  const esthData = uniqueEsths.map((e) => ({
    name: e,
    value: reservations.filter((r) => r.estheticienne === e).length,
  }));

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className={`sidebar ${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64`}>
            <div className="px-4 py-6 space-y-6 flex flex-col min-h-screen">
              <div className="text-center">
                <img src={logo} alt="Logo" className="mx-auto h-12" />
              </div>
              <div className="space-y-4 text-sm">
                <button
                  onClick={() => window.location.href = "/admin"}
                  className="flex items-center gap-2 text-left"
                >
                  📊 Tableau de bord
                </button>
                <a href="/" className="flex items-center gap-2 text-indigo-400 underline mt-auto">
                  🔙 Retour au site
                </a>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <button
                className="md:hidden px-2 py-1 border rounded mr-4"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ☰
              </button>
              <h1 className="text-xl font-bold">📅 Tableau de bord – Réservations</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1 border rounded text-sm"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>

            {toast && (
              <div className="m-4 p-2 text-center rounded toast-success">{toast}</div>
            )}

            {/* Statistiques */}
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="p-4 rounded shadow bg-gray-800">
                <h2 className="font-semibold text-lg text-center mb-4 text-gray-100">
                  📊 Réservations par statut
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={statutData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-4 rounded shadow bg-gray-800">
                <h2 className="font-semibold text-lg text-center mb-4 text-gray-100">
                  👩‍🎨 Répartition des esthéticiennes
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={esthData} dataKey="value" nameKey="name" outerRadius={70} label>
                      {esthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Filtres sticky */}
            <div className="px-4 sticky top-0 z-50 bg-gray-900 py-3 border-y border-gray-700">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-semibold">Statuts :</span>
                {["Toutes", "En cours", "Approuvé", "Annulé"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setViewTab(tab)}
                    className={`px-3 py-1 rounded text-sm font-semibold border ${
                      viewTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {tab} ({tab === "Toutes" ? reservations.length : countByStatut(tab)})
                  </button>
                ))}
                <span className="ml-4 font-semibold">Esthéticienne :</span>
                <select
                  className="px-2 py-1 rounded border bg-white dark:bg-gray-700 dark:text-white"
                  value={filterEsth}
                  onChange={(e) => setFilterEsth(e.target.value)}
                >
                  <option value="">Toutes</option>
                  {uniqueEsths.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="🔍 Recherche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ml-auto px-2 py-1 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
                />
                <button onClick={handleExportCSV} className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded text-sm">📄 Export CSV</button>
                <button onClick={handleExportPDF} className="ml-2 px-3 py-1 bg-red-600 text-white rounded text-sm">📄 Export PDF</button>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto mt-6 px-4 pb-12">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    {["IdReservation", "Nom", "Telephone", "Date", "Heure", "Estheticienne", "Service", "Statut"].map((col) => (
                      <th
                        key={col}
                        onClick={() => toggleSort(col.toLowerCase())}
                        className="px-4 py-2 cursor-pointer text-sm text-left"
                      >
                        {col}{" "}
                        {sortColumn === col.toLowerCase() && (
                          <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedFilteredData.map((r, i) => (
                    <tr key={i} className="border-b border-gray-700">
                      <td className="px-4 py-2 text-sm">{r.idReservation}</td>
                      <td className="px-4 py-2 text-sm">{r.nom}</td>
                      <td className="px-4 py-2 text-sm">{r.telephone}</td>
                      <td className="px-4 py-2 text-sm">{r.date}</td>
                      <td className="px-4 py-2 text-sm">{r.heure}</td>
                      <td className="px-4 py-2 text-sm">{r.estheticienne}</td>
                      <td className="px-4 py-2 text-sm">{r.service}</td>
                      <td className="px-4 py-2 text-sm">
              <select
  value={r.statut}
  onChange={(e) => handleStatutChange(i, e.target.value)}
  className={`select-statut ${
    r.statut === "Approuvé"
      ? "statut-approuve"
      : r.statut === "Annulé"
      ? "statut-annule"
      : "statut-en-cours"
  }`}
>
  <option value="En cours">En cours</option>
  <option value="Approuvé">Approuvé</option>
  <option value="Annulé">Annulé</option>
</select>


                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
