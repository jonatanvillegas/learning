"use client";
import React from 'react'
import ChapterCard from './ChapterCard';
import { Separator } from '@radix-ui/react-separator';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Question = {
    id: string;
    chapterId: string;
    question: string;
    answer: string;
    options: string;
}

type Chapter = {
    id: string;
    unitId: string;
    name: string;
    youtubeSearchQuery: string;
    videoId?: string;
    summary?: string;
    questions: Question[];
}

type Unit = {
    id: string;
    courseId: string;
    name: string;
    chapters: Chapter[];
}

type Course = {
    id: string;
    name: string;
    image: string;
    units: Unit[];
}

type Props = {
    course: Course;
}


const ConfirmarCapitulo = ({ course }: Props) => {
    return (
        <div className='w-full mt-5'>
            {course.units.map((unit, unitIndex) => {
                return (
                    <div key={unit.id} className='mt-5'>
                        <h2 className='text-sm uppercase text-secondary-foreground/60'>
                            Unidad {unitIndex + 1}
                        </h2>
                        <h3 className='text-2xl font-bold'>
                            {unit.name}
                        </h3>
                        <div className='mt-4'>
                            {unit.chapters.map((chapter, chapterIndex) => {
                                return (
                                    <ChapterCard
                                        key={chapter.id}
                                        chapter={chapter}
                                        chapterIndex={chapterIndex}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <div className='flex items-center justify-center mt-4'>
                <Separator className='flex-[1]' />
                <div className='flex items-center mx-4'>
                    <Link href="/create" className={
                        buttonVariants({
                            variant: "secondary"
                        })
                    }>
                        <ChevronLeft className='w-4 h-4  mr-2' strokeWidth={4} />
                        Volver
                    </Link>
                    <Button
                        type='button'
                        className='ml-4 font-semibold'
                    >
                        Generar
                        <ChevronRight className='w-4 h-4  ml-2' strokeWidth={4} />
                    </Button>
                    <Separator className='flex-[1]' />
                </div>
            </div>
        </div>
    )
}

export default ConfirmarCapitulo