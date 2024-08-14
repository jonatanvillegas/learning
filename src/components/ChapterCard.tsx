import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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

export type ChapterCardHandler = {
    triggerLoad: ()=> void
}
const ChapterCard = React.forwardRef<ChapterCardHandler, Props>( 
    ({chapter,chapterIndex}, ref) => {
        const [success, setSuccess] = useState<Boolean | null>(null)
        const {mutate: obtenerInfoCap, isPending} = useMutation(
            {
                mutationFn: async ()=>{
                    const response = await axios.post("/api/chapter/getInfo",{chapterId: chapter.id})
                    return response.data
    
                }
            }
        )
        
    React.useImperativeHandle(ref,()=>({
        async triggerLoad() {
            obtenerInfoCap(undefined,{
                onSuccess: ()=>{
                    console.log("success")
                }
            })
        }
    }))

  return (
    <div key={chapter.id} className={cn("px-4  py-2 mt-2 rounded-md flex justify-between",{
        "bg-secondary": success === null,
        "bg-green-500": success === true,
        "bg-red-500":success === false
    })}>
        <h5>Chapter {chapterIndex + 1} { chapter.name}</h5>


    </div>
  )
})

ChapterCard.displayName = "ChapterCard"
export default ChapterCard