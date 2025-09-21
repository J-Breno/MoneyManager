import { NextPageContext } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ErrorPageProps {
  statusCode: number;
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (statusCode === 404) {
      if (router.asPath !== '/404') {
        sessionStorage.setItem('notFoundPath', router.asPath);
        router.replace('/404');
      }
    }
  }, [statusCode, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDEAEF]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;