"use client";
import React, { useMemo, useState } from 'react'
import ChapterCard, { ChapterCardHandler } from './ChapterCard';
import { Separator } from '@/components/ui/separator';
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

    const [loading, setLoading] = useState(false)
    const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {}

    course.units.forEach(unit => {
        unit.chapters.forEach(chapter => {
            chapterRefs[chapter.id] = React.useRef()
        })
    })

    const [completedChapters, setCompletedChapters] = useState<Set<String>>(new Set())

    const totalChapterCount = useMemo(() => {
        return course.units.reduce((acc, unit) => {
            return acc + unit.chapters.length;
        }, 0)
    }, [course.units])
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
                                        completeChapters={completedChapters}
                                        setCompletedChapters={setCompletedChapters}
                                        ref={chapterRefs[chapter.id]}
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

                    {
                        totalChapterCount === completedChapters.size ? (
                            <Link className={buttonVariants({
                                className: "ml-4 font-semibold"
                            })} href='/'>Guardar y Continuar
                                <ChevronRight className='w-4 h-4  ml-2' strokeWidth={4} />
                            </Link>
                        ) : (

                            <Button
                                type='button'
                                className='ml-4 font-semibold'
                                disabled={loading}
                                onClick={() => {
                                    setLoading(true)
                                    Object.values(chapterRefs).forEach((ref) => {
                                        ref.current?.triggerLoad()
                                    })
                                }}
                            >
                                Generar
                                <ChevronRight className='w-4 h-4  ml-2' strokeWidth={4} />
                            </Button>
                        )
                    }
                </div>
                <Separator className='flex-[1]' />
            </div>
        </div>
    )
}

export default ConfirmarCapitulo