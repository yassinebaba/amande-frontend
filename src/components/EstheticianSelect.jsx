import React from "react";

const EstheticianSelect = ({ selected, onChange, disabledList = [], disabled = false }) => {
  const estheticiennes = ["Amina", "Leila", "Sofia", "Nora"];

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      required
      disabled={disabled}
      className={`${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <option value="">Choisir une esthéticienne</option>
      {estheticiennes.map((name) => {
        const isOccupied = disabledList.includes(name);
        return (
          <option
            key={name}
            value={isOccupied ? "" : name}
            disabled={isOccupied}
          >
            {name} {isOccupied ? "(occupée)" : ""}
          </option>
        );
      })}
    </select>
  );
};

export default EstheticianSelect;
