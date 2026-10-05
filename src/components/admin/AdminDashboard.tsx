import React, { useState } from 'react';
import {
  Dish,
  Reservation,
  Customer,
  Order,
  NotificationItem,
  ReservationStatus,
  CategoryId,
} from '../../types/restaurant';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { DashboardOverview } from './DashboardOverview';
import { ReservationsView } from './ReservationsView';
import { MenuItemsView } from './MenuItemsView';
import { CategoriesView } from './CategoriesView';
import { CustomersView } from './CustomersView';
import { OrdersView } from './OrdersView';
import { AddDishModal } from './AddDishModal';

interface AdminDashboardProps {
  dishes: Dish[];
  reservations: Reservation[];
  customers: Customer[];
  orders: Order[];
  notifications: NotificationItem[];
  onSwitchToCustomer: () => void;
  onUpdateReservationStatus: (id: string, newStatus: ReservationStatus) => void;
  onAddManualReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => string;
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
  onToggleDishAvailability: (id: string) => void;
  onUpdateDishPrice: (id: string, newPrice: number) => void;
  onDeleteDish: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: Order['status']) => void;
  onClearNotifications: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  dishes,
  reservations,
  customers,
  orders,
  notifications,
  onSwitchToCustomer,
  onUpdateReservationStatus,
  onAddManualReservation,
  onAddDish,
  onToggleDishAvailability,
  onUpdateDishPrice,
  onDeleteDish,
  onUpdateOrderStatus,
  onClearNotifications,
}) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('reservations');
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const activeOrdersCount = orders.filter((o) => o.status !== 'served').length;

  const tabTitles: Record<AdminTab, string> = {
    dashboard: 'Dashboard Operativo',
    reservations: 'Gestión de Reservas & Omakase',
    menu: 'Administración de la Carta',
    categories: 'Categorías Gastronómicas',
    customers: 'Directorio de Clientes VIP',
    orders: 'Comandas de Sala & Takeaway',
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    if (notif.type === 'reservation') {
      setCurrentTab('reservations');
    } else if (notif.type === 'order') {
      setCurrentTab('orders');
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F7F4] text-[#1C1918] font-sans overflow-hidden">
      
      {/* Sidebar: Charcoal Black (#1C1918) */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onSwitchToCustomer={onSwitchToCustomer}
        pendingReservationsCount={pendingCount}
        activeOrdersCount={activeOrdersCount}
        totalDishesCount={dishes.length}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar: Charcoal Black (#1C1918) */}
        <AdminTopBar
          currentTabTitle={tabTitles[currentTab]}
          notifications={notifications}
          onOpenAddDish={() => setIsAddDishModalOpen(true)}
          onSwitchToCustomer={onSwitchToCustomer}
          onNotificationClick={handleNotificationClick}
          onClearNotifications={onClearNotifications}
        />

        {/* Viewport Content Area: Off-white (#F8F7F4) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardOverview
                reservations={reservations}
                dishes={dishes}
                orders={orders}
                onUpdateReservationStatus={onUpdateReservationStatus}
                onNavigateToTab={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'reservations' && (
              <ReservationsView
                reservations={reservations}
                onUpdateStatus={onUpdateReservationStatus}
                onAddManualReservation={onAddManualReservation}
              />
            )}

            {currentTab === 'menu' && (
              <MenuItemsView
                dishes={dishes}
                onToggleAvailability={onToggleDishAvailability}
                onUpdatePrice={onUpdateDishPrice}
                onDeleteDish={onDeleteDish}
                onOpenAddModal={() => setIsAddDishModalOpen(true)}
              />
            )}

            {currentTab === 'categories' && (
              <CategoriesView
                categories={[
                  { id: 'entradas', name: 'Entradas & Otsumami', japaneseName: '前菜', description: 'Bocados para abrir el apetito con notas frescas y umami equilibrado.' },
                  { id: 'makis', name: 'Makis & Rolls de Autor', japaneseName: '巻き寿司', description: 'Rolls elaborados con arroz Koshihikari sazonado con vinagre añejo.' },
                  { id: 'fuertes', name: 'Platos Fuertes & Robata', japaneseName: '主菜・炉端焼き', description: 'Cortes nobles preparados al carbón Binchotan sin llama.' },
                  { id: 'bebidas', name: 'Sake & Coctelería de Autor', japaneseName: '日本酒・飲物', description: 'Selección de sakes Junmai Daiginjo y whiskies japoneses.' },
                  { id: 'postres', name: 'Dulces & Wagashi', japaneseName: '甘味', description: 'Elaboraciones inspiradas en la pastelería japonesa contemporánea.' },
                ]}
                dishes={dishes}
                onSelectCategoryFilter={(catId) => {
                  setCurrentTab('menu');
                }}
              />
            )}

            {currentTab === 'customers' && (
              <CustomersView customers={customers} />
            )}

            {currentTab === 'orders' && (
              <OrdersView
                orders={orders}
                onUpdateOrderStatus={onUpdateOrderStatus}
              />
            )}
          </div>
        </main>

      </div>

      {/* Add Dish Modal */}
      <AddDishModal
        isOpen={isAddDishModalOpen}
        onClose={() => setIsAddDishModalOpen(false)}
        onAddDish={onAddDish}
      />

    </div>
  );
};
