import React, { useState } from 'react';
import { OrderItem } from '../../types/restaurant';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onSubmitOrder: (customerName: string, tableOrZone: string, type: 'dine-in' | 'takeaway') => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
}) => {
  const [tableOrZone, setTableOrZone] = useState('Mesa 3');
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    const name = customerName.trim() || (orderType === 'dine-in' ? tableOrZone : 'Cliente');
    const orderId = onSubmitOrder(name, tableOrZone, orderType);
    setSubmittedOrderId(orderId);
  };

  const handleFinish = () => {
    setSubmittedOrderId(null);
    setCustomerName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1C1918]/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF6EE] h-full shadow-2xl flex flex-col justify-between border-l border-[#1C1918]/15 animate-in slide-in-from-right duration-250">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1C1918]/10 bg-[#1C1918] text-[#EEDBC5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C05041]" />
            <h3 className="font-serif text-xl font-semibold text-white">
              Tu Comanda Ayuki
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#EEDBC5]/70 hover:text-white transition-colors"
            aria-label="Cerrar comanda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        {submittedOrderId ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-[#4B6B38] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h4 className="font-serif text-2xl text-[#1C1918]">¡Comanda Enviada a Cocina!</h4>
            <p className="text-xs text-[#1C1918]/70">
              El pedido <strong className="text-[#C05041] font-mono">{submittedOrderId}</strong> ha sido transmitido a la barra de sushi del Chef Kenji.
            </p>
            <button
              onClick={handleFinish}
              className="mt-4 px-6 py-2.5 bg-[#1C1918] text-[#EEDBC5] text-xs font-semibold uppercase tracking-wider rounded-md"
            >
              Cerrar y Continuar
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 text-[#1C1918]/60 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#1C1918]/30 mx-auto" />
                  <p className="font-serif text-lg">No hay platos en la comanda aún.</p>
                  <p className="text-xs text-[#1C1918]/50">
                    Explora nuestra carta y haz clic en "Añadir a Comanda".
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.dishId}
                      className="p-3.5 bg-[#EEDBC5]/50 rounded-xl border border-[#1C1918]/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-[#1C1918] truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-[#4B6B38] tabular-nums">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-2 py-1 rounded-md border border-[#1C1918]/15">
                        <button
                          onClick={() => onUpdateQuantity(item.dishId, -1)}
                          className="p-0.5 text-[#1C1918]/60 hover:text-[#1C1918]"
                          aria-label="Disminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold tabular-nums px-1.5 min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.dishId, 1)}
                          className="p-0.5 text-[#1C1918]/60 hover:text-[#1C1918]"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.dishId)}
                        className="p-1 text-[#C05041]/70 hover:text-[#C05041]"
                        title="Eliminar plato"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Drawer Footer & Order Submission */}
            {items.length > 0 && (
              <form onSubmit={handleOrder} className="p-5 border-t border-[#1C1918]/10 bg-[#EEDBC5]/40 space-y-4">
                
                {/* Dine-in vs Takeaway segmented control */}
                <div className="flex items-center gap-2 p-1 bg-[#FAF6EE] rounded-lg border border-[#1C1918]/10 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`flex-1 py-1.5 rounded-md transition-colors ${
                      orderType === 'dine-in' ? 'bg-[#1C1918] text-white shadow-xs' : 'text-[#1C1918]/70'
                    }`}
                  >
                    En Sala / Mesa
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`flex-1 py-1.5 rounded-md transition-colors ${
                      orderType === 'takeaway' ? 'bg-[#1C1918] text-white shadow-xs' : 'text-[#1C1918]/70'
                    }`}
                  >
                    Para Llevar / Takeaway
                  </button>
                </div>

                {orderType === 'dine-in' ? (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1918]/70 mb-1">
                      Mesa o Asiento
                    </label>
                    <input
                      type="text"
                      value={tableOrZone}
                      onChange={(e) => setTableOrZone(e.target.value)}
                      placeholder="Ej. Mesa 4 o Barra 2"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#1C1918]/70 mb-1">
                      Nombre para la Recogida
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre completo"
                      className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                      required
                    />
                  </div>
                )}

                {/* Subtotal */}
                <div className="pt-2 flex justify-between items-baseline border-t border-[#1C1918]/10">
                  <span className="text-xs uppercase tracking-wider text-[#1C1918]/60">Subtotal</span>
                  <span className="font-serif text-2xl font-bold text-[#4B6B38] tabular-nums">
                    {total.toFixed(2)} €
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C05041] hover:bg-[#A84234] text-white font-medium text-xs uppercase tracking-wider rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enviar Pedido a Cocina</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </>
        )}

      </div>
    </div>
  );
};
