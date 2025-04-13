"use client";
import MobileMenu from "./MobileMenu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon, Package2Icon, PlusIcon, TrashIcon } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const showEdit = pathname.startsWith("/product/view");
  const id = pathname.split("/").pop();
  const links = [
    {
      label: "Add Product",
      icon: PlusIcon,
      href: "/product/new",
    },
    {
      label: "View Products",
      icon: EyeIcon,
      href: "/search",
    },
  ];

  const editLinks = [
    {
      label: "Edit Product",
      icon: PlusIcon,
      href: "/product/edit/" + id,
      style: "!bg-blue-500 text-white",
    },
    {
      label: "Delete Product",
      icon: TrashIcon,
      href: "/product/delete/" + id,
      style: "!bg-red-500 text-white",
    },
  ];

  const renderLink = ({ label, icon: Icon, href, style }: any) => (
    <Link
      key={label}
      className={`inline-flex text-black items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${style}`}
      href={href}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );

  const renderEditLinks = () => editLinks.map(renderLink);
  const renderLinks = () => links.map(renderLink);

  return (
    <header className="w-screen fixed left-0 shadow-lg top-0 z-[120] flex items-center justify-between bg-black text-white px-6 py-4">
      <Link className="flex items-center gap-2" href="/search">
        <Package2Icon className="h-6 w-6" />
        <span className="font-semibold">Shopverse</span>
      </Link>
      <nav className="flex items-center gap-4 max-md:hidden">
        {showEdit && renderEditLinks()}
        {renderLinks()}
      </nav>
      <nav className="hidden max-md:flex items-center gap-4">
        <MobileMenu>
          <nav className="flex flex-col gap-4">
            {showEdit && renderEditLinks()}
            {renderLinks()}
          </nav>
        </MobileMenu>
      </nav>
    </header>
  );
}
