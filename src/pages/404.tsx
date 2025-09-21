import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Home, AlertTriangle, Search} from 'lucide-react';
import Button from '@/components/ui/Button';

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  const [path, setPath] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
  setIsClient(true);
  
    const notFoundPath = sessionStorage.getItem('notFoundPath');
    if (notFoundPath) {
        setPath(notFoundPath);
        sessionStorage.removeItem('notFoundPath');
    } else {
        setPath(router.asPath);
    }
    }, [router.asPath]);

  useEffect(() => {
    setIsClient(true);
    setPath(router.asPath);
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Página Não Encontrada | Money Manager</title>
        <meta name="description" content="Página não encontrada" />
      </Head>

      <div className="min-h-screen bg-[#EDEAEF] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
              >
                <AlertTriangle size={40} className="text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold mb-2">404</h1>
              <p className="text-purple-100 text-lg">Página não encontrada</p>
            </div>

            <div className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Search size={32} className="text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Você se perdeu?</h2>
                <p className="text-gray-600 mb-2">
                  Não conseguimos encontrar a página{' '}
                  {isClient ? (
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{path}</span>
                  ) : (
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">...</span>
                  )}
                </p>
                <p className="text-gray-600">
                  Volte para a página inicial e tente novamente.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                
                
                
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/" passHref>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center"
                  >
                    <Home size={20} className="mr-2" />
                    Página Inicial
                  </Button>
                </Link>
                
                
              </motion.div>
            </div>

            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Money Manager • Controle suas finanças com facilidade
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;