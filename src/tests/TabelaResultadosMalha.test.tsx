import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TabelaResultadosMalha from '../components/TabelaResultadosMalha';

describe('TabelaResultadosMalha', () => {
  
  it('deve mostrar mensagem quando não há resultados', () => {
    render(<TabelaResultadosMalha resultados={null} calculando={false} />);
    
    expect(screen.getByText(/Nenhum Resultado/i)).toBeInTheDocument();
  });

  it('deve mostrar loading quando calculando', () => {
    render(<TabelaResultadosMalha resultados={null} calculando={true} />);
    
    expect(screen.getByText(/Calculando correntes de malha/i)).toBeInTheDocument();
  });

  it('deve exibir resultados corretamente', () => {
    const resultados = [1.234, 2.345, 3.456];
    render(<TabelaResultadosMalha resultados={resultados} calculando={false} />);
    
    expect(screen.getByText('1.234')).toBeInTheDocument();
    expect(screen.getByText('2.345')).toBeInTheDocument();
    expect(screen.getByText('3.456')).toBeInTheDocument();
  });

  it('deve exibir valores em miliampères', () => {
    const resultados = [1.5];
    render(<TabelaResultadosMalha resultados={resultados} calculando={false} />);
    
    expect(screen.getByText('1500.00')).toBeInTheDocument(); // 1.5 A = 1500 mA
  });

  it('deve renderizar tabela com número correto de linhas', () => {
    const resultados = [1.0, 2.0, 3.0];
    render(<TabelaResultadosMalha resultados={resultados} calculando={false} />);
    
    const linhas = screen.getAllByRole('row');
    expect(linhas).toHaveLength(4); // Header + 3 resultados
  });

});
