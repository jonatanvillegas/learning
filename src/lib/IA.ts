
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
//generar curso
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Eres una IA especializada en la creación de contenido educativo. Tu misión es diseñar un curso completo sobre un tema específico proporcionado por el usuario. El curso estará estructurado en cinco unidades, cada una con cinco capítulos relevantes. Para cada capítulo, necesitas proporcionar una consulta de búsqueda detallada en YouTube que garantice la calidad y relevancia del video educativo. La consulta debe ser lo suficientemente específica para asegurar que el video encontrado sea adecuado para el aprendizaje del tema del capítulo. Todo el contenido, incluyendo los títulos de las unidades y capítulos, debe estar en español. La estructura del JSON para cada unidad debe seguir este formato:[\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  }\n]\n",
});
//generar imagen relacionda al curso
const modelQuery = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "eres una ia capas de crear una query corta para generar una imagen en base a un titulo, tiene que ser corta la query",
});
//transcripcion del video
const modelTranscription = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Eres una IA capaz de resumir una transcripción de youtube\n\nResuma en 300 palabras o menos y no hable de los patrocinadores ni nada que no esté relacionado con el tema principal, tampoco presente de qué trata el resumen.\n\nde esta manera devolveras la resouesta { summary: \"summary of the transcript\" }",
});

const modelGenerateQuestions = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Eres una IA útil que puede generar preguntas y respuestas de mcq, la longitud de cada respuesta no debe exceder las 15 palabras.\n\nDebe generar una pregunta mcq difícil aleatoria sobre el titulo que te vana proporcionar con el contexto de la siguiente transcripción que te proporcionaran , genera un arreglo de 5 con esta estructura \n\n {\n      question: \"question\",\n      answer: \"answer with max length of 15 words\",\n      option1: \"option1 with max length of 15 words\",\n      option2: \"option2 with max length of 15 words\",\n      option3: \"option3 with max length of 15 words\",\n    }",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSessionImage = modelQuery.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        { text: "cocina" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "{\"query\": \"Interior cocina moderna minimalista\"}\n\n" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "hogar" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "{\"query\": \"Hogar acogedor con chimenea y paisaje otoñal\"}\n\n" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "Ia" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "{\"query\": \"Representación abstracta de la inteligencia artificial\"}\n" },
      ],
    },
  ],
});


