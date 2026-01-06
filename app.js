// ============================================================================
// LIFE PROGRESS VISION - Sistema de Gamificación de Vida
// ============================================================================

// ============================================================================
// 1. ESTRUCTURA DE DATOS
// ============================================================================

const DIFFICULTY_WEIGHTS = {
    easy: 1,
    medium: 2,
    hard: 4
};

// Datos de ejemplo - Sistema de Capítulos y Objetivos
let gameData = {
    chapters: [
        {
            id: 'ch2',
            title: 'Heart',
            description: 'Todos aquellos proyectos artísticos que atañen a mi corazón.',
            icon: '❤️',
            objectives: [
                {
                    id: 'book_phase_1',
                    title: 'Fase I: Génesis y Sentido',
                    description: 'Definir el alma del libro y los límites de la historia.',
                    icon: '🖋️',
                    difficulty: 'medium',
                    categoryId: 'cat_mental',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'bp1_1', text: 'Definir el propósito (¿Para qué escribo esto?)', completed: false },
                        { id: 'bp1_2', text: 'Establecer la voz narrativa (¿Quién cuenta la historia?)', completed: false },
                        { id: 'bp1_3', text: 'Lista de "Intocables" (Qué cosas no se contarán)', completed: false },
                        { id: 'bp1_4', text: 'Mapa de hitos (Los 5 momentos clave de estos meses)', completed: false }
                    ]
                },
                {
                    id: 'book_phase_2',
                    title: 'Fase II: La Catarsis (Escritura)',
                    description: 'El volcado de los hechos y las emociones al papel.',
                    icon: '📖',
                    difficulty: 'hard',
                    categoryId: 'cat_mental',
                    dependencies: ['book_phase_1'],
                    miniObjectives: [
                        { id: 'bp2_1', text: 'Escribir el primer borrador del capítulo inicial', completed: false },
                        { id: 'bp2_2', text: 'Completar 5.000 palabras (o 5 relatos cortos)', completed: false },
                        { id: 'bp2_3', text: 'Escribir el clímax emocional del libro', completed: false }
                    ]
                },
                {
                    id: 'book_phase_3',
                    title: 'Fase III: Legado y Cierre',
                    description: 'Pulir el diamante y dar por terminada la obra.',
                    icon: '✨',
                    difficulty: 'medium',
                    categoryId: 'cat_mental',
                    dependencies: ['book_phase_2'],
                    miniObjectives: [
                        { id: 'bp3_1', text: 'Lectura final y corrección de estilo', completed: false },
                        { id: 'bp3_2', text: 'Escribir el epílogo (La visión del futuro)', completed: false },
                        { id: 'bp3_3', text: 'Maquetar el libro (Digital o Físico para ti)', completed: false },
                        { id: 'bp3_4', text: 'El Fin: Declarar la obra terminada', completed: false }
                    ]
                },
            ],
        },
        {
            id: 'ch1',
            title: 'Rebirth',
            description: 'Reconstrucción total: Hábitos, Academia y Carrera Profesional.',
            icon: '🔥',
            objectives: [
                // --- RAMA PERSONAL & HÁBITOS (Categoría: Mental) ---

                {
                    id: 'habits_core',
                    title: 'Recuperar Hábitos Maestros',
                    description: 'Establecer la base operativa mental y física.',
                    icon: '🧘',
                    difficulty: 'hard',
                    categoryId: 'cat_mental',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'h1', text: 'Sincronizar horario de sueño (7-8h)', completed: false },
                        { id: 'h2', text: 'Meditación diaria (mínimo 10 min)', completed: false },
                        { id: 'h3', text: 'Lectura diaria (15 min)', completed: false },
                        { id: 'h4', text: 'Ejercicio 4 veces por semana', completed: false },
                        { id: 'h5', text: 'Escritura de Diario (Journaling)', completed: false },
                        { id: 'h6', text: 'Configurar App de Tracking de hábitos', completed: false },
                        { id: 'h7', text: 'Realizar primera Revisión Semanal', completed: false },
                        { id: 'h8', text: 'Ejecutar 2 Sesiones de Foco/Deep Work diarias', completed: false }
                    ]
                },

                // --- RAMA CONDUCCIÓN (Categoría: Physic) ---
                {
                    id: 'moto_license',
                    title: 'Licencia de Moto',
                    description: 'Completar curso y obtener pase de conducción.',
                    icon: '🏍️',
                    difficulty: 'medium',
                    categoryId: 'cat_physic',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'm1', text: 'Inscripción y examen médico', completed: false },
                        { id: 'm2', text: 'Completar horas teóricas', completed: false },
                        { id: 'm3', text: 'Completar horas prácticas', completed: false },
                        { id: 'm4', text: 'Aprobar examen y reclamar pase', completed: false }
                    ]
                },
                {
                    id: 'car_license',
                    title: 'Licencia de Carro',
                    description: 'Dominar la conducción de cuatro ruedas.',
                    icon: '🚗',
                    difficulty: 'medium',
                    categoryId: 'cat_physic',
                    dependencies: ['moto_license'],
                    miniObjectives: [
                        { id: 'c1', text: 'Completar horas teóricas', completed: false },
                        { id: 'c2', text: 'Completar horas prácticas (Si aprendo moto, el carro es más fácil)', completed: false },
                        { id: 'c3', text: 'Aprobar examen final', completed: false }
                    ]
                },

                // --- RAMA ACADÉMICA: RESUMEN (Categoría: Learn) ---
                {
                    id: 'acad_algebra',
                    title: 'Maestría: Álgebra Lineal',
                    description: 'Vectores, espacios y transformaciones.',
                    icon: '📐',
                    difficulty: 'medium',
                    categoryId: 'cat_learn',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'al1', text: 'Resumen: Espacios vectoriales y Subespacios', completed: false },
                        { id: 'al2', text: 'Resumen: Transformaciones lineales', completed: false },
                        { id: 'al3', text: 'Ejercicios: Eigenvalues y Eigenvectors', completed: false },
                        { id: 'al4', text: 'Publicar página resumen en Notion', completed: false }
                    ]
                },
                {
                    id: 'acad_calculus',
                    title: 'Maestría: Cálculo Integral',
                    description: 'Integración avanzada y series.',
                    icon: '∫',
                    difficulty: 'medium',
                    categoryId: 'cat_learn',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'ci1', text: 'Refrescar: Métodos de Integración', completed: false },
                        { id: 'ci2', text: 'Resumen: Aplicaciones de la Integral', completed: false },
                        { id: 'ci3', text: 'Ejercicios de Series de Taylor y Maclaurin', completed: false },
                        { id: 'ci4', text: 'Publicar página resumen en Notion', completed: false }
                    ]
                },
                {
                    id: 'acad_data_struct',
                    title: 'Maestría: Estructuras de Datos',
                    description: 'Algoritmos y organización de información.',
                    icon: '🌳',
                    difficulty: 'hard',
                    categoryId: 'cat_learn',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'ds1', text: 'Resumen: Análisis de complejidad Big O', completed: false },
                        { id: 'ds2', text: 'Implementar: Árboles Binarios y Grafos', completed: false },
                        { id: 'ds3', text: 'Proyecto: Algoritmo de búsqueda optimizado', completed: false },
                        { id: 'ds4', text: 'Publicar documentación en Notion', completed: false }
                    ]
                },
                {
                    id: 'acad_arch',
                    title: 'Maestría: Arq. Computadores',
                    description: 'Funcionamiento interno del hardware.',
                    icon: '📟',
                    difficulty: 'hard',
                    categoryId: 'cat_learn',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'ar1', text: 'Resumen: Ciclo de instrucción y Registros', completed: false },
                        { id: 'ar2', text: 'Entender: Jerarquía de memoria y Cache', completed: false },
                        { id: 'ar3', text: 'Proyecto: Simulación de procesador', completed: false },
                        { id: 'ar4', text: 'Publicar página resumen en Notion', completed: false }
                    ]
                },
                {
                    id: 'acad_db',
                    title: 'Maestría: Bases de Datos',
                    description: 'Modelado y consultas SQL.',
                    icon: '🗄️',
                    difficulty: 'medium',
                    categoryId: 'cat_learn',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'db1', text: 'Resumen: Normalización (1NF, 2NF, 3NF)', completed: false },
                        { id: 'db2', text: 'Hacer: Diagramas Entidad-Relación complejos', completed: false },
                        { id: 'db3', text: 'Proyecto: Base de Datos funcional SQL', completed: false },
                        { id: 'db4', text: 'Publicar guía SQL en Notion', completed: false }
                    ]
                },

                // --- RAMA ACADÉMICA: PRÓXIMO (Categoría: Learn) ---
                {
                    id: 'next_physics',
                    title: 'Intro: Elec. y Magnetismo',
                    description: 'Primer tercio del curso.',
                    icon: '⚡',
                    difficulty: 'medium',
                    categoryId: 'cat_learn',
                    dependencies: ['acad_calculus'],
                    miniObjectives: [
                        { id: 'p1', text: 'Intro: Ley de Coulomb y Campo Eléctrico', completed: false },
                        { id: 'p2', text: '1/3: Ley de Gauss y Potencial Eléctrico', completed: false }
                    ]
                },
                {
                    id: 'next_multi_calc',
                    title: 'Intro: Cálculo Multivariado',
                    description: 'Funciones de varias variables.',
                    icon: '🌀',
                    difficulty: 'hard',
                    categoryId: 'cat_learn',
                    dependencies: ['acad_calculus', 'acad_algebra'],
                    miniObjectives: [
                        { id: 'mc1', text: 'Intro: Vectores en R3 y superficies', completed: false },
                        { id: 'mc2', text: '1/3: Derivadas parciales y Gradiente', completed: false }
                    ]
                },
                {
                    id: 'next_discrete_math',
                    title: 'Intro: Matemáticas Discretas',
                    description: 'Lógica y estructuras discretas.',
                    icon: '🧩',
                    difficulty: 'medium',
                    categoryId: 'cat_learn',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'dm1', text: 'Intro: Lógica proposicional y predicados', completed: false },
                        { id: 'dm2', text: '1/3: Teoría de conjuntos y Relaciones', completed: false }
                    ]
                },
                {
                    id: 'next_stats',
                    title: 'Intro: Prob. y Estadística',
                    description: 'Análisis de datos y azar.',
                    icon: '🎲',
                    difficulty: 'medium',
                    categoryId: 'cat_learn',
                    dependencies: ['acad_calculus'],
                    miniObjectives: [
                        { id: 'st1', text: 'Intro: Estadística descriptiva y medidas', completed: false },
                        { id: 'st2', text: '1/3: Axiomas de probabilidad y Teorema de Bayes', completed: false }
                    ]
                },

                // --- RAMA TRABAJO (Categoría: Work) ---
                {
                    id: 'web_fundamentals',
                    title: 'Fundamentos Web',
                    description: 'HTML5 y CSS3 desde cero.',
                    icon: '🌐',
                    difficulty: 'easy',
                    categoryId: 'cat_work',
                    dependencies: [],
                    miniObjectives: [
                        { id: 'wf1', text: 'Tutoriales básicos HTML/CSS', completed: false },
                        { id: 'wf2', text: 'Práctica: Maquetación landing simple', completed: false },
                        { id: 'wf3', text: 'Evaluación IA conceptos básicos', completed: false }
                    ]
                },
                {
                    id: 'web_wp_mastery',
                    title: 'Maestría CMS',
                    description: 'WordPress, Elementor y Kits.',
                    icon: '🏗️',
                    difficulty: 'medium',
                    categoryId: 'cat_work',
                    dependencies: ['web_fundamentals'],
                    miniObjectives: [
                        { id: 'wp1', text: 'Maestría WordPress y Elementor Pro', completed: false },
                        { id: 'wp2', text: 'Maestría y personalización de Template Kits', completed: false },
                        { id: 'wp3', text: 'Optimización de velocidad en WP', completed: false }
                    ]
                },
                {
                    id: 'web_design',
                    title: 'Diseño Web & Workflow',
                    description: 'Estética profesional y Git.',
                    icon: '🎨',
                    difficulty: 'medium',
                    categoryId: 'cat_work',
                    dependencies: ['web_wp_mastery'],
                    miniObjectives: [
                        { id: 'wd1', text: 'Reconocer UI de alta calidad', completed: false },
                        { id: 'wd2', text: 'Maestría Git: Configurar Workflow con Git/GitHub', completed: false },
                        { id: 'wd3', text: 'Definir flujo de trabajo cliente-dev', completed: false }
                    ]
                },
                {
                    id: 'web_curriculum',
                    title: 'Curriculum Web (Hito)',
                    description: 'Tu mejor carta de presentación.',
                    icon: '📄',
                    difficulty: 'hard',
                    categoryId: 'cat_work',
                    dependencies: ['web_design'],
                    miniObjectives: [
                        { id: 'cv1', text: 'Diseño visual del Portfolio', completed: false },
                        { id: 'cv2', text: 'Desarrollo web del Curriculum', completed: false },
                        { id: 'cv3', text: 'Despliegue (Hosting/Dominio)', completed: false }
                    ]
                },

                // --- META FINAL (Categoría: Purpose) ---
                {
                    id: 'web_business',
                    title: 'Consultor Web Senior',
                    description: 'Hito financiero de facturación.',
                    icon: '💰',
                    difficulty: 'hard',
                    categoryId: 'cat_purpose',
                    dependencies: ['web_curriculum'],
                    miniObjectives: [
                        { id: 'biz1', text: 'Aceptar primer proyecto real', completed: false },
                        { id: 'biz2', text: 'Consultas técnicas con Carlos', completed: false },
                        { id: 'biz3', text: 'Facturar 3.000.000 COP en un mes', completed: false }
                    ]
                }
            ]
        }
    ],
    categories: [
        { id: 'cat_learn', name: 'Learn', color: '#4ade80' },
        { id: 'cat_physic', name: 'Physic', color: '#06b6d4' },
        { id: 'cat_social', name: 'Social', color: '#a855f7' },
        { id: 'cat_mental', name: 'Mental', color: '#f472b6' },
        { id: 'cat_work', name: 'Work', color: '#84cc16' },
        { id: 'cat_purpose', name: 'Purpose', color: '#eab308' }
    ],
    dailyGoals: {
        defaultTasks: [
            { id: 'default_1', text: 'Meditar', isDefault: true },
            { id: 'default_2', text: 'Hacer ejercicio', isDefault: true },
            { id: 'default_3', text: 'Leer', isDefault: true },
            { id: 'default_4', text: 'Horario de sueño 7-8h', isDefault: true }
        ],
        days: {},
        customCategories: []
    },
    achievements: {
        unlocked: [], // [{ id, unlockedAt }]
        progress: {}, // { achievementId: { current, target } }
        notifications: [] // Queue de notificaciones
    }
};
// Estado de la aplicación (global para acceso desde admin.js)
window.appState = {
    currentView: 'chaptersView',
    currentChapter: null,
    currentObjective: null,
    network: null,
    dataChanged: false,
    // Daily Goals State
    currentMonth: null,
    currentDay: null,
    monthsLoaded: 2,
    dailyGoalsView: 'months'
};

