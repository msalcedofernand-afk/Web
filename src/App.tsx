import React, { useState, useEffect } from 'react';
import {
  Dish,
  Reservation,
  Customer,
  Order,
  NotificationItem,
  OrderItem,
  ReservationStatus,
} from './types/restaurant';
import {
  INITIAL_DISHES,
  INITIAL_RESERVATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
} from './data/initialData';
import { CustomerView } from './components/customer/CustomerView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PhpProjectViewer } from './components/php/PhpProjectViewer';
import { CheckCircle2, FileCode, Shield, Utensils } from 'lucide-react';

export default function App() {
  // Main view switcher: 'customer' | 'admin' | 'php'
  const [currentView, setCurrentView] = useState<'customer' | 'admin' | 'php'>('customer');

  // LocalStorage state with fallback
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const saved = localStorage.getItem('ayuki_dishes');
      return saved ? JSON.parse(saved) : INITIAL_DISHES;
    } catch {
      return INITIAL_DISHES;
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('ayuki_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('ayuki_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ayuki_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('ayuki_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Shopping cart
  const [cart, setCart] = useState<OrderItem[]>([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ayuki_dishes', JSON.stringify(dishes));
      localStorage.setItem('ayuki_reservations', JSON.stringify(reservations));
      localStorage.setItem('ayuki_orders', JSON.stringify(orders));
      localStorage.setItem('ayuki_notifications', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [dishes, reservations, orders, notifications]);

  // Handle new reservation from Customer Booking form
  const handleAddReservation = (data: Omit<Reservation, 'id' | 'createdAt'>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `RES-${randomNum}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newReservation: Reservation = {
      ...data,
      id: newId,
      createdAt: formattedDate,
    };

    setReservations((prev) => [newReservation, ...prev]);

    // Dispatch notification to Admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Nueva Reserva: ${data.customerName}`,
      message: `${data.guests} personas para ${data.date} a las ${data.time}h en ${data.seatingArea}.`,
      time: 'Hace un instante',
      read: false,
      type: 'reservation',
      targetId: newId,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`¡Reserva ${newId} confirmada en el sistema!`);

    return newId;
  };

  // Handle status update from Admin (Confirm / Cancel / Complete)
  const handleUpdateReservationStatus = (id: string, newStatus: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(
      `Reserva ${id} marcada como ${
        newStatus === 'confirmed'
          ? 'Confirmada'
          : newStatus === 'cancelled'
          ? 'Cancelada'
          : newStatus
      }`
    );
  };

  // Cart operations
  const handleAddToCart = (dish: Dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            dishId: dish.id,
            name: dish.name,
            japaneseName: dish.japaneseName,
            price: dish.price,
            quantity: 1,
          },
        ];
      }
    });
    showToast(`"${dish.name}" añadido a la comanda`);
  };

  const handleUpdateCartQuantity = (dishId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.dishId === dishId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((item) => item.dishId !== dishId));
  };

  const handleSubmitOrder = (
    customerName: string,
    tableOrZone: string,
    type: 'dine-in' | 'takeaway'
  ): string => {
    const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newOrder: Order = {
      id: orderId,
      customerName,
      tableOrZone,
      items: [...cart],
      total,
      status: 'pending',
      type,
      createdAt: timeStr,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Nueva Comanda en ${tableOrZone}`,
        message: `${cart.length} platos para cocina (${total.toFixed(2)} €).`,
        time: 'Hace un instante',
        read: false,
        type: 'order',
        targetId: orderId,
      },
      ...prev,
    ]);

    showToast(`Comanda ${orderId} enviada a cocina exitosamente.`);
    return orderId;
  };

  // Dish management operations
  const handleAddDish = (newDishData: Omit<Dish, 'id'>) => {
    const id = `dish-${Date.now()}`;
    const newDish: Dish = { ...newDishData, id };
    setDishes((prev) => [newDish, ...prev]);
    showToast(`Plato "${newDish.name}" agregado a la carta.`);
  };

  const handleToggleDishAvailability = (dishId: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  const handleUpdateDishPrice = (dishId: string, newPrice: number) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, price: newPrice } : d))
    );
    showToast(`Precio actualizado correctamente.`);
  };

  const handleDeleteDish = (dishId: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== dishId));
    showToast(`Plato eliminado de la carta.`);
  };

  const handleClearNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;

  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      
      {/* ============================================================== */}
      {/* TOP PRESENTATION BAR (Switch between Client, Admin and PHP)   */}
      {/* ============================================================== */}
      <div className="bg-[#141211] text-[#EEDBC5] px-4 py-2.5 border-b border-[#2C2725] flex flex-wrap items-center justify-between gap-3 z-50 text-xs shadow-md shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#AAB384] animate-ping" />
          <span className="font-bold text-white tracking-wide">
            AYUKI (あゆき) · RESTAURANTE SUSHI &amp; MAKIS
          </span>
          <span className="text-neutral-500 hidden md:inline">|</span>
          <span className="text-neutral-400 hidden md:inline">
            Versión Profesional React + Proyecto Completo PHP / MySQL
          </span>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-[#25201E] p-1 rounded-lg border border-[#38322E]">
          <button
            onClick={() => setCurrentView('customer')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentView === 'customer'
                ? 'bg-[#C05041] text-white shadow-xs'
                : 'text-[#EEDBC5]/70 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Vista 1: Cliente</span>
          </button>

          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-[#4B6B38] text-white shadow-xs'
                : 'text-[#EEDBC5]/70 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Vista 2: Admin</span>
            {pendingCount > 0 && (
              <span className="bg-[#C05041] text-white text-[10px] px-1.5 rounded-full font-bold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView('php')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentView === 'php'
                ? 'bg-[#AAB384] text-[#1C1918] font-bold shadow-xs'
                : 'text-[#AAB384] hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#C05041]" />
            <span>📦 Código PHP / Exportar</span>
          </button>
        </div>
      </div>

      {/* Global Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1918] text-[#EEDBC5] px-4 py-3 rounded-xl shadow-2xl border border-[#C05041]/40 flex items-center gap-3 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#AAB384] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* View Rendering */}
      <div className="flex-1">
        {currentView === 'customer' && (
          <CustomerView
            dishes={dishes}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onSubmitOrder={handleSubmitOrder}
            onAddReservation={handleAddReservation}
            onSwitchToAdmin={() => setCurrentView('admin')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            dishes={dishes}
            reservations={reservations}
            customers={customers}
            orders={orders}
            notifications={notifications}
            onSwitchToCustomer={() => setCurrentView('customer')}
            onUpdateReservationStatus={handleUpdateReservationStatus}
            onAddManualReservation={handleAddReservation}
            onAddDish={handleAddDish}
            onToggleDishAvailability={handleToggleDishAvailability}
            onUpdateDishPrice={handleUpdateDishPrice}
            onDeleteDish={handleDeleteDish}
            onUpdateOrderStatus={(orderId, status) => {
              setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, status } : o))
              );
            }}
            onClearNotifications={handleClearNotifications}
          />
        )}

        {currentView === 'php' && (
          <PhpProjectViewer />
        )}
      </div>

    </div>
  );
}
