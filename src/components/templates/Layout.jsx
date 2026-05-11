import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../organisms/NavBar/NavBar"; // La ubicación del Navbar que hicimos

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar global que persiste en todas las rutas */}
      <Navbar />
      
      {/* Contenido dinámico de las páginas */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Aquí podrías agregar un Footer más tarde */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2026 Antojos Tropicales - Proyecto E-commerce</p>
      </footer>
    </div>
  )
}

export default Layout