import React from "react"
const countries = [
  { name: "Maroc", code: "+212", flag: "🇲🇦" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Algérie", code: "+213", flag: "🇩🇿" }
];

const CountrySelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded p-2"
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.name} ({c.code})
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
