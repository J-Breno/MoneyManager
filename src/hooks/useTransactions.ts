import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { useAuth } from './useAuth';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (user) {
      const userTransactions = storage.get<Transaction[]>(STORAGE_KEYS.TRANSACTIONS(user.id)) || [];
      const userCategories = storage.get<Category[]>(STORAGE_KEYS.CATEGORIES(user.id)) || [];
      
      if (userCategories.length === 0) {
        const defaultCategories: Category[] = [
          { id: '1', name: 'Salário', type: 'income', color: '#32D957' },
          { id: '2', name: 'Freelance', type: 'income', color: '#50E170' },
          { id: '3', name: 'Investimentos', type: 'income', color: '#28BB49' },
          { id: '4', name: 'Alimentação', type: 'expense', color: '#EB3D3D' },
          { id: '5', name: 'Transporte', type: 'expense', color: '#F05454' },
          { id: '6', name: 'Moradia', type: 'expense', color: '#D03333' },
          { id: '7', name: 'Lazer', type: 'expense', color: '#FFCE52' },
          { id: '8', name: 'Saúde', type: 'expense', color: '#FFD76B' },
          { id: '9', name: 'Educação', type: 'expense', color: '#D9B043' },
        ];
        storage.set(STORAGE_KEYS.CATEGORIES(user.id), defaultCategories);
        setCategories(defaultCategories);
      } else {
        setCategories(userCategories);
      }
      
      setTransactions(userTransactions);
    }
  }, [user]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    if (!user) return false;
    
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    storage.set(STORAGE_KEYS.TRANSACTIONS(user.id), updatedTransactions);
    
    return true;
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    if (!user) return false;
    
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === id ? { ...transaction, ...updates } : transaction
    );
    
    setTransactions(updatedTransactions);
    storage.set(STORAGE_KEYS.TRANSACTIONS(user.id), updatedTransactions);
    
    return true;
  };

  const deleteTransaction = (id: string) => {
    if (!user) return false;
    
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    storage.set(STORAGE_KEYS.TRANSACTIONS(user.id), updatedTransactions);
    
    return true;
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    if (!user) return false;
    
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    storage.set(STORAGE_KEYS.CATEGORIES(user.id), updatedCategories);
    
    return true;
  };

  const getBalance = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income,
      expense,
      total: income - expense,
    };
  };

  const getTransactionsByPeriod = (startDate: string, endDate: string) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    });
  };

  return {
    transactions,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    getBalance,
    getTransactionsByPeriod,
  };
};