export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "react js" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "[\n  {\n    \"title\": \"Introducción a React\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Fundamentos de React\",\n        \"youtube_search_query\": \"React JS Tutorial para principiantes: Introducción a componentes, JSX y renderizado\"\n      },\n      {\n        \"titulo_capítulo\": \"Instalación y configuración\",\n        \"youtube_search_query\": \"Cómo instalar y configurar ReactJS: Create React App y herramientas esenciales\"\n      },\n      {\n        \"titulo_capítulo\": \"Componentes funcionales y de clase\",\n        \"youtube_search_query\": \"Componentes funcionales vs componentes de clase en ReactJS: Diferencias y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"JSX y renderizado\",\n        \"youtube_search_query\": \"JSX en ReactJS: Sintaxis, renderizado y ejemplos prácticos\"\n      },\n      {\n        \"titulo_capítulo\": \"Estado y props\",\n        \"youtube_search_query\": \"Estado y props en ReactJS: Gestión de datos y comunicación entre componentes\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Componentes y eventos\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Eventos en React\",\n        \"youtube_search_query\": \"Manejo de eventos en ReactJS: Captura de eventos, callbacks y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Manejo de formularios\",\n        \"youtube_search_query\": \"Formularios en ReactJS: Creación, validación y envío de datos\"\n      },\n      {\n        \"titulo_capítulo\": \"Componentes reutilizables\",\n        \"youtube_search_query\": \"Crear componentes reutilizables en ReactJS: Eficiencia y buenas prácticas\"\n      },\n      {\n        \"titulo_capítulo\": \"Ciclo de vida de los componentes\",\n        \"youtube_search_query\": \"Ciclo de vida de los componentes en ReactJS: Métodos y etapas clave\"\n      },\n      {\n        \"titulo_capítulo\": \"Componentes de estado controlado\",\n        \"youtube_search_query\": \"Componentes de estado controlado en ReactJS: Control de la lógica del formulario\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Hooks y gestión de estado\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Introducción a Hooks\",\n        \"youtube_search_query\": \"React Hooks: Una guía para principiantes: useState, useEffect y más\"\n      },\n      {\n        \"titulo_capítulo\": \"useState y useEffect\",\n        \"youtube_search_query\": \"useState y useEffect en ReactJS: Gestión de estado y efectos secundarios\"\n      },\n      {\n        \"titulo_capítulo\": \"Context API\",\n        \"youtube_search_query\": \"Context API en ReactJS: Compartir estado global entre componentes\"\n      },\n      {\n        \"titulo_capítulo\": \"Redux para gestión de estado\",\n        \"youtube_search_query\": \"Redux en ReactJS: Gestión de estado compleja para aplicaciones grandes\"\n      },\n      {\n        \"titulo_capítulo\": \"Otras Hooks útiles\",\n        \"youtube_search_query\": \"Hooks adicionales en ReactJS: useContext, useRef, useMemo y más\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Rutas y enrutamiento\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Enrutamiento básico con React Router\",\n        \"youtube_search_query\": \"React Router: Enrutamiento básico en ReactJS: Creación de rutas y vistas\"\n      },\n      {\n        \"titulo_capítulo\": \"Rutas anidadas y parámetros\",\n        \"youtube_search_query\": \"Rutas anidadas y parámetros en React Router: Creación de estructuras de navegación\"\n      },\n      {\n        \"titulo_capítulo\": \"Redirecciones y protección de rutas\",\n        \"youtube_search_query\": \"Redirecciones y protección de rutas en React Router: Control de acceso y flujo\"\n      },\n      {\n        \"titulo_capítulo\": \"Enrutamiento de servidor\",\n        \"youtube_search_query\": \"Enrutamiento de servidor con Next.js: Renderizado de servidor y SEO en ReactJS\"\n      },\n      {\n        \"titulo_capítulo\": \"Pruebas de enrutamiento\",\n        \"youtube_search_query\": \"Pruebas de enrutamiento en ReactJS: Cómo asegurar la correcta funcionalidad de las rutas\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Prácticas avanzadas y optimización\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Optimización del rendimiento\",\n        \"youtube_search_query\": \"Optimización del rendimiento en ReactJS: Técnicas para mejorar la velocidad de la aplicación\"\n      },\n      {\n        \"titulo_capítulo\": \"Manejo de errores\",\n        \"youtube_search_query\": \"Manejo de errores en ReactJS: Captura, gestión y visualización de errores\"\n      },\n      {\n        \"titulo_capítulo\": \"Testing en React\",\n        \"youtube_search_query\": \"Testing en ReactJS: Pruebas unitarias, de integración y de extremo a extremo\"\n      },\n      {\n        \"titulo_capítulo\": \"Integración con API\",\n        \"youtube_search_query\": \"Integración con API en ReactJS: Consumir datos de APIs externas\"\n      },\n      {\n        \"titulo_capítulo\": \"Diseño de aplicaciones React\",\n        \"youtube_search_query\": \"Diseño de aplicaciones ReactJS: Arquitecturas, patrones y buenas prácticas\"\n      }\n    ]\n  }\n]\n\n" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "cocina" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "[\n  {\n    \"title\": \"Fundamentos de la Cocina\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Herramientas y Equipos de Cocina\",\n        \"youtube_search_query\": \"Herramientas y equipos básicos de cocina: guía completa para principiantes\"\n      },\n      {\n        \"titulo_capítulo\": \"Técnicas de Corte y Picado\",\n        \"youtube_search_query\": \"Técnicas de corte y picado de alimentos: cuchillo, tabla y consejos para profesionales\"\n      },\n      {\n        \"titulo_capítulo\": \"Métodos de Cocción\",\n        \"youtube_search_query\": \"Métodos de cocción explicados: hervir, freír, hornear, asar y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Ingredientes Básicos\",\n        \"youtube_search_query\": \"Ingredientes básicos de cocina: especias, hierbas y condimentos esenciales\"\n      },\n      {\n        \"titulo_capítulo\": \"Seguridad Alimentaria\",\n        \"youtube_search_query\": \"Seguridad alimentaria en la cocina: consejos para evitar intoxicaciones y contaminación\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Recetas Básicas\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Platos Principales Simples\",\n        \"youtube_search_query\": \"Recetas fáciles de platos principales para principiantes: pollo, pescado y carne\"\n      },\n      {\n        \"titulo_capítulo\": \"Sopas y Caldos\",\n        \"youtube_search_query\": \"Recetas de sopas y caldos: recetas caseras para todos los gustos\"\n      },\n      {\n        \"titulo_capítulo\": \"Ensaladas y Aderezos\",\n        \"youtube_search_query\": \"Ensaladas y aderezos: recetas saludables y deliciosas para todos los gustos\"\n      },\n      {\n        \"titulo_capítulo\": \"Postres Fáciles\",\n        \"youtube_search_query\": \"Recetas fáciles de postres: pasteles, tartas y dulces sin complicaciones\"\n      },\n      {\n        \"titulo_capítulo\": \"Panes y Masa Madre\",\n        \"youtube_search_query\": \"Recetas de panes y masa madre: desde pan básico hasta recetas más elaboradas\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Cocina Internacional\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Cocina Italiana\",\n        \"youtube_search_query\": \"Recetas italianas fáciles: pasta, pizza y postres tradicionales\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Mexicana\",\n        \"youtube_search_query\": \"Recetas mexicanas: tacos, enchiladas, mole y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Japonesa\",\n        \"youtube_search_query\": \"Recetas japonesas: sushi, ramen, tempura y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Francesa\",\n        \"youtube_search_query\": \"Recetas francesas: quiche, crepas y clásicos de la cocina francesa\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina India\",\n        \"youtube_search_query\": \"Recetas indias: curry, biryani, samosas y más\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Técnicas Avanzadas\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Repostería\",\n        \"youtube_search_query\": \"Técnicas de repostería: glaseado, decoración, macarons y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Molecular\",\n        \"youtube_search_query\": \"Introducción a la cocina molecular: técnicas y recetas innovadoras\"\n      },\n      {\n        \"titulo_capítulo\": \"Conservación de Alimentos\",\n        \"youtube_search_query\": \"Técnicas de conservación de alimentos: enlatado, congelación, fermentación\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Vegana\",\n        \"youtube_search_query\": \"Recetas veganas: platos principales, postres y alternativas a ingredientes tradicionales\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina sin Gluten\",\n        \"youtube_search_query\": \"Recetas sin gluten: alternativas para personas con intolerancia al gluten\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Cocina Saludable y Nutritiva\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Alimentación Balanceada\",\n        \"youtube_search_query\": \"Dieta balanceada para una vida saludable: consejos y recomendaciones\"\n      },\n      {\n        \"titulo_capítulo\": \"Recetas Saludables\",\n        \"youtube_search_query\": \"Recetas saludables y nutritivas para todos los gustos: platos ligeros y sabrosos\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Vegetariana\",\n        \"youtube_search_query\": \"Recetas vegetarianas: platos con vegetales, legumbres y proteínas vegetales\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina para Deportistas\",\n        \"youtube_search_query\": \"Alimentación para deportistas: recetas con alto valor nutricional para el rendimiento\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina para Niños\",\n        \"youtube_search_query\": \"Recetas para niños: platos divertidos y nutritivos para los más pequeños\"\n      }\n    ]\n  }\n]\n" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "algebra" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "[\n  {\n    \"title\": \"Introducción al Álgebra\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Variables y expresiones algebraicas\",\n        \"youtube_search_query\": \"Álgebra básica: ¿Qué son las variables? ¿Cómo se usan en las expresiones algebraicas?\"\n      },\n      {\n        \"titulo_capítulo\": \"Operaciones algebraicas\",\n        \"youtube_search_query\": \"Operaciones con expresiones algebraicas: suma, resta, multiplicación y división\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones lineales\",\n        \"youtube_search_query\": \"Resolver ecuaciones lineales: despejando la incógnita paso a paso\"\n      },\n      {\n        \"titulo_capítulo\": \"Inecuaciones lineales\",\n        \"youtube_search_query\": \"Resolver inecuaciones lineales: encontrar el conjunto solución de la desigualdad\"\n      },\n      {\n        \"titulo_capítulo\": \"Problemas de aplicación\",\n        \"youtube_search_query\": \"Ejemplos de problemas de aplicación con ecuaciones lineales: edad, movimiento, etc.\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Ecuaciones y Sistemas de Ecuaciones\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Ecuaciones cuadráticas\",\n        \"youtube_search_query\": \"Resolver ecuaciones cuadráticas: factorización, fórmula general y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Sistemas de ecuaciones lineales\",\n        \"youtube_search_query\": \"Resolver sistemas de ecuaciones lineales: método de sustitución, eliminación y gráfica\"\n      },\n      {\n        \"titulo_capítulo\": \"Aplicaciones de los sistemas de ecuaciones\",\n        \"youtube_search_query\": \"Problemas de aplicación con sistemas de ecuaciones: mezcla, edades, trabajo\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones con radicales\",\n        \"youtube_search_query\": \"Resolver ecuaciones con radicales: elevar al cuadrado, eliminar radicales y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones racionales\",\n        \"youtube_search_query\": \"Resolver ecuaciones racionales: encontrar el mínimo común múltiplo y resolver la ecuación\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Funciones Algebraicas\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Concepto de función\",\n        \"youtube_search_query\": \"¿Qué es una función? Dominio, rango, representación gráfica y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones lineales\",\n        \"youtube_search_query\": \"Funciones lineales: ecuación, pendiente, intersección con los ejes y gráfica\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones cuadráticas\",\n        \"youtube_search_query\": \"Funciones cuadráticas: vértice, eje de simetría, raíces y gráfica\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones exponenciales\",\n        \"youtube_search_query\": \"Funciones exponenciales: crecimiento y decrecimiento, gráfica y aplicaciones\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones logarítmicas\",\n        \"youtube_search_query\": \"Funciones logarítmicas: propiedades, gráfica y aplicaciones en la vida real\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Polinomios y Factorización\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Introducción a los polinomios\",\n        \"youtube_search_query\": \"Polinomios: grado, coeficientes, términos y operaciones básicas\"\n      },\n      {\n        \"titulo_capítulo\": \"Factorización de polinomios\",\n        \"youtube_search_query\": \"Técnicas de factorización: factor común, diferencia de cuadrados, trinomio cuadrado perfecto\"\n      },\n      {\n        \"titulo_capítulo\": \"Operaciones con polinomios\",\n        \"youtube_search_query\": \"Suma, resta, multiplicación y división de polinomios: ejemplos y ejercicios\"\n      },\n      {\n        \"titulo_capítulo\": \"Teorema del resto y factorización\",\n        \"youtube_search_query\": \"Teorema del resto y factorización: encontrar raíces de polinomios y factorizarlos\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones polinómicas\",\n        \"youtube_search_query\": \"Resolver ecuaciones polinómicas: encontrar las raíces del polinomio\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Aplicaciones y Temas Avanzados\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Geometría analítica\",\n        \"youtube_search_query\": \"Geometría analítica: ecuaciones de rectas, circunferencias y otras figuras geométricas\"\n      },\n      {\n        \"titulo_capítulo\": \"Matrices y determinantes\",\n        \"youtube_search_query\": \"Matrices y determinantes: operaciones, propiedades y aplicaciones en álgebra lineal\"\n      },\n      {\n        \"titulo_capítulo\": \"Sistemas de ecuaciones no lineales\",\n        \"youtube_search_query\": \"Resolver sistemas de ecuaciones no lineales: métodos gráficos, sustitución y eliminación\"\n      },\n      {\n        \"titulo_capítulo\": \"Introducción a la teoría de grupos\",\n        \"youtube_search_query\": \"Conceptos básicos de la teoría de grupos: operaciones, propiedades y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Aplicaciones del álgebra en la vida real\",\n        \"youtube_search_query\": \"Ejemplos de cómo se utiliza el álgebra en campos como la física, la economía y la informática\"\n      }\n    ]\n  }\n]\n\n" },
      ],
    },
  ],
});

