//api/course/createChapters

import { createChaptersSchema } from "@/validators/Course"
import { NextResponse } from "next/server"
import { ZodError } from "zod"

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const { title, units } = createChaptersSchema.parse(body)

    type outputUnits = {
      title: string;
      chapters: {
        //consulta de busqueda a youtube
        youtube_search_query: string;
        chapter_title: string;
      }[];
    };


    

   
    // return NextResponse.json()
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return new NextResponse('invalid body', { status: 400 })
    }
    return new NextResponse('invalid body', { status: 400 })
  }
}
