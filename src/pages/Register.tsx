import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/lib/api';
import { UserPlus } from 'lucide-react';
import Navbar from '@/components/Navbar';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Register (Send password1 & password2 for Django)
      await api.post('/auth/registration/', {
        username: formData.username,
        email: formData.email,
        password1: formData.password,       
        password2: formData.confirmPassword 
      });
      
      // 2. Auto-Login (THE FIX IS HERE)
      // We must send the actual 'username' we just created, NOT the email.
      const res = await api.post('/auth/login/', {
        username: formData.username, // <--- Fixed: Use username, not email
        email: formData.email,
        password: formData.password
      });

      // 3. Save Data & Redirect
      localStorage.setItem('token', res.data.key);
      localStorage.setItem('userEmail', formData.email);
      navigate('/');
      
    } catch (err: any) {
      console.error("Registration Error:", err.response?.data);
      
      // Smart Error Handling: Extract the exact message from Django
      let msg = "Registration failed. Try again.";
      
      if (err.response?.data) {
        // If Django returns { username: ["User exists"] }
        const errorData = err.response.data;
        const firstKey = Object.keys(errorData)[0]; // e.g., 'username', 'password', 'email'
        
        if (firstKey && Array.isArray(errorData[firstKey])) {
             msg = `${firstKey.charAt(0).toUpperCase() + firstKey.slice(1)}: ${errorData[firstKey][0]}`;
        } else if (errorData.key) {
             msg = "Invalid credentials during auto-login.";
        }
      }
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />
      <div className="flex items-center justify-center pt-20 px-4 pb-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100">
          <div className="text-center mb-6">
            <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserPlus className="text-rose-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm">Join LoveBox for exclusive deals</p>
          </div>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
              <input 
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="johndoe"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
                <div className='col-span-2 md:col-span-1'>
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <input 
                    type="password" required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                />
                </div>
                <div className='col-span-2 md:col-span-1'>
                <label className="text-xs font-bold text-gray-500 uppercase">Confirm</label>
                <input 
                    type="password" required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                />
                </div>
            </div>

            <button disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-bold transition-all">
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-rose-600 font-bold hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;