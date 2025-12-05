import React from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
          D
        </div>
        <div className="leading-tight">
          <h1 className="text-lg font-semibold">Desmalha</h1>
          <p className="text-sm opacity-90">Calculadora de Análise de Malhas</p>
        </div>
      </div>

      <button className="md:hidden" aria-label="Abrir menu">
        <Menu size={28} />
      </button>

      <div className="hidden md:flex gap-6 text-sm">
        <button className="hover:opacity-80">Início</button>
        <button className="hover:opacity-80">Documentação</button>
        <button className="hover:opacity-80">GitHub</button>
      </div>
    </nav>
  );
}
