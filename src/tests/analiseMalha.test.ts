import { describe, it, expect } from 'vitest';
import { calcularCorrentesMalha, validarSimetria, formatarCorrente } from '../logic/analiseMalha';

describe('Análise de Malhas - Testes Unitários', () => {
  
  describe('calcularCorrentesMalha', () => {
    
    it('deve calcular correntes corretamente para sistema simples 2x2', () => {
      const matrizR = [
        [10, -5],
        [-5, 10]
      ];
      const vetorV = [10, 5];
      
      const resultado = calcularCorrentesMalha(matrizR, vetorV);
      
      expect(resultado.sucesso).toBe(true);
      expect(resultado.correntes).toHaveLength(2);
      // Valores esperados calculados manualmente
      expect(resultado.correntes[0]).toBeCloseTo(1.667, 2);
      expect(resultado.correntes[1]).toBeCloseTo(1.333, 2);
    });

    it('deve calcular correntes corretamente para sistema 3x3', () => {
      const matrizR = [
        [10, -5, 0],
        [-5, 15, -8],
        [0, -8, 12]
      ];
      const vetorV = [20, 0, 15];
      
      const resultado = calcularCorrentesMalha(matrizR, vetorV);
      
      expect(resultado.sucesso).toBe(true);
      expect(resultado.correntes).toHaveLength(3);
      expect(resultado.correntes[0]).toBeGreaterThan(0);
      expect(resultado.correntes[1]).toBeGreaterThan(0);
      expect(resultado.correntes[2]).toBeGreaterThan(0);
    });

    it('deve detectar matriz singular (determinante = 0)', () => {
      const matrizR = [
        [1, 2],
        [2, 4]  // Linha 2 é múltiplo da linha 1
      ];
      const vetorV = [3, 6];
      
      const resultado = calcularCorrentesMalha(matrizR, vetorV);
      
      expect(resultado.sucesso).toBe(false);
      expect(resultado.erro).toContain('singular');
    });

    it('deve detectar dimensões incompatíveis', () => {
      const matrizR = [
        [10, -5],
        [-5, 10]
      ];
      const vetorV = [10];  // Vetor com tamanho errado
      
      const resultado = calcularCorrentesMalha(matrizR, vetorV);
      
      expect(resultado.sucesso).toBe(false);
      expect(resultado.erro).toContain('dimensões');
    });

    it('deve detectar valores inválidos (NaN)', () => {
      const matrizR = [
        [NaN, -5],
        [-5, 10]
      ];
      const vetorV = [10, 5];
      
      const resultado = calcularCorrentesMalha(matrizR, vetorV);
      
      expect(resultado.sucesso).toBe(false);
      expect(resultado.erro).toContain('inválidos');
    });

    it('deve calcular determinante corretamente', () => {
      const matrizR = [
        [10, -5],
        [-5, 10]
      ];
      const vetorV = [10, 5];
      
      const resultado = calcularCorrentesMalha(matrizR, vetorV);
      
      expect(resultado.detalhes?.determinante).toBeCloseTo(75, 1);
    });

  });

  describe('validarSimetria', () => {
    
    it('deve retornar true para matriz simétrica', () => {
      const matriz = [
        [10, -5, 0],
        [-5, 15, -8],
        [0, -8, 12]
      ];
      
      expect(validarSimetria(matriz)).toBe(true);
    });

    it('deve retornar false para matriz não simétrica', () => {
      const matriz = [
        [10, -5, 1],
        [-5, 15, -8],
        [0, -8, 12]
      ];
      
      expect(validarSimetria(matriz)).toBe(false);
    });

  });

  describe('formatarCorrente', () => {
    
    it('deve formatar correntes positivas corretamente', () => {
      expect(formatarCorrente(1.234567)).toBe('1.235');
      expect(formatarCorrente(10.5)).toBe('10.500');
    });

    it('deve formatar correntes negativas corretamente', () => {
      expect(formatarCorrente(-2.345678)).toBe('-2.346');
    });

    it('deve formatar valores muito pequenos como zero', () => {
      expect(formatarCorrente(0.0000000001)).toBe('0.000');
    });

  });

});
