import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Check, X, Phone, MapPin, Package, Search, DollarSign } from 'lucide-react';
import { formatPrice } from '@/utils/whatsapp';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
  custom_text: string;
}

interface Order {
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  transaction_code: string;
  total_amount: string;
  status: 'PENDING' | 'PAID' | 'DELIVERED';
  created_at: string;
  items: OrderItem[];
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      // If no token, redirect to login
      if (!token) return navigate('/login');

      const res = await api.get('/api/orders/', {
        headers: { Authorization: `Token ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      alert("Access Denied. You must be an Admin.");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApprove = async (id: number) => {
    if (!confirm("Are you sure this M-Pesa code is valid?")) return;
    
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/api/orders/${id}/`, 
        { status: 'PAID' },
        { headers: { Authorization: `Token ${token}` } }
      );
      // Refresh list
      fetchOrders();
      alert("Order Approved Successfully! ✅");
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const filteredOrders = orders.filter(order => 
    order.transaction_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Orders</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              placeholder="Search Ref or Name..." 
              className="pl-10 pr-4 py-2 border rounded-full w-64 focus:ring-2 focus:ring-rose-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Header Bar */}
              <div className={`px-6 py-4 flex flex-wrap justify-between items-center gap-4 ${
                order.status === 'PAID' ? 'bg-green-50 border-b border-green-100' : 'bg-yellow-50 border-b border-yellow-100'
              }`}>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-lg text-gray-700">#{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'PAID' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                
                {/* M-Pesa Code Display */}
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded border border-gray-200">
                  <span className="text-xs text-gray-400 uppercase">M-Pesa Ref:</span>
                  <span className="font-mono font-bold text-gray-800">{order.transaction_code || 'N/A'}</span>
                </div>

                {/* Approve Button */}
                {order.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApprove(order.id)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors ml-auto"
                  >
                    <Check className="w-4 h-4" /> Approve Payment
                  </button>
                )}
              </div>

              {/* Body Content */}
              <div className="p-6 grid md:grid-cols-3 gap-6">
                
                {/* 1. Customer Info */}
                <div className="space-y-3 text-sm">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Phone className="w-3 h-3" /></div>
                    Customer Details
                  </h4>
                  <p><span className="text-gray-500">Name:</span> {order.full_name}</p>
                  <p><span className="text-gray-500">Phone:</span> {order.phone_number}</p>
                  <p className="flex items-start gap-1">
                    <MapPin className="w-3 h-3 mt-1 text-gray-400" /> 
                    <span className="text-gray-700 font-medium">{order.address}</span>
                  </p>
                </div>

                {/* 2. Items List */}
                <div className="space-y-3 text-sm md:col-span-2">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600"><Package className="w-3 h-3" /></div>
                    Order Items
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                        <div>
                          <span className="font-medium text-gray-800">{item.quantity}x {item.product_name}</span>
                          {item.custom_text && <p className="text-xs text-rose-600 italic">"{item.custom_text}"</p>}
                        </div>
                        <span className="text-gray-600">{formatPrice(parseFloat(item.price))}</span>
                      </div>
                    ))}
                    <div className="flex justify-end pt-2 border-t border-gray-200">
                      <span className="font-bold text-lg text-rose-700 flex items-center">
                        Total: {formatPrice(parseFloat(order.total_amount))}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-20 text-gray-400">No orders found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;