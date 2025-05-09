
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Scissors className="h-6 w-6 text-gold" />
              <span className="ml-2 text-xl font-playfair font-semibold gold-text">Couture Lumière</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium hover:text-gold transition-colors">
              Accueil
            </Link>
            <Link to="/clients" className="px-3 py-2 text-sm font-medium hover:text-gold transition-colors">
              Clients
            </Link>
            <Link to="/archives" className="px-3 py-2 text-sm font-medium hover:text-gold transition-colors">
              Archives
            </Link>
            <Button className="gold-gradient hover:opacity-90 text-white">
              Nouveau Client
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-md text-gray-700 hover:text-gold focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gold/10">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/clients" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Clients
            </Link>
            <Link 
              to="/archives" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Archives
            </Link>
            <div className="px-3 py-2">
              <Button 
                className="gold-gradient w-full hover:opacity-90 text-white"
                onClick={() => setIsOpen(false)}
              >
                Nouveau Client
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
