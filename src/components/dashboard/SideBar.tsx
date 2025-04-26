"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  BookOpen,
  Search,
  ArrowLeftRight,
  Clock,
  SendHorizontal,
  CircleChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuItems = [
    {
      icon: <BookOpen size={20} />,
      label: "Portfolio",
      href: "/c/portfolio",
    },
    { icon: <Search size={20} />, label: "Explore", href: "/c/explore" },
    {
      icon: <SendHorizontal size={20} />,
      label: "Transfer",
      href: "/c/transfer",
    },
    {
      icon: <Clock size={20} />,
      label: "Transactions",
      href: "/c/transactions",
    },
    { icon: <ArrowLeftRight size={20} />, label: "Swap", href: "/c/swap" },
    {
      icon: <CircleChevronRight size={20} />,
      label: "Create token",
      href: "/c/create-token",
    },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== undefined) {
        // Check if we're at the bottom of the page
        const isAtBottom = 
          window.innerHeight + window.scrollY >= 
          document.documentElement.scrollHeight - 10; // 10px threshold

        if (isAtBottom) {
          setIsVisible(true);
        } else if (window.scrollY > lastScrollY) { // Scrolling down
          setIsVisible(false);
        } else { // Scrolling up
          setIsVisible(true);
        }

        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== undefined) {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 min-h-screen bg-white border-r border-gray-200 pt-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-4 py-3 text rounded-lg hover:bg-gray-100 transition-colors
                ${
                  pathname === item.href
                    ? "text-black font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <span
                className={`${
                  pathname === item.href ? "text-black" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div 
      className={`z-50 md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <nav className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full px-1
              ${pathname === item.href ? "text-black font-semibold" : "text-gray-600"}`}
          >
            <div className="flex flex-col items-center min-w-0 w-full">
              <span
                className={`${
                  pathname === item.href ? "text-black" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              <span className="text-xs mt-1 truncate w-full text-center">
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>    </>
  );
};

export default SideBar;
