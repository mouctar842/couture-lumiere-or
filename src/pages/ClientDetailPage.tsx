
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { getClientById, deleteClient, archiveClient, unarchiveClient, markAsDelivered } from '@/services/clientService';
import Navbar from '@/components/layout/Navbar';
import { ClientType } from '@/types/client';
import { ArrowLeft, Edit, Trash, Archive, Check, ArchiveRestore } from 'lucide-react';

const ClientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [client, setClient] = useState<ClientType | null>(null);

  useEffect(() => {
    if (id) {
      const clientData = getClientById(id);
      if (clientData) {
        setClient(clientData);
      } else {
        toast({
          variant: "destructive",
          description: "Client non trouvé",
        });
        navigate('/clients');
      }
    }
  }, [id, navigate, toast]);

  const handleDelete = () => {
    if (id && window.confirm('Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible.')) {
      const deleted = deleteClient(id);
      if (deleted) {
        toast({
          description: "Client supprimé avec succès",
        });
        navigate('/clients');
      }
    }
  };

  const handleArchive = () => {
    if (id) {
      const updated = archiveClient(id);
      if (updated) {
        setClient(updated);
        toast({
          description: "Client archivé",
        });
      }
    }
  };

  const handleUnarchive = () => {
    if (id) {
      const updated = unarchiveClient(id);
      if (updated) {
        setClient(updated);
        toast({
          description: "Client désarchivé",
        });
      }
    }
  };

  const handleMarkDelivered = () => {
    if (id) {
      const updated = markAsDelivered(id);
      if (updated) {
        setClient(updated);
        toast({
          description: "Client marqué comme livré",
        });
      }
    }
  };

  if (!client) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">
          Chargement...
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-playfair font-semibold gold-text">{client.name}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-playfair">{client.name}</h2>
                    <p className="text-muted-foreground">{client.phone}</p>
                  </div>
                  <div>
                    {client.delivered ? (
                      <Badge className="gold-gradient text-white">
                        <Check className="h-3 w-3 mr-1" />
                        Livré
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gold/30 text-gold">
                        En cours
                      </Badge>
                    )}
                    
                    {client.archived && (
                      <Badge variant="outline" className="ml-2 border-orange-300 text-orange-600">
                        Archivé
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="bg-muted/30 p-4 rounded-md">{client.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Mesures</h3>
                  <p className="bg-muted/30 p-4 rounded-md whitespace-pre-line">{client.measurements}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Prix</h3>
                    <p className="text-xl font-semibold">{client.price.toLocaleString()} FCFA</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
                    <p>{formatDate(client.date)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-wrap gap-3 justify-end">
              <Button asChild variant="outline" className="border-gold/30 hover:border-gold hover:text-gold">
                <Link to={`/clients/edit/${client.id}`}>
                  <Edit className="h-4 w-4 mr-2" /> 
                  Modifier
                </Link>
              </Button>
              
              {!client.delivered && !client.archived && (
                <Button 
                  onClick={handleMarkDelivered} 
                  variant="outline" 
                  className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                >
                  <Check className="h-4 w-4 mr-2" /> 
                  Marquer comme livré
                </Button>
              )}
              
              {client.archived ? (
                <Button onClick={handleUnarchive} variant="outline" className="border-gold/30 hover:border-gold hover:text-gold">
                  <ArchiveRestore className="h-4 w-4 mr-2" />
                  Désarchiver
                </Button>
              ) : (
                <Button onClick={handleArchive} variant="outline" className="border-gold/30 hover:border-gold hover:text-gold">
                  <Archive className="h-4 w-4 mr-2" />
                  Archiver
                </Button>
              )}
              
              <Button onClick={handleDelete} variant="destructive">
                <Trash className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
          
          <div>
            {client.fabricPhoto && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-playfair font-medium mb-3">Photo du tissu</h3>
                  <div className="rounded-md overflow-hidden border border-border">
                    <img
                      src={client.fabricPhoto}
                      alt="Tissu"
                      className="w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDetailPage;