// ============================================================================
// SISTEMA DE SONIDOS
// ============================================================================
const appSounds = {
    open: new Audio('./sfx/open.mp3'),
    close: new Audio('./sfx/close.mp3'),
    achievement: new Audio('./sfx/achievement.mp3')
};

function playSound(type) {
    // Si el archivo no existe o falla, el catch evita errores en consola
    if (appSounds[type]) {
        appSounds[type].currentTime = 0;
        appSounds[type].play().catch(() => {
            // Silencioso: El usuario usará placeholders por ahora
        });
    }
}

// ============================================================================
// 2. GESTIÓN DE PERSISTENCIA (LocalStorage)
// ============================================================================

function saveProgress(showNotification = false) {
    try {
        localStorage.setItem('lifeProgressVision', JSON.stringify(gameData));
        appState.dataChanged = false;
        if (showNotification) {
            showToast('Progreso guardado exitosamente', 'success');
        }
    } catch (error) {
        console.error('Error guardando progreso:', error);
        showToast('Error al guardar progreso', 'error');
    }
}

function manualSave() {
    saveProgress(true);
}

function markDataAsChanged() {
    appState.dataChanged = true;
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('lifeProgressVision');
        if (saved) {
            gameData = JSON.parse(saved);

            // Migración: Asegurar que existan estructuras necesarias
            if (!gameData.dailyGoals) {
                gameData.dailyGoals = {
                    defaultTasks: [
                        { id: 'default_1', text: 'Meditar', isDefault: true },
                        { id: 'default_2', text: 'Hacer ejercicio', isDefault: true },
                        { id: 'default_3', text: 'Leer', isDefault: true },
                        { id: 'default_4', text: 'Horario de sueño 7-8h', isDefault: true }
                    ],
                    days: {},
                    customCategories: []
                };
            }

            // CRÍTICO: Asegurar que achievements exista
            if (!gameData.achievements) {
                console.warn('⚠️ Migrating: Adding achievements structure');
                gameData.achievements = {
                    unlocked: [],
                    progress: {},
                    notifications: []
                };
                saveProgress(false);
            }

            renderChaptersView();
            updateGlobalProgress();
            return true;
        }
    } catch (error) {
        console.error('Error cargando progreso:', error);
        showToast('Error al cargar progreso', 'error');
    }
    return false;
}

