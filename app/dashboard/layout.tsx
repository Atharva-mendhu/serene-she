import { NavigationBar } from "@/app/components/navigation-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background pt-16">
      {children}
    </div>
  )
} 