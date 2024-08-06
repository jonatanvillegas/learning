'use client'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { z } from "zod"
import { createChaptersSchema } from '@/validators/Course'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'


type Props = {}

type Input = z.infer<typeof createChaptersSchema>

const CreateCourseForm = (props: Props) => {
    const router = useRouter()
    const {mutate: createChapters, isPending } = useMutation({
        mutationFn: async ({title}:Input) => {
            const respuesta = await axios.post('/api/course/createChapters',{title})
            return respuesta.data
        }
    })
    const form = useForm<Input>({
        resolver: zodResolver(createChaptersSchema),
        defaultValues: {
            title: ''
        }
    })

    const onSubmit = async (data: Input) => {
      createChapters(data,{
        onSuccess:({Course_id})=>{
            router.push(`/create/${Course_id}`)
        },
        onError:(error)=>{
            console.log(error)
        }
      })
    }

    return (
        <div className='w-full mt-6'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => {
                            return (
                                <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                                    <FormLabel className='flex-[1] text-xl'>
                                        Title
                                    </FormLabel>
                                    <FormControl className='flex-[6]'>
                                        <Input
                                            placeholder='Enter the main of the course '
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                        }}

                    />
                   

                    <Button disabled={isPending} type='submit'
                        className='w-full mt-6'
                        size='lg'

                    >
                        Lest Go!
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateCourseForm