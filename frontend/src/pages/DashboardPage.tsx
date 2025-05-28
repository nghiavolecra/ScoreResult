import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import CountUp from 'react-countup'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getBestStudentsGroupA, getOverall } from '@/services'

const DashboardPage = () => {
  const [overallData, setOverallData] = useState<{ [key: string]: string }>({})
  const [bestStudentGroupA, setBestStudentGroupA] = useState<
    { sbd: string; toan: string; vat_li: string; hoa_hoc: string; average: number }[]
  >([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const overall = await getOverall()
        if (overall) {
          setOverallData(overall)
        }
        const students = await getBestStudentsGroupA()
        if (students) {
          setBestStudentGroupA(students)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  if (loading) return <Loader2 className='animate-spin left-1/2 relative mt-10' />
  return (
    <div className='w-full '>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6'>
        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>🚀 Tổng học sinh</CardDescription>
            <CardTitle className='text-4xl'>
              {' '}
              <CountUp preserveValue redraw={false} end={parseInt(overallData.total_students)} decimal='2' />
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className='pb-2'>
            <CardDescription>🎯 Số môn học</CardDescription>
            <CardTitle className='text-4xl'>
              <CountUp
                preserveValue
                redraw={false}
                end={overallData.average_scores ? Object.keys(overallData.average_scores).length : 0}
                decimal='2'
              />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className='p-6'>
        <Card className='col-span-2 lg:col-span-3 xl:col-span-4'>
          <CardHeader>
            <CardTitle>☝ Top học sinh khối A</CardTitle>
            <CardDescription>Xếp hạng các học sinh có điểm cao nhất khối A</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>Số báo danh</TableHead>
                  <TableHead className='hidden sm:table-cell text-center'>Toán</TableHead>
                  <TableHead className='hidden md:table-cell text-center'>Lý</TableHead>
                  <TableHead className='hidden sm:table-cell text-center'>Hoá</TableHead>
                  <TableHead className='text-center'>Điểm trung bình</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bestStudentGroupA.map((item, index) => {
                  return (
                    <StudentTableRow
                      sbd={item.sbd}
                      key={index}
                      toan={item.toan}
                      ly={item.vat_li}
                      hoa={item.hoa_hoc}
                      dtb={item.average}

                    />
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

export const StudentTableRow = ({
  sbd,
  toan,
  ly,
  hoa,
  dtb
}: {
  sbd: string
  toan: string
  ly: string
  hoa: string
  dtb: number
}) => {
  return (
    <TableRow>
      <TableCell className='font-medium'>{sbd} </TableCell>
      <TableCell className='hidden sm:table-cell'>{toan} </TableCell>
      <TableCell className='hidden sm:table-cell'>{ly} </TableCell>
      <TableCell className='hidden md:table-cell'>{hoa} </TableCell>
      <TableCell>{dtb.toFixed(2)}</TableCell>
    </TableRow>
  )
}