function exportProgress() {
    try {
        const dataStr = JSON.stringify(gameData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `life-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showToast('Progreso exportado exitosamente', 'success');
    } catch (error) {
        console.error('Error exportando:', error);
        showToast('Error al exportar progreso', 'error');
    }
}

function importProgress(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            gameData = imported;
            saveProgress();
            location.reload();
        } catch (error) {
            console.error('Error importando:', error);
            showToast('Archivo JSON inválido', 'error');
        }
    };
    reader.readAsText(file);
}

// ============================================================================
// 2.5. GESTIÓN DE OBJETIVOS DIARIOS
// ============================================================================

// Obtener fecha actual en formato ISO
function getTodayISO() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Inicializar un día con tareas por defecto si no existe
function initializeDay(dateISO) {
    if (!gameData.dailyGoals.days[dateISO]) {
        gameData.dailyGoals.days[dateISO] = {
            date: dateISO,
            tasks: gameData.dailyGoals.defaultTasks.map((task, index) => ({
                id: `${dateISO}_default_${index}`,
                text: task.text,
                completed: false,
                isDefault: true,
                category: null // Se puede asignar categoría manualmente
            }))
        };
        markDataAsChanged();
    }
    return gameData.dailyGoals.days[dateISO];
}

// Obtener o crear día
function getOrCreateDay(dateISO) {
    return initializeDay(dateISO);
}

// Añadir tarea personalizada a un día
function addDailyTask(dateISO, taskText, category = null) {
    const day = getOrCreateDay(dateISO);
    const newTask = {
        id: `${dateISO}_custom_${Date.now()}`,
        text: taskText,
        completed: false,
        isDefault: false,
        category: category
    };
    day.tasks.push(newTask);
    markDataAsChanged();
    return newTask;
}

// Eliminar tarea de un día (ahora permite eliminar default tasks también)
function removeDailyTask(dateISO, taskId) {
    const day = gameData.dailyGoals.days[dateISO];
    if (day) {
        day.tasks = day.tasks.filter(task => task.id !== taskId);
        markDataAsChanged();
    }
}

// Cambiar estado de completado de una tarea
function toggleDailyTask(dateISO, taskId) {
    const day = gameData.dailyGoals.days[dateISO];
    if (!day) return;

    const task = day.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        markDataAsChanged();

        // Verificar logros automáticamente
        if (typeof checkAllAchievements === 'function') {
            checkAllAchievements();
        }

        // Celebrar si se completó el día al 100%
        if (getDayProgress(dateISO) === 100) {
            celebrateGoldenCompletion();
        }
    }
}

// Editar texto de tarea
function editDailyTask(dateISO, taskId, newText) {
    const day = gameData.dailyGoals.days[dateISO];
    if (day) {
        const task = day.tasks.find(t => t.id === taskId);
        if (task && !task.isDefault) {
            task.text = newText;
            markDataAsChanged();
        }
    }
}

// Calcular progreso de un día (0-100)
function getDayProgress(dateISO) {
    const day = gameData.dailyGoals.days[dateISO];
    if (!day || day.tasks.length === 0) return 0;

    const completed = day.tasks.filter(t => t.completed).length;
    return Math.round((completed / day.tasks.length) * 100);
}

// Obtener color según progreso
function getProgressColor(progress) {
    if (progress === 100) return 'golden';
    if (progress > 80) return 'blue-light';
    if (progress > 60) return 'orange';
    return 'purple';
}

// Verificar si un día está vacío (sin tareas)
function isDayEmpty(dateISO) {
    const day = gameData.dailyGoals.days[dateISO];
    return !day || day.tasks.length === 0;
}

// Calcular estadísticas de un mes (excluyendo días vacíos)
function getMonthStats(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    let totalDays = 0;
    let completedDays = 0;
    let totalProgress = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const dateISO = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Excluir días vacíos
        if (isDayEmpty(dateISO)) continue;

        totalDays++;
        const progress = getDayProgress(dateISO);
        totalProgress += progress;
        if (progress === 100) completedDays++;
    }

    return {
        totalDays,
        completedDays,
        averageProgress: totalDays > 0 ? Math.round(totalProgress / totalDays) : 0
    };
}

// Obtener lista de meses disponibles (últimos N meses)
function getAvailableMonths(count = 2) {
    const months = [];
    const today = new Date();

    for (let i = 0; i < count; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        });
    }

    return months;
}

// Cargar más meses (para paginación)
function loadMoreMonths() {
    appState.monthsLoaded += 2;
    renderMonthsView();
}

// ============================================================================
// HELPER FUNCTIONS PARA SISTEMA DE LOGROS
// ============================================================================

// Helper: Calcular días consecutivos con progreso 100%
function getConsecutiveGoldenDays() {
    let consecutive = 0;
    const today = new Date();

    for (let i = 0; i < 100; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateISO = d.toISOString().split('T')[0];

        // Si el día está vacío, NO cuenta para la racha (ni la rompe)
        if (isDayEmpty(dateISO)) {
            // Solo saltamos si aún no hemos empezado a contar
            if (consecutive === 0) continue;
            // Si ya tenemos racha, un día vacío la rompe
            else break;
        }

        const progress = getDayProgress(dateISO);
        if (progress === 100) {
            consecutive++;
        } else {
            // Día con tareas pero no 100% - rompe la racha
            break;
        }
    }

    console.log(`📊 Consecutive Golden Days: ${consecutive}`);
    return consecutive;
}

// Helper: Contar total de tareas completadas por categoría
function getTotalTasksByCategory(data, categoryId) {
    let count = 0;
    Object.keys(data.dailyGoals.days).forEach(dateISO => {
        const day = data.dailyGoals.days[dateISO];
        day.tasks.forEach(task => {
            if (task.category === categoryId && task.completed) {
                count++;
            }
        });
    });
    return count;
}

// Helper: Máximo de tareas completadas en un solo día
function getMaxTasksCompletedInDay(data) {
    let max = 0;
    Object.keys(data.dailyGoals.days).forEach(dateISO => {
        const day = data.dailyGoals.days[dateISO];
        const completed = day.tasks.filter(t => t.completed).length;
        if (completed > max) max = completed;
    });
    return max;
}

// Helper: Días consecutivos con al menos una tarea
function getConsecutiveActiveDays(data) {
    let consecutive = 0;
    const today = new Date();

    for (let i = 0; i < 100; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateISO = d.toISOString().split('T')[0];

        if (!isDayEmpty(dateISO)) {
            consecutive++;
        } else {
            break;
        }
    }
    return consecutive;
}

// Helper: Racha consecutiva de una tarea específica
function getConsecutiveTaskStreak(data, taskNamePartial) {
    let consecutive = 0;
    const today = new Date();

    for (let i = 0; i < 100; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateISO = d.toISOString().split('T')[0];

        const day = data.dailyGoals.days[dateISO];
        if (!day) break;

        const hasTask = day.tasks.some(t =>
            t.text.toLowerCase().includes(taskNamePartial.toLowerCase()) && t.completed
        );

        if (hasTask) {
            consecutive++;
        } else {
            break;
        }
    }
    return consecutive;
}

// Helper: Racha de horario de sueño
function getConsecutiveSleepScheduleDays(data) {
    return getConsecutiveTaskStreak(data, 'sueño');
}

// Helper: Racha de meditación
function getConsecutiveMeditationDays(data) {
    return getConsecutiveTaskStreak(data, 'Meditar');
}

// Helper: Contar días dorados totales
function getTotalGoldenDays(data) {
    let count = 0;
    Object.keys(data.dailyGoals.days).forEach(dateISO => {
        if (!isDayEmpty(dateISO) && getDayProgress(dateISO) === 100) {
            count++;
        }
    });
    return count;
}

// Helper: Verificar días rojos en un mes
function hasRedDaysInMonth(data, monthKey) {
    const days = Object.keys(data.dailyGoals.days).filter(d => d.startsWith(monthKey));
    return days.some(dateISO => {
        if (isDayEmpty(dateISO)) return false;
        return getDayProgress(dateISO) < 60;
    });
}

// Helper: Contar días rojos en un mes
function countRedDaysInMonth(data, monthKey) {
    const days = Object.keys(data.dailyGoals.days).filter(d => d.startsWith(monthKey));
    return days.filter(dateISO => {
        if (isDayEmpty(dateISO)) return false;
        return getDayProgress(dateISO) < 60;
    }).length;
}

// Helper: Contar días dorados en un mes
function countGoldenDaysInMonth(data, monthKey) {
    const days = Object.keys(data.dailyGoals.days).filter(d => d.startsWith(monthKey));
    return days.filter(dateISO => {
        if (isDayEmpty(dateISO)) return false;
        return getDayProgress(dateISO) === 100;
    }).length;
}

// Helper: Días consecutivos >= 80%
function getMaxConsecutiveAbove80Days(data) {
    let maxStreak = 0;
    let currentStreak = 0;
    const today = new Date();

    for (let i = 0; i < 100; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateISO = d.toISOString().split('T')[0];

        if (isDayEmpty(dateISO)) continue;

        const progress = getDayProgress(dateISO);
        if (progress >= 80) {
            currentStreak++;
            if (currentStreak > maxStreak) maxStreak = currentStreak;
        } else {
            currentStreak = 0;
        }
    }
    return maxStreak;
}

// Helper: Meses consecutivos >= 80%
function getConsecutiveMonthsAbove80(data) {
    let consecutive = 0;
    const today = new Date();

    for (let i = 0; i < 12; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;

        const stats = getMonthStats(year, month);
        if (stats.averageProgress >= 80 && stats.totalDays >= 10) {
            consecutive++;
        } else {
            break;
        }
    }
    return consecutive;
}

// Helper: Total días trackeados
function getTotalDaysTracked(data) {
    return Object.keys(data.dailyGoals.days).filter(dateISO => !isDayEmpty(dateISO)).length;
}

// Helper: Tareas en una semana
function getTasksCompletedInWeek(data, weekOffset = 0) {
    let count = 0;
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() - (weekOffset * 7));

    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const dateISO = d.toISOString().split('T')[0];

        const day = data.dailyGoals.days[dateISO];
        if (day) {
            count += day.tasks.filter(t => t.completed).length;
        }
    }
    return count;
}

// Helper: Máx tareas en semana
function getMaxTasksCompletedInWeek(data) {
    let max = 0;
    for (let week = 0; week < 20; week++) {
        const count = getTasksCompletedInWeek(data, week);
        if (count > max) max = count;
    }
    return max;
}

// ============================================================================
// 3. LÓGICA DE PROGRESO Y DESBLOQUEO
// ============================================================================

function getObjectiveProgress(objective) {
    const completed = objective.miniObjectives.filter(m => m.completed).length;
    const total = objective.miniObjectives.length;
    return (completed / total) * 100;
}

function isObjectiveCompleted(objective) {
    return objective.miniObjectives.every(m => m.completed);
}

function isObjectiveAvailable(objective, chapter) {
    if (objective.dependencies.length === 0) return true;

    return objective.dependencies.every(depId => {
        const depObjective = chapter.objectives.find(obj => obj.id === depId);
        return depObjective && isObjectiveCompleted(depObjective);
    });
}

function getObjectiveStatus(objective, chapter) {
    if (isObjectiveCompleted(objective)) return 'completed';
    if (!isObjectiveAvailable(objective, chapter)) return 'locked';
    if (getObjectiveProgress(objective) > 0) return 'in-progress';
    return 'available';
}

function getChapterProgress(chapter) {
    let totalUnits = 0;
    let completedUnits = 0;

    chapter.objectives.forEach(objective => {
        const weight = DIFFICULTY_WEIGHTS[objective.difficulty];
        totalUnits += weight;
        if (isObjectiveCompleted(objective)) {
            completedUnits += weight;
        }
    });

    return totalUnits > 0 ? (completedUnits / totalUnits) * 100 : 0;
}

function getGlobalProgress() {
    let totalUnits = 0;
    let completedUnits = 0;

    gameData.chapters.forEach(chapter => {
        chapter.objectives.forEach(objective => {
            const weight = DIFFICULTY_WEIGHTS[objective.difficulty];
            totalUnits += weight;
            if (isObjectiveCompleted(objective)) {
                completedUnits += weight;
            }
        });
    });

    return totalUnits > 0 ? (completedUnits / totalUnits) * 100 : 0;
}

function toggleMiniObjective(chapterId, objectiveId, miniObjectiveId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const objective = chapter.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    const miniObjective = objective.miniObjectives.find(m => m.id === miniObjectiveId);
    if (!miniObjective) return;

    // Verificar el estado antes del toggle
    const wasCompleted = isObjectiveCompleted(objective);

    miniObjective.completed = !miniObjective.completed;

    // Verificar el estado después del toggle
    const isNowCompleted = isObjectiveCompleted(objective);

    // Si el objetivo acaba de completarse (pasó de incompleto a completo)
    if (!wasCompleted && isNowCompleted) {
        celebrateGoldenCompletion();
    }
    // Si era objetivo difícil y se completó (mantener comportamiento original también)
    else if (isNowCompleted && objective.difficulty === 'hard') {
        celebrateCompletion();
    }

    markDataAsChanged();
    renderObjectiveDetail(chapterId, objectiveId);
    updateAllProgress();
}

function celebrateCompletion() {
    // Confetti animación
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    showToast('¡Objetivo Difícil Completado! 🎉', 'success');
}

function celebrateGoldenCompletion() {
    // Confetti dorado brillante
    const duration = 3000;
    const end = Date.now() + duration;

    const goldenColors = ['#FFD700', '#FFC107', '#FFEB3B', '#FFB300', '#FFA000'];

    (function frame() {
        // Explosión desde el centro
        confetti({
            particleCount: 5,
            angle: 90,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: goldenColors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2
        });

        // Explosiones desde los lados
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: goldenColors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: goldenColors,
            ticks: 200,
            gravity: 0.8,
            scalar: 1.2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    showToast('¡Objetivo Completado al 100%! 🏆', 'success');
}

// ============================================================================
// 4. RENDERIZADO DE VISTAS
// ============================================================================

function renderChaptersView() {
    const grid = document.getElementById('chaptersGrid');
    grid.innerHTML = '';

    gameData.chapters.forEach(chapter => {
        const progress = getChapterProgress(chapter);
        const completedCount = chapter.objectives.filter(obj => isObjectiveCompleted(obj)).length;
        const totalCount = chapter.objectives.length;

        const card = document.createElement('div');
        card.className = 'chapter-card';
        card.innerHTML = `
            <div class="chapter-icon">${chapter.icon}</div>
            <h3 class="chapter-title">${chapter.title}</h3>
            <p class="chapter-description">${chapter.description}</p>
            <div class="progress-bar-container">
                <div class="progress-bar ${progress >= 100 ? 'golden-complete' : ''}" style="width: ${progress}%"></div>
                <span class="progress-text">${Math.round(progress)}%</span>
            </div>
            <div class="chapter-stats">
                <div class="stat">
                    <div class="stat-value">${completedCount}/${totalCount}</div>
                    <div class="stat-label">Objetivos</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${chapter.objectives.reduce((sum, obj) => sum + DIFFICULTY_WEIGHTS[obj.difficulty], 0)}</div>
                    <div class="stat-label">Unidades</div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            showSkillTreeView(chapter.id);
        });

        grid.appendChild(card);
    });

    updateGlobalProgress();
}

