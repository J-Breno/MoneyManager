import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Settings, 
  LogOut, 
  Wallet, 
  Menu,
  X,
  User,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  showAddButton = false,
  onAddClick 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#EDEAEF] flex">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 100 }}
        className="fixed lg:relative w-50 lg:w-80 h-[1000px] bg-white border-r border-[#E1DEE3] z-50 lg:z-auto lg:translate-x-0 shadow-lg lg:shadow-none"
      >
        <div className="p-6 border-b border-[#E7E4E9]">
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#A950C4] to-[#9142A8] rounded-xl flex items-center justify-center">
                <Wallet size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-[#232224]">Money Manager</span>
            </motion.div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#F7F2FA] transition-colors"
            >
              <X size={20} className="text-[#454446]" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3 p-4 bg-[#F7F2FA] rounded-xl"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#A950C4] to-[#9142A8] rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-[#232224]">{user?.name}</p>
              <p className="text-xs text-[#666566] truncate">{user?.email}</p>
            </div>
          </motion.div>
        </div>

        <nav className="p-6 space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                router.pathname === item.path
                  ? 'bg-[#F7F2FA] text-[#5F296F] border border-[#E1DEE3]'
                  : 'text-[#666566] hover:bg-[#F7F2FA] hover:text-[#5F296F]'
              }`}
            >
              <item.icon size={20} className={router.pathname === item.path ? 'text-[#5F296F]' : 'text-[#666566]'} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-6 left-6 right-6"
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl text-[#EB3D3D] hover:bg-[#F7F2FA] transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </motion.div>
      </motion.div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-[#E7E4E9] p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-[#F7F2FA] transition-colors"
              >
                <Menu size={20} className="text-[#454446]" />
              </button>
              <h1 className="text-xl lg:text-2xl font-bold text-[#232224]">{title}</h1>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666566]" size={20} />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#c300ff] transition-colors text-[#232224] w-40 lg:w-48"
                />
              </div>

              {showAddButton && onAddClick && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAddClick}
                  className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-[#c300ff] to-[#db67ff] text-white py-2 px-3 lg:px-4 rounded-xl font-semibold transition-all text-sm lg:text-base"
                >
                  <Plus size={18} className="lg:size-5" />
                  <span className="hidden sm:block">Adicionar</span>
                </motion.button>
              )}

              <button className="p-2 rounded-lg hover:bg-[#F7F2FA] transition-colors relative">
                <Bell size={20} className="text-[#454446]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EB3D3D] rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-[#EDEAEF]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;