export type CategoryId = 'entradas' | 'makis' | 'fuertes' | 'bebidas' | 'postres';

export interface Category {
  id: CategoryId;
  name: string;
  japaneseName: string;
  description: string;
}

export type DietaryTag = 'Gluten Free' | 'Picante' | 'Chef Selection' | 'Vegetariano' | 'Nuevo';

export interface Dish {
  id: string;
  name: string;
  japaneseName: string;
  category: CategoryId;
  description: string;
  price: number;
  tags: DietaryTag[];
  pieces?: string;
  spicyLevel?: number; // 0 to 3
  isAvailable: boolean;
  isSpecial?: boolean;
  artworkType: 'nigiri' | 'maki' | 'dragon' | 'tartare' | 'wagyu' | 'ramen' | 'sake' | 'matcha' | 'mochi' | 'gyoza';
}

export type SeatingArea = 'Barra Omakase' | 'Salón Principal' | 'Tatami Privado' | 'Terraza Zen';

export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  guests: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  seatingArea: SeatingArea;
  status: ReservationStatus;
  notes?: string;
  specialOccasion?: 'Ninguna' | 'Cumpleaños' | 'Aniversario' | 'Cena de Negocios' | 'Celebración';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  totalSpent: number;
  favoriteDish: string;
  isVip: boolean;
  notes: string;
  lastVisit: string;
}

export interface OrderItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  japaneseName?: string;
}

export interface Order {
  id: string;
  customerName: string;
  tableOrZone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  type: 'dine-in' | 'takeaway';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'reservation' | 'order' | 'system';
  targetId?: string;
}
