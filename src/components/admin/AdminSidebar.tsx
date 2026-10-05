import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  UtensilsCrossed,
  Layers,
  Users,
  Receipt,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export type AdminTab = 'dashboard' | 'reservations' | 'menu' | 'categories' | 'customers' | 'orders';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onSwitchToCustomer: () => void;
  pendingReservationsCount: number;
  activeOrdersCount: number;
  totalDishesCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onSwitchToCustomer,
  pendingReservationsCount,
  activeOrdersCount,
  totalDishesCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'reservations' as AdminTab,
      label: 'Reservations',
      icon: CalendarCheck,
      badge: pendingReservationsCount > 0 ? `${pendingReservationsCount} nuevas` : null,
      badgeColor: 'bg-[#C05041] text-white',
    },
    {
      id: 'menu' as AdminTab,
      label: 'Menu Items',
      icon: UtensilsCrossed,
      badge: `${totalDishesCount}`,
      badgeColor: 'bg-[#38322E] text-[#AAB384]',
    },
    {
      id: 'categories' as AdminTab,
      label: 'Categories',
      icon: Layers,
      badge: '5',
      badgeColor: 'bg-[#38322E] text-[#EEDBC5]/70',
    },
    {
      id: 'customers' as AdminTab,
      label: 'Customers',
      icon: Users,
      badge: null,
    },
    {
      id: 'orders' as AdminTab,
      label: 'Orders',
      icon: Receipt,
      badge: activeOrdersCount > 0 ? `${activeOrdersCount} activas` : null,
      badgeColor: 'bg-[#4B6B38] text-white',
    },
  ];

  return (
    <aside className="w-64 bg-[#1C1918] text-[#EEDBC5] flex flex-col justify-between border-r border-[#2C2725] shrink-0 min-h-screen">
      
      {/* Top Brand Lockup */}
      <div>
        <div className="p-6 border-b border-[#2C2725] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl tracking-[0.2em] font-light text-white uppercase">
                Ayuki
              </span>
              <span className="text-[10px] tracking-widest px-1.5 py-0.5 rounded-xs bg-[#C05041] text-white font-mono uppercase">
                Admin
              </span>
            </div>
            <span className="text-[10px] tracking-widest text-[#CA8A8C] font-mono block mt-0.5">
              RESTAURANT OPS · MADRID
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5" aria-label="Navegación del panel">
          <div className="px-3 pb-2 text-[10px] font-semibold text-[#EEDBC5]/40 uppercase tracking-widest font-mono">
            Gestión Principal
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2D2825] text-white shadow-xs font-semibold'
                    : 'text-[#EEDBC5]/75 hover:bg-[#25201E] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#C05041]' : 'text-[#EEDBC5]/60'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-sm tabular-nums ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#C05041]" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switcher: Back to Customer Landing Page */}
      <div className="p-4 border-t border-[#2C2725] space-y-3 bg-[#171514]">
        <button
          onClick={onSwitchToCustomer}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-md bg-[#25201E] hover:bg-[#2E2926] text-xs text-[#EEDBC5] font-medium transition-colors border border-[#38322E] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#AAB384]" />
            <span>Ver Sitio del Cliente</span>
          </span>
          <span className="text-[10px] text-[#AAB384] font-mono">EN VIVO</span>
        </button>

        {/* Staff badge */}
        <div className="flex items-center gap-2.5 px-2 pt-1 text-xs">
          <div className="w-7 h-7 rounded-full bg-[#C05041] text-white flex items-center justify-center font-serif font-bold text-xs">
            KT
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white truncate">Kenji Takahashi</p>
            <p className="text-[10px] text-[#AAB384] truncate">Chef Propietario</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
