import React, { useState } from 'react';
import FormularioEntradaCircuito from '../components/FormularioEntradaCircuito';
import TabelaResultadosMalha from '../components/TabelaResultadosMalha';

const Inicio: React.FC = () => {
  const [resultados, setResultados] = useState<number[] | null>(null);
  const [calculando, setCalculando] = useState(false);

  const handleCalcular = (numMalhas: number, matrizR: number[][], vetorV: number[]) => {
    setCalculando(true);
    
    // Simulação de cálculo (mock) - será substituído pela lógica real na Fase 3
    setTimeout(() => {
      // Mock: resultados fictícios baseados no número de malhas
      const resultadosMock = Array(numMalhas)
        .fill(0)
        .map((_, i) => (i + 1) * 0.5 + Math.random() * 0.3);
      
      setResultados(resultadosMock);
      setCalculando(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calculadora de Análise de Malhas
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Resolva circuitos elétricos de forma rápida e precisa usando o método clássico de Análise de Malhas. 
              Insira a matriz de resistências e o vetor de tensões para calcular as correntes em cada malha.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Formulário de Entrada */}
          <FormularioEntradaCircuito onCalcular={handleCalcular} />

          {/* Resultados */}
          <TabelaResultadosMalha resultados={resultados} calculando={calculando} />

          {/* Informações Educacionais */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Como Usar a Calculadora
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <p>
                  <strong className="text-gray-800">Defina o número de malhas:</strong> Determine quantas malhas independentes existem no seu circuito (máximo 10).
                </p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <p>
                  <strong className="text-gray-800">Preencha a matriz de resistências:</strong> Na diagonal principal, coloque a soma das resistências de cada malha. Nos elementos fora da diagonal, coloque as resistências compartilhadas (geralmente negativas).
                </p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p>
                  <strong className="text-gray-800">Insira as tensões:</strong> Digite os valores das fontes de tensão de cada malha no vetor de tensões.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <p>
                  <strong className="text-gray-800">Calcule:</strong> Clique em "Calcular Correntes" e aguarde os resultados aparecerem abaixo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
