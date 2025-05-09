
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
            <Scissors className="h-8 w-8 text-gold" />
          </div>
        </div>
        <h1 className="text-4xl font-playfair font-bold mb-4 gold-text">404</h1>
        <h2 className="text-2xl font-playfair mb-2">Page non trouvée</h2>
        <p className="text-muted-foreground mb-6">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="gold-gradient hover:opacity-90 text-white">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
