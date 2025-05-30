import Link from "next/link"
import { ChevronLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import NotificationBadge from "@/components/NotificationBadge"

interface TopNavBarProps {
  title?: string
  showBack?: boolean
  showSearch?: boolean
  backUrl?: string
}

export default function TopNavBar({ title, showBack = false, showSearch = false, backUrl = "/" }: TopNavBarProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {showBack && (
          <Link href={backUrl}>
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
        )}
        {title && <h1 className="text-lg font-medium">{title}</h1>}
      </div>
      <div className="flex items-center">
        {showSearch && (
          <Link href="/search">
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <NotificationBadge />
      </div>
    </div>
  )
}