function showSkillTreeView(chapterId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    appState.currentChapter = chapterId;
    switchView('skillTreeView');

    document.getElementById('chapterTitle').textContent = chapter.title;
    updateChapterProgress();
    renderSkillTree(chapter);
}

function renderSkillTree(chapter) {
    const container = document.getElementById('skillTreeNetwork');

    // Preparar nodos y aristas para vis-network
    const nodes = chapter.objectives.map((objective, index) => {
        const status = getObjectiveStatus(objective, chapter);
        const progress = getObjectiveProgress(objective);

        let color = {
            background: '#1e293b',
            border: '#334155',
            highlight: { background: '#334155', border: '#3b82f6' }
        };

        if (status === 'completed') {
            color = {
                background: '#059669',  // Verde oscuro sólido en lugar de gradiente
                border: '#10b981',
                highlight: { background: '#047857', border: '#10b981' }  // Verde aún más oscuro al seleccionar
            };
        } else if (status === 'available' || status === 'in-progress') {
            color = {
                background: '#1e293b',
                border: '#3b82f6',
                highlight: { background: '#334155', border: '#8b5cf6' }
            };
        }

        return {
            id: objective.id,
            label: `${objective.icon}\n${objective.title}\n${Math.round(progress)}%`,
            shape: 'box',
            color: color,
            font: {
                color: status === 'locked' ? '#64748b' : '#f1f5f9',
                size: 14,
                face: 'Inter',
                multi: 'html'
            },
            margin: 15,
            borderWidth: 2,
            shadow: status !== 'locked',
            opacity: status === 'locked' ? 0.5 : 1
        };
    });

    const edges = [];
    chapter.objectives.forEach(objective => {
        objective.dependencies.forEach(depId => {
            const depObjective = chapter.objectives.find(obj => obj.id === depId);
            const isDepCompleted = depObjective && isObjectiveCompleted(depObjective);

            edges.push({
                from: depId,
                to: objective.id,
                arrows: 'to',
                color: {
                    color: isDepCompleted ? '#10b981' : '#334155',
                    highlight: '#3b82f6'
                },
                width: isDepCompleted ? 3 : 1,
                shadow: isDepCompleted
            });
        });
    });

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };

    const options = {
        layout: {
            hierarchical: {
                direction: 'UD',
                sortMethod: 'directed',
                nodeSpacing: 150,
                levelSeparation: 200
            }
        },
        physics: {
            enabled: false
        },
        interaction: {
            dragNodes: true,
            dragView: true,
            zoomView: true,
            hover: true
        },
        nodes: {
            shape: 'box',
            margin: 10,
            widthConstraint: {
                minimum: 120,
                maximum: 200
            }
        }
    };

    // Destruir red anterior si existe
    if (appState.network) {
        appState.network.destroy();
    }

    appState.network = new vis.Network(container, data, options);

    // Click en nodo para ver detalle
    appState.network.on('click', (params) => {
        if (params.nodes.length > 0) {
            const objectiveId = params.nodes[0];
            const objective = chapter.objectives.find(obj => obj.id === objectiveId);
            if (objective && isObjectiveAvailable(objective, chapter)) {
                showObjectiveDetail(chapter.id, objectiveId);
            } else if (objective) {
                showToast('Este objetivo está bloqueado. Completa las dependencias primero.', 'info');
            }
        }
    });

    // Right-click para context menu (solo en modo admin)
    appState.network.on('oncontext', (params) => {
        params.event.preventDefault();

        if (appState.currentView !== 'adminView') return;

        const nodeId = appState.network.getNodeAt(params.pointer.DOM);
        if (nodeId) {
            const x = params.event.clientX;
            const y = params.event.clientY;

            if (typeof showContextMenu === 'function') {
                showContextMenu(x, y, chapter.id, nodeId);
            }
        }
    });

    // Controles de zoom
    document.getElementById('zoomInBtn').onclick = () => {
        const scale = appState.network.getScale();
        appState.network.moveTo({ scale: scale * 1.2 });
    };

    document.getElementById('zoomOutBtn').onclick = () => {
        const scale = appState.network.getScale();
        appState.network.moveTo({ scale: scale * 0.8 });
    };

    document.getElementById('fitBtn').onclick = () => {
        appState.network.fit();
    };
}

