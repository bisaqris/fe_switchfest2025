import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import MainLayout from "./MainLayout";
import { ReactNode, useEffect } from "react";
import PublicLayout from "./PublicLayout";

export default function AppLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    // const { isAuthenticated } = useAuth();
    // console.log("LOGINKAH??? ", isAuthenticated)

    if (router.pathname.startsWith('/dashboard')) {
        return (
            <SidebarProvider>
                <MainLayout>{children}</MainLayout>
            </SidebarProvider>
        );
    }

    return <PublicLayout>{children}</PublicLayout>
}