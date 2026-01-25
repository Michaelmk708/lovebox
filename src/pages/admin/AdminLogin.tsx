import { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '', // Admins usually login with username, not email
    password: ''
  });

  // 1. Clear any old customer data as soon as this page opens
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Note: Adjust endpoint if you use email for admin too
      const response = await api.post('/auth/login/', formData);
      
      const { key } = response.data;
      
      // 2. Save Admin Token
      localStorage.setItem('token', key);
      
      // 3. Save a distinct name so Navbar is clear (Optional)
      localStorage.setItem('userEmail', `Admin: ${formData.username}`);
      
      navigate('/admin/dashboard');

    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
          <p className="text-gray-500 text-sm">Authorized personnel only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Username / Email</Label>
            <Input 
              required 
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              type="password"
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <Button disabled={loading} className="w-full bg-gray-900 hover:bg-gray-800 h-12">
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;