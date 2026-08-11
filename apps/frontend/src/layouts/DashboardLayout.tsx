import { Outlet, NavLink } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, Users, Car, FileText, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const { logout, user } = useAuth()

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  const navItems = [
    { name: "Home", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Customers", path: "/customers", icon: <Users className="w-5 h-5" /> },
    { name: "Vehicles", path: "/vehicles", icon: <Car className="w-5 h-5" /> },
    { name: "Inventory", path: "/inventory", icon: <FileText className="w-5 h-5" /> },
    { name: "Invoices", path: "/invoices", icon: <FileText className="w-5 h-5" /> },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 overflow-y-auto border-r border-border bg-card md:block">
        <div className="flex items-center justify-center h-16 border-b border-border">
          <h1 className="text-xl font-bold tracking-tight text-primary">Servexa</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b border-border bg-card">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="ml-4 text-xl font-bold text-primary">Servexa</h1>
          </div>
          <div className="flex items-center ml-auto space-x-4">
            <ModeToggle />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold uppercase">
                {user?.email?.charAt(0) || 'U'}
              </div>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="w-5 h-5 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleSidebar}></div>
            <aside className="relative z-50 w-64 h-full bg-card border-r border-border shadow-lg">
              <div className="flex items-center justify-center h-16 border-b border-border">
                <h1 className="text-xl font-bold text-primary">Servexa</h1>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
