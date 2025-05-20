-- Création de la table clients
create table clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text,
  description text,
  measurements text,
  specific_measurements jsonb,
  price integer,
  fabric_photo text,
  date text,
  delivered boolean default false,
  archived boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activer RLS (Row Level Security)
alter table clients enable row level security;

-- Créer une politique pour permettre l'accès public (pour l'exemple)
create policy "Allow public access" on clients
  for all using (true); 