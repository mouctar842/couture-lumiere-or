
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAllClients, archiveClient, markAsDelivered } from '@/services/clientService';
import ClientCard from '@/components/ClientCard';
import SearchFilter from '@/components/SearchFilter';
import Navbar from '@/components/layout/Navbar';
import { ClientType } from '@/types/client';
import { Plus } from 'lucide-react';

const ClientsPage = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    const allClients = getAllClients();
    setClients(allClients);
    applyFilters(allClients, searchTerm, filter);
  };

  const applyFilters = (clientList: ClientType[], search: string, filterType: string) => {
    let filtered = clientList;
    
    // Filter by status
    if (filterType === 'active') {
      filtered = filtered.filter(client => !client.delivered && !client.archived);
    } else if (filterType === 'delivered') {
      filtered = filtered.filter(client => client.delivered && !client.archived);
    }
    
    // Apply search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(searchLower) || 
        client.phone.toLowerCase().includes(searchLower) ||
        client.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter out archived clients
    filtered = filtered.filter(client => !client.archived);
    
    setFilteredClients(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(clients, term, filter);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    applyFilters(clients, searchTerm, newFilter);
  };

  const handleArchive = (id: string) => {
    archiveClient(id);
    loadClients();
  };

  const handleMarkDelivered = (id: string) => {
    markAsDelivered(id);
    loadClients();
  };

  const filterOptions = [
    { label: 'Tous', value: 'all' },
    { label: 'En cours', value: 'active' },
    { label: 'Livrés', value: 'delivered' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-playfair font-semibold gold-text">Clients</h1>
          <Button asChild className="gold-gradient hover:opacity-90 text-white">
            <Link to="/clients/new">
              <Plus className="mr-1 h-4 w-4" />
              Nouveau Client
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <SearchFilter 
            onSearch={handleSearch} 
            onFilterChange={handleFilterChange} 
            filters={filterOptions} 
            activeFilter={filter}
          />
        </div>
        
        {filteredClients.length === 0 && (
          <div className="text-center py-20">
            <h3 className="font-playfair text-xl mb-2">Aucun client trouvé</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Aucun résultat ne correspond à votre recherche." : "Ajoutez votre premier client pour commencer."}
            </p>
            <Button asChild className="gold-gradient hover:opacity-90 text-white">
              <Link to="/clients/new">Ajouter un client</Link>
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <ClientCard 
              key={client.id} 
              client={client} 
              onArchive={handleArchive}
              onMarkDelivered={handleMarkDelivered}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClientsPage;
