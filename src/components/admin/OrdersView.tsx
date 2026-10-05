import React from 'react';
import { Order } from '../../types/restaurant';
import { Clock, ChefHat, Check, ArrowRight, Utensils } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onUpdateOrderStatus }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex items-center justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#1C1918]">
            Comandas de Cocina &amp; Barra
          </h2>
          <p className="text-xs text-neutral-500">
            Control en tiempo real de pases de makis y platos calientes de robata.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#4B6B38] px-3 py-1 bg-emerald-50 rounded-lg">
          {orders.filter((o) => o.status !== 'served').length} en marcha
        </span>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-neutral-200 text-neutral-400 text-xs">
            No hay comandas registradas en este momento.
          </div>
        ) : (
          orders.map((order) => {
            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-neutral-200 shadow-2xs p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Order header */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#1C1918] block">
                        {order.id}
                      </span>
                      <span className="text-xs text-neutral-500 font-semibold">
                        {order.customerName} ({order.tableOrZone})
                      </span>
                    </div>

                    {/* Status badge */}
                    <div>
                      {order.status === 'pending' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          Pendiente
                        </span>
                      )}
                      {order.status === 'preparing' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 animate-pulse">
                          Preparando
                        </span>
                      )}
                      {order.status === 'ready' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Listo para pase
                        </span>
                      )}
                      {order.status === 'served' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600">
                          Servido
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order items list */}
                  <div className="py-3 space-y-2 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-neutral-700">
                        <span className="flex items-center gap-2">
                          <strong className="font-mono text-neutral-900">{item.quantity}x</strong>
                          <span>{item.name}</span>
                        </span>
                        <span className="font-mono text-neutral-500 tabular-nums">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and progression */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase">Total Comanda</span>
                    <span className="font-serif text-base font-bold text-[#4B6B38] tabular-nums">
                      {order.total.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                        className="px-3 py-1.5 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Pasar a Cocina
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Marcar Listo
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'served')}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-900 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Servir Mesa
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
