import { OrderProvider } from './context/OrderContext';
import Menu from './components/Menu';
import Order from './components/Order';

export default function App() {
  return (
    <OrderProvider>
      <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
        <h1> Menú de la Cafetería</h1>
        <div style={{ display: 'flex', gap: 24 }}>
          <main style={{ flex: 1 }}>
            <Menu />
          </main>
          <aside style={{ width: 320 }}>
            <Order />
          </aside>
        </div>
      </div>
    </OrderProvider>
  );
}