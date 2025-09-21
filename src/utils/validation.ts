export const validateEmail = (email: string): string => {
  if (!email) return 'Email é obrigatório';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido';
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) return 'Senha é obrigatória';
  if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
  return '';
};

export const validateName = (name: string): string => {
  if (!name) return 'Nome é obrigatório';
  if (name.length < 2) return 'Nome deve ter pelo menos 2 caracteres';
  return '';
};

export const validateAmount = (amount: string): string => {
  if (!amount) return 'Valor é obrigatório';
  if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return 'Valor deve ser um número positivo';
  return '';
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value) return `${fieldName} é obrigatório`;
  return '';
};