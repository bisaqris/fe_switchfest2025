"use client";
import { FC, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";

type NavItem = {
  name: string;
  icon: ReactNode;
  path: string;
};

const navItems: NavItem[] = [
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

const AppSidebar: FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

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
      {/* Logo */}
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

      {/* Menu Items */}
      <nav className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <ul className="flex flex-col gap-4">
          {navItems.map((nav) => (
            <li key={nav.name}>
              <Link
                href={nav.path}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors
                  ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}
                  ${isActive(nav.path)
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    // Ganti 'menu-item-inactive' dengan class Tailwind biasa
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`
                }
              >
                <span className="text-xl">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="font-medium">{nav.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;