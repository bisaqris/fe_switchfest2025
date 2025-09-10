import { ThemeProvider } from "@/context/ThemeContext";
import AppLayout from "@/layout/AppLayout";
import { AuthProvider } from "@/layout/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
          containerStyle={{
            zIndex: 9999,
          }}
        />
      </ThemeProvider>
    </AuthProvider>
  );
}
