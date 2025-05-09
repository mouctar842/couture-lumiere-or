
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { addClient } from '@/services/clientService';
import Navbar from '@/components/layout/Navbar';
import ClientForm from '@/components/ClientForm';
import { ArrowLeft } from 'lucide-react';

const AddClientPage = () => {
  const navigate = useNavigate();

  const handleSaveClient = (clientData: any) => {
    const newClient = addClient(clientData);
    navigate(`/clients/${newClient.id}`);
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
          <h1 className="text-3xl font-playfair font-semibold gold-text">Nouveau Client</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ClientForm onSave={handleSaveClient} buttonText="Ajouter le client" />
        </div>
      </main>
    </div>
  );
};

export default AddClientPage;