export const chatSessionTranscript = modelTranscription.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        { text: "[Intro del Video]\n\n(Suena una música relajante y se muestra un paisaje natural con montañas, un río cristalino y un bosque verde.)\n\nNarrador:\n¡Hola, amigos! Bienvenidos a EcoViviendo, tu canal favorito sobre medio ambiente y sostenibilidad. En el video de hoy, vamos a explorar la importancia de preservar nuestros recursos naturales y cómo pequeñas acciones pueden marcar una gran diferencia para el planeta. ¡Así que quédate hasta el final y no te pierdas nada!\n\n(La música se desvanece y la cámara cambia a una vista aérea de un bosque denso.)\n\n[Parte 1: Importancia de los Bosques]\n\nNarrador:\nLos bosques son los pulmones de nuestro planeta. No solo son el hogar de miles de especies, sino que también ayudan a regular el clima y proporcionan oxígeno. ¿Sabías que un solo árbol puede absorber hasta 22 kg de dióxido de carbono al año? ¡Increíble! Pero, lamentablemente, la deforestación está amenazando estos ecosistemas vitales.\n\n(Se muestran imágenes de deforestación y luego de reforestación.)\n\n[Parte 2: Acciones que Podemos Tomar]\n\nNarrador:\nAhora, ¿qué podemos hacer para ayudar? Una de las acciones más simples es plantar un árbol. También podemos reducir el uso de papel, reciclar y apoyar iniciativas que protejan nuestros bosques. Cada pequeña acción cuenta.\n\n(La cámara muestra a una familia plantando un árbol en su jardín.)\n\nNarrador:\nY recuerda, puedes empezar en tu propia casa. ¡Planta un árbol hoy mismo y sé parte del cambio!\n\n[Publicidad]\n\nNarrador:\nAntes de continuar, queremos agradecer a nuestro patrocinador de hoy, EcoLiving. EcoLiving es una tienda en línea que ofrece productos ecológicos, desde cepillos de dientes de bambú hasta bolsas reutilizables. Usa el código ECO20 para obtener un 20% de descuento en tu primera compra. ¡Visita www.ecoliving.com y comienza a hacer la diferencia!\n\n[Parte 3: Conclusión]\n\nNarrador:\nComo hemos visto, cuidar del medio ambiente es una responsabilidad de todos. No importa cuán pequeñas sean tus acciones, siempre tendrán un impacto positivo. Así que, amigos, hagamos del mundo un lugar mejor para nosotros y para las futuras generaciones.\n\n(La cámara muestra nuevamente el paisaje natural del inicio, con la música relajante de fondo.)\n\nNarrador:\nGracias por ver el video de hoy. Si te ha gustado, no olvides darle \"like\", suscribirte y activar la campanita para no perderte ninguno de nuestros videos. ¡Nos vemos en la próxima aventura ecológica aquí, en EcoViviendo!\n\n(El logo de EcoViviendo aparece en pantalla mientras la música se desvanece.)\n\n[Final del Video]\n\n(Pantalla en negro con un mensaje de agradecimiento: \"Gracias por apoyar el cuidado del planeta.\")\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "{\n\"summary\": \"Este vídeo explora la importancia de preservar los recursos naturales, particularmente los bosques. Los bosques son vitales porque albergan miles de especies, regulan el clima y proporcionan oxígeno. La deforestación amenaza estos ecosistemas, pero podemos ayudar plantando árboles, reduciendo el uso de papel, reciclando y apoyando iniciativas de protección forestal. Cada pequeña acción cuenta y todos podemos contribuir a un planeta más saludable para las generaciones presentes y futuras.\"\n}\n" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "(Suena una melodía tranquila con sonidos de la naturaleza de fondo, como el canto de pájaros y el susurro del viento. La cámara recorre un campo verde con flores silvestres.)\n\nNarrador:\n¡Hola, eco-amigos! Bienvenidos a Vida Verde, el canal donde aprendemos a vivir en armonía con nuestro planeta. Hoy, vamos a hablar sobre cómo reducir nuestra huella de carbono y convertirnos en defensores activos del medio ambiente. ¡Acompáñanos en este viaje hacia un futuro más verde!\n\n(La música se suaviza mientras la cámara enfoca una chimenea industrial emitiendo humo en contraste con el cielo azul.)\n\n[Parte 1: ¿Qué es la Huella de Carbono?]\n\nNarrador:\nLa huella de carbono es la cantidad total de gases de efecto invernadero que generamos con nuestras actividades diarias. Esto incluye desde conducir un automóvil hasta el consumo de electricidad en casa. Pero no te preocupes, reducir tu huella es más fácil de lo que crees.\n\n(Se muestra una animación de una casa típica, destacando áreas como el transporte, la electricidad y el consumo de alimentos.)\n\nNarrador:\nPequeños cambios, como usar transporte público, consumir productos locales y ahorrar energía, pueden hacer una gran diferencia.\n\n[Parte 2: Consejos para Reducir la Huella de Carbono]\n\nNarrador:\nAquí te dejamos algunos consejos prácticos para reducir tu huella de carbono:\n\nUsa transporte sostenible: Caminar, andar en bicicleta o utilizar transporte público son excelentes alternativas.\nConsume productos locales y de temporada: Esto reduce las emisiones asociadas al transporte de alimentos.\nAhorra energía en casa: Apaga las luces y electrodomésticos cuando no los uses, y opta por bombillas LED.\n(Se muestran imágenes de personas caminando, un mercado local y una familia disfrutando de una cena con velas.)\n\n[Publicidad]\n\nNarrador:\nAhora, un mensaje de nuestros amigos en GreenWave Energy. GreenWave Energy ofrece paneles solares de última generación que no solo ayudan a reducir tu factura de electricidad, sino también tu huella de carbono. Además, por tiempo limitado, están ofreciendo una consulta gratuita para evaluar el potencial solar de tu hogar. ¡Visita www.greenwave.com y da el primer paso hacia una energía más limpia!\n\n(Se muestra un gráfico de una casa equipada con paneles solares y un sol radiante en el cielo.)\n\n[Parte 3: Historias Inspiradoras]\n\nNarrador:\nQueremos compartir contigo algunas historias inspiradoras de personas que han tomado medidas para reducir su impacto ambiental. Desde familias que han reducido su basura a casi cero, hasta comunidades que han logrado energías 100% renovables.\n\n(Se muestran entrevistas breves con personas que cuentan sus experiencias, intercaladas con imágenes de sus hogares y comunidades sostenibles.)\n\n[Conclusión]\n\nNarrador:\nReducir nuestra huella de carbono no es solo una responsabilidad, es una oportunidad para vivir de manera más consciente y en armonía con el planeta. Recuerda, cada pequeño esfuerzo cuenta, y juntos podemos lograr un cambio significativo.\n\n(La cámara regresa al campo verde del inicio, con la luz del atardecer bañando el paisaje.)\n\nNarrador:\nGracias por acompañarnos en este video de Vida Verde. Si te ha gustado, no olvides suscribirte, darle \"like\" y compartirlo con tus amigos. ¡Hasta la próxima, y sigamos cuidando nuestro hermoso planeta!\n\n(El logo de Vida Verde aparece en pantalla, seguido de un agradecimiento final: \"Gracias por ser parte del cambio.\")\n\n[Final del Video]\n\n(Pantalla en negro con un mensaje de inspiración: \"El cambio comienza con nosotros.\")" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n\"summary\": \"El vídeo explica el concepto de huella de carbono, que es la cantidad de gases de efecto invernadero que generamos con nuestras actividades diarias.  Ofrece consejos prácticos para reducir nuestra huella, como usar transporte sostenible, consumir productos locales, ahorrar energía en casa y optar por energías renovables.  El vídeo también destaca historias inspiradoras de personas y comunidades que han implementado cambios significativos para reducir su impacto ambiental, enfatizando que cada pequeño esfuerzo cuenta para lograr un futuro más sostenible.\"\n}\n\n\n```" },
      ],
    },
  ],
});