function showObjectiveDetail(chapterId, objectiveId) {
    appState.currentObjective = objectiveId;
    switchView('objectiveDetailView');
    renderObjectiveDetail(chapterId, objectiveId);
}

function renderObjectiveDetail(chapterId, objectiveId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const objective = chapter.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    const status = getObjectiveStatus(objective, chapter);
    const progress = getObjectiveProgress(objective);

    // Header
    document.getElementById('objectiveIcon').textContent = objective.icon;
    document.getElementById('objectiveTitle').textContent = objective.title;
    document.getElementById('objectiveDescription').textContent = objective.description;

    // Dificultad
    const difficultyBadge = document.getElementById('objectiveDifficulty');
    difficultyBadge.textContent = objective.difficulty === 'easy' ? 'Fácil' :
        objective.difficulty === 'medium' ? 'Medio' : 'Difícil';
    difficultyBadge.className = `difficulty-badge ${objective.difficulty}`;

    // Estado
    const statusBadge = document.getElementById('objectiveStatus');
    const statusText = {
        'completed': 'Completado',
        'in-progress': 'En Progreso',
        'available': 'Disponible',
        'locked': 'Bloqueado'
    };
    statusBadge.textContent = statusText[status];
    statusBadge.textContent = statusText[status];
    statusBadge.className = `status-badge ${status}`;

    // Categoría
    const categoryBadge = document.getElementById('objectiveCategory');
    const categoryId = objective.category || 'learn'; // Default
    const category = gameData.categories ? gameData.categories.find(c => c.id === categoryId) : null;

    if (category) {
        categoryBadge.textContent = category.name;
        categoryBadge.className = 'category-badge';
        categoryBadge.style.setProperty('--cat-color', category.color);
        categoryBadge.style.display = 'inline-flex';
    } else {
        categoryBadge.style.display = 'none';
    }

    // Progreso
    const progressBar = document.getElementById('objectiveProgress');
    const progressText = document.getElementById('objectiveProgressText');

    // Agregar clase especial si está al 100% (ANTES de establecer width)
    if (progress >= 100) {
        progressBar.classList.add('golden-complete');
    } else {
        progressBar.classList.remove('golden-complete');
    }

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;

    // Mini-objetivos
    const miniList = document.getElementById('miniObjectivesList');
    miniList.innerHTML = '';
    objective.miniObjectives.forEach(mini => {
        const item = document.createElement('div');
        item.className = `mini-objective-item ${mini.completed ? 'completed' : ''}`;
        item.innerHTML = `
            <div class="mini-objective-checkbox"></div>
            <div class="mini-objective-text">${mini.text}</div>
        `;
        item.addEventListener('click', () => {
            toggleMiniObjective(chapterId, objectiveId, mini.id);
        });
        miniList.appendChild(item);
    });

    // Dependencias
    const depsSection = document.getElementById('dependenciesSection');
    const depsList = document.getElementById('dependenciesList');

    if (objective.dependencies.length > 0) {
        depsSection.style.display = 'block';
        depsList.innerHTML = '';
        objective.dependencies.forEach(depId => {
            const depObjective = chapter.objectives.find(obj => obj.id === depId);
            if (depObjective) {
                const isCompleted = isObjectiveCompleted(depObjective);
                const item = document.createElement('div');
                item.className = `dependency-item ${isCompleted ? 'completed' : ''}`;
                item.innerHTML = `
                    <div class="dependency-icon">${depObjective.icon}</div>
                    <div class="dependency-info">
                        <div class="dependency-name">${depObjective.title}</div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${getObjectiveProgress(depObjective)}%"></div>
                            <span class="progress-text">${Math.round(getObjectiveProgress(depObjective))}%</span>
                        </div>
                    </div>
                `;
                depsList.appendChild(item);
            }
        });
    } else {
        depsSection.style.display = 'none';
    }
}

// ============================================================================
// 4.5. RENDERIZADO DE PANEL DE DÍAS
// ============================================================================

// Mostrar vista de objetivos diarios
function showDailyGoalsView() {
    switchView('dailyGoalsView');
    showDailySubview('monthsListView');
    renderMonthsView();
}

// Cambiar entre sub-vistas del panel diario
function showDailySubview(subviewId) {
    document.querySelectorAll('.daily-subview').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(subviewId).classList.add('active');
}

