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

type Props = {}

type Input = z.infer<typeof createChaptersSchema>

const CreateCourseForm = (props: Props) => {
    const form = useForm<Input>({
        resolver: zodResolver(createChaptersSchema),
        defaultValues: {
            title: '',
            units: ['', '', '']
        }
    })

    const onSubmit = (data: Input) => {
        console.log(data)
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
                    <AnimatePresence>
                        {form.watch('units').map((_, index) => {
                            return (
                                <motion.div key={index}
                                    initial={{ opacity: 0, height: 0}}
                                    animate={{ opacity:1, height: 'auto'}}
                                    exit={{opacity: 0, height: 0}}
                                    transition={{
                                        opacity: {
                                            duration: 0.2 
                                        },
                                        height: {
                                            duration: 0.2 
                                        }
                                    }}
                                >
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`units.${index}`}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className='flex flex-col items-start w-full sm:items-center sm:flex-row'>
                                                <FormLabel className='flex-[1] text-xl'>
                                                    Unit {index + 1}
                                                </FormLabel>
                                                <FormControl className='flex-[6]'>
                                                    <Input
                                                        placeholder='Enter subtopic of the course '
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )
                                    }}
                                />
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                    <div className='flex items-center justify-center mt-4'>
                        <Separator className="flex-[1]" />
                        <div className='mx-6 flex gap-4'>
                            <Button
                                type='button'
                                variant='secondary'
                                className='font-semibold'
                                onClick={() => {
                                    form.setValue('units', [...form.watch('units'), ''])
                                }}
                            >
                                <Plus className='w-4 h-4 mr-4 text-green-500' />

                                Add Unit
                            </Button>
                            <Button
                                type='button'
                                variant='secondary'
                                className='font-semibold bg-red-700 '
                                onClick={() => {
                                    form.setValue('units', form.watch('units').slice(0, -1))
                                }}
                            >
                                <Trash className='w-4 h-4 mr-4 text-red-500 gap-2' />
                                Remove Unit
                            </Button>
                        </div>
                        <Separator className="flex-[1]" />
                    </div>

                    <Button type='submit'
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