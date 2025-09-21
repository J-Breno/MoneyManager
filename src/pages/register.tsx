import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

const Register: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Registro | Money Manager</title>
        <meta name="description" content="Crie sua conta no Money Manager" />
      </Head>

      <div className="min-h-screen flex bg-dark-900">
        

        <div className="flex-1 flex items-center justify-center ">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;