import React, { useState } from 'react';

interface FormularioEntradaCircuitoProps {
  onCalcular: (numMalhas: number, matrizR: number[][], vetorV: number[]) => void;
}

const FormularioEntradaCircuito: React.FC<FormularioEntradaCircuitoProps> = ({ onCalcular }) => {
  const [numMalhas, setNumMalhas] = useState<number>(3);
  const [matrizR, setMatrizR] = useState<number[][]>([
    [10, -5, 0],
    [-5, 15, -8],
    [0, -8, 12]
  ]);
  const [vetorV, setVetorV] = useState<number[]>([20, 0, 15]);

  // Atualiza o tamanho da matriz quando o número de malhas muda
  const handleNumMalhasChange = (novoNum: number) => {
    if (novoNum < 1 || novoNum > 10) return;
    
    setNumMalhas(novoNum);
    
    // Cria nova matriz e vetor com valores padrão
    const novaMatriz = Array(novoNum).fill(0).map((_, i) => 
      Array(novoNum).fill(0).map((_, j) => i === j ? 10 : 0)
    );
    const novoVetor = Array(novoNum).fill(0);
    
    setMatrizR(novaMatriz);
    setVetorV(novoVetor);
  };

  // Atualiza valor na matriz de resistências
  const handleMatrizChange = (linha: number, coluna: number, valor: string) => {
    const novaMatriz = [...matrizR];
    novaMatriz[linha][coluna] = parseFloat(valor) || 0;
    setMatrizR(novaMatriz);
  };

  // Atualiza valor no vetor de tensões
  const handleVetorChange = (indice: number, valor: string) => {
    const novoVetor = [...vetorV];
    novoVetor[indice] = parseFloat(valor) || 0;
    setVetorV(novoVetor);
  };

  // Limpa todos os campos
  const handleLimpar = () => {
    setNumMalhas(3);
    setMatrizR([
      [10, -5, 0],
      [-5, 15, -8],
      [0, -8, 12]
    ]);
    setVetorV([20, 0, 15]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalcular(numMalhas, matrizR, vetorV);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Dados do Circuito</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Número de Malhas */}
        <div>
          <label htmlFor="numMalhas" className="block text-sm font-semibold text-gray-700 mb-2">
            Número de Malhas
            <span className="ml-2 text-xs font-normal text-gray-500">(1 a 10)</span>
          </label>
          <input
            id="numMalhas"
            type="number"
            min="1"
            max="10"
            value={numMalhas}
            onChange={(e) => handleNumMalhasChange(parseInt(e.target.value))}
            className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        {/* Matriz de Resistências */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Matriz de Resistências (Ω)
            <span className="ml-2 text-xs font-normal text-gray-500">
              Diagonal: resistências da malha | Fora: resistências compartilhadas
            </span>
          </label>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div 
                className="grid gap-2" 
                style={{ 
                  gridTemplateColumns: `repeat(${numMalhas}, minmax(70px, 1fr))` 
                }}
              >
                {matrizR.map((linha, i) => 
                  linha.map((valor, j) => (
                    <input
                      key={`r-${i}-${j}`}
                      type="number"
                      step="0.01"
                      value={valor}
                      onChange={(e) => handleMatrizChange(i, j, e.target.value)}
                      placeholder={`R${i + 1}${j + 1}`}
                      className="px-3 py-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                      required
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vetor de Tensões */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Vetor de Tensões (V)
            <span className="ml-2 text-xs font-normal text-gray-500">
              Fontes de tensão em cada malha
            </span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {vetorV.map((valor, i) => (
              <div key={`v-${i}`}>
                <label htmlFor={`v${i}`} className="block text-xs text-gray-600 mb-1">
                  V<sub>{i + 1}</sub>
                </label>
                <input
                  id={`v${i}`}
                  type="number"
                  step="0.01"
                  value={valor}
                  onChange={(e) => handleVetorChange(i, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calcular Correntes
          </button>
          <button
            type="button"
            onClick={handleLimpar}
            className="flex-1 sm:flex-initial bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEntradaCircuito;
