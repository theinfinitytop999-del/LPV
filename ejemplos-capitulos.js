// ============================================================================
// EJEMPLOS ADICIONALES DE CAPÍTULOS Y OBJETIVOS
// ============================================================================
// Copia y pega estos ejemplos en app.js dentro del array gameData.chapters
// para agregar más contenido a tu aplicación

const EJEMPLO_CAPITULOS = [
    // ========================================================================
    // CAPÍTULO: Finanzas Personales
    // ========================================================================
    {
        id: 'ch_finanzas',
        title: 'Maestría Financiera',
        description: 'Alcanza la libertad financiera y construye riqueza sostenible',
        icon: '💰',
        objectives: [
            {
                id: 'obj_presupuesto',
                title: 'Crear Presupuesto Personal',
                description: 'Establecer un sistema de presupuesto mensual efectivo',
                icon: '📊',
                difficulty: 'easy',
                dependencies: [],
                miniObjectives: [
                    { id: 'fin1', text: 'Listar todos los ingresos mensuales', completed: false },
                    { id: 'fin2', text: 'Categorizar gastos fijos y variables', completed: false },
                    { id: 'fin3', text: 'Establecer límites por categoría', completed: false },
                    { id: 'fin4', text: 'Usar app de presupuesto durante 1 mes', completed: false }
                ]
            },
            {
                id: 'obj_fondo_emergencia',
                title: 'Fondo de Emergencias',
                description: 'Crear un fondo que cubra 6 meses de gastos',
                icon: '🛡️',
                difficulty: 'hard',
                dependencies: ['obj_presupuesto'],
                miniObjectives: [
                    { id: 'fin5', text: 'Calcular gastos mensuales promedio', completed: false },
                    { id: 'fin6', text: 'Abrir cuenta de ahorros de emergencia', completed: false },
                    { id: 'fin7', text: 'Ahorrar 1 mes de gastos', completed: false },
                    { id: 'fin8', text: 'Ahorrar 3 meses de gastos', completed: false },
                    { id: 'fin9', text: 'Completar 6 meses de gastos ahorrados', completed: false }
                ]
            },
            {
                id: 'obj_inversiones',
                title: 'Comenzar a Invertir',
                description: 'Iniciar tu viaje de inversión en el mercado',
                icon: '📈',
                difficulty: 'medium',
                dependencies: ['obj_fondo_emergencia'],
                miniObjectives: [
                    { id: 'fin10', text: 'Leer 2 libros sobre inversión', completed: false },
                    { id: 'fin11', text: 'Abrir cuenta de inversión', completed: false },
                    { id: 'fin12', text: 'Definir perfil de riesgo', completed: false },
                    { id: 'fin13', text: 'Realizar primera inversión', completed: false },
                    { id: 'fin14', text: 'Invertir consistentemente durante 3 meses', completed: false }
                ]
            },
            {
                id: 'obj_deuda',
                title: 'Eliminar Deudas',
                description: 'Pagar todas las deudas de tarjetas de crédito',
                icon: '💳',
                difficulty: 'hard',
                dependencies: ['obj_presupuesto'],
                miniObjectives: [
                    { id: 'fin15', text: 'Listar todas las deudas con intereses', completed: false },
                    { id: 'fin16', text: 'Negociar tasas de interés', completed: false },
                    { id: 'fin17', text: 'Implementar método bola de nieve', completed: false },
                    { id: 'fin18', text: 'Pagar 50% de la deuda total', completed: false },
                    { id: 'fin19', text: 'Eliminar completamente las deudas', completed: false }
                ]
            }
        ]
    },

    // ========================================================================
    // CAPÍTULO: Relaciones y Social
    // ========================================================================
    {
        id: 'ch_relaciones',
        title: 'Conexiones Significativas',
        description: 'Construye y nutre relaciones profundas y auténticas',
        icon: '❤️',
        objectives: [
            {
                id: 'obj_comunicacion',
                title: 'Mejorar Comunicación',
                description: 'Desarrollar habilidades de comunicación asertiva',
                icon: '💬',
                difficulty: 'medium',
                dependencies: [],
                miniObjectives: [
                    { id: 'rel1', text: 'Leer "Comunicación No Violenta"', completed: false },
                    { id: 'rel2', text: 'Practicar escucha activa semanalmente', completed: false },
                    { id: 'rel3', text: 'Expresar sentimientos sin culpar', completed: false },
                    { id: 'rel4', text: 'Resolver un conflicto con comunicación asertiva', completed: false }
                ]
            },
            {
                id: 'obj_amistades',
                title: 'Cultivar Amistades',
                description: 'Invertir tiempo de calidad en amistades cercanas',
                icon: '👥',
                difficulty: 'easy',
                dependencies: [],
                miniObjectives: [
                    { id: 'rel5', text: 'Identificar 5 amistades prioritarias', completed: false },
                    { id: 'rel6', text: 'Programar reunión mensual con cada uno', completed: false },
                    { id: 'rel7', text: 'Enviar mensajes espontáneos semanalmente', completed: false },
                    { id: 'rel8', text: 'Organizar evento grupal', completed: false }
                ]
            },
            {
                id: 'obj_familia',
                title: 'Fortalecer Lazos Familiares',
                description: 'Mejorar la relación con miembros de la familia',
                icon: '👨‍👩‍👧‍👦',
                difficulty: 'medium',
                dependencies: ['obj_comunicacion'],
                miniObjectives: [
                    { id: 'rel9', text: 'Llamar a padres/familia semanalmente', completed: false },
                    { id: 'rel10', text: 'Planear cena familiar mensual', completed: false },
                    { id: 'rel11', text: 'Resolver un malentendido pendiente', completed: false },
                    { id: 'rel12', text: 'Crear nueva tradición familiar', completed: false }
                ]
            },
            {
                id: 'obj_pareja',
                title: 'Relación de Pareja Saludable',
                description: 'Nutrir y fortalecer la relación romántica',
                icon: '💑',
                difficulty: 'hard',
                dependencies: ['obj_comunicacion'],
                miniObjectives: [
                    { id: 'rel13', text: 'Establecer "date night" semanal', completed: false },
                    { id: 'rel14', text: 'Practicar lenguajes del amor', completed: false },
                    { id: 'rel15', text: 'Tener conversaciones profundas mensuales', completed: false },
                    { id: 'rel16', text: 'Resolver conflictos de forma constructiva', completed: false },
                    { id: 'rel17', text: 'Planear proyecto conjunto', completed: false }
                ]
            }
        ]
    },

    // ========================================================================
    // CAPÍTULO: Creatividad y Hobbies
    // ========================================================================
    {
        id: 'ch_creatividad',
        title: 'Expresión Creativa',
        description: 'Desarrolla tu lado artístico y creativo',
        icon: '🎨',
        objectives: [
            {
                id: 'obj_instrumento',
                title: 'Aprender a Tocar un Instrumento',
                description: 'Dominar lo básico de guitarra/piano/otro',
                icon: '🎸',
                difficulty: 'hard',
                dependencies: [],
                miniObjectives: [
                    { id: 'cre1', text: 'Comprar/conseguir instrumento', completed: false },
                    { id: 'cre2', text: 'Inscribirse en curso o conseguir profesor', completed: false },
                    { id: 'cre3', text: 'Practicar 30 min diarios durante 1 mes', completed: false },
                    { id: 'cre4', text: 'Aprender 5 canciones completas', completed: false },
                    { id: 'cre5', text: 'Tocar una canción frente a amigos/familia', completed: false }
                ]
            },
            {
                id: 'obj_escritura',
                title: 'Escribir Creativamente',
                description: 'Desarrollar el hábito de escritura creativa',
                icon: '✍️',
                difficulty: 'medium',
                dependencies: [],
                miniObjectives: [
                    { id: 'cre6', text: 'Escribir 500 palabras diarias durante 1 semana', completed: false },
                    { id: 'cre7', text: 'Completar 3 cuentos cortos', completed: false },
                    { id: 'cre8', text: 'Unirse a grupo de escritura', completed: false },
                    { id: 'cre9', text: 'Publicar una historia en plataforma online', completed: false }
                ]
            },
            {
                id: 'obj_fotografia',
                title: 'Fotografía Artística',
                description: 'Mejorar habilidades fotográficas',
                icon: '📷',
                difficulty: 'medium',
                dependencies: [],
                miniObjectives: [
                    { id: 'cre10', text: 'Aprender conceptos básicos (ISO, apertura, velocidad)', completed: false },
                    { id: 'cre11', text: 'Tomar 100 fotos practicando composición', completed: false },
                    { id: 'cre12', text: 'Editar 20 fotos con Lightroom/similares', completed: false },
                    { id: 'cre13', text: 'Crear portafolio online', completed: false }
                ]
            },
            {
                id: 'obj_proyecto_creativo',
                title: 'Proyecto Creativo Ambicioso',
                description: 'Completar un proyecto creativo grande',
                icon: '🏗️',
                difficulty: 'hard',
                dependencies: ['obj_instrumento', 'obj_escritura', 'obj_fotografia'],
                miniObjectives: [
                    { id: 'cre14', text: 'Definir proyecto (álbum, libro, exhibición)', completed: false },
                    { id: 'cre15', text: 'Planificar cronograma de 3 meses', completed: false },
                    { id: 'cre16', text: 'Completar 50% del proyecto', completed: false },
                    { id: 'cre17', text: 'Completar 100% del proyecto', completed: false },
                    { id: 'cre18', text: 'Publicar/exhibir/compartir con el público', completed: false }
                ]
            }
        ]
    },

    // ========================================================================
    // CAPÍTULO: Aventura y Viajes
    // ========================================================================
    {
        id: 'ch_aventura',
        title: 'Explorador del Mundo',
        description: 'Expande tus horizontes a través de viajes y aventuras',
        icon: '✈️',
        objectives: [
            {
                id: 'obj_viaje_nacional',
                title: 'Viaje Nacional',
                description: 'Explorar una nueva ciudad/región del país',
                icon: '🗺️',
                difficulty: 'easy',
                dependencies: [],
                miniObjectives: [
                    { id: 'avi1', text: 'Investigar 5 destinos posibles', completed: false },
                    { id: 'avi2', text: 'Ahorrar presupuesto del viaje', completed: false },
                    { id: 'avi3', text: 'Planificar itinerario de 3 días', completed: false },
                    { id: 'avi4', text: 'Realizar el viaje', completed: false }
                ]
            },
            {
                id: 'obj_viaje_internacional',
                title: 'Viaje Internacional',
                description: 'Visitar un país nuevo',
                icon: '🌍',
                difficulty: 'hard',
                dependencies: ['obj_viaje_nacional'],
                miniObjectives: [
                    { id: 'avi5', text: 'Elegir destino internacional', completed: false },
                    { id: 'avi6', text: 'Obtener pasaporte/visa si es necesario', completed: false },
                    { id: 'avi7', text: 'Ahorrar presupuesto completo', completed: false },
                    { id: 'avi8', text: 'Reservar vuelos y alojamiento', completed: false },
                    { id: 'avi9', text: 'Realizar el viaje de al menos 1 semana', completed: false }
                ]
            },
            {
                id: 'obj_aventura_extrema',
                title: 'Actividad de Aventura',
                description: 'Probar una actividad extrema o desafiante',
                icon: '🪂',
                difficulty: 'medium',
                dependencies: [],
                miniObjectives: [
                    { id: 'avi10', text: 'Elegir actividad (paracaidismo, buceo, escalada)', completed: false },
                    { id: 'avi11', text: 'Investigar requisitos y entrenamiento', completed: false },
                    { id: 'avi12', text: 'Tomar curso/certificación si es necesario', completed: false },
                    { id: 'avi13', text: 'Completar la actividad', completed: false }
                ]
            },
            {
                id: 'obj_nomada_digital',
                title: 'Experiencia Nómada',
                description: 'Trabajar remotamente desde otro país',
                icon: '💼',
                difficulty: 'hard',
                dependencies: ['obj_viaje_internacional'],
                miniObjectives: [
                    { id: 'avi14', text: 'Establecer trabajo remoto estable', completed: false },
                    { id: 'avi15', text: 'Investigar destinos nómadas digitales', completed: false },
                    { id: 'avi16', text: 'Planificar logística (alojamiento, internet)', completed: false },
                    { id: 'avi17', text: 'Vivir y trabajar 1 mes desde el extranjero', completed: false },
                    { id: 'avi18', text: 'Documentar experiencia en blog/vlog', completed: false }
                ]
            }
        ]
    },

    // ========================================================================
    // CAPÍTULO: Impacto Social
    // ========================================================================
    {
        id: 'ch_impacto',
        title: 'Cambiar el Mundo',
        description: 'Genera un impacto positivo en tu comunidad y el planeta',
        icon: '🌱',
        objectives: [
            {
                id: 'obj_voluntariado',
                title: 'Voluntariado Regular',
                description: 'Contribuir tiempo a una causa social',
                icon: '🤲',
                difficulty: 'easy',
                dependencies: [],
                miniObjectives: [
                    { id: 'imp1', text: 'Investigar organizaciones locales', completed: false },
                    { id: 'imp2', text: 'Elegir causa que te apasione', completed: false },
                    { id: 'imp3', text: 'Comprometerse a 4 horas mensuales', completed: false },
                    { id: 'imp4', text: 'Completar 6 meses de voluntariado', completed: false }
                ]
            },
            {
                id: 'obj_sostenibilidad',
                title: 'Vida Sostenible',
                description: 'Reducir tu huella de carbono significativamente',
                icon: '♻️',
                difficulty: 'medium',
                dependencies: [],
                miniObjectives: [
                    { id: 'imp5', text: 'Calcular huella de carbono actual', completed: false },
                    { id: 'imp6', text: 'Implementar zero-waste en casa', completed: false },
                    { id: 'imp7', text: 'Reducir consumo de plástico en 80%', completed: false },
                    { id: 'imp8', text: 'Usar transporte sostenible principalmente', completed: false }
                ]
            },
            {
                id: 'obj_mentoria',
                title: 'Mentoría Activa',
                description: 'Mentorear a alguien en tu área de expertise',
                icon: '👨‍🏫',
                difficulty: 'medium',
                dependencies: [],
                miniObjectives: [
                    { id: 'imp9', text: 'Identificar tu área de expertise para compartir', completed: false },
                    { id: 'imp10', text: 'Encontrar mentee a través de plataformas', completed: false },
                    { id: 'imp11', text: 'Establecer plan de mentoría de 3 meses', completed: false },
                    { id: 'imp12', text: 'Completar programa de mentoría exitosamente', completed: false }
                ]
            },
            {
                id: 'obj_proyecto_social',
                title: 'Iniciar Proyecto de Impacto',
                description: 'Crear y liderar un proyecto social propio',
                icon: '🚀',
                difficulty: 'hard',
                dependencies: ['obj_voluntariado', 'obj_mentoria'],
                miniObjectives: [
                    { id: 'imp13', text: 'Identificar problema social a resolver', completed: false },
                    { id: 'imp14', text: 'Diseñar solución y plan de acción', completed: false },
                    { id: 'imp15', text: 'Reunir equipo de voluntarios', completed: false },
                    { id: 'imp16', text: 'Lanzar proyecto piloto', completed: false },
                    { id: 'imp17', text: 'Impactar positivamente a 100+ personas', completed: false }
                ]
            }
        ]
    }
];

