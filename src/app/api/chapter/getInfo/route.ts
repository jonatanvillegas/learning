//* api: /api/chapter/getInfo

import { prisma } from "@/lib/db";
import { chatGenerateQuestions, chatSessionTranscript } from "@/lib/IA";
import { getTranscript, searchYoutube } from "@/lib/youtube";
import { NextResponse } from "next/server"
import { z } from "zod";


const bodyParser = z.object({
    chapterId: z.string()
})
// const esperar = async () =>
//     new Promise((resolve) => {
//         setTimeout(resolve, Math.random() * 4000)
//     })

export async function POST(req: Request, res: Response) {
    try {
        // await esperar()
        const body = await req.json()
        const { chapterId } = bodyParser.parse(body)

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            }
        })

        if (!chapter) {
            return NextResponse.json({  
                success: false, error: "chapter not found"
            },
                { status: 404 }
            )
        }


        const videoId = await searchYoutube(chapter.name)

        const transcript = await getTranscript(videoId)

        const respuesta = await chatSessionTranscript.sendMessage(transcript)
        const summaryJson = JSON.parse(respuesta.response.text());
        const summaryText = summaryJson.summary;


        const Questions = await chatGenerateQuestions.sendMessage(`titulo:${chapter.name} transcripcion:${transcript}`);
        const QueryDataJson = await Questions.response.text();

        // Limpieza de la cadena JSON
        const cleanedQueryDataJson = QueryDataJson.replace(/\\n/g, '').replace(/\\"/g, '"');

        // Conversión a objeto JSON
        const jsonQueryResponse = JSON.parse(cleanedQueryDataJson);
        await prisma.question.createMany({
            data: jsonQueryResponse.map(question => {
                let options = [question.question, ,question.option1,question.option2,question.option3]
                options = options.sort(()=> Math.random() - 0.5)
                return {
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    chapterId: chapterId
                }
            })
        })
        await prisma.chapter.update({
            where:{id:chapterId},
            data:{videoId: videoId,
                summary: summaryText
            }
            
        })
        console.log(chapter.name, "fase de pruevas")
        return NextResponse.json({ success:true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false, error: "invalidado"
            },
                { status: 400 }
            )
        } else {
            return NextResponse.json({
                success: false,
                error: "unknow"
            },
                { status: 500 }
            )
        }
    }
}