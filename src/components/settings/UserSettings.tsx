import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Save, Camera, Eye, EyeOff, Lock} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import Image from 'next/image';

const UserSettings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: '',
    notifications: true,
    currency: 'BRL',
    language: 'pt-BR'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        toast.error('As senhas não coincidem');
        return;
      }

      if (!user || !user.id) {
        toast.error('Usuário não encontrado');
        return;
      }

      const updatedUser = {
        id: user.id,
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
        createdAt: user.createdAt || new Date().toISOString()
      };

      const success = updateProfile(updatedUser);
      
      if (success) {
        toast.success('Perfil atualizado com sucesso!');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        toast.error('Erro ao atualizar perfil');
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 2MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Formato de imagem não suportado. Use JPG, PNG ou GIF.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData(prev => ({
      ...prev,
      avatar: ''
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-[#232224] mb-2">Configurações</h1>
        <p className="text-[#666566]">Gerencie suas preferências e informações pessoais</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-2xl p-6 border border-[#E7E4E9] shadow-sm">
            <nav className="space-y-2">
              <button className="w-full text-left p-3 rounded-xl bg-[#F7F2FA] text-[#5F296F] border border-[#E1DEE3] font-medium">
                <div className="flex items-center space-x-3">
                  <User size={20} />
                  <span>Perfil</span>
                </div>
              </button>
            </nav>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 border border-[#E7E4E9] shadow-sm">
            <h2 className="text-xl font-semibold text-[#232224] mb-4">Foto do Perfil</h2>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-[#A950C4] to-[#9142A8] rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {formData.avatar ? (
                    <Image
                      src={formData.avatar}
                      alt="Avatar"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-[#5F296F] p-2 rounded-full cursor-pointer hover:bg-[#78358C] transition-colors">
                  <Camera size={16} className="text-white" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex-1">
                <p className="text-[#666566] text-sm mb-2">
                  Formatos suportados: JPG, PNG, GIF. Tamanho máximo: 2MB
                </p>
                {formData.avatar && (
                  <button 
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-[#5F296F] text-sm font-medium hover:underline"
                  >
                    Remover foto
                  </button>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl p-6 border border-[#E7E4E9] shadow-sm">
            <h2 className="text-xl font-semibold text-[#232224] mb-6">Informações Pessoais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#666566] mb-2">Nome completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666566]" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#A950C4] transition-colors text-[#232224]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#666566] mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666566]" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#A950C4] transition-colors text-[#232224]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#E7E4E9] pt-6 mb-6">
              <h3 className="text-lg font-semibold text-[#232224] mb-4">Alterar Senha</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#666566] mb-2">Senha atual</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666566]" size={20} />
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-[#A950C4] transition-colors text-[#232224]"
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666566]"
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#666566] mb-2">Nova senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666566]" size={20} />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-[#A950C4] transition-colors text-[#232224]"
                      placeholder="Digite a nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666566]"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#666566] mb-2">Confirmar senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666566]" size={20} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F2FA] border border-[#E7E4E9] rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-[#A950C4] transition-colors text-[#232224]"
                      placeholder="Confirme a nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666566]"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#E7E4E9]">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-[#A950C4] to-[#9142A8] text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Save size={20} />
                )}
                <span>{isLoading ? 'Salvando...' : 'Salvar Alterações'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserSettings;