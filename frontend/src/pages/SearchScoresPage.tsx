import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { getResultByStudentSBD } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import ResultCard from '@/components/ResultCard'
import { nameMapping, iconArrays, colorArrays } from '@/constants'
const formSchema = z.object({
  registrationNumber: z.string().min(1, 'Mã số báo danh không được để trống')
})
type FormValues = z.infer<typeof formSchema>

const SearchScoresPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })
  const [results, setResults] = useState<{ [key: string]: string }>({})
  const onSubmit = async (data: FormValues) => {
    try {
      const result = await getResultByStudentSBD(data.registrationNumber)
      setResults(result)
    } catch (error) {
      console.error('❌ Error fetching result:', error)
    }
  }
  return (
    <div className='w-full'>
      <div className=' mt-10 ml-5'>
        <Form {...form}>
          <form className='space-y-8 flex flex-row items-center gap-2 '>
            <FormField
              control={form.control}
              name='registrationNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-muted-foreground font-medium'>Số báo danh </FormLabel>
                  <FormControl>
                    <Input placeholder='01000001' {...field} {...form.register('registrationNumber')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mb-3'
              onClick={form.handleSubmit(onSubmit)}
              type='submit'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Loader2 className='animate-spin' /> : 'Tra cứu'}
            </Button>
          </form>
        </Form>
      </div>
      <div className='p-6'>
        {Object.keys(results).length > 0 ? (
          <div className='grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1 '>
            {Object.entries(results).map(([key, value], index) => {
              const randomColor = Math.floor(Math.random() * colorArrays.length)
              const randomIcon = Math.floor(Math.random() * iconArrays.length)
              if (key == 'id' || !value || key == 'ma_ngoai_ngu') return
              return (
                <ResultCard
                  key={index}
                  title={nameMapping[key as string]}
                  value={value}
                  bgColor={colorArrays[randomColor]}
                  iconUrl={iconArrays[randomIcon]}
                />
              )
            })}
          </div>
        ) : (
          <div className='w-full items-center justify-center flex flex-col mt-5 gap-4'>
            <img className='w-[30%]' src='/../../undraw_working-together_r43a.svg' alt='' />
            <p className='text-xl font-medium text-muted-foreground'>
              Hãy nhập thông tin số báo danh để tra cứu kết quả
            </p>
          </div>
        )}
      </div>
      <div className='h-10' />
    </div>
  )
}

export default SearchScoresPage
