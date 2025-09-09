import { Bell, Search, UserCircle } from "lucide-react";
import Link from "next/link";
import { AuthSpinner } from "../AuthSpinner";
import { useEffect } from "react";
import { authStore } from "@/stores/auth.store";
import { useRouter } from "next/router";

export default function DashboardHeader() {
  const router = useRouter();
  const { token } = authStore();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!token && !localToken) {
      router.push("/public/login");
      return;
    }
  }, [token]);

  if (!token) return <AuthSpinner />;
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 text-gray-700">
        <h1 className="text-2xl font-bold">{"Espace privé"}</h1>
        <div className="flex items-center space-x-28">
          <div className="flex items-center gap-2 w-64 p-1.5 pl-2 rounded bg-gray-200 border-0">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="search"
              className="w-52 pl-1 font-light text-gray-600 bg-gray-200 border-l-2 border-l-amber-400 focus:outline-none focus:ring-0 focus:border-l-amber-500"
              name="search"
              id="search"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-700" />
            </button>
            <Link href={"/private/profil"}>
              <UserCircle className="h-8 w-8 rounded-full text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  );
}
