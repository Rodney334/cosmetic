// /pages/private/dashboard.tsx
import type { NextPageWithLayout } from "@/types";
import { useRouter } from "next/router";
import StatCard from "@/components/StatCard";
import SystemSection from "@/components/SystemSection";
import { authStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { AuthSpinner } from "@/components/AuthSpinner";

const data = [
  {
    title: "Receives Orders",
    value: "15,234",
    description: "+$7x on media",
    badge: "vt multi-prededent",
  },
  {
    title: "Reports Mentacle",
    value: "4,892",
    description: "+24% on media",
    badge: "PDF + Excel",
  },
];

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            description={item.description}
            badge={item.badge}
          />
        ))}
      </div>

      <SystemSection />
    </div>
  );
};

Dashboard.isDashboard = true;

export default Dashboard;
