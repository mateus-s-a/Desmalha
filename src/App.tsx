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
        
        <div className="grid md:grid-cols-2 gap-6">
            <aside className="p-4 border border-gray-100 rounded-lg">
              <h2 className="font-medium mb-3">Formulário de Entrada</h2>
              <label className="block text-sm text-gray-700 mb-1">Número de Malhas</label>
              <input type="number" min={1} defaultValue={3} className="w-24 p-2 border rounded-md" />

              <div className="mt-4">
                <label className="block text-sm text-gray-700 mb-1">Vetor de Tensões (V)</label>
                <div className="flex gap-2">
                  <input className="p-2 border rounded-md w-24" placeholder="V1" />
                  <input className="p-2 border rounded-md w-24" placeholder="V2" />
                  <input className="p-2 border rounded-md w-24" placeholder="V3" />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 rounded-md bg-blue-500 text-white">Calcular</button>
                <button className="px-4 py-2 rounded-md border">Limpar</button>
              </div>
            </aside>

            <section className="p-4 border border-gray-100 rounded-lg">
              <h2 className="font-medium mb-3">Resultados</h2>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-600"><th>Malha</th><th>Corrente (A)</th></tr>
                </thead>
                <tbody>
                  <tr><td>I1</td><td>—</td></tr>
                  <tr><td>I2</td><td>—</td></tr>
                  <tr><td>I3</td><td>—</td></tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

