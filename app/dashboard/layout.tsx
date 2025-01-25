import { DashboardHeader } from "./components/dashboard-header"
import { NavigationBar } from "@/components/navigation-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      {children}
      <NavigationBar />
    </div>
  )
} 

