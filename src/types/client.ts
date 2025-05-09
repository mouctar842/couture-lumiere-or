
export interface ClientType {
  id: string;
  name: string;
  phone: string;
  description: string;
  measurements: string;
  specificMeasurements: {
    bust?: number;
    waist?: number;
    hips?: number;
    shoulderWidth?: number;
    armLength?: number;
    inseam?: number;
    neck?: number;
  };
  price: number;
  fabricPhoto?: string;
  date: string;
  delivered: boolean;
  archived: boolean;
}
