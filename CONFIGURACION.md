# ⚙️ Configuración de Spread My Wings

Este archivo contiene configuraciones opcionales y mejoras que puedes implementar en tu aplicación.

## 📋 Tabla de Contenidos

1. [Configuración Básica](#configuración-básica)
2. [Temas Personalizados](#temas-personalizados)
3. [Integraciones Avanzadas](#integraciones-avanzadas)
4. [Mejoras de Rendimiento](#mejoras-de-rendimiento)
5. [Extensiones Recomendadas](#extensiones-recomendadas)

---

## Configuración Básica

### Ajustar Auto-Save

Por defecto, el auto-save ocurre cada 30 segundos. Para cambiarlo:

**Archivo:** `app.js` (línea ~780)

```javascript
// Cambiar de 30000ms (30s) a 60000ms (60s)
setInterval(() => {
    saveProgress();
}, 60000);  // Cambiar este valor
```

### Modificar Cantidad de Mini-Objetivos Sugeridos

**Recomendación:** Entre 3 y 6 mini-objetivos por objetivo

```javascript
// Al crear nuevos objetivos, mantén este rango:
miniObjectives: [
    { id: 'mini1', text: '...', completed: false },
    { id: 'mini2', text: '...', completed: false },
    { id: 'mini3', text: '...', completed: false }
    // Máximo 6-7 para mantener claridad
]
```

### Personalizar Animación de Confetti

**Archivo:** `app.js` (función `celebrateCompletion()`, línea ~270)

```javascript
function celebrateCompletion() {
    const duration = 5000;  // Cambiar duración (ms)
    
    // Agregar más colores
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
    
    // Cambiar cantidad de partículas
    particleCount: 5,  // Más partículas = más confetti
    
    // Cambiar ángulos
    angle: 90,  // Recto hacia arriba
    spread: 90  // Más amplitud
}
```

---

## Temas Personalizados

### Tema Claro (Light Mode)

Agrega este código al final de `styles.css`:

```css
/* Light Mode Alternative */
[data-theme="light"] {
    --bg-primary: #f8fafc;
    --bg-secondary: #f1f5f9;
    --bg-tertiary: #e2e8f0;
    --bg-card: #ffffff;
    
    --accent-primary: #2563eb;
    --accent-secondary: #7c3aed;
    --accent-success: #059669;
    --accent-warning: #d97706;
    --accent-danger: #dc2626;
    
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    
    --border-color: #cbd5e1;
}
```

Para activarlo, agrega en el HTML:

```html
<body data-theme="light">
```

### Tema Cyberpunk

```css
[data-theme="cyberpunk"] {
    --bg-primary: #0a0e27;
    --bg-secondary: #16213e;
    --bg-card: #1a1a2e;
    
    --accent-primary: #00fff5;
    --accent-secondary: #ff00ff;
    --accent-success: #39ff14;
    
    --text-primary: #00fff5;
    --text-secondary: #b4f8fe;
}
```

### Tema Minimalista

```css
[data-theme="minimal"] {
    --bg-primary: #000000;
    --bg-secondary: #111111;
    --bg-card: #1a1a1a;
    
    --accent-primary: #ffffff;
    --accent-secondary: #cccccc;
    
    --text-primary: #ffffff;
    --text-secondary: #888888;
    
    --border-color: #333333;
}
```

---

## Integraciones Avanzadas

### 1. Integración con Google Calendar

Para agregar recordatorios automáticos:

```javascript
// Requiere Google Calendar API
function addToCalendar(objective) {
    const event = {
        'summary': `Revisar: ${objective.title}`,
        'description': objective.description,
        'start': {
            'dateTime': new Date().toISOString(),
            'timeZone': 'America/New_York'
        },
        'end': {
            'dateTime': new Date(Date.now() + 3600000).toISOString(),
            'timeZone': 'America/New_York'
        }
    };
    
    // Implementar llamada a API
}
```

### 2. Exportar a Notion

```javascript
function exportToNotion(chapterId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    
    // Formato Markdown para Notion
    let markdown = `# ${chapter.title}\n\n`;
    
    chapter.objectives.forEach(obj => {
        markdown += `## ${obj.icon} ${obj.title}\n`;
        markdown += `**Dificultad:** ${obj.difficulty}\n\n`;
        
        obj.miniObjectives.forEach(mini => {
            const check = mini.completed ? '[x]' : '[ ]';
            markdown += `- ${check} ${mini.text}\n`;
        });
        
        markdown += '\n';
    });
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(markdown);
    showToast('Copiado para Notion', 'success');
}
```

### 3. Sincronización con Firebase

```javascript
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncToCloud(userId) {
    try {
        await setDoc(doc(db, 'users', userId), {
            gameData: gameData,
            lastSync: new Date()
        });
        showToast('Sincronizado con la nube', 'success');
    } catch (error) {
        console.error(error);
        showToast('Error en sincronización', 'error');
    }
}

async function loadFromCloud(userId) {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
        gameData = docSnap.data().gameData;
        renderChaptersView();
    }
}
```

### 4. Notificaciones Push (PWA)

Convertir a Progressive Web App:

**manifest.json:**
```json
{
    "name": "Spread My Wings",
    "short_name": "SMW",
    "description": "Gamifica tu vida con skill-trees",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#0f172a",
    "theme_color": "#3b82f6",
    "icons": [
        {
            "src": "icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```

**service-worker.js:**
```javascript
const CACHE_NAME = 'lpv-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
```

---

## Mejoras de Rendimiento

### 1. Lazy Loading de Capítulos

```javascript
// Solo cargar capítulos cuando se necesiten
const lazyLoadChapter = (chapterId) => {
    import(`./chapters/${chapterId}.js`)
        .then(module => {
            const chapter = module.default;
            renderSkillTree(chapter);
        });
};
```

### 2. Virtualización del DOM

Para capítulos con muchos objetivos:

```javascript
// Renderizar solo nodos visibles
function virtualizeNodes(nodes, viewport) {
    return nodes.filter(node => {
        return isNodeInViewport(node, viewport);
    });
}
```

### 3. Debounce en Auto-Save

```javascript
// Evitar guardar demasiado frecuentemente
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedSave = debounce(saveProgress, 2000);

// Usar en lugar de saveProgress() directo
function toggleMiniObjective(chapterId, objectiveId, miniObjectiveId) {
    // ... lógica ...
    debouncedSave();  // En lugar de saveProgress()
}
```

---

## Extensiones Recomendadas

### 1. Sistema de Logros

```javascript
const ACHIEVEMENTS = {
    first_blood: {
        id: 'first_blood',
        title: 'Primer Paso',
        description: 'Completa tu primer objetivo',
        icon: '🏆',
        check: (gameData) => {
            return gameData.chapters.some(ch => 
                ch.objectives.some(obj => isObjectiveCompleted(obj))
            );
        }
    },
    speed_runner: {
        id: 'speed_runner',
        title: 'Velocista',
        description: 'Completa 5 objetivos en una semana',
        icon: '⚡',
        check: (gameData) => {
            // Implementar lógica de tracking temporal
        }
    },
    completionist: {
        id: 'completionist',
        title: 'Completista',
        description: 'Completa un capítulo entero',
        icon: '💯',
        check: (gameData) => {
            return gameData.chapters.some(ch => 
                ch.objectives.every(obj => isObjectiveCompleted(obj))
            );
        }
    }
};

function checkAchievements() {
    const unlockedAchievements = [];
    for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
        if (achievement.check(gameData) && !isAchievementUnlocked(key)) {
            unlockAchievement(key);
            unlockedAchievements.push(achievement);
        }
    }
    return unlockedAchievements;
}
```

### 2. Sistema de Racha (Streak)

```javascript
function calculateStreak() {
    const history = JSON.parse(localStorage.getItem('lpv_activity_history') || '[]');
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < history.length; i++) {
        const activityDate = new Date(history[i]);
        activityDate.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((currentDate - activityDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === streak) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function recordActivity() {
    const history = JSON.parse(localStorage.getItem('lpv_activity_history') || '[]');
    const today = new Date().toISOString().split('T')[0];
    
    if (!history.includes(today)) {
        history.unshift(today);
        localStorage.setItem('lpv_activity_history', JSON.stringify(history));
    }
}
```

### 3. Estadísticas Avanzadas

```javascript
function getAdvancedStats() {
    let stats = {
        totalObjectives: 0,
        completedObjectives: 0,
        totalMiniObjectives: 0,
        completedMiniObjectives: 0,
        easyCompleted: 0,
        mediumCompleted: 0,
        hardCompleted: 0,
        completionRate: 0,
        favoriteChapter: null,
        streak: calculateStreak()
    };
    
    gameData.chapters.forEach(chapter => {
        chapter.objectives.forEach(obj => {
            stats.totalObjectives++;
            stats.totalMiniObjectives += obj.miniObjectives.length;
            stats.completedMiniObjectives += obj.miniObjectives.filter(m => m.completed).length;
            
            if (isObjectiveCompleted(obj)) {
                stats.completedObjectives++;
                
                if (obj.difficulty === 'easy') stats.easyCompleted++;
                if (obj.difficulty === 'medium') stats.mediumCompleted++;
                if (obj.difficulty === 'hard') stats.hardCompleted++;
            }
        });
    });
    
    stats.completionRate = (stats.completedObjectives / stats.totalObjectives * 100).toFixed(1);
    
    return stats;
}

function renderStatsView() {
    const stats = getAdvancedStats();
    
    return `
        <div class="stats-dashboard">
            <div class="stat-card">
                <h3>Objetivos Completados</h3>
                <p class="stat-big">${stats.completedObjectives}/${stats.totalObjectives}</p>
                <p class="stat-small">${stats.completionRate}% completado</p>
            </div>
            
            <div class="stat-card">
                <h3>Por Dificultad</h3>
                <p>🟢 Fácil: ${stats.easyCompleted}</p>
                <p>🟡 Medio: ${stats.mediumCompleted}</p>
                <p>🔴 Difícil: ${stats.hardCompleted}</p>
            </div>
            
            <div class="stat-card">
                <h3>Racha Actual</h3>
                <p class="stat-big">🔥 ${stats.streak} días</p>
            </div>
        </div>
    `;
}
```

### 4. Modo Pomodoro Integrado

```javascript
class PomodoroTimer {
    constructor(objectiveId) {
        this.objectiveId = objectiveId;
        this.workDuration = 25 * 60; // 25 minutos
        this.breakDuration = 5 * 60;  // 5 minutos
        this.timeRemaining = this.workDuration;
        this.isWorking = true;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.timeRemaining--;
            
            if (this.timeRemaining <= 0) {
                this.isWorking = !this.isWorking;
                this.timeRemaining = this.isWorking ? this.workDuration : this.breakDuration;
                
                if (!this.isWorking) {
                    showToast('¡Toma un descanso! 🎉', 'success');
                } else {
                    showToast('¡De vuelta al trabajo! 💪', 'info');
                }
            }
            
            this.updateDisplay();
        }, 1000);
    }
    
    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
    }
    
    reset() {
        this.pause();
        this.timeRemaining = this.workDuration;
        this.isWorking = true;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        
        document.getElementById('pomodoroDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}
```

---

## 🎯 Siguientes Pasos Recomendados

1. **Corto Plazo (Esta Semana)**
   - [ ] Personalizar los capítulos de ejemplo
   - [ ] Ajustar colores al tema que prefieras
   - [ ] Probar exportar/importar datos

2. **Mediano Plazo (Este Mes)**
   - [ ] Implementar sistema de logros
   - [ ] Agregar estadísticas avanzadas
   - [ ] Crear tema personalizado

3. **Largo Plazo (3-6 Meses)**
   - [ ] Convertir a PWA
   - [ ] Implementar sincronización en la nube
   - [ ] Desarrollar app móvil nativa

---

## 📚 Recursos Adicionales

### Librerías Útiles

- **Chart.js**: Para gráficos de estadísticas
  ```html
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  ```

- **FullCalendar**: Para vista de calendario
  ```html
  <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>
  ```

- **Anime.js**: Para animaciones avanzadas
  ```html
  <script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
  ```

### Tutoriales Recomendados

1. [Firebase Authentication](https://firebase.google.com/docs/auth)
2. [PWA Complete Guide](https://web.dev/progressive-web-apps/)
3. [Vis-Network Documentation](https://visjs.github.io/vis-network/docs/network/)

---

## 🤝 Contribuir

Si desarrollas mejoras interesantes, considera compartirlas con la comunidad:

1. Documenta tu mejora
2. Crea un ejemplo de código
3. Comparte en GitHub/GitLab

---

**Última actualización:** 2025-12-28
**Versión:** 1.0.0
