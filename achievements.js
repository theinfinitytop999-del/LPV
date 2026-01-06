// ============================================================================
// SISTEMA DE LOGROS - Definiciones y Condiciones
// ============================================================================

const ACHIEVEMENTS = {
    // === BTS & Música ===
    love_myself: {
        id: 'love_myself',
        name: 'Love Myself',
        description: 'Completar 4 veces en el mes el objetivo: "Pasar tiempo conmigo mismo"',
        category: 'bts_music',
        icon: '💜',
        renewable: 'monthly',
        condition: () => {
            const currentMonth = getTodayISO().substring(0, 7);
            let count = 0;
            Object.keys(gameData.dailyGoals.days).forEach(dateISO => {
                if (dateISO.startsWith(currentMonth)) {
                    const day = gameData.dailyGoals.days[dateISO];
                    day.tasks.forEach(task => {
                        if (task.completed && task.text.toLowerCase().includes('pasar tiempo conmigo mismo')) {
                            count++;
                        }
                    });
                }
            });
            return count >= 4;
        }
    },

    golden_maknae: {
        id: 'golden_maknae',
        name: 'JK: Golden Maknae',
        description: 'Mantener promedio superior al 80% durante 3 meses consecutivos',
        category: 'bts_music',
        icon: '🐰',
        renewable: false,
        condition: () => getConsecutiveMonthsAbove80(gameData) >= 3
    },

    count_on_me: {
        id: 'count_on_me',
        name: 'Count on Me',
        description: 'Completar 3 veces en el mes el objetivo: "Tiempo con personas importantes"',
        category: 'bts_music',
        icon: '🤝',
        renewable: 'monthly',
        condition: () => {
            const currentMonth = getTodayISO().substring(0, 7);
            let count = 0;
            Object.keys(gameData.dailyGoals.days).forEach(dateISO => {
                if (dateISO.startsWith(currentMonth)) {
                    const day = gameData.dailyGoals.days[dateISO];
                    day.tasks.forEach(task => {
                        if (task.completed && task.text.toLowerCase().includes('tiempo con personas importantes')) {
                            count++;
                        }
                    });
                }
            });
            return count >= 3;
        }
    },


    mic_drop: {
        id: 'mic_drop',
        name: 'Mic Drop',
        description: '10 días con días dorados consecutivos',
        category: 'bts_music',
        icon: '🎤',
        renewable: false,
        condition: () => getConsecutiveGoldenDays() >= 10
    },

    butter: {
        id: 'butter',
        name: 'Butter',
        description: 'Siete días seguidos sin bajar del 80%',
        category: 'bts_music',
        icon: '🧈',
        renewable: false,
        condition: () => getMaxConsecutiveAbove80Days(gameData) >= 7
    },

    blood_sweat_tears: {
        id: 'blood_sweat_tears',
        name: 'Blood, Sweat & Tears',
        description: 'Completar el objetivo de Cálculo Integral',
        category: 'bts_music',
        icon: '💪',
        renewable: false,
        condition: () => {
            return isObjectiveCompletedById('acad_calculus');
        }
    },

    magic_shop: {
        id: 'magic_shop',
        name: 'Magic Shop',
        description: 'Registrar hábitos durante 100 días consecutivos',
        category: 'bts_music',
        icon: '🎪',
        renewable: false,
        condition: () => getConsecutiveActiveDays(gameData) >= 100
    },

    inner_child: {
        id: 'inner_child',
        name: 'Inner Child',
        description: 'Escribir el clímax emocional del libro. Por enfrentar los recuerdos más difíciles con honestidad.',
        category: 'bts_music',
        icon: '🧒',
        renewable: false,
        condition: () => isObjectiveCompletedById('book_phase_2')
    },

    golden_era: {
        id: 'golden_era',
        name: 'The Golden Era',
        description: 'Completar la fase final del libro autobiográfico.',
        category: 'bts_music',
        icon: '✨',
        renewable: false,
        condition: () => isObjectiveCompletedById('book_phase_3')
    },

    // === WWE ===
    you_cant_see_me: {
        id: 'you_cant_see_me',
        name: "You Can't See Me",
        description: 'Lograr 5 días dorados seguidos',
        category: 'wwe',
        icon: '👋',
        renewable: true,
        condition: () => getConsecutiveGoldenDays() >= 5
    },

    acknowledge_me: {
        id: 'acknowledge_me',
        name: 'Acknowledge Me',
        description: 'Mantener promedio superior al 80% durante 6 meses',
        category: 'wwe',
        icon: '👑',
        renewable: false,
        condition: () => getConsecutiveMonthsAbove80(gameData) >= 6
    },

    royal_rumble: {
        id: 'royal_rumble',
        name: 'Royal Rumble Winner',
        description: 'Trackear hábitos durante 30 días',
        category: 'wwe',
        icon: '🏆',
        renewable: false,
        condition: () => getTotalDaysTracked(gameData) >= 30
    },

    wrestlemania_moment: {
        id: 'wrestlemania_moment',
        name: 'WrestleMania Moment',
        description: 'Completar un objetivo de dificultad Hard',
        category: 'wwe',
        icon: '🎭',
        renewable: false,
        condition: () => {
            let hasHard = false;
            gameData.chapters.forEach(ch => {
                ch.objectives.forEach(obj => {
                    if (obj.difficulty === 'hard' && isObjectiveCompleted(obj)) hasHard = true;
                });
            });
            return hasHard;
        }
    },

    hall_of_fame: {
        id: 'hall_of_fame',
        name: 'Hall of Fame',
        description: 'Alcanzar un total de 20 logros',
        category: 'wwe',
        icon: '⭐',
        renewable: false,
        condition: () => (gameData.achievements?.unlocked?.length || 0) >= 20
    },



    // === Breaking Bad ===
    i_am_the_one: {
        id: 'i_am_the_one',
        name: 'I Am The One Who Knocks',
        description: 'Completar el Portfolio Personal',
        category: 'breaking_bad',
        icon: '💰',
        renewable: false,
        condition: () => isObjectiveCompletedById('web_curriculum')
    },

    say_my_name: {
        id: 'say_my_name',
        name: 'Say My Name',
        description: 'Completar el objetivo de Portfolio',
        category: 'breaking_bad',
        icon: '🌐',
        renewable: false,
        condition: () => isObjectiveCompletedById('web_curriculum')
    },

    crystal_clear: {
        id: 'crystal_clear',
        name: 'Crystal Clear',
        description: 'Tener un promedio mensual superior a 99.1%',
        category: 'breaking_bad',
        icon: '💎',
        renewable: 'monthly',
        condition: () => {
            const today = new Date();
            const stats = getMonthStats(today.getFullYear(), today.getMonth() + 1);
            return stats.averageProgress > 99.1;
        }
    },

    // === Literatura & 1984 ===
    jose_arcadio: {
        id: 'jose_arcadio',
        name: 'José Arcadio Buendía',
        description: 'Cumplir más de 10 tareas en un solo día',
        category: 'literature',
        icon: '📚',
        renewable: false,
        condition: () => getMaxTasksCompletedInDay(gameData) > 10
    },

    big_brother: {
        id: 'big_brother',
        name: 'Big Brother is Watching',
        description: 'Usar la App por 30 días seguidos',
        category: 'literature',
        icon: '👁️',
        renewable: false,
        condition: () => getConsecutiveActiveDays(gameData) >= 30
    },

    utopia: {
        id: 'utopia',
        name: 'Utopía',
        description: 'Lograr un mes perfecto sin caer en rojo',
        category: 'literature',
        icon: '🌅',
        renewable: 'monthly',
        condition: () => {
            const currentMonth = getTodayISO().substring(0, 7);
            return !hasRedDaysInMonth(gameData, currentMonth);
        }
    },

    two_plus_two: {
        id: 'two_plus_two',
        name: '2+2=5',
        description: 'Completar todos los objetivos académicos',
        category: 'literature',
        icon: '🎓',
        renewable: false,
        condition: () => {
            let acadObjs = [];
            gameData.chapters.forEach(ch => {
                ch.objectives.forEach(obj => {
                    if (obj.id?.startsWith('acad_')) acadObjs.push(obj);
                });
            });
            return acadObjs.length > 0 && acadObjs.every(obj => isObjectiveCompleted(obj));
        }
    },


    // === Cultura Colombiana ===
    de_nuevo_rico: {
        id: 'de_nuevo_rico',
        name: 'De Nuevo Rico a Ferreira',
        description: 'Completar el objetivo de Maestría en WordPress/CMS',
        category: 'cultura',
        icon: '💼',
        renewable: false,
        condition: () => isObjectiveCompletedById('web_wp_mastery')
    },

    poder_de_la_pension: {
        id: 'poder_de_la_pension',
        name: 'El Poder de la Pensión',
        description: 'Completar un objetivo financiero relacionado con CMS',
        category: 'cultura',
        icon: '💵',
        renewable: false,
        condition: () => isObjectiveCompletedById('web_wp_mastery')
    },

    zero_o_clock: {
        id: 'zero_o_clock',
        name: "Zero O'Clock",
        description: 'Cumplir con el horario de sueño durante 10 días seguidos',
        category: 'cultura',
        icon: '🌙',
        renewable: false,
        condition: () => getConsecutiveSleepScheduleDays(gameData) >= 10
    },

    // === Estoicismo ===
    seneca_orgulloso: {
        id: 'seneca_orgulloso',
        name: 'Séneca estaría orgulloso',
        description: 'Meditar durante 30 días seguidos',
        category: 'estoicism',
        icon: '🧘',
        renewable: false,
        condition: () => getConsecutiveMeditationDays(gameData) >= 30
    },

    // === Movilidad ===
    road_warrior: {
        id: 'road_warrior',
        name: 'Road Warrior',
        description: 'Obtener la licencia de moto',
        category: 'mobility',
        icon: '🏍️',
        renewable: false,
        condition: () => isObjectiveCompletedById('moto_license')
    },

    double_clutch: {
        id: 'double_clutch',
        name: 'Double Clutch',
        description: 'Obtener la licencia de carro',
        category: 'mobility',
        icon: '🚗',
        renewable: false,
        condition: () => isObjectiveCompletedById('car_license')
    },

    // === Adicionales ===
    master_of_third: {
        id: 'master_of_third',
        name: 'Master of the 1/3',
        description: 'Completar al menos el 33% de todos los capítulos',
        category: 'literature',
        icon: '📖',
        renewable: false,
        condition: () => {
            if (gameData.chapters.length === 0) return false;
            return gameData.chapters.every(ch => getChapterProgress(ch) >= 33);
        }
    },

    rebirth: {
        id: 'rebirth',
        name: 'The Reborn',
        description: 'Completar el 100% del capítulo "Rebirth"',
        category: 'literature',
        icon: '🔥',
        renewable: false,
        condition: () => {
            const chapter = gameData.chapters.find(c => c.title.toLowerCase().includes('rebirth'));
            if (!chapter) return false;
            return getChapterProgress(chapter) === 100;
        }
    }
};

// Función helper para buscar por ID en el árbol
function isObjectiveCompletedById(id) {
    let completed = false;
    gameData.chapters.forEach(ch => {
        const obj = ch.objectives.find(o => o.id === id);
        if (obj && isObjectiveCompleted(obj)) completed = true;
    });
    return completed;
}

window.ACHIEVEMENTS = ACHIEVEMENTS;
