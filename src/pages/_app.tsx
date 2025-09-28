import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AppLayout from "@/layout/AppLayout";
import { AuthProvider } from "@/layout/AuthContext";
import MainLayout from "@/layout/MainLayout";
import PublicLayout from "@/layout/PublicLayout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      const router = useRouter();

      if (router.pathname.startsWith('/dashboard')) {
        return (
          <SidebarProvider>
            <MainLayout>{page}</MainLayout>
          </SidebarProvider>
        );
      }
      return <PublicLayout>{page}</PublicLayout>;
    });

  return (
    <AuthProvider>
      <ThemeProvider>
        {getLayout(<Component {...pageProps} />)}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
          containerStyle={{
            zIndex: 99999999,
          }}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}
