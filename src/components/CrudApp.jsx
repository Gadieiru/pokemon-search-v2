import { CrudForm } from "./CrudForm.jsx";
import { CrudTable } from "./CrudTable.jsx";
import { useState, useEffect } from "react";
import { HelpHttp } from "../helpers/HelpHttp.jsx";
import { notifyError, notifySuccess, confirmDelete } from "../helpers/alert.js";
import { sounds } from "../helpers/soundHelper.js";
import "../styles/layout.css";

export const CrudApp = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [db, setDb] = useState([]);
  const [rarityData, setRarityData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  const api = HelpHttp();
  const APIBaseUrl = "http://localhost:3000";
  const APICRUDUrl = `${APIBaseUrl}/crud`;

  const createData = async (formData) => {
    const token = localStorage.getItem("token");

    let options = {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const res = await api.post(APICRUDUrl, options);
    if (!res.err) {
      sounds.playSuccess();
      alert("Pokémon creado con éxito");
      getPokemons();
    } else {
      sounds.playError();
      alert(`Error al crear: ${res.statusText || "Verifica los datos"}`);
    }
  };
  
  const getPokemons = async () => {
    const res = await api.get(APICRUDUrl);
    if (!res.err) {
      setDb(res);
      setError(null);
    } else {
      setError(res);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pokemonRes, rarityRes, typeRes, locationRes] = await Promise.all(
          [
            api.get(APICRUDUrl),
            api.get(`${APIBaseUrl}/rarity`),
            api.get(`${APIBaseUrl}/type`),
            api.get(`${APIBaseUrl}/location`),
          ]
        );

        if (!pokemonRes.err) setDb(pokemonRes);
        if (!rarityRes.err) setRarityData(rarityRes);
        if (!typeRes.err) setTypeData(typeRes);
        if (!locationRes.err) setLocationData(locationRes);
      } catch (err) {
        console.error("Error al cargar datos iniciales:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateData = async (formData) => {
    const id = formData.get("pokemon_id");
    const token = localStorage.getItem("token");
    let endpoint = `${APICRUDUrl}/${id}`;

    let options = {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const res = await api.put(endpoint, options);
    if (!res.err) {
      alert("Pokémon actualizado correctamente");
      getPokemons();
      setDataToEdit(null);
    } else {
      alert("Error al actualizar el Pokémon");
    }
  };

  const deleteData = async (id) => {
    const isDelete = await confirmDelete(id);

    if (isDelete) {
      const token = localStorage.getItem("token");
      let endpoint = `${APICRUDUrl}/${id}`;

      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const res = await api.del(endpoint, options);

      if (!res.err) {
        sounds.playDelete();
        setDb(db.filter((el) => el.pokemon_id !== id));
        notifySuccess("Eliminado", "Registro borrado con éxito");
      } else {
        sounds.playError();
        notifyError("Error", "No se pudo eliminar el registro");
      }
    }
  };

  return (
    <div className="crud-container">
      <h1
        className="page_title"
        style={{ textAlign: "center", margin: "70px" }}
      >
        ADMINISTRACIÓN DE POKÉMON
      </h1>

      {loading && (
        <p className="press-start-2p-regular" style={{ textAlign: "center" }}>
          CARGANDO...
        </p>
      )}

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          Error al conectar con el servidor.
        </p>
      )}

      {rarityData.length > 0 && (
        <article className="grid-1-2">
          <CrudForm
            rarityOptions={rarityData}
            typeOptions={typeData}
            locationOptions={locationData}
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
          />
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        </article>
      )}
    </div>
  );
};
