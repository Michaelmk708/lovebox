import { Package, Phone, MapPin, Calendar } from 'lucide-react';

// Define the shape of our data (Typescript checks)
interface OrderItem {
  quantity: number;
  product_name: string;
}

interface Order {
  id: number;
  guest_name: string;
  guest_email: string;
  phone_number: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  total_amount: string;
  status: string;
  items: OrderItem[];
}

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No orders found yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Delivery Details</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-sm text-rose-600 font-bold">
                  #{order.id}
                </td>
                
                <td className="p-4">
                  <div className="font-medium text-gray-900">{order.guest_name}</div>
                  <div className="text-xs text-gray-500">{order.guest_email}</div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {order.phone_number}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {order.location}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    {order.preferred_date} @ {order.preferred_time}
                  </div>
                </td>

                <td className="p-4 text-sm text-gray-600">
                  <div className="max-w-[200px] space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs border-b border-dashed border-gray-200 pb-1 last:border-0">
                        <span>{item.product_name}</span>
                        <span className="font-bold">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="p-4 font-bold text-gray-900">
                  KES {parseFloat(order.total_amount).toLocaleString()}
                </td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                    order.status === 'CONFIRMED' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : order.status === 'PENDING' 
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;