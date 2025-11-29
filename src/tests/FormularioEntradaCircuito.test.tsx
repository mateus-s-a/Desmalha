import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioEntradaCircuito from '../components/FormularioEntradaCircuito';

describe('FormularioEntradaCircuito', () => {
  
  it('deve renderizar o formulário corretamente', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    expect(screen.getByText(/Dados do Circuito/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de Malhas/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calcular Correntes/i })).toBeInTheDocument();
  });

  it('deve permitir alterar o número de malhas', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    fireEvent.change(inputMalhas, { target: { value: '2' } });
    
    expect(inputMalhas.value).toBe('2');
  });

  it('deve chamar onCalcular com dados corretos ao submeter', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const botaoCalcular = screen.getByRole('button', { name: /Calcular Correntes/i });
    fireEvent.click(botaoCalcular);
    
    expect(mockOnCalcular).toHaveBeenCalledTimes(1);
    expect(mockOnCalcular).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Array),
      expect.any(Array)
    );
  });

  it('deve limpar campos ao clicar em Limpar', () => {
    const mockOnCalcular = vi.fn();
    const mockOnLimpar = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} onLimpar={mockOnLimpar} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    fireEvent.change(inputMalhas, { target: { value: '5' } });
    
    const botaoLimpar = screen.getByRole('button', { name: /Limpar/i });
    fireEvent.click(botaoLimpar);
    
    expect(inputMalhas.value).toBe('3');
    expect(mockOnLimpar).toHaveBeenCalledTimes(1);
  });

  it('deve validar número mínimo e máximo de malhas', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    
    expect(inputMalhas.getAttribute('min')).toBe('1');
    expect(inputMalhas.getAttribute('max')).toBe('10');
  });

  // NOVOS TESTES PARA MELHORAR COVERAGE

  it('deve ignorar valores abaixo de 1 ao alterar número de malhas', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    const valorInicial = inputMalhas.value;
    
    // Tenta definir valor abaixo do mínimo (cobre linhas 38-40)
    fireEvent.change(inputMalhas, { target: { value: '0' } });
    
    // O valor não deve mudar (função retorna sem fazer nada)
    expect(inputMalhas.value).toBe(valorInicial);
  });

  it('deve ignorar valores acima de 10 ao alterar número de malhas', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    const valorInicial = inputMalhas.value;
    
    // Tenta definir valor acima do máximo (cobre linhas 38-40)
    fireEvent.change(inputMalhas, { target: { value: '11' } });
    
    // O valor não deve mudar
    expect(inputMalhas.value).toBe(valorInicial);
  });

  it('deve atualizar valores na matriz de resistências', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    // Pega todos os inputs da matriz
    const inputsMatriz = screen.getAllByPlaceholderText(/^R\d\d$/);
    
    // Altera o primeiro valor (cobre handleMatrizChange - linhas 45-47)
    fireEvent.change(inputsMatriz[0], { target: { value: '20' } });
    
    expect(inputsMatriz[0]).toHaveValue(20);
  });

  it('deve atualizar valores no vetor de tensões', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    // Pega input do vetor V
    const inputV1 = screen.getByLabelText(/V1/i) as HTMLInputElement;
    
    // Altera valor (cobre handleVetorChange)
    fireEvent.change(inputV1, { target: { value: '50' } });
    
    expect(inputV1.value).toBe('50');
  });

  it('deve tratar valores não numéricos como 0 na matriz', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputsMatriz = screen.getAllByPlaceholderText(/^R\d\d$/);
    
    // Tenta inserir texto (será parseado como NaN e convertido para 0)
    fireEvent.change(inputsMatriz[0], { target: { value: 'abc' } });
    
    // Deve ser tratado como 0
    expect(inputsMatriz[0]).toHaveValue(0);
  });

  it('deve funcionar sem callback onLimpar (opcional)', () => {
    const mockOnCalcular = vi.fn();
    // Renderiza sem onLimpar (cobre linha 124)
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const botaoLimpar = screen.getByRole('button', { name: /Limpar/i });
    
    // Não deve gerar erro mesmo sem callback
    expect(() => fireEvent.click(botaoLimpar)).not.toThrow();
  });

  it('deve ajustar tamanho do grid ao mudar número de malhas para 1', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i);
    
    // Muda para 1 malha
    fireEvent.change(inputMalhas, { target: { value: '1' } });
    
    // Deve ter apenas 1 campo na matriz (cobre criação de matriz 1x1)
    const inputsMatriz = screen.getAllByPlaceholderText(/^R\d\d$/);
    expect(inputsMatriz).toHaveLength(1);
  });

  it('deve ajustar tamanho do grid ao mudar número de malhas para 5', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i);
    
    // Muda para 5 malhas
    fireEvent.change(inputMalhas, { target: { value: '5' } });
    
    // Deve ter 25 campos na matriz (5x5)
    const inputsMatriz = screen.getAllByPlaceholderText(/^R\d\d$/);
    expect(inputsMatriz).toHaveLength(25);
  });

});
