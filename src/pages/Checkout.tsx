import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import api from '@/lib/api'; // Uses your centralized API helper
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Smartphone, ShieldCheck, Calendar, Clock } from 'lucide-react';

const Checkout = () => {
  const { items, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. Safety Calculation
  const safeTotal = cartTotal || items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  // 2. 🧮 Calculate the 50% Deposit
  const depositAmount = safeTotal / 2;
  const balanceAmount = safeTotal - depositAmount;

  // 3. Redirect if empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    delivery_date: '', // 👈 Added
    delivery_time: '', // 👈 Added
    transaction_code: '', 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a combined Delivery string or send them separately based on your backend model.
      // Assuming your backend model has a 'delivery_instructions' or 'address' field, 
      // we can append this info there, OR if you added specific fields in Django, send them directly.
      // For now, I will append them to the address to ensure the Admin sees it without backend changes.
      
      const fullDeliveryDetails = `${formData.address} | Date: ${formData.delivery_date} | Time: ${formData.delivery_time}`;

      const orderPayload = {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        address: fullDeliveryDetails, // Sending combined info to address field to be safe
        transaction_code: formData.transaction_code,
        total_amount: safeTotal,
        items: items.map(item => ({
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          custom_text: item.customText || '' 
        }))
      };

      const token = localStorage.getItem('token');
      const config = token ? { headers: { Authorization: `Token ${token}` } } : {};
      
      await api.post('/api/orders/', orderPayload, config);

      clearCart();
      alert(`Order Placed! Please verify your Ksh ${depositAmount.toLocaleString()} deposit payment.`);
      navigate('/'); 

    } catch (error: any) {
      console.error("Order Failed:", error);
      alert("Something went wrong. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-pink-50/30 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-rose-900 mb-8 text-center">
          Secure Checkout
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* LEFT: Payment Instructions */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-700">
              <Smartphone className="w-6 h-6" />
              Pay Deposit via M-Pesa
            </h2>
            
            {/* The Till Number Box */}
            <div className="bg-green-50 border-2 border-green-100 rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">Pochi La Biashara</p>
              <p className="text-4xl font-black text-green-900 tracking-widest mb-2" >0746043054</p>
              <p className="text-sm text-green-700">Name: MICHAEL KIHUGU</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <p>Go to M-Pesa &gt; Lipa na M-Pesa &gt; Pochi la Biashara</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <p>Enter Phone Number: <strong >0746043054</strong></p>
                </div>
                
                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <p>Enter Amount: <span className="font-bold text-black text-lg">Ksh {depositAmount.toLocaleString()}</span></p>
                      <p className="text-xs text-rose-600 font-medium">(50% Deposit)</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <p>Enter your PIN and send.</p>
                </div>
            </div>

            {/* Price Summary */}
            <div className="mt-8 bg-gray-50 p-4 rounded-xl space-y-2 border border-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total Order Value:</span>
                <span>Ksh {safeTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>To Pay Now (50%):</span>
                <span className="font-bold text-green-600">Ksh {depositAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 pt-2 border-t border-gray-200">
                <span>Balance on Delivery:</span>
                <span>Ksh {balanceAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: User Details Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-rose-500">
            <div className="space-y-5">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input required placeholder="07..." value={formData.phone_number} onChange={e => setFormData({...formData, phone_number: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label>Delivery Location</Label>
                <Input required placeholder="e.g. dekut gate A:Bella Apartments ,room..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>

              {/* 👇 NEW: Delivery Date and Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-600" /> Date
                  </Label>
                  <Input 
                    required 
                    type="date" 
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    value={formData.delivery_date} 
                    onChange={e => setFormData({...formData, delivery_date: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-600" /> Time
                  </Label>
                  <Input 
                    required 
                    type="time" 
                    value={formData.delivery_time} 
                    onChange={e => setFormData({...formData, delivery_time: e.target.value})} 
                  />
                </div>
              </div>

              <div className="pt-4 pb-2">
                <div className="h-px bg-gray-100"></div>
              </div>

              <div className="space-y-2 bg-rose-50 p-5 rounded-xl border border-rose-100">
                <Label className="text-rose-900 font-bold flex items-center justify-between">
                    <span>M-Pesa Transaction Code</span>
                    <span className="text-[10px] bg-white px-2 py-1 rounded border border-rose-200 text-rose-500 uppercase">Required</span>
                </Label>
                <Input 
                  required 
                  placeholder="e.g. SDE28KH..." 
                  className="uppercase tracking-widest font-bold text-center text-lg border-rose-300 focus-visible:ring-rose-500 h-12"
                  value={formData.transaction_code}
                  onChange={e => setFormData({...formData, transaction_code: e.target.value.toUpperCase()})}
                />
                <p className="text-xs text-center text-gray-500">
                  Enter the code from the <strong>Ksh {depositAmount.toLocaleString()}</strong> payment SMS.
                </p>
              </div>

              <Button disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-14 text-lg rounded-xl shadow-lg shadow-rose-200 mt-4 transition-all hover:scale-[1.01]">
                {loading ? <Loader2 className="animate-spin mr-2" /> : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Confirm Deposit & Place Order
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;