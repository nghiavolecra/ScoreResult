import { DonutChart } from '@/components/chart/DonutChart'
import LineChart_ from '@/components/chart/LineChart'
import SubjectSelect from '@/components/SubjectSelect'
import { getSubjectPerformance, getTopStudentBySubject } from '@/services'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getScoreDistributionBySubject } from '@/services/index'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const COLORS1 = ['#5A6ACF', '#8593ED', '#C7CEFF', '#E0E4FF']

const chartDataReshape = (data: { data: { [key: string]: string } }) => {
  return Object.entries(data.data).map(([key, value]) => ({
    name: key,
    value: Number(value)
  }))
}

const ReportsPage = () => {
  // data for donut chart
  const [data, setData] = useState<{ [key: string]: { [key: string]: string } }>({})
  // data for line chart
  const [scoreDist, setScoreDist] = useState([])
  //data for top studen table
  const [topStudents, setTopStudents] = useState<{ [key: string]: string }[]>([])

  const [loading, setLoading] = useState(false)
  const [subject, setSubject] = useState('toan')
  const [dataBySubject, setDataBySubject] = useState<{ name: string; value: number }[]>([])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await getSubjectPerformance()
      const getScoreDistributionBySubjectData = await getScoreDistributionBySubject(subject)
      const topStudentsBySubject = await getTopStudentBySubject(subject, 5)
      if (result) {
        setData(result)
      }
      if (getScoreDistributionBySubjectData.length > 0) {
        setScoreDist(getScoreDistributionBySubjectData)
      }
      if (topStudentsBySubject.length > 0) {
        setTopStudents(topStudentsBySubject)
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  // on subject state change
  useEffect(() => {
    if (data && subject in data) {
      setDataBySubject(chartDataReshape({ data: data[subject] }))

      const fetchData = async () => {
        const getScoreDistributionBySubjectData = await getScoreDistributionBySubject(subject)
        const topStudentsBySubject = await getTopStudentBySubject(subject, 5)

        if (getScoreDistributionBySubjectData.length > 0) {
          setScoreDist(getScoreDistributionBySubjectData)
        }
        if (topStudentsBySubject.length > 0) {
          setTopStudents(topStudentsBySubject)
        }
      }

      fetchData()
    }
  }, [data, subject])

  const handleSelectSubject = (value: string) => {
    setSubject(value)
  }
  if (loading) return <Loader2 className='animate-spin left-1/2 relative mt-10' />

  return (
    <div className='flex flex-col'>
      <div className='w-full md:flex-row flex-col flex justify-between items-center p-6'>
        <p className='text-[24px] font-[500px]'> Hello, superstar teacher 🌟</p>
        <SubjectSelect value={subject} onSelect={handleSelectSubject} />
      </div>
      <div className='sm:grid sm:grid-cols-3 gap-2  items-start mt-10 p-6'>
        {/* Donut chart */}
        <div className='w-full flex flex-col gap-2'>
          <h3 className='text-[14px] font-[500px] relative  text-left ml-10'>Subject Performance Breakdown</h3>
          <DonutChart colorArray={COLORS1} data={dataBySubject} />
        </div>

        {/* Line charts */}
        <div className='w-full col-span-2'>
          <h3 className='text-[14px] font-[500px] relative ml-10  text-left'>Score Distribution</h3>
          <div className='mt-10 w-full '>{scoreDist.length > 0 && <LineChart_ data={scoreDist} />}</div>
        </div>
        {/* Best result student */}
        <div className='p-6'>
          <Card className='flex flex-col p-6 w-full'>
            <CardHeader>
              <CardTitle>🚀 Top Student </CardTitle>
              <CardDescription>Student with the best performance</CardDescription>
            </CardHeader>
            <div className='w-full flex flex-col items-center'>
              <Avatar className='w-[100px] h-[100px]'>
                <AvatarImage
                  sizes='100px'
                  width={200}
                  height={200}
                  src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/8394f798931623.5ee79b6a909ea.jpg'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='mt-5 flex flex-col gap-2 w-full'>
                <div className='flex flex-row justify-between'>
                  <p className='text-muted-foreground'>Registration Number</p>
                  <span>{topStudents.length > 0 && topStudents[0].sbd}</span>
                </div>
                <div className='flex flex-row justify-between'>
                  <p className='text-muted-foreground'>Grade</p>
                  <span>{topStudents.length > 0 && topStudents[0][subject]}</span>
                </div>
              </div>
            </div>
          </Card>{' '}
        </div>

        {/* Top student tables */}
        <div className='p-6 col-span-2'>
          <Card className='shadow-none col-span-2 lg:col-span-3 xl:col-span-4'>
            <CardHeader>
              <CardTitle>☝ Top students </CardTitle>
              <CardDescription>Students ranking by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    {' '}
                    <TableHead className='text-center'>Registration number</TableHead>
                    <TableHead className='text-center'>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topStudents.length > 0 &&
                    topStudents.map((item, index) => {
                      return (
                        <TableRow>
                          <TableCell className='font-medium' key={index}>
                            {item.sbd && item.sbd}
                          </TableCell>
                          <TableCell className='font-medium' key={index}>
                            {item[subject]}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='h-10' />
    </div>
  )
}

export default ReportsPage
