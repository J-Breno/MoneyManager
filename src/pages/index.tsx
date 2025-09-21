import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BalanceCard from '@/components/dashboard/BalanceCard';
import TransactionList, { Transaction } from '@/components/transactions/TransactionList';
import TransactionModal from '@/components/transactions/TransactionModal';
import { storage, STORAGE_KEYS } from '@/utils/storage';

const Home: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const defaultCategories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Salário',
    'Freelance',
    'Investimentos',
    'Outros'
  ];

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = () => {
    if (!user) return;
    
    const userTransactions = storage.get<Transaction[]>(
      STORAGE_KEYS.TRANSACTIONS(user.id)
    ) || [];
    
    setTransactions(userTransactions);
  };

  const saveTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (!user) return;

    let updatedTransactions: Transaction[];
    
    if (editingTransaction) {
      updatedTransactions = transactions.map(t =>
        t.id === editingTransaction.id
          ? { ...transactionData, id: editingTransaction.id }
          : t
      );
    } else {
      const newTransaction: Transaction = {
        ...transactionData,
        id: Date.now().toString()
      };
      updatedTransactions = [...transactions, newTransaction];
    }

    storage.set(STORAGE_KEYS.TRANSACTIONS(user.id), updatedTransactions);
    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (id: string) => {
    if (!user) return;
    
    const updatedTransactions = transactions.filter(t => t.id !== id);
    storage.set(STORAGE_KEYS.TRANSACTIONS(user.id), updatedTransactions);
    setTransactions(updatedTransactions);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const balance = totals.income - totals.expenses;

  const filteredTransactions = transactions
    .filter(transaction => {
      if (filter === 'income') return transaction.type === 'income';
      if (filter === 'expense') return transaction.type === 'expense';
      return true;
    })
    .filter(transaction =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDEAEF]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A950C4]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Money Manager</title>
        <meta name="description" content="Dashboard do Money Manager" />
      </Head>

      <DashboardLayout 
        title="Dashboard" 
        showAddButton 
        onAddClick={() => setIsModalOpen(true)}
      >
        {/* Balance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <BalanceCard
            balance={balance}
            income={totals.income}
            expenses={totals.expenses}
            isBalanceVisible={isBalanceVisible}
            onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
          />
        </motion.div>

        {/* Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === 'all'
                  ? 'bg-[#c300ff] border-[#A950C4] text-white'
                  : 'border-[#E7E4E9] text-[#666566] hover:border-[#A950C4] bg-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === 'income'
                  ? 'bg-[#00ff37] bg-opacity-20 border-[#32D957] text-[#28BB49]'
                  : 'border-[#E7E4E9] text-[#666566] hover:border-[#32D957] bg-white'
              }`}
            >
              Entradas
            </button>
            <button
              onClick={() => setFilter('expense')}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === 'expense'
                  ? 'bg-[#ff0101] bg-opacity-20 border-[#EB3D3D] text-[#D03333]'
                  : 'border-[#E7E4E9] text-[#666566] hover:border-[#EB3D3D] bg-white'
              }`}
            >
              Saídas
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-[#E7E4E9] shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold text-[#232224]">Últimas Transações</h2>
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#A950C4] transition-colors text-[#232224] w-full sm:w-auto"
              />
              <span className="text-sm text-[#666566] whitespace-nowrap">
                {filteredTransactions.length} transações
              </span>
            </div>
          </div>

          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
            onFilter={setFilter}
          />
        </motion.div>

        <TransactionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={saveTransaction}
          editingTransaction={editingTransaction}
          categories={defaultCategories}
        />
      </DashboardLayout>
    </>
  );
};

export default Home;