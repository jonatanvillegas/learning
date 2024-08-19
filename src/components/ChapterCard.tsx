import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'

type Chapter = {
    id: string;
    name: string;
    youtube_query?: string;
    unitId: string;
    videoId?: string;
    summary?: string
}

type Props = {
    chapter: Chapter
    chapterIndex: number
    completeChapters: Set<String>
    setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
}

export type ChapterCardHandler = {
    triggerLoad: () => void
}
const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
    ({ chapter, chapterIndex, setCompletedChapters, completeChapters }, ref) => {
        const [success, setSuccess] = useState<Boolean | null>(null)
        const { mutate: obtenerInfoCap, isPending } = useMutation(
            {
                mutationFn: async () => {
                    const response = await axios.post("/api/chapter/getInfo", { chapterId: chapter.id })
                    return response.data

                }
            }
        )
        const addChapterIdToSet = React.useCallback(() => {
            setCompletedChapters((prev) => {
                const newSet = new Set(prev)
                newSet.add(chapter.id)
                return newSet
            })
        }, [completeChapters, chapter.id, setCompletedChapters])

        React.useEffect(()=>{
            if (chapter.videoId) {
                setSuccess(true)
                addChapterIdToSet
            }
        },[chapter,addChapterIdToSet])

        React.useImperativeHandle(ref, () => ({
            async triggerLoad() {
                if (chapter.videoId) {
                    addChapterIdToSet();
                    return;
                }
                obtenerInfoCap(undefined, {
                    onSuccess: () => {
                        setSuccess(true)
                        addChapterIdToSet();
                    },
                    onError: (error) => {
                        console.log(error)
                        setSuccess(false)
                        addChapterIdToSet();
                    }
                })
            }
        }))

        return (
            <div key={chapter.id} className={cn("px-4  py-2 mt-2 rounded-md flex justify-between", {
                "bg-secondary": success === null,
                "bg-green-500": success === true,
                "bg-red-500": success === false
            })}>
                <h5>Chapter {chapterIndex + 1} {chapter.name}</h5>
                {isPending && <Loader2 className='animate-spin'/>}


            </div>
        )
    })

ChapterCard.displayName = "ChapterCard"
export default ChapterCard