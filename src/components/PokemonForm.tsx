import React, { useState } from "react";
import { PokemonLayout } from "./PokemonLayout";
import "../styles/App.css";
import "../styles/components.css";

const initialForm = {
  Pokemon: "",
};

export const PokemonForm = ({ handleSearch }) => {
  const [form, setForm] = useState(initialForm);

  // Controla el formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      // Objeto que origina el evento :e.target:
      [e.target.name]: e.target.value, //Su valor sera igual a lo que haya en :e.target.value:
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.Pokemon.trim()) {
      alert("Datos incompletos");
      return;
    }
    handleSearch(form);
    setForm(initialForm);
  };

  return (
      <div className="form_container">
        <h1 className="page_title">¡Bienvenido a la Pokédex!</h1>
        <form className="pokemon_form" onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "15px",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: "#52ff52",
                border: "2px solid #4c3434",
              }}
            ></div>
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: "#ffff52",
                border: "2px solid #4c3434",
              }}
            ></div>
          </div>

          <input
            type="text"
            name="Pokemon"
            placeholder="Nombre del pokemon"
            onChange={handleChange}
            value={form.Pokemon}
          />
          <input type="submit" value="Buscar" className="btn-submit" />
        </form>
      </div>
  );
};
