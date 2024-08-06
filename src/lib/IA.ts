
import {GoogleGenerativeAI} from "@google/generative-ai"

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Eres una IA especializada en la creación de contenido educativo. Tu misión es diseñar un curso completo sobre un tema específico proporcionado por el usuario. El curso estará estructurado en cinco unidades, cada una con cinco capítulos relevantes. Para cada capítulo, necesitas proporcionar una consulta de búsqueda detallada en YouTube que garantice la calidad y relevancia del video educativo. La consulta debe ser lo suficientemente específica para asegurar que el video encontrado sea adecuado para el aprendizaje del tema del capítulo. Todo el contenido, incluyendo los títulos de las unidades y capítulos, debe estar en español. La estructura del JSON para cada unidad debe seguir este formato:[\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Título de la unidad\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      },\n      {\n        \"titulo_capítulo\": \"Título del capítulo\",\n        \"youtube_search_query\": \"Consulta de búsqueda en YouTube\"\n      }\n    ]\n  }\n]\n",
  });
  
  const modelQuery = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "eres una ia capas de crear una query corta para generar una imagen en base a un titulo, tiene que ser corta la query",
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
          {text: "cocina"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\"query\": \"Interior cocina moderna minimalista\"}\n\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "hogar"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\"query\": \"Hogar acogedor con chimenea y paisaje otoñal\"}\n\n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "Ia"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\"query\": \"Representación abstracta de la inteligencia artificial\"}\n"},
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
            {text: "react js"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\n  {\n    \"title\": \"Introducción a React\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Fundamentos de React\",\n        \"youtube_search_query\": \"React JS Tutorial para principiantes: Introducción a componentes, JSX y renderizado\"\n      },\n      {\n        \"titulo_capítulo\": \"Instalación y configuración\",\n        \"youtube_search_query\": \"Cómo instalar y configurar ReactJS: Create React App y herramientas esenciales\"\n      },\n      {\n        \"titulo_capítulo\": \"Componentes funcionales y de clase\",\n        \"youtube_search_query\": \"Componentes funcionales vs componentes de clase en ReactJS: Diferencias y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"JSX y renderizado\",\n        \"youtube_search_query\": \"JSX en ReactJS: Sintaxis, renderizado y ejemplos prácticos\"\n      },\n      {\n        \"titulo_capítulo\": \"Estado y props\",\n        \"youtube_search_query\": \"Estado y props en ReactJS: Gestión de datos y comunicación entre componentes\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Componentes y eventos\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Eventos en React\",\n        \"youtube_search_query\": \"Manejo de eventos en ReactJS: Captura de eventos, callbacks y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Manejo de formularios\",\n        \"youtube_search_query\": \"Formularios en ReactJS: Creación, validación y envío de datos\"\n      },\n      {\n        \"titulo_capítulo\": \"Componentes reutilizables\",\n        \"youtube_search_query\": \"Crear componentes reutilizables en ReactJS: Eficiencia y buenas prácticas\"\n      },\n      {\n        \"titulo_capítulo\": \"Ciclo de vida de los componentes\",\n        \"youtube_search_query\": \"Ciclo de vida de los componentes en ReactJS: Métodos y etapas clave\"\n      },\n      {\n        \"titulo_capítulo\": \"Componentes de estado controlado\",\n        \"youtube_search_query\": \"Componentes de estado controlado en ReactJS: Control de la lógica del formulario\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Hooks y gestión de estado\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Introducción a Hooks\",\n        \"youtube_search_query\": \"React Hooks: Una guía para principiantes: useState, useEffect y más\"\n      },\n      {\n        \"titulo_capítulo\": \"useState y useEffect\",\n        \"youtube_search_query\": \"useState y useEffect en ReactJS: Gestión de estado y efectos secundarios\"\n      },\n      {\n        \"titulo_capítulo\": \"Context API\",\n        \"youtube_search_query\": \"Context API en ReactJS: Compartir estado global entre componentes\"\n      },\n      {\n        \"titulo_capítulo\": \"Redux para gestión de estado\",\n        \"youtube_search_query\": \"Redux en ReactJS: Gestión de estado compleja para aplicaciones grandes\"\n      },\n      {\n        \"titulo_capítulo\": \"Otras Hooks útiles\",\n        \"youtube_search_query\": \"Hooks adicionales en ReactJS: useContext, useRef, useMemo y más\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Rutas y enrutamiento\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Enrutamiento básico con React Router\",\n        \"youtube_search_query\": \"React Router: Enrutamiento básico en ReactJS: Creación de rutas y vistas\"\n      },\n      {\n        \"titulo_capítulo\": \"Rutas anidadas y parámetros\",\n        \"youtube_search_query\": \"Rutas anidadas y parámetros en React Router: Creación de estructuras de navegación\"\n      },\n      {\n        \"titulo_capítulo\": \"Redirecciones y protección de rutas\",\n        \"youtube_search_query\": \"Redirecciones y protección de rutas en React Router: Control de acceso y flujo\"\n      },\n      {\n        \"titulo_capítulo\": \"Enrutamiento de servidor\",\n        \"youtube_search_query\": \"Enrutamiento de servidor con Next.js: Renderizado de servidor y SEO en ReactJS\"\n      },\n      {\n        \"titulo_capítulo\": \"Pruebas de enrutamiento\",\n        \"youtube_search_query\": \"Pruebas de enrutamiento en ReactJS: Cómo asegurar la correcta funcionalidad de las rutas\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Prácticas avanzadas y optimización\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Optimización del rendimiento\",\n        \"youtube_search_query\": \"Optimización del rendimiento en ReactJS: Técnicas para mejorar la velocidad de la aplicación\"\n      },\n      {\n        \"titulo_capítulo\": \"Manejo de errores\",\n        \"youtube_search_query\": \"Manejo de errores en ReactJS: Captura, gestión y visualización de errores\"\n      },\n      {\n        \"titulo_capítulo\": \"Testing en React\",\n        \"youtube_search_query\": \"Testing en ReactJS: Pruebas unitarias, de integración y de extremo a extremo\"\n      },\n      {\n        \"titulo_capítulo\": \"Integración con API\",\n        \"youtube_search_query\": \"Integración con API en ReactJS: Consumir datos de APIs externas\"\n      },\n      {\n        \"titulo_capítulo\": \"Diseño de aplicaciones React\",\n        \"youtube_search_query\": \"Diseño de aplicaciones ReactJS: Arquitecturas, patrones y buenas prácticas\"\n      }\n    ]\n  }\n]\n\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "cocina"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\n  {\n    \"title\": \"Fundamentos de la Cocina\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Herramientas y Equipos de Cocina\",\n        \"youtube_search_query\": \"Herramientas y equipos básicos de cocina: guía completa para principiantes\"\n      },\n      {\n        \"titulo_capítulo\": \"Técnicas de Corte y Picado\",\n        \"youtube_search_query\": \"Técnicas de corte y picado de alimentos: cuchillo, tabla y consejos para profesionales\"\n      },\n      {\n        \"titulo_capítulo\": \"Métodos de Cocción\",\n        \"youtube_search_query\": \"Métodos de cocción explicados: hervir, freír, hornear, asar y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Ingredientes Básicos\",\n        \"youtube_search_query\": \"Ingredientes básicos de cocina: especias, hierbas y condimentos esenciales\"\n      },\n      {\n        \"titulo_capítulo\": \"Seguridad Alimentaria\",\n        \"youtube_search_query\": \"Seguridad alimentaria en la cocina: consejos para evitar intoxicaciones y contaminación\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Recetas Básicas\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Platos Principales Simples\",\n        \"youtube_search_query\": \"Recetas fáciles de platos principales para principiantes: pollo, pescado y carne\"\n      },\n      {\n        \"titulo_capítulo\": \"Sopas y Caldos\",\n        \"youtube_search_query\": \"Recetas de sopas y caldos: recetas caseras para todos los gustos\"\n      },\n      {\n        \"titulo_capítulo\": \"Ensaladas y Aderezos\",\n        \"youtube_search_query\": \"Ensaladas y aderezos: recetas saludables y deliciosas para todos los gustos\"\n      },\n      {\n        \"titulo_capítulo\": \"Postres Fáciles\",\n        \"youtube_search_query\": \"Recetas fáciles de postres: pasteles, tartas y dulces sin complicaciones\"\n      },\n      {\n        \"titulo_capítulo\": \"Panes y Masa Madre\",\n        \"youtube_search_query\": \"Recetas de panes y masa madre: desde pan básico hasta recetas más elaboradas\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Cocina Internacional\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Cocina Italiana\",\n        \"youtube_search_query\": \"Recetas italianas fáciles: pasta, pizza y postres tradicionales\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Mexicana\",\n        \"youtube_search_query\": \"Recetas mexicanas: tacos, enchiladas, mole y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Japonesa\",\n        \"youtube_search_query\": \"Recetas japonesas: sushi, ramen, tempura y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Francesa\",\n        \"youtube_search_query\": \"Recetas francesas: quiche, crepas y clásicos de la cocina francesa\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina India\",\n        \"youtube_search_query\": \"Recetas indias: curry, biryani, samosas y más\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Técnicas Avanzadas\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Repostería\",\n        \"youtube_search_query\": \"Técnicas de repostería: glaseado, decoración, macarons y más\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Molecular\",\n        \"youtube_search_query\": \"Introducción a la cocina molecular: técnicas y recetas innovadoras\"\n      },\n      {\n        \"titulo_capítulo\": \"Conservación de Alimentos\",\n        \"youtube_search_query\": \"Técnicas de conservación de alimentos: enlatado, congelación, fermentación\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Vegana\",\n        \"youtube_search_query\": \"Recetas veganas: platos principales, postres y alternativas a ingredientes tradicionales\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina sin Gluten\",\n        \"youtube_search_query\": \"Recetas sin gluten: alternativas para personas con intolerancia al gluten\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Cocina Saludable y Nutritiva\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Alimentación Balanceada\",\n        \"youtube_search_query\": \"Dieta balanceada para una vida saludable: consejos y recomendaciones\"\n      },\n      {\n        \"titulo_capítulo\": \"Recetas Saludables\",\n        \"youtube_search_query\": \"Recetas saludables y nutritivas para todos los gustos: platos ligeros y sabrosos\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina Vegetariana\",\n        \"youtube_search_query\": \"Recetas vegetarianas: platos con vegetales, legumbres y proteínas vegetales\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina para Deportistas\",\n        \"youtube_search_query\": \"Alimentación para deportistas: recetas con alto valor nutricional para el rendimiento\"\n      },\n      {\n        \"titulo_capítulo\": \"Cocina para Niños\",\n        \"youtube_search_query\": \"Recetas para niños: platos divertidos y nutritivos para los más pequeños\"\n      }\n    ]\n  }\n]\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "algebra"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "[\n  {\n    \"title\": \"Introducción al Álgebra\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Variables y expresiones algebraicas\",\n        \"youtube_search_query\": \"Álgebra básica: ¿Qué son las variables? ¿Cómo se usan en las expresiones algebraicas?\"\n      },\n      {\n        \"titulo_capítulo\": \"Operaciones algebraicas\",\n        \"youtube_search_query\": \"Operaciones con expresiones algebraicas: suma, resta, multiplicación y división\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones lineales\",\n        \"youtube_search_query\": \"Resolver ecuaciones lineales: despejando la incógnita paso a paso\"\n      },\n      {\n        \"titulo_capítulo\": \"Inecuaciones lineales\",\n        \"youtube_search_query\": \"Resolver inecuaciones lineales: encontrar el conjunto solución de la desigualdad\"\n      },\n      {\n        \"titulo_capítulo\": \"Problemas de aplicación\",\n        \"youtube_search_query\": \"Ejemplos de problemas de aplicación con ecuaciones lineales: edad, movimiento, etc.\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Ecuaciones y Sistemas de Ecuaciones\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Ecuaciones cuadráticas\",\n        \"youtube_search_query\": \"Resolver ecuaciones cuadráticas: factorización, fórmula general y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Sistemas de ecuaciones lineales\",\n        \"youtube_search_query\": \"Resolver sistemas de ecuaciones lineales: método de sustitución, eliminación y gráfica\"\n      },\n      {\n        \"titulo_capítulo\": \"Aplicaciones de los sistemas de ecuaciones\",\n        \"youtube_search_query\": \"Problemas de aplicación con sistemas de ecuaciones: mezcla, edades, trabajo\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones con radicales\",\n        \"youtube_search_query\": \"Resolver ecuaciones con radicales: elevar al cuadrado, eliminar radicales y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones racionales\",\n        \"youtube_search_query\": \"Resolver ecuaciones racionales: encontrar el mínimo común múltiplo y resolver la ecuación\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Funciones Algebraicas\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Concepto de función\",\n        \"youtube_search_query\": \"¿Qué es una función? Dominio, rango, representación gráfica y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones lineales\",\n        \"youtube_search_query\": \"Funciones lineales: ecuación, pendiente, intersección con los ejes y gráfica\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones cuadráticas\",\n        \"youtube_search_query\": \"Funciones cuadráticas: vértice, eje de simetría, raíces y gráfica\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones exponenciales\",\n        \"youtube_search_query\": \"Funciones exponenciales: crecimiento y decrecimiento, gráfica y aplicaciones\"\n      },\n      {\n        \"titulo_capítulo\": \"Funciones logarítmicas\",\n        \"youtube_search_query\": \"Funciones logarítmicas: propiedades, gráfica y aplicaciones en la vida real\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Polinomios y Factorización\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Introducción a los polinomios\",\n        \"youtube_search_query\": \"Polinomios: grado, coeficientes, términos y operaciones básicas\"\n      },\n      {\n        \"titulo_capítulo\": \"Factorización de polinomios\",\n        \"youtube_search_query\": \"Técnicas de factorización: factor común, diferencia de cuadrados, trinomio cuadrado perfecto\"\n      },\n      {\n        \"titulo_capítulo\": \"Operaciones con polinomios\",\n        \"youtube_search_query\": \"Suma, resta, multiplicación y división de polinomios: ejemplos y ejercicios\"\n      },\n      {\n        \"titulo_capítulo\": \"Teorema del resto y factorización\",\n        \"youtube_search_query\": \"Teorema del resto y factorización: encontrar raíces de polinomios y factorizarlos\"\n      },\n      {\n        \"titulo_capítulo\": \"Ecuaciones polinómicas\",\n        \"youtube_search_query\": \"Resolver ecuaciones polinómicas: encontrar las raíces del polinomio\"\n      }\n    ]\n  },\n  {\n    \"title\": \"Aplicaciones y Temas Avanzados\",\n    \"chapters\": [\n      {\n        \"titulo_capítulo\": \"Geometría analítica\",\n        \"youtube_search_query\": \"Geometría analítica: ecuaciones de rectas, circunferencias y otras figuras geométricas\"\n      },\n      {\n        \"titulo_capítulo\": \"Matrices y determinantes\",\n        \"youtube_search_query\": \"Matrices y determinantes: operaciones, propiedades y aplicaciones en álgebra lineal\"\n      },\n      {\n        \"titulo_capítulo\": \"Sistemas de ecuaciones no lineales\",\n        \"youtube_search_query\": \"Resolver sistemas de ecuaciones no lineales: métodos gráficos, sustitución y eliminación\"\n      },\n      {\n        \"titulo_capítulo\": \"Introducción a la teoría de grupos\",\n        \"youtube_search_query\": \"Conceptos básicos de la teoría de grupos: operaciones, propiedades y ejemplos\"\n      },\n      {\n        \"titulo_capítulo\": \"Aplicaciones del álgebra en la vida real\",\n        \"youtube_search_query\": \"Ejemplos de cómo se utiliza el álgebra en campos como la física, la economía y la informática\"\n      }\n    ]\n  }\n]\n\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("React js");
    // console.log(result.response.text());
  