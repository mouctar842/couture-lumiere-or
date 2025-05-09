
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSampleClients, getAllClients } from '@/services/clientService';
import { Scissors, Users, Archive, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  useEffect(() => {
    // Générer des clients de test lors du premier démarrage de l'application
    generateSampleClients();
  }, []);

  const clients = getAllClients();
  const totalClients = clients.length;
  const activeClients = clients.filter(c => !c.delivered && !c.archived).length;
  const deliveredClients = clients.filter(c => c.delivered).length;
  const archivedClients = clients.filter(c => c.archived).length;

  const stats = [
    {
      title: 'Clients Total',
      value: totalClients,
      icon: <Users className="h-5 w-5 text-gold" />,
      color: 'bg-gold-light/10'
    },
    {
      title: 'Commandes Actives',
      value: activeClients,
      icon: <Scissors className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Commandes Livrées',
      value: deliveredClients,
      icon: <Check className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'Clients Archivés',
      value: archivedClients,
      icon: <Archive className="h-5 w-5 text-orange-600" />,
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <section className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 gold-text">
            Couture Lumière Or
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Gérez vos clients, suivez vos commandes et organisez votre atelier de couture efficacement
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="gold-gradient hover:opacity-90 text-white">
              <Link to="/clients">Voir tous les clients</Link>
            </Button>
            <Button asChild variant="outline" className="border-gold/30 hover:text-gold hover:border-gold">
              <Link to="/clients/new">Ajouter un client</Link>
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-playfair font-semibold mb-6">Aperçu de votre atelier</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className={`flex items-center p-6 ${stat.color} rounded-lg`}>
                  <div className="mr-4">{stat.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="font-playfair">Commandes actives</CardTitle>
              <CardDescription>Gérez les commandes en cours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Suivez les commandes en attente de livraison et gérez les détails des clients.</p>
              <Button asChild variant="outline" className="w-full border-gold/30 hover:text-gold hover:border-gold">
                <Link to="/clients">Voir toutes les commandes</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="font-playfair">Archives</CardTitle>
              <CardDescription>Accédez aux clients et commandes archivés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Retrouvez facilement les clients archivés et restaurez-les si nécessaire.</p>
              <Button asChild variant="outline" className="w-full border-gold/30 hover:text-gold hover:border-gold">
                <Link to="/archives">Voir les archives</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <footer className="py-6 border-t border-gold/10 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Couture Lumière Or - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
