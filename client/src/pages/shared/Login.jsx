import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import PageTransition from '../../components/common/PageTransition';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (user) {
      if (user.role === 'manager') navigate('/manager/dashboard');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/');
    }
  }, [error, user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <PageTransition className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Left Side - Image/Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-primary-600 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-6 font-display"
            >
              Welcome Back!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-primary-100"
            >
              Order your favorite campus meals in seconds. Skip the line, enjoy the food.
            </motion.p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">Sign In</h2>
            <p className="text-slate-500 mb-8">Enter your credentials to access your account.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3 text-lg"
                isLoading={loading}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 text-center text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;