import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/lib/api';
import { LogIn, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 🚀 Smart Login Payload
      // We send the input value to BOTH 'username' and 'email' fields.
      // Since we set ACCOUNT_AUTHENTICATION_METHOD = 'username_email', 
      // Django will check both columns for a match.
      const res = await api.post('/auth/login/', {
        username: formData.email, // Send input as username
        email: formData.email,    // Send input as email too
        password: formData.password
      });

      // Save credentials
      localStorage.setItem('token', res.data.key);
      localStorage.setItem('userEmail', formData.email);
      
      navigate('/checkout'); 
    } catch (err: any) {
      console.error("Login Error:", err.response?.data);
      setError("Invalid Email or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100">
          <div className="text-center mb-6">
            <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <LogIn className="text-rose-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Login to continue your shopping</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
              <input 
                type="email" 
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="name@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
              <input 
                type="password" 
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-bold transition-all">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/register" className="text-rose-600 font-bold hover:underline">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;