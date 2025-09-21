import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { storage, STORAGE_KEYS } from '@/utils/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = storage.get<User>(STORAGE_KEYS.CURRENT_USER);
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): { success: boolean; message: string } => {
    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const userCredentials = storage.get<{[email: string]: string}>(STORAGE_KEYS.USER_CREDENTIALS) || {};
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'Email ou senha estão errados' };
    }

    const savedPassword = userCredentials[email];
    if (password !== savedPassword) {
      return { success: false, message: 'Email ou senha estão errados' };
    }

    storage.set(STORAGE_KEYS.CURRENT_USER, user);
    setUser(user);
    return { success: true, message: 'Login realizado com sucesso' };
  };

  const register = (name: string, email: string, password: string): { success: boolean; message: string } => {
    const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
    const userCredentials = storage.get<{[email: string]: string}>(STORAGE_KEYS.USER_CREDENTIALS) || {};
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email já cadastrado' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    storage.set(STORAGE_KEYS.USERS, updatedUsers);
    
    userCredentials[email] = password;
    storage.set(STORAGE_KEYS.USER_CREDENTIALS, userCredentials);
    
    return { success: true, message: 'Conta criada com sucesso' };
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
    router.push('/login');
  };

  const updateProfile = (updatedUser: User): boolean => {
    try {
      if (!updatedUser.id) {
        console.error('Usuário não possui ID');
        return false;
      }

      const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
      const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
      
      storage.set(STORAGE_KEYS.USERS, updatedUsers);
      storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser);
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return false;
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
};