import Navbar from './components/Navbar';
import Rodape from './components/Rodape';
import Inicio from './pages/Inicio';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Inicio />
      <Rodape />
    </div>
  );
}

export default App;
