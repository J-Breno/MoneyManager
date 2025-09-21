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
        className="text-center py-12 text-[#666566]"
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
            className="bg-white rounded-xl p-4 border border-[#E7E4E9] hover:border-[#A950C4] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`p-3 rounded-xl ${
                  transaction.type === 'income' 
                    ? 'bg-[#50E170] bg-opacity-20 text-[#28BB49]' 
                    : 'bg-[#F05454] bg-opacity-20 text-[#D03333]'
                }`}>
                  {transaction.type === 'income' ? 
                    <ArrowUpCircle size={20} /> : 
                    <ArrowDownCircle size={20} />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate text-[#232224]">{transaction.description}</h3>
                  <div className="flex items-center space-x-4 text-sm text-[#666566]">
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-[#28BB49]' : 'text-[#D03333]'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(transaction)}
                    className="p-2 text-[#5F296F] hover:bg-[#F7F2FA] rounded-lg transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 text-[#EB3D3D] hover:bg-[#F7F2FA] rounded-lg transition-colors"
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