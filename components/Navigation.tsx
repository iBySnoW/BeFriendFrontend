"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/groups", label: "Groupes" },
  { href: "/events", label: "Événements" },
  { href: "/communication", label: "Communication" },
  { href: "/budget", label: "Budget" },
  { href: "/profile", label: "Profil" },
  { href: "/settings", label: "Paramètres" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-primary text-white p-4">
      <ul className="flex space-x-4 justify-center">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:text-secondary transition-colors ${pathname === item.href ? "font-bold" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
