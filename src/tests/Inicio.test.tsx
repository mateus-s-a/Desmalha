import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Inicio from '../pages/Inicio';

describe('Página Inicio', () => {
  
  it('deve renderizar a página corretamente', () => {
    render(<Inicio />);
    
    expect(screen.getByText(/Calculadora de Análise de Malhas/i)).toBeInTheDocument();
    // Usa getAllByText para lidar com múltiplas ocorrências
    const elementosDados = screen.getAllByText(/Dados do Circuito/i);
    expect(elementosDados.length).toBeGreaterThan(0);
  });

  it('deve exibir mensagem de erro quando cálculo falha', async () => {
    render(<Inicio />);
    
    // Altera para matriz singular
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i);
    fireEvent.change(inputMalhas, { target: { value: '2' } });
    
    await waitFor(() => {
      const inputs = screen.getAllByPlaceholderText(/^R\d\d$/);
      expect(inputs).toHaveLength(4);
    });
    
    // Define matriz singular [1,2], [2,4]
    const inputs = screen.getAllByPlaceholderText(/^R\d\d$/);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '2' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });
    
    const botaoCalcular = screen.getByRole('button', { name: /Calcular Correntes/i });
    fireEvent.click(botaoCalcular);
    
    // Aguarda mensagem de erro aparecer
    await waitFor(() => {
      expect(screen.getByText(/Erro no Cálculo/i)).toBeInTheDocument();
      expect(screen.getByText(/singular/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('deve limpar erro ao fazer novo cálculo bem-sucedido', async () => {
    render(<Inicio />);
    
    // Primeiro cálculo com erro (matriz singular)
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i);
    fireEvent.change(inputMalhas, { target: { value: '2' } });
    
    await waitFor(() => {
      const inputs = screen.getAllByPlaceholderText(/^R\d\d$/);
      expect(inputs).toHaveLength(4);
    });
    
    const inputs = screen.getAllByPlaceholderText(/^R\d\d$/);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '2' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });
    
    const botaoCalcular = screen.getByRole('button', { name: /Calcular Correntes/i });
    fireEvent.click(botaoCalcular);
    
    await waitFor(() => {
      expect(screen.getByText(/Erro no Cálculo/i)).toBeInTheDocument();
    });
    
    // Corrige para matriz válida
    fireEvent.change(inputs[0], { target: { value: '10' } });
    fireEvent.change(inputs[1], { target: { value: '-5' } });
    fireEvent.change(inputs[2], { target: { value: '-5' } });
    fireEvent.change(inputs[3], { target: { value: '10' } });
    
    fireEvent.click(botaoCalcular);
    
    // Erro deve desaparecer
    await waitFor(() => {
      expect(screen.queryByText(/Erro no Cálculo/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Correntes Calculadas/i)).toBeInTheDocument();
    });
  });

});
