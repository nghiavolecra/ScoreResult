const ResultCard = ({
  title,
  value,
  bgColor = 'whtie',
  iconUrl = ''
}: {
  title: string
  value: string
  bgColor?: string
  iconUrl?: string
}) => {
  return (
    <div
      className='rounded-[16px] p-5 flex flex-col gap-[8px] overflow-hidden relative items-start'
      style={{ background: bgColor }}
    >
      <div className='h-[118px] w-[118px] rounded-[100px] bg-[#FCE3EE] absolute right-[5px] -top-[50%]' />
      <img src={iconUrl} alt='' className='absolute w-[30%] right-5 top-10' />
      <h3 className='text-[20px] font-medium text-white'>{title}</h3>
      <div className='flex flex-row items-end gap-2'>
        <p className='text-[56px] font-semibold text-white'>{value}</p>
        <p className='mb-5 font-medium'>/10 điểm</p>
      </div>
      <div className='h-[118px] w-[118px] rounded-[100px] bg-[#FCE3EE] absolute  -bottom-[60%]' />
    </div>
  )
}

export default ResultCard
