
import { useState, useEffect } from 'react';
import { getAllClients, unarchiveClient } from '@/services/clientService';
import ClientCard from '@/components/ClientCard';
import SearchFilter from '@/components/SearchFilter';
import Navbar from '@/components/layout/Navbar';
import { ClientType } from '@/types/client';

const ArchivesPage = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadArchivedClients();
  }, []);

  const loadArchivedClients = () => {
    const allClients = getAllClients().filter(client => client.archived);
    setClients(allClients);
    applyFilters(allClients, searchTerm, filter);
  };

  const applyFilters = (clientList: ClientType[], search: string, filterType: string) => {
    let filtered = clientList;
    
    // Filter by status
    if (filterType === 'delivered') {
      filtered = filtered.filter(client => client.delivered);
    } else if (filterType === 'pending') {
      filtered = filtered.filter(client => !client.delivered);
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

  const handleUnarchive = (id: string) => {
    unarchiveClient(id);
    loadArchivedClients();
  };

  const filterOptions = [
    { label: 'Tous', value: 'all' },
    { label: 'Livrés', value: 'delivered' },
    { label: 'Non livrés', value: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-playfair font-semibold gold-text">Archives</h1>
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
            <h3 className="font-playfair text-xl mb-2">Aucun client archivé</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Aucun résultat ne correspond à votre recherche." : "Les clients archivés apparaîtront ici."}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map(client => (
            <ClientCard 
              key={client.id} 
              client={client} 
              onUnarchive={handleUnarchive}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArchivesPage;
