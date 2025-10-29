//test de visualizacion inicial de menu
// es test unitario o de integracion?

import { render, screen } from '@testing-library/react';
import Menu from '../components/Menu';

describe('Menu', () => {
  it('debe mostrar los productos del menú', async () => {
    render(<Menu />);
    
    // Espera que aparezca un producto mockeado
    expect(await screen.findByText(/Café con chocolate/i)).toBeInTheDocument();

    // Verifica que todos los ítems se renderizan
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });
});