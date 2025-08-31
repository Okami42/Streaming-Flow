'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { LoginCredentials, RegisterCredentials } from '@/lib/auth-types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();

  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterCredentials>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

  const resetForms = () => {
    setLoginForm({ username: '', password: '' });
    setRegisterForm({ username: '', password: '', confirmPassword: '' });
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(loginForm);
    
    if (result.success) {
      handleClose();
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    const result = await register(registerForm);
    
    if (result.success) {
      handleClose();
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-black/80 overflow-y-auto" style={{ position: 'fixed' }}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#141414] rounded-lg max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto shadow-2xl relative z-[10000]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                     <input
                     type="text"
                     value={loginForm.username}
                     onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                     className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                     placeholder="Votre nom d'utilisateur"
                     required
                   />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                     <input
                     type={showPassword ? 'text' : 'password'}
                     value={loginForm.password}
                     onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                     className="w-full pl-10 pr-12 py-3 bg-[#252525] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                     placeholder="Votre mot de passe"
                     required
                   />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                     <input
                     type="text"
                     value={registerForm.username}
                     onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                     className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                     placeholder="Votre nom d'utilisateur"
                     required
                   />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                     <input
                     type={showPassword ? 'text' : 'password'}
                     value={registerForm.password}
                     onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                     className="w-full pl-10 pr-12 py-3 bg-[#252525] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                     placeholder="Au moins 6 caractères"
                     required
                   />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                     <input
                     type={showConfirmPassword ? 'text' : 'password'}
                     value={registerForm.confirmPassword}
                     onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                     className="w-full pl-10 pr-12 py-3 bg-[#252525] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                     placeholder="Confirmez votre mot de passe"
                     required
                   />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:cursor-not-allowed"
              >
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>
              </div>
            </form>
          )}

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
            </p>
            <button
              onClick={() => handleModeSwitch(mode === 'login' ? 'register' : 'login')}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors mt-1"
            >
              {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
