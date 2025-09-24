"use client";
import { FC, ReactNode, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { useAuth } from "./AuthContext";

type NavItem = {
  name: string;
  icon: ReactNode;
  path: string;
};

const navItemsAdmin: NavItem[] = [
  {
    icon: <LuLayoutDashboard />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <LuUsers />,
    name: "Users",
    path: "/dashboard/users",
  },
];

const navItemsHr: NavItem[] = [
  {
    icon: <LuLayoutDashboard />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <LuUsers />,
    name: "Users",
    path: "/dashboard/users",
  },
];

const navItemsUser: NavItem[] = [
  {
    icon: <LuLayoutDashboard />,
    name: "Dashboard",
    path: "/dashboard",
  },
];

const AppSidebar: FC = () => {
  const { user } = useAuth();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const visibleNavItems = useMemo(() => {
    if (user?.role === 'admin') {
      return navItemsAdmin
    }
    console.log(user?.role)
    if (user?.role === 'hr') {
      return navItemsHr
    }
    if (user?.role === 'user') {
      return navItemsUser
    }
  }, [user])

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={index}>
          <Link href={nav.path} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive(nav.path) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
            <span>{nav.icon}</span>
            {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed mt-16 flex h-screen flex-col lg:mt-0 top-0 left-0 z-50 border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 
        ${isExpanded || isHovered ? "w-[290px]" : "w-[90px]"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/dashboard">
          {isExpanded || isHovered || isMobileOpen ? (
            <Image
              className="dark:hidden"
              src="/images/logo/logo.svg"
              alt="Logo"
              width={150}
              height={40}
            />
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>

      <nav className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <ul className="flex flex-col gap-4">
          <div>
            <h2 className={`mb-4 ...`}>
              {isExpanded || isHovered || isMobileOpen ? "Menu" : <BsThreeDots />}
            </h2>
            {renderMenuItems(visibleNavItems ?? [])}
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;