import React, { useState, useEffect } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { Loader } from "./Loader";
import { notifyError, notifySuccess, confirmDelete } from "../helpers/alert";
import { Pokemon } from "../types/pokemon";
import { HelpHttp, HttpError } from "../helpers/HelpHttp";
import { sounds } from "../helpers/soundHelper";
import "../styles/layout.css";

interface CatalogOption {
  id: number;
  name: string;
}

export const CrudApp: React.FC = () => {
  const [db, setDb] = useState<Pokemon[]>([]);
  const [dataToEdit, setDataToEdit] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [rarityData, setRarityData] = useState<CatalogOption[]>([]);
  const [typeData, setTypeData] = useState<CatalogOption[]>([]);
  const [locationData, setLocationData] = useState<CatalogOption[]>([]);

  const api = HelpHttp();
  const baseUrl = "http://localhost:3000";

  const isError = (res: any): res is HttpError => res.err === true;

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [resPk, resRa, resTy, resLo] = await Promise.all([
        api.get<Pokemon[]>(`${baseUrl}/crud`),
        api.get<CatalogOption[]>(`${baseUrl}/rarity`),
        api.get<CatalogOption[]>(`${baseUrl}/type`),
        api.get<CatalogOption[]>(`${baseUrl}/location`),
      ]);

      if (!isError(resPk)) setDb(resPk);
      if (!isError(resRa)) setRarityData(resRa);
      if (!isError(resTy)) setTypeData(resTy);
      if (!isError(resLo)) setLocationData(resLo);
    } catch (err) {
      setError("Error al sincronizar con la base de datos");
      notifyError("ERROR CRÍTICO", "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createData = async (formData: FormData) => {
    const token = localStorage.getItem("token");
    const res = await api.post<Pokemon>(`${baseUrl}/crud`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!isError(res)) {
      sounds.playSuccess();
      notifySuccess("CAPTURADO", "REGISTRO EXITOSO");
      fetchData(); // Recargamos para ver los cambios
    } else {
      sounds.playError();
      notifyError("ERROR", res.statusText);
    }
  };

  const updateData = async (formData: FormData) => {
    const id = formData.get("pokemon_id");
    const token = localStorage.getItem("token");

    const res = await api.put<Pokemon>(`${baseUrl}/crud/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!isError(res)) {
      notifySuccess("ACTUALIZADO", "Datos guardados en la pokedex");

      // 3. Reutilizamos fetchData() para que la tabla se actualice
      // con la info real de la DB, incluyendo cambios de nombres de tipos/rarezas.
      fetchData();
      setDataToEdit(null);
    } else {
      notifyError(
        "ERROR",
        res.statusText || "No se pudo actualizar el registro",
      );
    }
  };

  const deleteData = async (id: number) => {
    const isConfirmed = await confirmDelete(id.toString());
    if (!isConfirmed) return;

    const token = localStorage.getItem("token");
    const res = await api.del(`${baseUrl}/crud/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!isError(res)) {
      sounds.playDelete();
      setDb(db.filter((p) => p.pokemon_id !== id));
      notifySuccess("ELIMINADO", "EL POKÉMON HA SIDO LIBERADO");
    } else {
      notifyError("ERROR", "NO SE PUDO ELIMINAR");
    }
  };

  return (
    <div className="crud-container">
      <h1 className="page_title">ADMINISTRACIÓN DE POKÉMON</h1>
      {loading && <Loader />}

      {error && (
        <div
          className="error-container"
          style={{ textAlign: "center", margin: "20px" }}
        >
          <p
            className="press-start-2p-regular"
            style={{ color: "#ff1f1f", fontSize: "12px" }}
          >
            ⚠️ ERROR: {error}
          </p>
          <button
            className="btn-retry"
            onClick={() => fetchData()}
            style={{ marginTop: "10px", cursor: "pointer" }}
          >
            REINTENTAR CONEXIÓN
          </button>
        </div>
      )}

      {!loading && (
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
            dataToEdit={dataToEdit}
          />
        </article>
      )}
    </div>
  );
};
