import SidebarItem from "./SidebarItem";
import {
  Settings,
  ShieldUser,
  Milk,
  BookOpenText,
  LayoutDashboard,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">@Natureum</h2>

      <nav>
        <div className="mb-8">
          {/* <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
            Navigation
          </h3> */}
          <ul className="space-y-5">
            <SidebarItem
              title="Dashboard"
              href="/private/dashboard"
              icon={<LayoutDashboard className="h-5 w-5" />}
            />
            <SidebarItem
              title="Utilisateurs"
              href="/private/utilisateurs"
              icon={<ShieldUser className="h-5 w-5" />}
            />
            <SidebarItem
              title="Ingrédients"
              href="/private/ingredients"
              icon={<Milk className="h-5 w-5" />}
            />
            <SidebarItem
              title="Recettes"
              href="/private/recettes"
              icon={<BookOpenText className="h-5 w-5" />}
            />
            <SidebarItem
              title="Analytiques"
              href="/private/analytiques"
              icon={<ChartNoAxesCombined className="h-5 w-5" />}
            />
            <SidebarItem
              title="Maintenance"
              href="/private/maintenance"
              icon={<ShieldCheck className="h-5 w-5" />}
            />
            <SidebarItem
              title="Paramètres"
              href="/private/parametres"
              icon={<Settings className="h-5 w-5" />}
            />
          </ul>
        </div>
      </nav>
    </aside>
  );
}

// import SidebarItem from "./SidebarItem";

// export default function DashboardSidebar() {
//   return (
//     <aside className="w-64 bg-white text-gray-400 p-4">
//       <h2 className="text-xl font-bold mb-6">Databoard</h2>

//       <nav>
//         <div className="mb-8">
//           <h3 className="text-sm uppercase tracking-wider mb-2">Navigation</h3>
//           <ul className="space-y-1">
//             <SidebarItem title="Ullisterns" active />
//             <SidebarItem title="Accession" />
//             <SidebarItem title="Actions Replace" />
//           </ul>
//         </div>
//       </nav>
//     </aside>
//   );
// }
