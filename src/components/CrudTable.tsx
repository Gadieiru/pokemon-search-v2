import { useState, useMemo } from "react";
import { CrudTableRow } from "./CrudTableRow";
import { Pokemon } from "../types/pokemon";
import "../styles/Components.css";
import "../styles/App.css";

interface CrudTableProps {
  data: Pokemon[];
  setDataToEdit: (data: Pokemon | null) => void;
  deleteData: (id: number) => void;
  dataToEdit: Pokemon | null;
}

export const CrudTable: React.FC<CrudTableProps> = ({
  data,
  setDataToEdit,
  deleteData,
  dataToEdit,
}) => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    return safeData.filter((el) =>
      el.pokemon_name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
  }, [data, filter]);

  const currentData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="crud-table-container">
      <h2 className="panel-header press-start-2p-regular">Tabla de Pokemons</h2>

      <div className="table-header-tools">
        <div className="search-container">
          <input
            type="text"
            className="table-search-input"
            placeholder="FILTRAR POR NOMBRE..."
            value={filter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="pokedex-table">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>TIPOS</th>
              <th>UBICACIÓN</th>
              <th>RAREZA</th>
              <th>FELICIDAD BASE</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((el) => (
                <CrudTableRow
                  key={el.pokemon_id}
                  el={el}
                  setDataToEdit={setDataToEdit}
                  deleteData={deleteData}
                  idEditing={dataToEdit?.pokemon_id === el.pokemon_id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  <span className="blink-text">▶</span> No se detectan registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pokedex-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
