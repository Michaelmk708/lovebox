import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Package, LogOut, Trash2 } from 'lucide-react'; // 👈 Added Trash2
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
      navigate('/admin/login'); 
    } else {
      fetchOrders();
    }
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/orders/');
      setOrders(response.data);
    } catch (error: any) {
      console.error("Fetch error:", error);
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
      fetchOrders();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to approve order.",
      });
    }
  };

  // 👇 NEW: Delete Handler
  const handleDelete = async (orderId: number) => {
    try {
      await api.delete(`/api/orders/${orderId}/`);
      
      // Update local state to remove item immediately without refetching
      setOrders(prev => prev.filter(order => order.id !== orderId));

      toast({
        title: "Deleted",
        description: "Order record has been removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete order.",
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login'); 
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
          {orders.map((order) => {
            // 👇 CALCULATE THE 50% SPLIT
            const total = Number(order.total_amount);
            const deposit = total / 2;
            const balance = total - deposit;

            return (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 relative group">
                
                {/* Left: Status & Actions */}
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
                  
                  <div className="space-y-2 mt-4">
                    {order.status !== 'PAID' && (
                      <Button onClick={() => approveOrder(order.id)} className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" /> Approve Payment
                      </Button>
                    )}

                    {/* 👇 DELETE BUTTON (With Alert Dialog for Safety) */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete Order
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete Order #{order.id} from the database.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(order.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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

                {/* Right: Items & Price Breakdown */}
                <div className="md:w-2/4 flex flex-col justify-between">
                  <div>
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
                  </div>

                  {/* 👇 NEW: Price Breakdown Section */}
                  <div className="mt-4 pt-3 border-t border-gray-100 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                      <span>Total Value:</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-green-600 mb-1">
                      <span>Deposit Paid (50%):</span>
                      <span>KES {deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-200 pt-1 mt-1">
                      <span className="font-bold text-gray-900">Balance Due:</span>
                      <span className="text-xl font-bold text-rose-600">KES {balance.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

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