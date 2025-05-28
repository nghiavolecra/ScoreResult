import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Search, BarChart3, Settings } from 'lucide-react'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    url: '/'
  },
  {
    title: 'Search Scores',
    icon: Search,
    url: '/search-scores'
  },
  {
    title: 'Reports',
    icon: BarChart3,
    url: '/report'
  },
  {
    title: 'Settings',
    icon: Settings,
    url: '/settings'
  }
]
export function AppSidebar() {
  const location = useLocation()
  const nav = useNavigate()
  return (
    <Sidebar className="bg-gradient-to-b from-[#282a36] to-[#1a1b25] text-white min-h-screen">
      <SidebarHeader
        onClick={() => nav('/')}
        className="flex flex-row gap-2 justify-center items-center py-6 cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#F99C30" />
          <path d="M13.808 10.72..." fill="white" />
        </svg>
        <p className="text-[#F99C30] font-extrabold text-xl">G</p>
        <p className="text-[#F2383A] font-extrabold text-xl">Scores</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 px-5">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url === location.pathname
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'px-5 py-4 flex gap-3 items-center rounded-lg transition-colors duration-200',
                        isActive
                          ? 'bg-[#F99C30] text-white font-bold'
                          : 'hover:bg-[#5A6ACF]/20 text-gray-300'
                      )}
                    >
                      <a href={item.url}>
                        <Icon size={20} className={cn(isActive ? 'text-white' : 'text-gray-400')} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

  )
}
