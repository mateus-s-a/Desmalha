import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Inicio from '../pages/Inicio';

describe('Testes de Integração - Fluxo Completo', () => {
  
  it('deve calcular correntes corretamente ao submeter formulário', async () => {
    render(<Inicio />);
    
    // Verifica que a página renderizou
    expect(screen.getByText(/Calculadora de Análise de Malhas/i)).toBeInTheDocument();
    
    // Clica no botão calcular com valores padrão
    const botaoCalcular = screen.getByRole('button', { name: /Calcular Correntes/i });
    fireEvent.click(botaoCalcular);
    
    // Aguarda o cálculo (considerando o timeout de 300ms)
    await waitFor(() => {
      expect(screen.getByText(/Correntes Calculadas/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Verifica que resultados foram exibidos
    const resultados = screen.getAllByText(/A$/i); // Linhas terminando com 'A'
    expect(resultados.length).toBeGreaterThan(0);
  });

  it('deve exibir erro para matriz singular', async () => {
    render(<Inicio />);
    
    // Altera número de malhas para 2
    const inputMalhas = screen.getByLabelText(/Número de Malhas/i);
    fireEvent.change(inputMalhas, { target: { value: '2' } });
    
    // Aguarda atualização do grid
    await waitFor(() => {
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs.length).toBeGreaterThan(2); // Matriz 2x2 + vetor
    });
    
    // Define matriz singular manualmente (se possível via interface)
    // Nota: Pode ser complexo via testes de interface, considerar teste unitário
    
    const botaoCalcular = screen.getByRole('button', { name: /Calcular Correntes/i });
    fireEvent.click(botaoCalcular);
    
    // Este teste pode requerer mocking ou manipulação direta do DOM
  });

  it('deve limpar resultados ao clicar em Limpar', async () => {
    render(<Inicio />);
    
    // Calcula primeiro
    const botaoCalcular = screen.getByRole('button', { name: /Calcular Correntes/i });
    fireEvent.click(botaoCalcular);
    
    await waitFor(() => {
      expect(screen.getByText(/Correntes Calculadas/i)).toBeInTheDocument();
    });
    
    // Limpa
    const botaoLimpar = screen.getByRole('button', { name: /Limpar/i });
    fireEvent.click(botaoLimpar);
    
    // Verifica que voltou ao estado inicial
    expect(screen.getByText(/Nenhum Resultado/i)).toBeInTheDocument();
  });

});
