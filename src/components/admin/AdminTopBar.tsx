import React, { useState } from 'react';
import { Bell, Plus, ExternalLink, ChevronDown, Check, X, CalendarCheck } from 'lucide-react';
import { NotificationItem } from '../../types/restaurant';

interface AdminTopBarProps {
  currentTabTitle: string;
  notifications: NotificationItem[];
  onOpenAddDish: () => void;
  onSwitchToCustomer: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
  onClearNotifications: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  currentTabTitle,
  notifications,
  onOpenAddDish,
  onSwitchToCustomer,
  onNotificationClick,
  onClearNotifications,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-[#1C1918] text-[#EEDBC5] border-b border-[#2C2725] px-6 flex items-center justify-between z-20 shrink-0 sticky top-0">
      
      {/* Left: Breadcrumbs & Current Tab Title */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-[#EEDBC5]/50 uppercase tracking-wider">
          Ayuki Ops /
        </span>
        <h1 className="font-serif text-lg font-semibold text-white tracking-wide">
          {currentTabTitle}
        </h1>
      </div>

      {/* Right: Actions, Notifications & Profile */}
      <div className="flex items-center space-x-4">
        
        {/* Quick "Add New Dish" button */}
        <button
          onClick={onOpenAddDish}
          className="px-3.5 py-1.5 bg-[#4B6B38] hover:bg-[#3E5A2D] text-white text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agregar Nuevo Plato</span>
        </button>

        {/* View live client site */}
        <button
          onClick={onSwitchToCustomer}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#282422] hover:bg-[#342F2D] text-xs text-[#EEDBC5] rounded-md transition-colors border border-[#38322E] cursor-pointer"
          title="Ver cómo ve el cliente la página web"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#AAB384]" />
          <span>Vista Cliente</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#EEDBC5]/80 hover:text-white hover:bg-[#282422] rounded-md transition-colors relative cursor-pointer"
            aria-label="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C05041] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FAF6EE] text-[#1C1918] rounded-xl shadow-2xl border border-[#1C1918]/15 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C1918]/10">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-[#C05041]" />
                  <span className="font-serif font-bold text-sm text-[#1C1918]">
                    Notificaciones de Reservas
                  </span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onClearNotifications}
                    className="text-[11px] text-[#4B6B38] hover:underline font-medium cursor-pointer"
                  >
                    Marcar leídas
                  </button>
                )}
              </div>

              <div className="py-2 divide-y divide-[#1C1918]/10 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-center py-6 text-[#1C1918]/50">
                    No hay notificaciones pendientes.
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        onNotificationClick(notif);
                        setShowNotifications(false);
                      }}
                      className={`py-3 px-2 rounded-lg transition-colors cursor-pointer hover:bg-[#EEDBC5]/50 flex items-start gap-2.5 ${
                        !notif.read ? 'bg-[#FAF2E6]' : ''
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#C05041] mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#1C1918] truncate">
                            {notif.title}
                          </p>
                          <span className="text-[10px] text-[#1C1918]/50 tabular-nums">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#1C1918]/70 mt-0.5 leading-snug">
                          {notif.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-[#1C1918]/10 text-center">
                <span className="text-[10px] text-[#1C1918]/50">
                  {unreadCount} nuevas reservas por confirmar
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#2C2725]">
          <div className="w-8 h-8 rounded-full bg-[#2C2725] border border-[#38322E] flex items-center justify-center text-xs font-serif font-bold text-[#AAB384]">
            KT
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-medium text-white leading-tight">
              Chef Kenji Takahashi
            </span>
            <span className="block text-[10px] text-[#AAB384] font-mono leading-tight">
              Master Admin
            </span>
          </div>
        </div>

      </div>

    </header>
  );
};
