import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout: React.FC = () => {
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