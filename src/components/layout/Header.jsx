import { HeartHandshake } from "lucide-react"; // Icono de lucide-react
import '/src/main.css'; // Estilos globales

const Header = () => {
  return (
    // Header con fondo degradado azul a teal, texto blanco, padding vertical y sombra
    <header className="bg-gradient-to-r from-blue-700 to-teal-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo + título y subtítulo */}
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-8 h-8 text-white" />
          <div>
            <h1 className="text-2xl font-bold">DevLunteer</h1>
            <p className="text-sm text-white/80">Inspiring futures, connecting talent</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

