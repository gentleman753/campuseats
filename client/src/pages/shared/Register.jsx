import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import PageTransition from '../../components/common/PageTransition';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role
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
      navigate('/');
    }
  }, [error, user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <PageTransition className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
        {/* Left Side - Image/Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-secondary-600 p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-6 font-display"
            >
              Join CampusEats
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-secondary-100"
            >
              Create an account to start pre-ordering from your favorite campus canteens.
            </motion.p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">Create Account</h2>
            <p className="text-slate-500 mb-8">Fill in your details to get started.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

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

              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">I am a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${formData.role === 'student'
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'manager' })}
                    className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${formData.role === 'manager'
                      ? 'border-secondary-600 bg-secondary-50 text-secondary-700'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                  >
                    Manager
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3 text-lg mt-4"
                isLoading={loading}
              >
                Sign Up
              </Button>
            </form>

            <div className="mt-8 text-center text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;