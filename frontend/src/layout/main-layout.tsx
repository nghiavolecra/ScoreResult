import Header from '@/components/header'
import { AppSidebar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='w-[100vw] max-w-[100vw] flex'>
      <AppSidebar />
      <div className='w-full '>
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
