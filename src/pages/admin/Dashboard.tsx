import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Package, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  full_name: string;
  phone_number: string;
  address: string;
  total_amount: number;
  transaction_code: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Check Authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // 🚨 FIX: Redirect to ADMIN login, not generic login
      navigate('/admin/login'); 
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      // Note: We use the same API, assuming the user is a Staff member
      const response = await api.get('/api/orders/');
      setOrders(response.data);
    } catch (error: any) {
      console.error("Fetch error:", error);
      // If unauthorized (401/403), kick them out to Admin Login
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const approveOrder = async (orderId: number) => {
    try {
      await api.patch(`/api/orders/${orderId}/`, { status: 'PAID' });
      
      toast({
        title: "Order Approved",
        description: `Order #${orderId} marked as PAID. Email sent.`,
        className: "bg-green-500 text-white",
      });

      // Refresh list
      fetchOrders();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve order.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login'); // 🚨 FIX: Redirect to Admin Login on logout
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin w-10 h-10 text-rose-600" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Orders</h1>
            <p className="text-gray-500">Manage and approve incoming orders</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
              
              {/* Left: Status & Meta */}
              <div className="md:w-1/4 space-y-2 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                <div className="flex items-center justify-between md:block">
                  <span className="text-2xl font-bold text-gray-400">#{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                <div className="pt-2">
                  <p className="text-xs text-gray-400 uppercase font-bold">M-Pesa Ref:</p>
                  <p className="font-mono font-medium text-gray-800">{order.transaction_code || 'N/A'}</p>
                </div>
                
                {order.status !== 'PAID' && (
                  <Button onClick={() => approveOrder(order.id)} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve Payment
                  </Button>
                )}
              </div>

              {/* Middle: Customer Details */}
              <div className="md:w-1/4 space-y-1">
                <h3 className="font-semibold text-gray-900 mb-2">Customer Details</h3>
                <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {order.full_name}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {order.phone_number}</p>
                <p className="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded italic border border-gray-100">
                  {order.address}
                </p>
              </div>

              {/* Right: Items */}
              <div className="md:w-2/4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" /> Order Items
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-gray-50 pb-1 last:border-0">
                      <span className="text-gray-600">{item.quantity}x {item.product_name}</span>
                      <span className="font-medium">KES {Number(item.price).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-rose-600">KES {Number(order.total_amount).toLocaleString()}</span>
                </div>
              </div>

            </div>
          ))}

          {orders.length === 0 && !loading && (
            <div className="text-center py-20 text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;