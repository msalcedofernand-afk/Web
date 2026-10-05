import React, { useState } from 'react';
import { Dish, Reservation, OrderItem } from '../../types/restaurant';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { MenuSection } from './MenuSection';
import { ExperienceStory } from './ExperienceStory';
import { ReservationSection } from './ReservationSection';
import { Footer } from './Footer';
import { DishDetailModal } from './DishDetailModal';
import { CartDrawer } from './CartDrawer';

interface CustomerViewProps {
  dishes: Dish[];
  cart: OrderItem[];
  onAddToCart: (dish: Dish) => void;
  onUpdateCartQuantity: (dishId: string, delta: number) => void;
  onRemoveFromCart: (dishId: string) => void;
  onSubmitOrder: (customerName: string, tableOrZone: string, type: 'dine-in' | 'takeaway') => string;
  onAddReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => string;
  onSwitchToAdmin: () => void;
}

export const CustomerView: React.FC<CustomerViewProps> = ({
  dishes,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onSubmitOrder,
  onAddReservation,
  onSwitchToAdmin,
}) => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartDishIds = cart.map((item) => item.dishId);

  const handleBookClick = () => {
    const el = document.getElementById('reservas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#EEDBC5] text-[#1C1918] flex flex-col font-sans">
      {/* Sticky Navigation */}
      <Navbar
        onOpenAdmin={onSwitchToAdmin}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={cartTotalCount}
        onBookClick={handleBookClick}
      />

      {/* Hero Section */}
      <Hero
        onExploreMenu={handleExploreMenu}
        onBookTable={handleBookClick}
      />

      {/* The Menu (La Carta) */}
      <MenuSection
        dishes={dishes}
        onSelectDish={(dish) => setSelectedDish(dish)}
        onAddToCart={onAddToCart}
        cartDishIds={cartDishIds}
      />

      {/* Brand & Omakase Philosophy */}
      <ExperienceStory />

      {/* Reservation Section */}
      <ReservationSection
        onAddReservation={onAddReservation}
      />

      {/* Footer */}
      <Footer
        onOpenAdmin={onSwitchToAdmin}
        onBookClick={handleBookClick}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={onAddToCart}
        isInCart={selectedDish ? cartDishIds.includes(selectedDish.id) : false}
      />

      {/* Shopping Bag / Comanda Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveFromCart}
        onSubmitOrder={onSubmitOrder}
      />
    </div>
  );
};
