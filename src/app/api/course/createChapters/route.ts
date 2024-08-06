import { createChaptersSchema } from "@/validators/Course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { chatSession, chatSessionImage } from "@/lib/IA";
import { getUnsplashImage } from "@/lib/Unsplash";
import { prisma } from "@/lib/db";
import { Capitulo } from "@/model/Curso";


export async function POST(req: Request) {
  try {
    // Parsear el cuerpo del request como JSON
    const body = await req.json();
    console.log('Request body:', body);

    // Validar el título usando el esquema definido
    const { title } = createChaptersSchema.parse(body);
    console.log('Parsed title:', title);

    // Llamar a la sesión de chat para obtener datos
    const resultado = await chatSession.sendMessage(title);

    // Llamar a la sesión de chat de imagen para obtener datos
    const Query = await chatSessionImage.sendMessage(title);

    // Obtener y limpiar la respuesta del chat regular
    const DataJson = await resultado.response.text();
    const cleanedDataJson = DataJson.replace(/\\n/g, '').replace(/\\"/g, '"');

    // Parsear la cadena JSON limpia
    const jsonResponse = JSON.parse(cleanedDataJson);

    // Crear la estructura deseada
    const structuredResponse = jsonResponse.map((unidad: any, index: number) => ({
      [`unidad_${index + 1}`]: {
        titulo: unidad.title,
        capitulos: unidad.chapters.map((chapter: any) => ({
          titulo: chapter.titulo_capítulo,
          youtube_query: chapter.youtube_search_query
        }))
      }
    }));

    // Obtener y limpiar la respuesta de la sesión de chat de imagen
    const QueryDataJson = await Query.response.text();
    const cleanedQueryDataJson = QueryDataJson.replace(/\\n/g, '').replace(/\\"/g, '"');

    // Parsear la cadena JSON limpia de la sesión de chat de imagen
    const jsonQueryResponse = JSON.parse(cleanedQueryDataJson);

    console.log(jsonQueryResponse.query);

    const Imagen_Course = await getUnsplashImage(jsonQueryResponse.query);

    //agregando regristro a la base de datos
    const Course = await prisma.course.create({
      data: {
        name: title,
        image: Imagen_Course
      }
    }
    )

    for (const unit of structuredResponse) {
      // Acceder a los títulos de las unidades
      const unitKey = Object.keys(unit)[0];
      const title = unit[unitKey].titulo;
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: Course.id
        }
      })
      // Crear los capítulos para la unidad
      const chaptersData = unit[unitKey].capitulos.map((capitulo:Capitulo) => {
        return {
          name: capitulo.titulo,
          youtubeSearchQuery: capitulo.youtube_query,
          unitId: prismaUnit.id
        };
      });
      
      await prisma.chapter.createMany({
        data: chaptersData
      })
    }
    // Retornar la respuesta como JSON
    return new NextResponse(JSON.stringify({Course_id: Course.id}), { status: 200 });

  } catch (error) {
    console.error('Error processing request:', error);

    // Manejar errores de validación con Zod
    if (error instanceof ZodError) {
      return new NextResponse(JSON.stringify({ error: 'Invalid body', details: error.errors }), { status: 400 });
    }

    // Cualquier otro tipo de error
    return new NextResponse('Error processing request', { status: 500 });
  }
}
