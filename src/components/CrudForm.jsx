import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../styles/components.css";

const initialForm = {
  pokemon_name: "",
  type_id: "",
  location_id: "",
  rarity_id: "",
  imageFile: null,
  imagePreview: null,
  id: null,
};

export const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  rarityOptions,
  typeOptions,
  locationOptions,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      const typeNames = dataToEdit.types
        ? dataToEdit?.types?.split("/").map((s) => s?.trim())
        : [];
      const locationNames = dataToEdit.location
        ? dataToEdit.location.split(",").map((s) => s?.trim())
        : [];

      const typeIds = typeOptions
        .filter((t) => typeNames.includes(t?.name))
        .map((t) => t.id);

      const locationIds = locationOptions
        .filter((l) => locationNames.includes(l?.name))
        .map((l) => l.id);

      let previewUrl = null;
      if (dataToEdit?.pokemon_id) {
        previewUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dataToEdit.pokemon_id}.png`;
      }

      setForm({
        ...dataToEdit,
        pokemon_name: dataToEdit.pokemon_name,

        rarity_id:
          rarityOptions.find((r) => r?.name === dataToEdit?.rarity_name)?.id ||
          "",

        type_id: typeIds,
        location_id: locationIds,
        imageFile: null,
        imagePreview: previewUrl,
        id: dataToEdit.pokemon_id,
      });
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  useEffect(() => {
    return () => {
      if (form?.imagePreview && form?.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(form?.imagePreview);
      }
    };
  }, [form?.imagePreview]);

  const handleChange = (e) => {
    let value = e.target?.value;
    const name = e.target?.name;

    if (name.endsWith("_id")) {
      value = value === "" ? "" : parseInt(value, 10);
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form?.pokemon_name ||
      form?.type_id.length === 0 ||
      form?.location_id.length === 0 ||
      !form?.rarity_id
    ) {
      return alert("Por favor, completa todos los campos obligatorios.");
    }

    const fd = new FormData();
    fd.append("pokemon_name", form.pokemon_name);
    fd.append("rarity_id", form.rarity_id);

    // Convertimos arrays a string JSON para que el backend los procese.
    fd.append("type_id", JSON.stringify(form.type_id));
    fd.append("location_id", JSON.stringify(form.location_id));

    if (form.imageFile) {
      fd.append("pokemon_img", form.imageFile);
    }

    if (form.id === null) {
      createData(fd); // Siempre mandamos el FormData
    } else {
      // Para la edición, el id suele ir en la URL o dentro del body
      fd.append("pokemon_id", form.id);
      updateData(fd);
    }

    handleReset();
  };

  const handleReset = () => {
    if (form.imagePreview) {
      URL.revokeObjectURL(form.imagePreview);
    }

    setForm(initialForm);
    setDataToEdit(null);
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      border: "3px solid #3b2417",
      borderRadius: "6px",
      fontFamily: '"Press Start 2P", cursive',
      fontSize: "0.6rem",
      minHeight: "45px",
      boxShadow: "none",
      "&:hover": { border: "3px solid #3b2417" },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#ff1f1f",
      color: "white",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "white",
    }),
  };

  return (
    <div className="crud-form-container">
      <h3 className="press-start-2p-regular">
        {dataToEdit ? "Editar Pokemon" : "Agregar nuevo pokemon"}
      </h3>

      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label className="field-label">Nombre del Pokemon:</label>
          <input
            type="text"
            name="pokemon_name"
            placeholder="Ej: Charizard..."
            onChange={handleChange}
            value={form.pokemon_name}
          />
        </div>

        <div className="form-group-image">
          <div className="preview-container">
            {form.imagePreview ? (
              <img src={form.imagePreview} alt="Vista previa" />
            ) : (
              <span className="no-image-text">SIN DATOS VISUALES</span>
            )}
          </div>

          <input
            type="file"
            id="imageFile"
            className="input_crud"
            name="imageFile"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setForm({
                  ...form,
                  imageFile: file,
                  imagePreview: URL.createObjectURL(file),
                });
              }
            }}
          />

          <label htmlFor="imageFile" className="custom-file-label">
            {form.imageFile ? "✓ ARCHIVO LISTO" : "CARGAR IMAGEN"}
          </label>
        </div>

        <div className="form-group">
          <label className="field-label">Rareza:</label>
          <select
            name="rarity_id"
            value={form.rarity_id || ""}
            onChange={handleChange}
          >
            <option value="">Selecciona...</option>
            {Array.isArray(rarityOptions) &&
              rarityOptions.map((rarity) => (
                <option key={rarity.id} value={rarity.id}>
                  {rarity.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="field-label">Tipos:</label>
            <Select
              isMulti
              styles={customSelectStyles} // Aplica los estilos que te pasé antes
              options={typeOptions.map((type) => ({
                value: type.id,
                label: type.name,
              }))}
              value={typeOptions
                .filter((type) => form.type_id.includes(type.id))
                .map((type) => ({ value: type.id, label: type.name }))}
              onChange={(selected) => {
                const selectedIds = selected.map((option) => option.value);
                setForm({ ...form, type_id: selectedIds });
              }}
              placeholder="Seleccionar..."
            />
          </div>

          <div className="form-group">
            <label className="field-label">Ubicación:</label>
            <Select
              isMulti
              styles={customSelectStyles}
              options={locationOptions.map((location) => ({
                value: location.id,
                label: location.name,
              }))}
              value={locationOptions
                .filter((location) => form.location_id.includes(location.id))
                .map((location) => ({
                  value: location.id,
                  label: location.name,
                }))}
              onChange={(selected) => {
                const selectedIds = selected.map((option) => option.value);
                setForm({ ...form, location_id: selectedIds });
              }}
              placeholder="Seleccionar..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit-crud">
            {dataToEdit ? "ACTUALIZAR" : "GUARDAR"}
          </button>
          <button
            type="button"
            className="btn-reset-crud"
            onClick={handleReset}
          >
            LIMPIAR
          </button>
        </div>
      </form>
    </div>
  );
};
