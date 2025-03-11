import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="flex-1 flex flex-col items-center justify-center p-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586769852044-692d6e3703f2?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/90 p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-4">Gestion de Courrier</h1>
          <p className="text-lg mb-6">
            Bienvenue dans notre application de gestion de courrier. Gérez
            facilement vos courriers entrants et sortants avec notre interface
            intuitive.
          </p>
          <Button asChild size="lg">
            <Link to="/mail" className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Accéder à la gestion de courrier
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
