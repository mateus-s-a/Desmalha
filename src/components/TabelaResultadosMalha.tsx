import React from 'react';

interface TabelaResultadosMalhaProps {
  resultados: number[] | null;
  calculando: boolean;
}

const TabelaResultadosMalha: React.FC<TabelaResultadosMalhaProps> = ({ resultados, calculando }) => {
  if (calculando) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Calculando correntes de malha...</p>
        </div>
      </div>
    );
  }

  if (!resultados || resultados.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Nenhum Resultado</h3>
          <p className="text-sm text-gray-500 max-w-md">
            Insira os dados do circuito e clique em "Calcular Correntes" para ver os resultados aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Correntes Calculadas</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Malha</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Corrente (A)</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Corrente (mA)</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((corrente, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                    I<sub>{index + 1}</sub>
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-lg font-mono font-semibold text-gray-800">
                    {corrente.toFixed(3)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">A</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-base font-mono text-gray-600">
                    {(corrente * 1000).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">mA</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Informação adicional */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Interpretação dos Resultados</h4>
            <p className="text-sm text-blue-700">
              As correntes de malha representam as correntes que circulam em cada malha do circuito. 
              Valores positivos indicam corrente no sentido horário, valores negativos no sentido anti-horário.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelaResultadosMalha;
