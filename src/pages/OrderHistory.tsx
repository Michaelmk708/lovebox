import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { formatPrice } from '@/utils/whatsapp';
import { Clock, CheckCircle, Package, Phone } from 'lucide-react';

interface Order {
  id: number;
  status: string;
  total_amount: string;
  created_at: string;
  transaction_code: string;
  items: any[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await api.get('/api/orders/', {
          headers: { Authorization: `Token ${token}` }
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };
    fetchHistory();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-pink-50/30">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif font-bold text-gray-800 mb-6">My Order History</h1>

        <div className="space-y-4 max-w-3xl mx-auto">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500">Order #{order.id} • {new Date(order.created_at).toLocaleDateString()}</p>
                  <h3 className="font-bold text-lg text-gray-800 mt-1">
                    Total: {formatPrice(parseFloat(order.total_amount))}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">Ref: {order.transaction_code}</p>
                </div>
                
                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold ${
                  order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status === 'PAID' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {order.status === 'PAID' ? 'Confirmed' : 'Pending Approval'}
                </div>
              </div>

              {/* Items Summary */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm text-gray-600">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.quantity}x {item.product_name}</span>
                  </div>
                ))}
              </div>

              {/* Pending Warning Message */}
              {order.status === 'PENDING' && (
                <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start gap-3">
                  <Phone className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-orange-800 font-semibold">Payment Verification in Progress</p>
                    <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                      We usually confirm payments within 30 minutes. If your order remains pending for more than 24 hours, please contact us immediately via WhatsApp or Call at <strong>0746 043 054</strong> with your M-Pesa Ref.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p>No orders yet. Start gifting today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;