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
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    fireEvent.change(inputMalhas, { target: { value: '5' } });
    
    const botaoLimpar = screen.getByRole('button', { name: /Limpar/i });
    fireEvent.click(botaoLimpar);
    
    expect(inputMalhas.value).toBe('3'); // Valor padrão
  });

  it('deve validar número mínimo e máximo de malhas', () => {
    const mockOnCalcular = vi.fn();
    render(<FormularioEntradaCircuito onCalcular={mockOnCalcular} />);
    
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i) as HTMLInputElement;
    
    // Tenta definir valor abaixo do mínimo
    fireEvent.change(inputMalhas, { target: { value: '0' } });
    expect(parseInt(inputMalhas.value)).toBeGreaterThanOrEqual(1);
    
    // Tenta definir valor acima do máximo
    fireEvent.change(inputMalhas, { target: { value: '11' } });
    expect(parseInt(inputMalhas.value)).toBeLessThanOrEqual(10);
  });

});
