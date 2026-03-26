import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PokemonSearch } from "./components/PokemonSearch";
import { CrudApp } from "./components/CrudApp";
import { LoginUser } from "./components/LoginUser";
import { PrivateRoute } from "./components/PrivateRoute";
import { RegisterUser } from "./components/RegisterUser";
import { AuthProvider } from "./context/auth/AuthProvider";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pokedex" element={<PokemonSearch />}/>
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <CrudApp />
                </PrivateRoute>
              }
            />
            </Route>


              <Route path="/login" element={<LoginUser />} />
              <Route path="/register" element={<RegisterUser />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
