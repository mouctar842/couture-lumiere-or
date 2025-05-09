
import { ClientType } from '@/types/client';

// Simuler une base de données avec localStorage
const STORAGE_KEY = 'couture_clients';

// Charger les clients depuis localStorage
const loadClients = (): ClientType[] => {
  const clientsJson = localStorage.getItem(STORAGE_KEY);
  if (!clientsJson) return [];
  return JSON.parse(clientsJson);
};

// Sauvegarder les clients dans localStorage
const saveClients = (clients: ClientType[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

// Obtenir tous les clients
export const getAllClients = (): ClientType[] => {
  return loadClients();
};

// Obtenir un client par ID
export const getClientById = (id: string): ClientType | undefined => {
  const clients = loadClients();
  return clients.find(client => client.id === id);
};

// Ajouter un nouveau client
export const addClient = (client: Omit<ClientType, 'id'>): ClientType => {
  const clients = loadClients();
  const newClient = {
    ...client,
    id: Date.now().toString(),
  };
  clients.push(newClient);
  saveClients(clients);
  return newClient;
};

// Mettre à jour un client existant
export const updateClient = (id: string, clientData: Partial<ClientType>): ClientType | null => {
  const clients = loadClients();
  const index = clients.findIndex(c => c.id === id);
  
  if (index === -1) return null;
  
  const updatedClient = { ...clients[index], ...clientData };
  clients[index] = updatedClient;
  saveClients(clients);
  return updatedClient;
};

// Supprimer un client
export const deleteClient = (id: string): boolean => {
  const clients = loadClients();
  const filteredClients = clients.filter(client => client.id !== id);
  
  if (filteredClients.length === clients.length) {
    return false;
  }
  
  saveClients(filteredClients);
  return true;
};

// Archiver un client
export const archiveClient = (id: string): ClientType | null => {
  return updateClient(id, { archived: true });
};

// Désarchiver un client
export const unarchiveClient = (id: string): ClientType | null => {
  return updateClient(id, { archived: false });
};

// Marquer un client comme livré
export const markAsDelivered = (id: string): ClientType | null => {
  return updateClient(id, { delivered: true });
};

// Générer des données de test
export const generateSampleClients = (): void => {
  const sampleClients: ClientType[] = [
    {
      id: '1',
      name: 'Marie Diop',
      phone: '77 123 45 67',
      description: 'Robe de soirée bleu marine',
      measurements: 'Tour de poitrine: 92cm, Tour de taille: 75cm, Tour de hanches: 98cm',
      price: 25000,
      fabricPhoto: 'https://images.unsplash.com/photo-1578140225210-49da25cdf9d6?q=80&w=300&auto=format&fit=crop',
      date: new Date('2023-10-15').toISOString(),
      delivered: false,
      archived: false
    },
    {
      id: '2',
      name: 'Amadou Ndiaye',
      phone: '76 987 65 43',
      description: 'Costume trois pièces gris',
      measurements: 'Épaules: 45cm, Tour de poitrine: 102cm, Tour de taille: 88cm',
      price: 45000,
      date: new Date('2023-09-29').toISOString(),
      delivered: true,
      archived: false
    },
    {
      id: '3',
      name: 'Fatou Sall',
      phone: '70 111 22 33',
      description: 'Ensemble pagne traditionnel',
      measurements: 'Tour de poitrine: 88cm, Tour de taille: 70cm, Tour de hanches: 94cm',
      price: 18000,
      fabricPhoto: 'https://images.unsplash.com/photo-1611043714658-af3e56bc5299?q=80&w=300&auto=format&fit=crop',
      date: new Date('2023-11-05').toISOString(),
      delivered: false,
      archived: false
    },
    {
      id: '4',
      name: 'Omar Seck',
      phone: '78 444 55 66',
      description: 'Chemise sur mesure en lin blanc',
      measurements: 'Cou: 39cm, Épaules: 44cm, Poitrine: 98cm, Longueur des manches: 65cm',
      price: 15000,
      date: new Date('2023-08-20').toISOString(),
      delivered: true,
      archived: true
    }
  ];
  
  if (loadClients().length === 0) {
    saveClients(sampleClients);
  }
};
