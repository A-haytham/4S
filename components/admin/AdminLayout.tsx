"use client";

import { useState } from "react";
import { FileText, HelpCircle, LayoutDashboard, LogOut, Mail, Menu, Moon, Sun, X } from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
  activePage: string;
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onPageChange: (page: string) => void;
  onLogout: () => void;
};

export function AdminLayout({
  children,
  activePage,
  theme,
  onThemeToggle,
  onPageChange,
  onLogout,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", name: "Blogs", icon: FileText },
    { id: "faqs", name: "FAQs", icon: HelpCircle },
    { id: "contacts", name: "Contact Leads", icon: Mail },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 transition-colors duration-300">
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed top-0 z-50 h-screen w-64 border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:sticky lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0F4C81] to-[#2B7CB3]">
                <span className="text-lg font-bold text-white">4S</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">4S Systems</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onPageChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all ${
                    isActive
                      ? "bg-linear-to-r from-[#0F4C81] to-[#2B7CB3] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#0F4C81]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <button
              type="button"
              onClick={onThemeToggle}
              className="mb-2 flex w-full items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#0F4C81]"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{theme === "dark" ? "Light Mode" : "Night Mode"}</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {navigation.find((item) => item.id === activePage)?.name || "Dashboard"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onThemeToggle}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light mode" : "Night mode"}</span>
            </button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@4ssystems.com</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-[#0F4C81] to-[#2B7CB3]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
