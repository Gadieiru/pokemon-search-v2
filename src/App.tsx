import { PokemonSearch } from "./components/PokemonSearch.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CrudApp } from "./components/CrudApp.jsx";
import { LoginUser } from "./components/LoginUser.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { RegisterUser } from "./components/RegisterUser.jsx";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import { MainLayout } from "./components/MainLayout.jsx";
import { Home } from "./pages/Home.jsx";

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
