import React, { useState } from 'react';
import FormularioEntradaCircuito from '../components/FormularioEntradaCircuito';
import TabelaResultadosMalha from '../components/TabelaResultadosMalha';
import { calcularCorrentesMalha, ResultadoAnalise } from '../logic/analiseMalha';

const Inicio: React.FC = () => {
  const [resultados, setResultados] = useState<number[] | null>(null);
  const [calculando, setCalculando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleCalcular = (_numMalhas: number, matrizR: number[][], vetorV: number[]) => {
    setCalculando(true);
    setErro(null);
    
    // Simula pequeno delay para melhor UX (opcional)
    setTimeout(() => {
      const resultado: ResultadoAnalise = calcularCorrentesMalha(matrizR, vetorV);
      
      if (resultado.sucesso) {
        setResultados(resultado.correntes);
        setErro(null);
      } else {
        setResultados(null);
        setErro(resultado.erro || 'Erro desconhecido ao calcular');
      }
      
      setCalculando(false);
    }, 300);
  };

  // Nova função para limpar resultados
  const handleLimpar = () => {
    setResultados(null);
    setErro(null);
    setCalculando(false);
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
          {/* Mensagem de Erro */}
          {erro && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-fade-in">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-red-800 font-semibold mb-1">Erro no Cálculo</h3>
                  <p className="text-red-700 text-sm">{erro}</p>
                </div>
              </div>
            </div>
          )}

          {/* Formulário de Entrada */}
          <FormularioEntradaCircuito 
            onCalcular={handleCalcular} 
            onLimpar={handleLimpar}
          />

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

            {/* Exemplo Prático */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Exemplo Prático</h3>
              <p className="text-sm text-gray-700 mb-3">
                Para um circuito com 3 malhas, você pode usar os valores padrão já preenchidos:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Matriz R (Ω):</p>
                  <code className="block bg-white p-2 rounded border border-gray-300 font-mono text-xs">
                    [10, -5, 0]<br/>
                    [-5, 15, -8]<br/>
                    [0, -8, 12]
                  </code>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-1">Vetor V (V):</p>
                  <code className="block bg-white p-2 rounded border border-gray-300 font-mono text-xs">
                    [20, 0, 15]
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
