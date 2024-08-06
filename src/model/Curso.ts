 export interface Capitulo {
    titulo: string;
    youtube_query: string;
}

interface Unidad {
    unidad: string;
    capitulos: Capitulo[];
}


export type Unidades = Unidad[];