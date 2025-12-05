import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  const [malhas, setMalhas] = useState(3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-6 py-16 text-gray-700 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3 text-center">
          📊 Calculadora de Análise de Malhas
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Insira os dados do seu circuito elétrico
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          
          <aside className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
            <h3 className="font-medium mb-4 text-lg">Formulário de Entrada</h3>

            <label className="block text-sm text-gray-700 mb-1">
              Número de Malhas
            </label>
            <input
              type="number"
              min={1}
              value={malhas}
              onChange={(e) => setMalhas(Number(e.target.value))}
              className="w-24 p-2 border rounded-md"
            />

            <div className="mt-6">
              <label className="block text-sm text-gray-700 mb-2">
                Matriz de Resistências (Ω)
              </label>

              <div className="grid gap-2">
                {Array.from({ length: malhas }).map((_, i) => (
                  <div key={i} className="flex gap-2">
                    {Array.from({ length: malhas }).map((_, j) => (
                      <input
                        key={j}
                        className="p-2 border rounded-md w-20 text-center"
                        placeholder={`R${i + 1}${j + 1}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm text-gray-700 mb-2">
                Vetor de Tensões (V)
              </label>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: malhas }).map((_, i) => (
                  <input
                    key={i}
                    className="p-2 border rounded-md w-24 text-center"
                    placeholder={`V${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-4 py-2 rounded-md bg-blue-500 text-white">
                Calcular
              </button>
              <button className="px-4 py-2 rounded-md border">
                Limpar
              </button>
            </div>
          </aside>

          <section className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
            <h3 className="font-medium mb-4 text-lg">Resultados</h3>

            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="py-2">Malha</th>
                  <th className="py-2">Corrente (A)</th>
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: malhas }).map((_, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-2">I{i + 1}</td>
                    <td className="py-2">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
