import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Home, Plus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
          <Button asChild variant="ghost">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Accueil
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/mail" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Gestion de courrier
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/mail/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau courrier
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
