import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-6 py-16 text-center text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">📊 Calculadora de Análise de Malhas</h2>
        <p className="text-gray-600 mb-4">Insira os dados do seu circuito elétrico</p>
        <p>O restante do aplicativo será implementado pela equipe.</p>
      </main>

      <Footer />
    </div>
  );
}

