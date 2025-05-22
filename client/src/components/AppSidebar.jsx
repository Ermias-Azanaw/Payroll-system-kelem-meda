import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import { Users, FileText, Banknote, BarChart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Banknote,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: FileText,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate("/"); // Navigate to index page
  };

  return (
    <Sidebar className="bg-white border-r">
      <SidebarHeader>
        <a
          href="/"
          className="flex items-center gap-2 px-3 py-3 text-xl font-bold text-[#0b529c] hover:underline animate-fade-in"
        >
          <Banknote className="w-7 h-7 text-[#0b529c]" />
          Kelm Payroll Compass
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 px-3 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#0b529c]/10 text-gray-700 hover:text-[#0b529c] transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Logout button */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-[#fba81c]/10 text-gray-700 hover:text-[#fba81c] transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-xs text-gray-400 px-3 pb-2">
          © 2025 Kelm Payroll
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
