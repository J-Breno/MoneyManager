import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onFilter: (filter: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  onFilter
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-400"
      >
        <div className="text-6xl mb-4">📊</div>
        <p>Nenhuma transação encontrada</p>
        <p className="text-sm">Adicione sua primeira transação para começar</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#232224] rounded-xl p-4 border border-[#353436] hover:border-purple-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-3 rounded-xl ${
                  transaction.type === 'income' 
                    ? 'bg-green-500 bg-opacity-20 text-green-400' 
                    : 'bg-red-500 bg-opacity-20 text-red-400'
                }`}>
                  {transaction.type === 'income' ? 
                    <ArrowUpCircle size={20} /> : 
                    <ArrowDownCircle size={20} />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{transaction.description}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-blue-400 hover:bg-blue-400 hover:bg-opacity-10 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TransactionList;