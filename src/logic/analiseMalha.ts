import { lusolve, det, matrix, MathType } from 'mathjs';

/**
 * Interface para o resultado da análise de malhas
 */
export interface ResultadoAnalise {
  sucesso: boolean;
  correntes: number[];
  erro?: string;
  detalhes?: {
    determinante: number;
    matrizR: number[][];
    vetorV: number[];
  };
}

/**
 * Tipos de erro possíveis na análise
 */
export enum TipoErro {
  MATRIZ_SINGULAR = 'MATRIZ_SINGULAR',
  DIMENSOES_INCOMPATIVEIS = 'DIMENSOES_INCOMPATIVEIS',
  VALORES_INVALIDOS = 'VALORES_INVALIDOS',
  ERRO_NUMERICO = 'ERRO_NUMERICO',
}

/**
 * Mensagens de erro amigáveis para o usuário
 */
const MENSAGENS_ERRO: Record<TipoErro, string> = {
  [TipoErro.MATRIZ_SINGULAR]: 
    'Sistema sem solução única. A matriz de resistências é singular (determinante = 0). Verifique se há malhas isoladas ou valores incorretos.',
  [TipoErro.DIMENSOES_INCOMPATIVEIS]: 
    'As dimensões da matriz de resistências e do vetor de tensões são incompatíveis.',
  [TipoErro.VALORES_INVALIDOS]: 
    'Existem valores inválidos nos dados de entrada. Verifique se todos os campos estão preenchidos corretamente.',
  [TipoErro.ERRO_NUMERICO]: 
    'Erro ao realizar os cálculos. Verifique os valores inseridos e tente novamente.',
};

/**
 * Valida os dados de entrada antes de realizar cálculos
 */
function validarEntrada(matrizR: number[][], vetorV: number[]): void {
  // Verifica se a matriz é quadrada
  const n = matrizR.length;
  if (n === 0) {
    throw new Error(TipoErro.DIMENSOES_INCOMPATIVEIS);
  }

  for (const linha of matrizR) {
    if (linha.length !== n) {
      throw new Error(TipoErro.DIMENSOES_INCOMPATIVEIS);
    }
  }

  // Verifica se o vetor V tem a mesma dimensão
  if (vetorV.length !== n) {
    throw new Error(TipoErro.DIMENSOES_INCOMPATIVEIS);
  }

  // Verifica se há valores NaN ou Infinity
  const todosValoresValidos = matrizR.every(linha =>
    linha.every(valor => isFinite(valor))
  ) && vetorV.every(valor => isFinite(valor));

  if (!todosValoresValidos) {
    throw new Error(TipoErro.VALORES_INVALIDOS);
  }
}

/**
 * Calcula o determinante da matriz de resistências
 */
function calcularDeterminante(matrizR: number[][]): number {
  try {
    const matrizMath = matrix(matrizR);
    return det(matrizMath) as number;
  } catch (error) {
    throw new Error(TipoErro.ERRO_NUMERICO);
  }
}

/**
 * Resolve o sistema linear R·I = V usando decomposição LU
 * 
 * @param matrizR - Matriz de resistências (n×n)
 * @param vetorV - Vetor de tensões (n×1)
 * @returns Vetor de correntes de malha
 */
function resolverSistemaLinear(matrizR: number[][], vetorV: number[]): number[] {
  try {
    // math.js espera vetorV como matriz coluna (n×1)
    const vetorVColuna = vetorV.map(v => [v]);
    
    // Resolve usando decomposição LU (mais estável numericamente)
    const solucao = lusolve(matrizR, vetorVColuna) as MathType;
    
    // Converte resultado de matriz para array
    const correntes = (solucao as number[][]).map(linha => linha[0]);
    
    return correntes;
  } catch (error) {
    throw new Error(TipoErro.ERRO_NUMERICO);
  }
}

/**
 * Função principal: Calcula as correntes de malha usando Análise de Malhas
 * 
 * @param matrizR - Matriz de resistências (Ω)
 * @param vetorV - Vetor de tensões (V)
 * @returns Resultado da análise com correntes ou mensagem de erro
 * 
 * @example
 * ```
 * const R = [
 *   [10, -5, 0],
 *   [-5, 15, -8],
 *   [0, -8, 12]
 * ];
 * const V = ;
 * 
 * const resultado = calcularCorrentesMalha(R, V);
 * if (resultado.sucesso) {
 *   console.log('Correntes:', resultado.correntes);
 * } else {
 *   console.error('Erro:', resultado.erro);
 * }
 * ```
 */
export function calcularCorrentesMalha(
  matrizR: number[][],
  vetorV: number[]
): ResultadoAnalise {
  try {
    // Validação de entrada
    validarEntrada(matrizR, vetorV);

    // Calcula determinante para verificar se a matriz é singular
    const determinante = calcularDeterminante(matrizR);
    
    // Tolerância numérica para determinante próximo de zero
    const TOLERANCIA = 1e-10;
    if (Math.abs(determinante) < TOLERANCIA) {
      return {
        sucesso: false,
        correntes: [],
        erro: MENSAGENS_ERRO[TipoErro.MATRIZ_SINGULAR],
        detalhes: {
          determinante,
          matrizR,
          vetorV,
        },
      };
    }

    // Resolve o sistema linear
    const correntes = resolverSistemaLinear(matrizR, vetorV);

    // Retorna resultado bem-sucedido
    return {
      sucesso: true,
      correntes,
      detalhes: {
        determinante,
        matrizR,
        vetorV,
      },
    };

  } catch (error) {
    // Tratamento de erros
    const tipoErro = error instanceof Error ? error.message : TipoErro.ERRO_NUMERICO;
    const mensagemErro = MENSAGENS_ERRO[tipoErro as TipoErro] || MENSAGENS_ERRO[TipoErro.ERRO_NUMERICO];

    return {
      sucesso: false,
      correntes: [],
      erro: mensagemErro,
    };
  }
}

/**
 * Valida se uma matriz é simétrica (útil para circuitos passivos)
 */
export function validarSimetria(matriz: number[][]): boolean {
  const n = matriz.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matriz[i][j] - matriz[j][i]) > 1e-10) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Formata valores de corrente para exibição
 */
export function formatarCorrente(corrente: number): string {
  if (Math.abs(corrente) < 1e-10) {
    return '0.000';
  }
  return corrente.toFixed(3);
}

/**
 * Converte corrente de Ampères para miliampères
 */
export function converterParaMiliamperes(corrente: number): number {
  return corrente * 1000;
}
