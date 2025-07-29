import { useRouter } from 'next/router';
import Link from 'next/link';

type SidebarItemProps = {
  title: string;
  href: string;
  exact?: boolean;
  icon?: React.ReactNode;
  logOut?: () => void
};

export default function SidebarItem({
  title,
  href,
  exact = false,
  icon,
  logOut
}: SidebarItemProps) {
  const router = useRouter();
  const isActive = exact
    ? router.pathname === href
    : router.pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center px-3 py-2 rounded transition-colors ${isActive
          ? 'bg-gray-200 text-gray-800 font-medium'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }`}
        onClick={() => logOut && logOut()}
      >
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </Link>
    </li>
  );
}

// const SidebarItem = ({ title, active = false }: { title: string; active?: boolean; }) => {
//   return (
//     <li>
//       <a href="#" className={`block px-3 py-2 rounded ${active ? 'bg-gray-200 text-gray-800' : 'hover:text-gray-700'}`}>
//         {title}
//       </a>
//     </li>
//   );
// }

// export default SidebarItem;