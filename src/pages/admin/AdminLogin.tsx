import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { ShieldCheck, Lock } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🚀 STRATEGY: Send the email inside the 'username' field.
      // With ACCOUNT_AUTHENTICATION_METHOD = 'username_email', Django checks both columns.
      const res = await api.post('/auth/login/', { 
        username: email, 
        email: "",      // Leave this empty to force it to look at 'username'
        password: password 
      });

    

      const token = res.data.key;
      
     
      // If successful:
      localStorage.setItem('adminToken', token); // Use a different key for admin
      navigate('/admin/dashboard');

    } catch (err) {
      console.error(err);
      setError("Access Denied. You are not an Admin.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
        <div className="flex justify-center mb-6">
          <ShieldCheck className="w-12 h-12 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Admin Portal</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Authorized Personnel Only</p>

        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded text-sm text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
            <input 
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-3 pl-10 focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Admin Email"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input 
            type="password"
            className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-3 px-4 focus:ring-2 focus:ring-rose-500 outline-none"
            placeholder="Password"
            value={password} onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition-all">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;