import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const SubjectSelect = ({ value, onSelect }: { value: string; onSelect: (value: string) => void }) => {
  return (
    <Select defaultValue={value} onValueChange={onSelect}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a subject' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem value='toan'>Toán</SelectItem>
          <SelectItem value='ngu_van'>Ngữ Văn</SelectItem>
          <SelectItem value='vat_li'>Vật lí</SelectItem>
          <SelectItem value='hoa_hoc'>Hoá học</SelectItem>
          <SelectItem value='sinh_hoc'>Sinh học</SelectItem>
          <SelectItem value='lich_su'>Lịch sử</SelectItem>
          <SelectItem value='dia_li'>Địa lí</SelectItem>
          <SelectItem value='gdcd'>Giáo dục công dân</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SubjectSelect
