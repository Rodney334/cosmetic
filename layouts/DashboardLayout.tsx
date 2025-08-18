import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/Header";
import DashboardFooter from "@/components/dashboard/Footer";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
}
