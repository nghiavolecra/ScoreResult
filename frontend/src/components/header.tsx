import { SidebarTrigger } from './ui/sidebar'
import { AvatarImage, Avatar, AvatarFallback } from './ui/avatar'
import { BellDot, ChevronDown } from 'lucide-react'
const Header = () => {
  return (
    <div className='w-full  p-6 shadow-md flex  justify-between'>
      <SidebarTrigger className='absolute left-0 top-1' />

      <div className='flex flex-row gap-2 items-center ml-auto'>
        <div className='flex flex-row items-center justify-center gap-2 cursor-pointer'>
          {/* <Avatar>
            <AvatarImage src='' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className='text-black font-light text-sm'>User name</p>
          <ChevronDown size={18} className='text-muted-foreground' /> */}
        </div>

        {/* <BellDot size={18} className='text-muted-foreground cursor-pointer ml-5' /> */}
      </div>
    </div>
  )
}

export default Header
