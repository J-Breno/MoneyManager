import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, DollarSign, FileText, Tag } from 'lucide-react';
import { Transaction } from './TransactionList';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  editingTransaction?: Transaction | null;
  categories: string[];
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTransaction,
  categories
}) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setAmount(editingTransaction.amount.toString());
      setDescription(editingTransaction.description);
      setCategory(editingTransaction.category);
      setDate(new Date(editingTransaction.date).toISOString().split('T')[0]);
    } else {
      resetForm();
    }
  }, [editingTransaction, isOpen]);

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setCustomCategory('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = category === 'outro' ? customCategory : category;
    
    if (!amount || !description || !finalCategory || !date) {
      return;
    }

    onSave({
      type,
      amount: parseFloat(amount),
      description,
      category: finalCategory,
      date
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#232224] rounded-2xl p-6 w-full max-w-md border border-[#353436]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-[#353436] rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`p-3 rounded-xl border transition-all ${
                    type === 'income'
                      ? 'bg-green-500 bg-opacity-20 border-green-500 text-green-400'
                      : 'border-[#353436] text-gray-400 hover:border-purple-600'
                  }`}
                >
                  Entrada
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`p-3 rounded-xl border transition-all ${
                    type === 'expense'
                      ? 'bg-red-500 bg-opacity-20 border-red-500 text-red-400'
                      : 'border-[#353436] text-gray-400 hover:border-purple-600'
                  }`}
                >
                  Saída
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Valor</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full bg-[#353436] border border-[#454446] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-600 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Descrição</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Almoço, Salário, etc."
                    className="w-full bg-[#353436] border border-[#454446] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-600 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Categoria</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#353436] border border-[#454446] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-600 transition-colors appearance-none"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              {category === 'outro' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Nova Categoria</label>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Digite o nome da categoria"
                    className="w-full bg-[#353436] border border-[#454446] rounded-xl px-4 py-3 focus:outline-none focus:border-purple-600 transition-colors"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Data</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#353436] border border-[#454446] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-600 transition-colors"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                {editingTransaction ? 'Atualizar' : 'Adicionar'} Transação
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;