// Renderizar vista de meses
function renderMonthsView() {
    const grid = document.getElementById('monthsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const months = getAvailableMonths(appState.monthsLoaded);
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    months.forEach(monthData => {
        const stats = getMonthStats(monthData.year, monthData.month);
        const card = document.createElement('div');
        card.className = 'month-card';

        card.innerHTML = `
            <div class="month-icon">📅</div>
            <h3 class="month-title">${monthNames[monthData.month - 1]} ${monthData.year}</h3>
            <div class="month-stats">
                <div class="stat">
                    <div class="stat-value">${stats.completedDays}/${stats.totalDays}</div>
                    <div class="stat-label">Días Perfectos</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${stats.averageProgress}%</div>
                    <div class="stat-label">Promedio</div>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            showMonthCalendar(monthData.year, monthData.month);
        });

        grid.appendChild(card);
    });
}

// Mostrar calendario mensual
function showMonthCalendar(year, month) {
    appState.currentMonth = `${year}-${String(month).padStart(2, '0')}`;
    showDailySubview('monthCalendarView');
    renderMonthCalendar(year, month);
}

// Renderizar calendario mensual
function renderMonthCalendar(year, month) {
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const titleEl = document.getElementById('calendarMonthTitle');
    if (titleEl) {
        titleEl.textContent = `${monthNames[month - 1]} ${year}`;
    }

    const grid = document.getElementById('calendarGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // Calcular primer día del mes y total de días
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const today = getTodayISO();

    // Celdas vacías antes del primer día
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        grid.appendChild(emptyCell);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dateISO = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isEmpty = isDayEmpty(dateISO);
        const progress = isEmpty ? 0 : getDayProgress(dateISO);
        const colorClass = isEmpty ? 'empty-day' : getProgressColor(progress);
        const isToday = dateISO === today;

        const dayCell = document.createElement('div');
        dayCell.className = `calendar-day ${colorClass} ${isToday ? 'today' : ''}`;
        dayCell.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-progress-mini">${isEmpty ? '--' : progress + '%'}</div>
        `;

        dayCell.addEventListener('click', () => {
            showDayDetail(dateISO);
        });

        grid.appendChild(dayCell);
    }

    // Renderizar gráfica mensual
    renderMonthlyChart(year, month);
}

// Renderizar gráfica de líneas del mes
function renderMonthlyChart(year, month) {
    const canvas = document.getElementById('monthlyChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const daysInMonth = new Date(year, month, 0).getDate();

    // Preparar datos (solo días con tareas)
    const labels = [];
    const data = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const dateISO = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (!isDayEmpty(dateISO)) {
            labels.push(day);
            data.push(getDayProgress(dateISO));
        }
    }

    // Configurar canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 280;
    const padding = 50;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Ejes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Líneas de referencia y etiquetas Y
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 5; i++) {
        const y = height - padding - (chartHeight * i / 5);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        ctx.fillText(`${i * 20}%`, padding - 10, y + 4);
    }
    ctx.setLineDash([]);

    if (labels.length === 0) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('No hay datos para mostrar', width / 2, height / 2);
        return;
    }

    // Calcular puntos
    const points = data.map((value, index) => ({
        x: padding + (chartWidth * index / (labels.length - 1 || 1)),
        y: height - padding - (chartHeight * value / 100)
    }));

    // Dibujar línea
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.stroke();

    // Dibujar puntos con colores
    points.forEach((point, index) => {
        const progress = data[index];
        let color = '#c084fc'; // Morado
        if (progress === 100) color = '#FFD700'; // Dorado
        else if (progress > 80) color = '#60a5fa'; // Azul claro
        else if (progress > 60) color = '#fb923c'; // Naranja

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Etiquetas X (días)
    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';

    labels.forEach((day, index) => {
        if (labels.length > 15) {
            if (index % 3 === 0 || index === labels.length - 1) {
                const point = points[index];
                ctx.fillText(day, point.x, height - padding + 20);
            }
        } else {
            const point = points[index];
            ctx.fillText(day, point.x, height - padding + 20);
        }
    });
}

// Mostrar detalle de día
function showDayDetail(dateISO) {
    appState.currentDay = dateISO;
    showDailySubview('dayDetailView');
    renderDayDetail(dateISO);
}

// Renderizar detalle de día
function renderDayDetail(dateISO) {
    const day = getOrCreateDay(dateISO);
    const date = new Date(dateISO + 'T00:00:00');
    const today = getTodayISO();
    const isToday = dateISO === today;

    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Título
    const titleEl = document.getElementById('dayTitle');
    if (titleEl) {
        const dayName = dayNames[date.getDay()];
        const monthName = monthNames[date.getMonth()];
        titleEl.textContent = `${dayName}, ${date.getDate()} de ${monthName} ${date.getFullYear()}`;
    }

    // Badge de "Hoy"
    const badge = document.getElementById('dayBadge');
    if (badge) {
        if (isToday) {
            badge.style.display = 'block';
            badge.textContent = 'Hoy';
        } else {
            badge.style.display = 'none';
        }
    }

    // Progreso
    const progress = getDayProgress(dateISO);
    const progressBar = document.getElementById('dayProgressBar');
    const progressText = document.getElementById('dayProgressText');

    if (progressBar && progressText) {
        progressBar.style.width = `${progress}%`;
        progressBar.className = `progress-bar ${progress === 100 ? 'golden-complete' : ''}`;
        progressText.textContent = `${progress}%`;
    }

    // Lista de tareas
    renderDayTasks(dateISO, day.tasks);
}

// Renderizar tareas del día
function renderDayTasks(dateISO, tasks) {
    const list = document.getElementById('dayTasksList');
    if (!list) return;

    list.innerHTML = '';

    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = `day-task-item ${task.completed ? 'completed' : ''}`;

        item.innerHTML = `
            <div class="task-checkbox" data-task-id="${task.id}"></div>
            <input type="text" class="task-text-edit" value="${task.text}" 
                   data-task-id="${task.id}" ${task.isDefault ? 'readonly' : ''} />
            <button class="task-delete-btn" data-task-id="${task.id}" title="Eliminar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        // Event: Toggle completado
        const checkbox = item.querySelector('.task-checkbox');
        checkbox.addEventListener('click', () => {
            toggleDailyTask(dateISO, task.id);
            renderDayDetail(dateISO);
        });

        // Event: Editar texto (solo si no es default)
        if (!task.isDefault) {
            const input = item.querySelector('.task-text-edit');
            input.addEventListener('blur', (e) => {
                if (e.target.value.trim()) {
                    editDailyTask(dateISO, task.id, e.target.value);
                }
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.target.blur();
                }
            });
        }

        // Event: Eliminar tarea
        const deleteBtn = item.querySelector('.task-delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                removeDailyTask(dateISO, task.id);
                renderDayDetail(dateISO);
            });
        }

        list.appendChild(item);
    });
}

// ============================================================================
// 5. UTILIDADES Y NAVEGACIÓN
// ============================================================================

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
    appState.currentView = viewId;
    playSound('open');
}

function updateGlobalProgress() {
    const progress = getGlobalProgress();
    document.getElementById('globalProgress').style.width = `${progress}%`;
    document.getElementById('globalProgressText').textContent = `${Math.round(progress)}%`;
}

function updateChapterProgress() {
    const chapter = gameData.chapters.find(ch => ch.id === appState.currentChapter);
    if (!chapter) return;

    const progress = getChapterProgress(chapter);
    const progressBar = document.getElementById('chapterProgress');
    const progressText = document.getElementById('chapterProgressText');

    // Agregar clase especial si está al 100%
    if (progress >= 100) {
        progressBar.classList.add('golden-complete');
    } else {
        progressBar.classList.remove('golden-complete');
    }

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}

function updateAllProgress() {
    updateGlobalProgress();
    checkAllAchievements(); // Actualización permanente de logros

    // Actualizar vista actual según corresponda
    if (appState.currentView === 'chaptersView') {
        renderChaptersView(); // Asegurar actualización visual inmediata
    } else if (appState.currentView === 'skillTreeView') {
        updateChapterProgress();
        const chapter = gameData.chapters.find(ch => ch.id === appState.currentChapter);
        if (chapter) {
            renderSkillTree(chapter);
        }
    } else if (appState.currentView === 'adminView') {
        // Asegurar que el panel de admin se actualice si estamos en él
        if (typeof renderAdminChaptersList === 'function') {
            renderAdminChaptersList();
        }
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================================================
// 6. INICIALIZACIÓN Y EVENT LISTENERS
// ============================================================================

// ============================================
// SISTEMA DE LOGROS
// ============================================

// Verificar si un logro está desbloqueado
function isAchievementUnlocked(id) {
    if (!gameData.achievements || !gameData.achievements.unlocked) return false;
    return gameData.achievements.unlocked.some(a => a.id === id);
}

// Desbloquear un logro
function unlockAchievement(id) {
    // Asegurar que la estructura exista
    if (!gameData.achievements) {
        gameData.achievements = {
            unlocked: [],
            progress: {},
            notifications: []
        };
    }

    if (isAchievementUnlocked(id)) return;

    const achievement = window.ACHIEVEMENTS[id];
    if (!achievement) return;

    if (!gameData.achievements.unlocked) {
        gameData.achievements.unlocked = [];
    }

    gameData.achievements.unlocked.push({
        id: id,
        unlockedAt: new Date().toISOString()
    });

    saveProgress(false);

    // Notificación y Sonido
    playSound('achievement');
    showAchievementPopup(achievement);

    // Actualizar vista si está activa
    if (window.appState.currentView === 'achievementsView') {
        renderAchievementsView();
    }
}

// Mostrar popup de logro desbloqueado
function showAchievementPopup(achievement) {
    showToast(`🏆 ¡Logro Desbloqueado: ${achievement.name}!`, 'success');
}

// Renderizar vista de logros
function renderAchievementsView(filter = 'all') {
    const grid = document.getElementById('achievementsGrid');
    const unlockedCountEl = document.getElementById('achievementsUnlockedCount');
    const scoreEl = document.getElementById('achievementsScore');

    if (!grid) {
        console.warn('⚠️ achievementsGrid not found');
        return;
    }

    // Asegurar que achievements exista
    if (!gameData.achievements) {
        gameData.achievements = {
            unlocked: [],
            progress: {},
            notifications: []
        };
    }

    grid.innerHTML = '';

    const allAchievements = Object.values(window.ACHIEVEMENTS || {});
    const unlocked = gameData.achievements.unlocked || [];

    // Actualizar estadísticas
    if (unlockedCountEl) unlockedCountEl.textContent = `${unlocked.length}/${allAchievements.length}`;
    if (scoreEl) scoreEl.textContent = unlocked.length * 100;

    // Filtrar logros
    const filtered = allAchievements.filter(a => {
        if (filter === 'all') return true;
        return a.category === filter;
    });

    filtered.forEach(achievement => {
        const isUnlocked = isAchievementUnlocked(achievement.id);
        const unlockData = unlocked.find(u => u.id === achievement.id);

        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;

        let dateStr = '';
        if (isUnlocked && unlockData) {
            const date = new Date(unlockData.unlockedAt);
            dateStr = `Desbloqueado: ${date.toLocaleDateString()}`;
        }

        // Calcular progreso REAL
        let progressHTML = '';
        if (!isUnlocked) {
            let currentProgress = 0;
            let progressText = 'En progreso...';

            // Logros de racha de días dorados
            if (achievement.id === 'you_cant_see_me') {
                const consecutive = getConsecutiveGoldenDays();
                currentProgress = Math.min((consecutive / 5) * 100, 100);
                progressText = `${consecutive}/5 días dorados`;
            } else if (achievement.id === 'mic_drop') {
                const consecutive = getConsecutiveGoldenDays();
                currentProgress = Math.min((consecutive / 10) * 100, 100);
                progressText = `${consecutive}/10 días dorados`;
            }
            // Logros de días activos
            else if (achievement.id === 'big_brother' || achievement.id === 'magic_shop') {
                const days = getConsecutiveActiveDays(gameData);
                const target = achievement.id === 'big_brother' ? 30 : 100;
                currentProgress = Math.min((days / target) * 100, 100);
                progressText = `${days}/${target} días consecutivos`;
            } else if (achievement.id === 'royal_rumble') {
                const days = getTotalDaysTracked(gameData);
                currentProgress = Math.min((days / 30) * 100, 100);
                progressText = `${days}/30 días totales`;
            }
            // Logros de meditación
            else if (achievement.id === 'seneca_orgulloso') {
                const days = getConsecutiveMeditationDays(gameData);
                currentProgress = Math.min((days / 30) * 100, 100);
                progressText = `${days}/30 días meditando`;
            }
            // Logros de sueño
            else if (achievement.id === 'zero_o_clock') {
                const days = getConsecutiveSleepScheduleDays(gameData);
                currentProgress = Math.min((days / 10) * 100, 100);
                progressText = `${days}/10 días buen sueño`;
            }
            // Logros de días >= 80%
            else if (achievement.id === 'butter') {
                const days = getMaxConsecutiveAbove80Days(gameData);
                currentProgress = Math.min((days / 7) * 100, 100);
                progressText = `${days}/7 días >= 80%`;
            }
            // Total de días dorados
            else if (achievement.id === 'twenty_four_k') {
                const total = getTotalGoldenDays(gameData);
                currentProgress = Math.min((total / 24) * 100, 100);
                progressText = `${total}/24 días dorados`;
            }
            // Meses consecutivos
            else if (achievement.id === 'acknowledge_me') {
                const months = getConsecutiveMonthsAbove80(gameData);
                currentProgress = Math.min((months / 6) * 100, 100);
                progressText = `${months}/6 meses >= 80%`;
            }

            progressHTML = `
                <div class="achievement-progress">
                    <div class="achievement-progress-text">${progressText}</div>
                    <div class="achievement-progress-bar" style="width: ${currentProgress}%"></div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
            ${isUnlocked ? `<div class="achievement-date">${dateStr}</div>` : progressHTML}
        `;

        grid.appendChild(card);
    });

    console.log(`✅ Rendered ${filtered.length} achievements (filter: ${filter})`);
}

// Configurar listeners de logros
function setupAchievementsListeners() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
            renderAchievementsView(btn.dataset.filter);
        });
    });
}

// Comprobador maestro de logros
function checkAllAchievements() {
    if (!window.ACHIEVEMENTS) {
        console.warn('⚠️ ACHIEVEMENTS not loaded');
        return;
    }

    console.log('🔍 Checking achievements...', {
        total: Object.keys(window.ACHIEVEMENTS).length,
        unlocked: gameData.achievements?.unlocked?.length || 0,
        hasUnlockedArray: !!gameData.achievements?.unlocked
    });

    Object.values(window.ACHIEVEMENTS).forEach(achievement => {
        // Saltar si ya está desbloqueado (a menos que sea renovable)
        if (isAchievementUnlocked(achievement.id) && !achievement.renewable) {
            return;
        }

        // Verificar condición
        try {
            if (achievement.condition && typeof achievement.condition === 'function') {
                const unlocked = achievement.condition();

                // DEBUG: Log especial para "You Can't See Me"
                if (achievement.id === 'you_cant_see_me') {
                    const consecutive = getConsecutiveGoldenDays();
                    console.log('🎯 John Cena Achievement Check:', {
                        id: achievement.id,
                        consecutive,
                        required: 5,
                        conditionResult: unlocked,
                        alreadyUnlocked: isAchievementUnlocked(achievement.id)
                    });
                }

                if (unlocked && !isAchievementUnlocked(achievement.id)) {
                    console.log('✅ Unlocking achievement:', achievement.name);
                    unlockAchievement(achievement.id);
                }
            }
        } catch (error) {
            console.error(`❌ Error checking achievement ${achievement.id}:`, error);
        }
    });

    console.log('✅ Achievement check complete');
}

// ============================================================================
// 7. CLOUD SYNC (GITHUB GIST)
// ============================================================================

const SYNC_CONFIG = {
    authKey: 'lpv_github_auth',
    filename: 'life_progress_data.json'
};

// Obtener configuración guardada
function getSyncConfig() {
    try {
        const config = localStorage.getItem(SYNC_CONFIG.authKey);
        return config ? JSON.parse(config) : null;
    } catch (e) {
        return null;
    }
}

// Guardar configuración
function saveSyncConfig(token, gistId) {
    if (!token || !gistId) return false;
    localStorage.setItem(SYNC_CONFIG.authKey, JSON.stringify({ token, gistId }));
    return true;
}

// Actualizar UI del modal de sync
function updateSyncUI() {
    const config = getSyncConfig();
    const tokenInput = document.getElementById('githubToken');
    const gistIdInput = document.getElementById('gistId');
    const statusEl = document.getElementById('syncStatus');
    const lastSyncEl = document.getElementById('lastSyncInfo');

    if (config) {
        if (tokenInput) tokenInput.value = config.token;
        if (gistIdInput) gistIdInput.value = config.gistId;

        if (statusEl) {
            statusEl.className = 'sync-status alert alert-success';
            statusEl.textContent = '✅ Conexión configurada. Listo para sincronizar.';
        }
    } else {
        if (statusEl) {
            statusEl.className = 'sync-status alert alert-info';
            statusEl.textContent = 'Configura tu conexión para guardar el progreso en la nube gratis.';
        }
    }

    // Actualizar última fecha de sync si existe información en localstorage
    const lastSync = localStorage.getItem('lpv_last_sync');
    if (lastSync && lastSyncEl) {
        const date = new Date(lastSync);
        lastSyncEl.textContent = `Última sincronización: ${date.toLocaleString()}`;
    }
}

// SUBIR datos a Gist
async function uploadToGist() {
    const config = getSyncConfig();
    if (!config) {
        showToast('Configura primero tu Token y Gist ID', 'error');
        return;
    }

    const btn = document.getElementById('syncUploadBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="icon">⏳</span> Subiendo...';
    btn.disabled = true;

    try {
        // Preparar contenido
        const content = JSON.stringify(gameData, null, 2);
        const files = {};
        files[SYNC_CONFIG.filename] = { content: content };

        const response = await fetch(`https://api.github.com/gists/${config.gistId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${config.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ files: files })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Upload successful:', data);

        localStorage.setItem('lpv_last_sync', new Date().toISOString());
        updateSyncUI();
        showToast('Progreso subido a la nube correctamente', 'success');
        playSound('achievement'); // Sonido de éxito

    } catch (error) {
        console.error('❌ Upload failed:', error);
        showToast(`Error al subir: ${error.message}`, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// DESCARGAR datos de Gist
async function downloadFromGist() {
    const config = getSyncConfig();
    if (!config) {
        showToast('Configura primero tu Token y Gist ID', 'error');
        return;
    }

    if (!confirm('⚠️ ¿Estás seguro? Esto reemplazará tus datos locales con los de la nube.')) {
        return;
    }

    const btn = document.getElementById('syncDownloadBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="icon">⏳</span> Descargando...';
    btn.disabled = true;

    try {
        const response = await fetch(`https://api.github.com/gists/${config.gistId}`, {
            method: 'GET',
            headers: {
                'Authorization': `token ${config.token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const file = data.files[SYNC_CONFIG.filename];

        if (!file || !file.content) {
            throw new Error(`No se encontró el archivo ${SYNC_CONFIG.filename} en el Gist`);
        }

        // Parsear y validar
        const importedData = JSON.parse(file.content);

        // Actualizar datos locales
        gameData = importedData;
        saveProgress(false);

        localStorage.setItem('lpv_last_sync', new Date().toISOString());
        updateSyncUI();

        showToast('Progreso descargado correctamente', 'success');

        // Recargar para aplicar cambios completamente
        setTimeout(() => location.reload(), 1500);

    } catch (error) {
        console.error('❌ Download failed:', error);
        showToast(`Error al descargar: ${error.message}`, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Inicializar la aplicación
function init() {
    // Cargar progreso guardado
    loadProgress();

    // Migración: Asegurar que exista dailyGoals
    if (!gameData.dailyGoals) {
        gameData.dailyGoals = {
            defaultTasks: [
                { id: 'default_1', text: 'Meditar', isDefault: true },
                { id: 'default_2', text: 'Hacer ejercicio', isDefault: true },
                { id: 'default_3', text: 'Leer', isDefault: true },
                { id: 'default_4', text: 'Horario de sueño 7-8h', isDefault: true }
            ],
            days: {},
            customCategories: []
        };
        saveProgress();
    }

    // Migración: Añadir 4to objetivo si no existe
    if (gameData.dailyGoals.defaultTasks.length === 3) {
        gameData.dailyGoals.defaultTasks.push({
            id: 'default_4',
            text: 'Horario de sueño 7-8h',
            isDefault: true
        });
        saveProgress();
    }

    // Migración: Añadir customCategories si no existe
    if (!gameData.dailyGoals.customCategories) {
        gameData.dailyGoals.customCategories = [];
        saveProgress();
    }

    // Inicializar el día actual automáticamente
    const today = getTodayISO();
    getOrCreateDay(today);

    // Renderizar vista inicial
    renderChaptersView();

    // Event Listeners - Navegación
    document.getElementById('backToChapters').addEventListener('click', () => {
        switchView('chaptersView');
        renderChaptersView();
    });

    document.getElementById('backToSkillTree').addEventListener('click', () => {
        showSkillTreeView(appState.currentChapter);
    });

    // Event Listeners - Acciones del Header
    document.getElementById('manualSaveBtn').addEventListener('click', manualSave);

    document.getElementById('adminToggleBtn').addEventListener('click', () => {
        toggleAdminView();
    });

    document.getElementById('exportBtn').addEventListener('click', exportProgress);

    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importModal').classList.add('active');
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('lifeProgressVision');
            location.reload();
        }
    });

    // Event Listeners - Modal de Importación
    document.getElementById('closeImportModal').addEventListener('click', () => {
        document.getElementById('importModal').classList.remove('active');
        playSound('close');
    });

    document.getElementById('cancelImport').addEventListener('click', () => {
        document.getElementById('importModal').classList.remove('active');
        playSound('close');
    });

    document.getElementById('confirmImport').addEventListener('click', () => {
        const fileInput = document.getElementById('importFileInput');
        if (fileInput.files.length > 0) {
            importProgress(fileInput.files[0]);
            document.getElementById('importModal').classList.remove('active');
        } else {
            showToast('Por favor selecciona un archivo', 'error');
        }
    });

    // Event Listeners - Modal de Sync (GitHub)
    const cloudSyncBtn = document.getElementById('cloudSyncBtn');
    if (cloudSyncBtn) {
        cloudSyncBtn.addEventListener('click', () => {
            document.getElementById('syncModal').classList.add('active');
            updateSyncUI();
        });
    }

    const closeSyncModal = document.getElementById('closeSyncModal');
    if (closeSyncModal) {
        closeSyncModal.addEventListener('click', () => {
            document.getElementById('syncModal').classList.remove('active');
        });
    }

    const saveSyncConfigBtn = document.getElementById('saveSyncConfigBtn');
    if (saveSyncConfigBtn) {
        saveSyncConfigBtn.addEventListener('click', () => {
            const token = document.getElementById('githubToken').value.trim();
            const gistId = document.getElementById('gistId').value.trim();

            if (token && gistId) {
                saveSyncConfig(token, gistId);
                updateSyncUI();
                showToast('Configuración guardada', 'success');
            } else {
                showToast('Por favor completa ambos campos', 'error');
            }
        });
    }

    const uploadBtn = document.getElementById('syncUploadBtn');
    if (uploadBtn) uploadBtn.addEventListener('click', uploadToGist);

    const downloadBtn = document.getElementById('syncDownloadBtn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadFromGist);

    // Event Listeners - Panel de Días
    const dailyGoalsBtn = document.getElementById('dailyGoalsBtn');
    if (dailyGoalsBtn) {
        dailyGoalsBtn.addEventListener('click', showDailyGoalsView);
    }

    const backFromDailyGoals = document.getElementById('backFromDailyGoals');
    if (backFromDailyGoals) {
        backFromDailyGoals.addEventListener('click', () => {
            switchView('chaptersView');
        });
    }

    const backToMonthsList = document.getElementById('backToMonthsList');
    if (backToMonthsList) {
        backToMonthsList.addEventListener('click', () => {
            showDailySubview('monthsListView');
        });
    }

    const backToCalendar = document.getElementById('backToCalendar');
    if (backToCalendar) {
        backToCalendar.addEventListener('click', () => {
            if (appState.currentMonth) {
                const [year, month] = appState.currentMonth.split('-');
                showMonthCalendar(parseInt(year), parseInt(month));
            }
        });
    }

    const loadMoreMonthsBtn = document.getElementById('loadMoreMonthsBtn');
    if (loadMoreMonthsBtn) {
        loadMoreMonthsBtn.addEventListener('click', loadMoreMonths);
    }

    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => {
            const input = document.getElementById('newTaskInput');
            if (input) {
                const text = input.value.trim();

                if (text && appState.currentDay) {
                    addDailyTask(appState.currentDay, text);
                    renderDayDetail(appState.currentDay);
                    input.value = '';
                }
            }
        });
    }

    const newTaskInput = document.getElementById('newTaskInput');
    if (newTaskInput) {
        newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const addBtn = document.getElementById('addTaskBtn');
                if (addBtn) addBtn.click();
            }
        });
    }

    // Listener para botón de logros
    const achievementsBtn = document.getElementById('achievementsBtn');
    if (achievementsBtn) {
        achievementsBtn.addEventListener('click', () => {
            console.log('🏆 Opening achievements view');
            switchView('achievementsView');
            renderAchievementsView('all');
            setupAchievementsListeners();
        });
    } else {
        console.warn('⚠️ achievementsBtn not found in DOM');
    }

    // Botón de volver desde logros
    const backFromAchievements = document.getElementById('backFromAchievements');
    if (backFromAchievements) {
        backFromAchievements.addEventListener('click', () => {
            switchView('chaptersView');
        });
    }

    // Auto-save cada 5 minutos (solo si hay cambios)
    setInterval(() => {
        if (appState.dataChanged) {
            saveProgress(false);
        }
    }, 300000); // 5 minutos = 300000ms

    console.log('🎯 Spread My Wings initialized successfully!');
}

// Iniciar la aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
