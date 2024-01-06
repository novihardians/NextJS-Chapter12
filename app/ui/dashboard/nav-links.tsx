'use client'; // adding materi 5

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  AtSymbolIcon // adding materi 4
} from '@heroicons/react/24/outline';
import Link from 'next/link'; // adding materi 5 // tag <Link>
import { usePathname } from 'next/navigation'; // adding materi 5
import clsx from 'clsx'; // adding materi 5


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },

  { name: 'Emails', href: '/dashboard/emails', icon: AtSymbolIcon }, // adding materi 4
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          // adding materi 5 
          <Link
            key={link.name}
            href={link.href}
              className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
            >
            <LinkIcon className="w-6" />
            {/* hidden teks md block */}
            <p className="hidden md:block">{link.name}</p> 
          </Link>
        );
      })}
    </>
  );
}
