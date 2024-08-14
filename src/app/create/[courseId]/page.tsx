import ConfirmarCapitulo from '@/components/ConfirmarCapitulo'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Course } from '@prisma/client'
import { Info } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'


type Props = {
    params: {
        courseId: string
    }
}

const CreateChapter = async ({ params: { courseId } }: Props) => {
    const session = await getAuthSession();
    // if (!session?.user) {
    //     redirect('gallery')
    // }

    //TODO:revisar el tipado de la respuesta 
    
    const course: Course | null = await prisma.course.findUnique({
        where: {
            id: courseId
        },
        include: {
            units: {
                include: {
                    chapters: true
                }
            }
        }
    })
    // if (!course) {
    //     redirect('/create')
    // }
    return (
        <div className='flex flex-col items-start max-w-xl mx-auto my-16'>
            <h5 className='text-sm uppercase text-secondary-foreground/60 mb-2'
            >Nombre del Curso
            </h5>
            <h1 className='text-5xl font-bold '>{course?.name}</h1>
            <div className='flex p-4 border-none mt-5 bg-secondary'>
                <Info
                    className='w-12 h-12 mr-3 text-blue-400'
                />  
                <div>
                    Estamos generando su Curso Porfavor tenga paciencia, mira los temas y si son de 
                    tu agrado da click en Guardar o Click en regresar para Realizar otro Intento
                </div>
            </div>
                <ConfirmarCapitulo
                    course={course}
                />
        </div>

    )
}

export default CreateChapter