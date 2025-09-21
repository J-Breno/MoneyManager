import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Rocket, BarChart, PieChart, Target } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword, validateName } from '@/utils/validation';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string; 
    general?: string 
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = password !== confirmPassword ? 'As senhas não coincidem' : '';
    
    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({ 
        name: nameError, 
        email: emailError, 
        password: passwordError, 
        confirmPassword: confirmPasswordError 
      });
      setIsLoading(false);
      
      if (nameError) toast.error(nameError);
      if (emailError) toast.error(emailError);
      if (passwordError) toast.error(passwordError);
      if (confirmPasswordError) toast.error(confirmPasswordError);
      return;
    }
    
    const result = register(name, email, password);
    
    if (result.success) {
      toast.success('Conta criada com sucesso!');
      
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } else {
      setErrors({ general: result.message });
      toast.error(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #EDEAEF',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="min-h-screen w-full flex bg-[#EDEAEF]">
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-700 to-purple-900 p-12 flex-col justify-center text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <h2 className="text-4xl font-bold mb-6">Junte-se a milhares de usuários</h2>
            <p className="text-purple-100 text-lg mb-8">
              Comece sua jornada para o controle financeiro e alcance a liberdade que você merece.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visão completa</h3>
                  <p className="text-purple-200">Tenha uma visão 360° das suas finanças</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                  <BarChart size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Metas personalizadas</h3>
                  <p className="text-purple-200">Defina e acompanhe suas metas financeiras</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Alertas inteligentes</h3>
                  <p className="text-purple-200">Receba alertas sobre gastos incomuns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl mb-4"
              >
                <Rocket size={32} className="text-white" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2 text-gray-800"
              >
                Criar conta
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                Preencha os dados abaixo para começar
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              {errors.general && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  {errors.general}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  type="text"
                  label="Nome completo"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                  leftIcon={<User size={20} className="text-gray-400" />}
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 text-gray-800"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  type="email"
                  label="Email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  leftIcon={<Mail size={20} className="text-gray-400" />}
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 text-gray-800"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Senha"
                  placeholder="Crie uma senha segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  leftIcon={<Lock size={20} className="text-gray-400" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 text-gray-800"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirmar senha"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  leftIcon={<Lock size={20} className="text-gray-400" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                  className="bg-gray-50 border-gray-200 focus:border-purple-500 text-gray-800"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/20"
                >
                  {isLoading ? 'Criando conta...' : 'Criar conta'}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center pt-4 border-t border-gray-100"
              >
                <p className="text-gray-600 text-sm">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                    Fazer login
                  </Link>
                </p>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
            >
              <div className="flex items-center text-sm text-purple-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Seus dados estão protegidos com criptografia</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;