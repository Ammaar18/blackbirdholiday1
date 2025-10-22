"use client";

import SidebarDemo from "@/components/SidebarDemo";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardSummary from "@/components/admin/DashboardSummary";
import MiniCharts from "@/components/admin/MiniCharts";
import BookingsTable from "@/components/admin/BookingsTable";
import BrochureManager from "@/components/admin/BrochureManager";
import { useEffect, useState } from "react";

/**
 * Admin-only Dashboard page (client side). The SidebarDemo will only show the Dashboard link
 * when localStorage 'blackbird_isAdmin' is set. This page itself also checks localStorage and
 * will redirect or show a message if not admin.
 */

export default function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("blackbird_isAdmin") === "1");
  }, []);

  if (isAdmin === null) return null;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="max-w-xl text-center bg-black/60 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">Admin access required</h2>
          <p className="text-gray-300 mb-4">
            Dashboard is hidden. To view the dashboard locally run in browser console:
          </p>
          <pre className="bg-gray-900 p-3 rounded text-sm text-green-300">localStorage.setItem('blackbird_isAdmin','1')</pre>
          <p className="mt-4 text-sm text-gray-400">Refresh page after running the command.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-orange-950 text-white">
      <SidebarDemo />
      <div className="md:pl-72"> {/* keep offset so drawer doesn't overlap */}
        <AdminLayout>
          <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-orange-400">Admin Dashboard</h1>
                <p className="text-sm text-gray-300 mt-1">
                  Overview — manage trips, brochures & bookings
                </p>
              </div>
            </header>

            <DashboardSummary />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MiniCharts />
                <BookingsTable />
              </div>

              <div>
                <BrochureManager />
              </div>
            </section>
          </div>
        </AdminLayout>
      </div>
    </main>
  );
}
