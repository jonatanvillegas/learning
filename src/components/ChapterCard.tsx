import { cn } from '@/lib/utils';
import React, { useState } from 'react'

type Chapter = {
    id: string;
    name: string;
    youtube_query?: string;
    unitId: string;
}

type Props = {
    chapter: Chapter
    chapterIndex: number
}

const ChapterCard = ({chapter,chapterIndex}: Props) => {

    const [success, setSuccess] = useState<Boolean | null>(null)
  return (
    <div key={chapter.id} className={cn("px-4  py-2 mt-2 rounded-md flex justify-between",{
        "bg-secondary": success === null,
        "bg-green-500": success === true,
        "bg-red-500":success === false
    })}>
        <h5>Chapter {chapterIndex + 1} { chapter.name}</h5>


    </div>
  )
}

export default ChapterCard