export const chatGenerateQuestions = modelGenerateQuestions.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        { text: "tema eventos en react transcripcion El video trata sobre el manejo de eventos en React. Se explica que los eventos en React se nombran usando camel case y que se les debe pasar una función para controlarlos. Se muestra cómo enlazar una función a un evento usando 'bind' en el constructor de la clase y también se presenta la alternativa de usar 'public class fields' como una característica experimental de JavaScript." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "[\n  {\n    question: \"¿Cómo se nombran los eventos en React?\",\n    answer: \"Usando camel case.\",\n    option1: \"Usando snake case.\",\n    option2: \"Usando Pascal Case.\",\n    option3: \"Igual que en HTML.\",\n  },\n  {\n    question: \"¿Qué se usa para pasar una función a un evento?\",\n    answer: \"Una función de controlador.\",\n    option1: \"Un callback.\",\n    option2: \"Un listener.\",\n    option3: \"Un manejador.\",\n  },\n  {\n    question: \"¿Cómo se enlaza una función en el constructor?\",\n    answer: \"Usando 'bind'.\",\n    option1: \"Usando 'this'.\",\n    option2: \"Usando 'new'.\",\n    option3: \"No se puede.\",\n  },\n  {\n    question: \"¿Qué son 'public class fields'?\",\n    answer: \"Una característica experimental.\",\n    option1: \"Una librería externa.\",\n    option2: \"Parte del estándar de JS.\",\n    option3: \"Un componente de React.\",\n  },\n  {\n    question: \"¿Qué tipo de dato recibe un manejador de eventos?\",\n    answer: \"Un objeto de evento sintético.\",\n    option1: \"Un objeto de evento nativo.\",\n    option2: \"Una función.\",\n    option3: \"Un string.\",\n  },\n]" },
      ],
    },
    {
      role: "user",
      parts: [
        { text: "react js React es una biblioteca de JavaScript desarrollada por Facebook, usada para construir interfaces de usuario. Su enfoque principal es la creación de aplicaciones web de una sola página, donde se desea que la experiencia del usuario sea rápida y fluida. React permite a los desarrolladores crear componentes reutilizables que son piezas individuales de la interfaz de usuario, lo que facilita el mantenimiento y la expansión de la aplicación a lo largo del tiempo.\n\nUna de las características más destacadas de React es el \"Virtual DOM\", un sistema que permite realizar actualizaciones eficientes en la interfaz de usuario. En lugar de manipular el DOM real directamente, React crea una copia virtual del DOM y realiza todas las actualizaciones en esta copia primero. Luego, React compara esta versión virtual con la real y realiza solo los cambios necesarios, lo que optimiza el rendimiento de la aplicación.\n\nReact utiliza JSX, una extensión de JavaScript que permite escribir código que se parece a HTML dentro de los archivos JavaScript. Aunque JSX es opcional, su uso se ha vuelto muy popular porque facilita la visualización de la estructura de los componentes.\n\nAdemás, React se integra bien con otras bibliotecas y frameworks, permitiendo a los desarrolladores elegir la mejor herramienta para cada parte de la aplicación. En resumen, React es una opción poderosa y flexible para desarrollar interfaces de usuario modernas y eficientes." },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "[\n  {\n    question: \"¿Cuál es la función principal del Virtual DOM en React?\",\n    answer: \"Optimizar actualizaciones de UI.\",\n    option1: \"Renderizar HTML estático.\",\n    option2: \"Manejar eventos del usuario.\",\n    option3: \"Comunicarse con el servidor.\", \n  },\n  {\n    question: \"¿Qué es JSX en el contexto de React?\",\n    answer: \"Una extensión de JavaScript.\",\n    option1: \"Un lenguaje de plantillas.\",\n    option2: \"Una biblioteca de estilos.\",\n    option3: \"Un framework MVC.\",\n  },\n  {\n    question: \"¿Qué tipo de aplicaciones se beneficia más con React?\",\n    answer: \"Aplicaciones web de una sola página.\",\n    option1: \"Aplicaciones móviles nativas.\",\n    option2: \"Sistemas operativos complejos.\",\n    option3: \"Programas de análisis de datos.\",\n  },\n  {\n    question: \"¿Qué facilita la reutilización de código en React?\",\n    answer: \"La creación de componentes.\",\n    option1: \"El uso de funciones puras.\",\n    option2: \"La herencia prototípica.\",\n    option3: \"El tipado estático de datos.\",\n  },\n  {\n    question: \"React fue desarrollado por:\",\n    answer: \"Facebook\",\n    option1: \"Google\",\n    option2: \"Amazon\",\n    option3: \"Microsoft\",\n  },\n]\n" },
      ],
    },
  ],
});
