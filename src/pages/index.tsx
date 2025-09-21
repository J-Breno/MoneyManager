import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-[#161617]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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

      <DashboardLayout title="Dashboard">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105"
          >
            <Plus size={20} />
            <span>Nova Transação</span>
          </button>

          <div className="flex-1 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === 'all'
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'border-[#353436] text-gray-400 hover:border-purple-600'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === 'income'
                  ? 'bg-green-500 bg-opacity-20 border-green-500 text-green-400'
                  : 'border-[#353436] text-gray-400 hover:border-green-500'
              }`}
            >
              Entradas
            </button>
            <button
              onClick={() => setFilter('expense')}
              className={`px-4 py-2 rounded-xl border transition-all ${
                filter === 'expense'
                  ? 'bg-red-500 bg-opacity-20 border-red-500 text-red-400'
                  : 'border-[#353436] text-gray-400 hover:border-red-500'
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
          className="bg-[#232224] rounded-2xl p-6 border border-[#353436]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Últimas Transações</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#353436] border border-[#454446] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-600 transition-colors"
              />
              <span className="text-sm text-gray-400">
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