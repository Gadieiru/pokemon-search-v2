import { Outlet } from "react-router";
import { Navbar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";

export const MainLayout = () => {
    return(
        <div className="pokedex-page-wrapper">
          <Navbar />
          <main className="main-content">
            <Outlet />
          </main>

          <Footer />
        </div>
    )
}