// ============================================================================
// INSTRUCCIONES DE USO
// ============================================================================

/*
CÓMO AGREGAR ESTOS CAPÍTULOS A TU APLICACIÓN:

1. Abre el archivo app.js

2. Encuentra el objeto gameData (línea ~20)

3. Dentro del array gameData.chapters, agrega los capítulos que quieras.
   Por ejemplo:

   let gameData = {
       chapters: [
           // ... capítulos existentes ...
           
           // Agregar uno de los ejemplos de arriba:
           {
               id: 'ch_finanzas',
               title: 'Maestría Financiera',
               description: 'Alcanza la libertad financiera...',
               icon: '💰',
               objectives: [ ... ]
           }
       ]
   };

4. Guarda el archivo

5. Recarga la página en el navegador

6. ¡Verás el nuevo capítulo en el mapa!

PERSONALIZACIÓN:

- Cambia los iconos (emojis) a tu gusto
- Modifica los títulos y descripciones
- Ajusta las dificultades según tu criterio
- Agrega o quita mini-objetivos
- Cambia las dependencias para crear tu propio flujo

TIPS:

✅ Usa iconos relevantes y llamativos
✅ Sé específico en los mini-objetivos
✅ Las dependencias deben tener sentido lógico
✅ Balancea dificultades: no todos objetivos sean "hard"
✅ Mantén 3-5 mini-objetivos por objetivo (ni muy pocos ni muchos)

*/
