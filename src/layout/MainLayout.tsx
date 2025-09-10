// src/components/layouts/MainLayout.tsx

import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import Backdrop from './Backdrop';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from './AuthContext';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    } else {
      setIsVerified(true);
    }
  }, [isAuthenticated, router]);

  if (!isVerified) {
    return <div>Loading Dashboard...</div>;
  }

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}