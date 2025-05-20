import { ClientType } from '@/types/client';

const API_URL = 'http://localhost:4000/api';

// Obtenir tous les clients
export const getAllClients = async (): Promise<ClientType[]> => {
  const response = await fetch(`${API_URL}/clients`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des clients');
  }
  return response.json();
};

// Obtenir un client par ID
export const getClientById = async (id: string): Promise<ClientType | undefined> => {
  const response = await fetch(`${API_URL}/clients/${id}`);
  if (!response.ok) {
    if (response.status === 404) return undefined;
    throw new Error('Erreur lors de la récupération du client');
  }
  return response.json();
};

// Ajouter un nouveau client
export const addClient = async (client: Omit<ClientType, 'id'>): Promise<ClientType> => {
  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout du client');
  }
  return response.json();
};

// Mettre à jour un client existant
export const updateClient = async (id: string, clientData: Partial<ClientType>): Promise<ClientType | null> => {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  });
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Erreur lors de la mise à jour du client');
  }
  return response.json();
};

// Supprimer un client
export const deleteClient = async (id: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    if (response.status === 404) return false;
    throw new Error('Erreur lors de la suppression du client');
  }
  return true;
};

// Archiver un client
export const archiveClient = async (id: string): Promise<ClientType | null> => {
  return updateClient(id, { archived: true });
};

// Désarchiver un client
export const unarchiveClient = async (id: string): Promise<ClientType | null> => {
  return updateClient(id, { archived: false });
};

// Marquer un client comme livré
export const markAsDelivered = async (id: string): Promise<ClientType | null> => {
  return updateClient(id, { delivered: true });
};

// Générer des données de test
export const generateSampleClients = async (): Promise<void> => {
  const sampleClients: Omit<ClientType, 'id'>[] = [
    {
      name: 'Marie Diop',
      phone: '77 123 45 67',
      description: 'Robe de soirée bleu marine',
      measurements: 'Tour de poitrine: 92cm, Tour de taille: 75cm, Tour de hanches: 98cm',
      specificMeasurements: {
        bust: 92,
        waist: 75,
        hips: 98,
      },
      price: 25000,
      fabricPhoto: 'https://images.unsplash.com/photo-1578140225210-49da25cdf9d6?q=80&w=300&auto=format&fit=crop',
      date: new Date('2023-10-15').toISOString(),
      delivered: false,
      archived: false
    },
    {
      name: 'Amadou Ndiaye',
      phone: '76 987 65 43',
      description: 'Costume trois pièces gris',
      measurements: 'Épaules: 45cm, Tour de poitrine: 102cm, Tour de taille: 88cm',
      specificMeasurements: {
        shoulderWidth: 45,
        bust: 102,
        waist: 88
      },
      price: 45000,
      date: new Date('2023-09-29').toISOString(),
      delivered: true,
      archived: false
    },
    {
      name: 'Fatou Sall',
      phone: '70 111 22 33',
      description: 'Ensemble pagne traditionnel',
      measurements: 'Tour de poitrine: 88cm, Tour de taille: 70cm, Tour de hanches: 94cm',
      specificMeasurements: {
        bust: 88,
        waist: 70,
        hips: 94
      },
      price: 18000,
      fabricPhoto: 'https://images.unsplash.com/photo-1611043714658-af3e56bc5299?q=80&w=300&auto=format&fit=crop',
      date: new Date('2023-11-05').toISOString(),
      delivered: false,
      archived: false
    },
    {
      name: 'Omar Seck',
      phone: '78 444 55 66',
      description: 'Chemise sur mesure en lin blanc',
      measurements: 'Cou: 39cm, Épaules: 44cm, Poitrine: 98cm, Longueur des manches: 65cm',
      specificMeasurements: {
        neck: 39,
        shoulderWidth: 44,
        bust: 98,
        armLength: 65
      },
      price: 15000,
      date: new Date('2023-08-20').toISOString(),
      delivered: true,
      archived: true
    }
  ];

  const clients = await getAllClients();
  if (clients.length === 0) {
    for (const client of sampleClients) {
      await addClient(client);
    }
  }
};
