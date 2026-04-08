import React, { useActionState, useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { Pokemon } from "../types/pokemon";
import "../styles/components.css";

interface CatalogOption {
  id: number;
  name: string;
}

interface FormState {
  pokemon_name: string;
  type_id: number[];
  location_id: number[];
  rarity_id: number | string;
  imageFile: File | null;
  imagePreview: string | null;
  id: number | string | null;
}

interface CrudFormProps {
  createData: (formData: FormData) => Promise<void>;
  updateData: (formData: FormData) => Promise<void>;
  dataToEdit: Pokemon | null;
  setDataToEdit: (data: Pokemon | null) => void;
  rarityOptions: CatalogOption[];
  typeOptions: CatalogOption[];
  locationOptions: CatalogOption[];
}

const initialForm = {
  pokemon_name: "",
  type_id: [],
  location_id: [],
  rarity_id: "",
  imageFile: null,
  imagePreview: null,
  id: null,
};

export const CrudForm: React.FC<CrudFormProps> = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  rarityOptions,
  typeOptions,
  locationOptions,
}) => {
  const [form, setForm] = useState<FormState>(initialForm);

  const [formError, submitAction, isPending] = useActionState(
    async (_previousState: any, formData: FormData) => {
      try {
        // Agregamos los campos que no son inputs nativos (Selects y ID)
        formData.append("type_id", JSON.stringify(form.type_id));
        formData.append("location_id", JSON.stringify(form.location_id));
        if (form.id) formData.append("pokemon_id", form.id.toString());

        if (!form.id) {
          await createData(formData);
        } else {
          await updateData(formData);
        }
        handleReset();
        return null;
      } catch (err) {
        return "Error al procesar la solicitud.";
      }
    },
    null,
  );

  useEffect(() => {
    if (dataToEdit) {
      const typeNames = dataToEdit.types?.split("/").map((s) => s.trim()) || [];
      const locNames = dataToEdit.location?.split(",").map((s) => s.trim()) || [];

      setForm({
        id: dataToEdit.pokemon_id,
        pokemon_name: dataToEdit.pokemon_name,
        rarity_id:
          rarityOptions.find((r) => r.name === dataToEdit.rarity_name)?.id ||
          "",
        type_id: typeOptions
          .filter((t) => typeNames.includes(t.name))
          .map((t) => t.id),
        location_id: locationOptions
          .filter((l) => locNames.includes(l.name))
          .map((l) => l.id),
        imageFile: null,
        imagePreview: dataToEdit.pokemon_id
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dataToEdit.pokemon_id}.png`
          : null,
      });
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit, rarityOptions, typeOptions, locationOptions]);

  useEffect(() => {
    return () => {
      if (form.imagePreview?.startsWith("blob:")) URL.revokeObjectURL(form?.imagePreview);
    };
  }, [form?.imagePreview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.endsWith("_id")
        ? value === ""
          ? ""
          : Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleReset = () => {
    if (form.imagePreview?.startsWith("blob:")) URL.revokeObjectURL(form.imagePreview);
    setForm(initialForm);
    setDataToEdit(null);
  };

  // Estilos de React-Select
  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      border: "3px solid #3b2417",
      borderRadius: "6px",
      fontFamily: '"Press Start 2P", cursive',
      fontSize: "0.6rem",
      minHeight: "45px",
      boxShadow: "none",
    }),
    multiValue: (base: any) => ({ ...base, backgroundColor: "#ff1f1f", color: "white" }),
  };

  return (
    <div className="crud-form-container">
      <h3 className="press-start-2p-regular">
        {form.id ? "Editar Pokemon" : "Agregar nuevo pokemon"}
      </h3>

      <form action={submitAction} className="crud-form">
        <div className="form-group">
          <label className="field-label">Nombre del Pokemon:</label>
          <input
            type="text"
            name="pokemon_name"
            value={form.pokemon_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group-image">
          <div className="preview-container">
            {form.imagePreview ? (
              <img src={form.imagePreview} alt="Preview" />
            ) : (
              <span className="no-image-text">Sin datos</span>
            )}
          </div>
          <input
            type="file"
            id="imageFile"
            name="pokemon_img"
            accept="image/*"
            onChange={handleFileChange}
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
              rarityOptions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
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
              options={typeOptions.map((t) => ({
                value: t.id,
                label: t.name,
              }))}
              value={typeOptions
                .filter((t) => form.type_id.includes(t.id))
                .map((t) => ({ value: t.id, label: t.name }))}
              onChange={(sel: MultiValue<{ value: number; label: string }>) => {
                const ids = sel ? sel.map((opt) => opt.value) : [];
                setForm({ ...form, type_id: ids });
              }}
              placeholder="Seleccionar..."
            />
          </div>

          {formError && <p style={{ color: "red" }}>{formError}</p>}

          <div className="form-group">
            <label className="field-label">Ubicación:</label>
            <Select
              isMulti
              styles={customSelectStyles}
              options={locationOptions.map((loc) => ({
                value: loc.id,
                label: loc.name,
              }))}
              value={locationOptions
                .filter((loc) => form.location_id.includes(loc.id))
                .map((loc) => ({
                  value: loc.id,
                  label: loc.name,
                }))}
              onChange={(sel: MultiValue<{ value: number; label: string }>) => {
                const ids = sel ? sel.map((opt) => opt.value) : [];
                setForm({ ...form,location_id: ids });
              }}
              placeholder="Seleccionar..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isPending} className="btn-submit-crud">
            {isPending ? "ENVIANDO..." : form.id ? "ACTUALIZAR" : "GUARDAR"}
          </button>
          <button type="button" onClick={handleReset} className="btn-reset-crud">
            LIMPIAR
          </button>
        </div>
      </form>
    </div>
  );
};
