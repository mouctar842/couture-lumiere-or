
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getClientById, updateClient } from '@/services/clientService';
import Navbar from '@/components/layout/Navbar';
import ClientForm from '@/components/ClientForm';
import { useToast } from '@/hooks/use-toast';
import { ClientType } from '@/types/client';
import { ArrowLeft } from 'lucide-react';

const EditClientPage = () => {
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

  const handleSaveClient = (clientData: any) => {
    if (id) {
      updateClient(id, clientData);
      navigate(`/clients/${id}`);
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

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-playfair font-semibold gold-text">Modifier le Client</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ClientForm onSave={handleSaveClient} initialData={client} buttonText="Enregistrer les modifications" />
        </div>
      </main>
    </div>
  );
};

export default EditClientPage;
