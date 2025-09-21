import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserSettings from '@/components/settings/UserSettings';
import { useAuth } from '@/hooks/useAuth';

const Settings: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

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
        <title>Configurações | Money Manager</title>
        <meta name="description" content="Configure suas preferências no Money Manager" />
      </Head>

      <DashboardLayout title="Configurações">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserSettings />
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default Settings;