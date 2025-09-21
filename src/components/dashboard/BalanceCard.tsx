import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
  isBalanceVisible: boolean;
  onToggleVisibility: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  income,
  expenses,
  isBalanceVisible,
  onToggleVisibility
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Saldo Total</h2>
        <button
          onClick={onToggleVisibility}
          className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
        >
          {isBalanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="mb-6">
        <motion.div
          key={isBalanceVisible ? 'visible' : 'hidden'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-bold text-white"
        >
          {isBalanceVisible ? formatCurrency(balance) : '•••••••'}
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-10 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2 text-green-300 mb-2">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">Entradas</span>
          </div>
          <div className="text-white font-semibold">{formatCurrency(income)}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white bg-opacity-10 rounded-xl p-4"
        >
          <div className="flex items-center space-x-2 text-red-300 mb-2">
            <TrendingDown size={16} />
            <span className="text-sm font-medium">Saídas</span>
          </div>
          <div className="text-white font-semibold">{formatCurrency(expenses)}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;