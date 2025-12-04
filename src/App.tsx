import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-6 py-16 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Layout Inicial</h2>
        <p>O restante do aplicativo será implementado pela equipe.</p>
      </main>

      <Footer />
    </div>
  );
}

