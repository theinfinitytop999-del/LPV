# 🎯 Life Progress Vision

**Sistema de Gamificación de Vida con Skill-Tree Interactivo**

Una aplicación web moderna para visualizar y gestionar tus objetivos de vida mediante un sistema de árbol de habilidades gamificado, con dependencias N:N y sistema de progreso basado en pesos.

![Preview](https://img.shields.io/badge/Status-Ready-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-Vanilla_JS-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Características Principales

### 🗺️ Sistema de Capítulos
- **Mapa Mundial**: Visualiza tus objetivos organizados en capítulos temáticos
- **Progreso Global**: Seguimiento del progreso total con sistema de pesos
- **Estadísticas**: Objetivos completados y unidades totales por capítulo

### 🌳 Árbol de Habilidades Interactivo
- **Visualización de Grafos**: Motor de renderizado usando vis-network
- **Dependencias N:N**: Un objetivo puede depender de múltiples objetivos previos
- **Zoom & Pan**: Navegación fluida con controles de zoom infinito
- **Desbloqueo Automático**: Los nodos se desbloquean al completar dependencias

### 📊 Sistema de Progreso con Pesos
Cada objetivo tiene una dificultad que determina su peso en el progreso total:

| Dificultad | Peso (Unidades) | Color     |
|-----------|----------------|-----------|
| Fácil     | 1 unidad       | 🟢 Verde  |
| Medio     | 2 unidades     | 🟡 Amarillo |
| Difícil   | 4 unidades     | 🔴 Rojo   |

**Fórmula de Progreso:**
```
P = (unidades_completadas / unidades_totales) × 100
```

### 📝 Mini-Objetivos (Checklist)
- Cada objetivo contiene una lista de mini-objetivos
- Un objetivo se marca como "Completado" solo cuando **todos** sus mini-objetivos están hechos
- Interfaz de checklist interactiva con feedback visual

### 🎨 Interfaz Premium
- **Modo Oscuro**: Diseño tecnológico/RPG con paleta `#0f172a`
- **Animaciones Fluidas**: Transiciones suaves y micro-animaciones
- **Feedback Visual**:
  - Nodos bloqueados en gris
  - Nodos disponibles con brillo sutil
  - Líneas de conexión iluminadas al desbloquear
  - Confetti al completar objetivos difíciles 🎉
- **Mobile-First**: Navegación optimizada para pantallas táctiles

### 💾 Persistencia de Datos
- **Auto-Save**: Guardado automático cada 30 segundos en localStorage
- **Exportar**: Descarga tu progreso como archivo JSON
- **Importar**: Carga progreso desde archivo JSON
- **Backup Manual**: Botón de exportación en cualquier momento

---

## 🚀 Inicio Rápido

### Instalación

1. **Clona o descarga el proyecto**:
```bash
git clone https://github.com/tu-usuario/life-progress-vision.git
cd life-progress-vision
```

2. **Abre en el navegador**:
Simplemente abre `index.html` en tu navegador favorito. ¡No requiere servidor!

```bash
# O usa un servidor local (opcional)
python -m http.server 8000
# Luego visita: http://localhost:8000
```

### Uso Básico

1. **Vista de Capítulos**: Al iniciar, verás todos los capítulos disponibles
2. **Selecciona un Capítulo**: Click en cualquier capítulo para ver su árbol de habilidades
3. **Explora Objetivos**: Usa zoom/pan para navegar el árbol
4. **Click en Objetivo**: Accede al detalle y marca mini-objetivos como completados
5. **Observa el Progreso**: El progreso se actualiza en tiempo real

---

## 📁 Estructura del Proyecto

```
life-progress-vision/
│
├── index.html          # Estructura HTML con vistas múltiples
├── styles.css          # Sistema de diseño completo (Modo oscuro)
├── app.js              # Lógica de la aplicación
└── README.md           # Esta documentación
```

---

## 🧠 Arquitectura de Datos

### Estructura JSON

```javascript
{
  chapters: [
    {
      id: 'ch1',
      title: 'Fundamentos Personales',
      description: 'Descripción del capítulo',
      icon: '🎯',
      objectives: [
        {
          id: 'obj1',
          title: 'Establecer Rutina Matutina',
          description: 'Descripción del objetivo',
          icon: '🌅',
          difficulty: 'easy',  // 'easy' | 'medium' | 'hard'
          dependencies: [],     // IDs de objetivos previos requeridos
          miniObjectives: [
            {
              id: 'mini1',
              text: 'Descripción del mini-objetivo',
              completed: false
            }
          ]
        }
      ]
    }
  ]
}
```

### Lógica de Desbloqueo

Un objetivo está **disponible** cuando:
```javascript
dependencies.every(depId => {
  const dep = findObjective(depId);
  return dep.miniObjectives.every(m => m.completed);
})
```

### Estados de Objetivo

| Estado | Descripción | Color |
|--------|-------------|-------|
| `locked` | Tiene dependencias sin completar | Gris |
| `available` | Sin progreso pero disponible | Azul |
| `in-progress` | Algunos mini-objetivos completados | Amarillo |
| `completed` | Todos los mini-objetivos completados | Verde |

---

## 🎮 Funcionalidades Implementadas

### ✅ Core Features
- [x] Sistema de capítulos con progreso independiente
- [x] Árbol de habilidades con dependencias N:N
- [x] Sistema de pesos (Fácil: 1, Medio: 2, Difícil: 4)
- [x] Mini-objetivos con checklist interactiva
- [x] Cálculo de progreso global y por capítulo
- [x] Desbloqueo automático de objetivos

### ✅ Visualización
- [x] Renderizado con vis-network
- [x] Zoom y Pan infinito
- [x] Nodos con estados visuales diferenciados
- [x] Aristas iluminadas al completar dependencias
- [x] Controles de navegación (Zoom In/Out/Fit)

### ✅ UX/UI
- [x] Modo oscuro tecnológico (#0f172a)
- [x] Animaciones y transiciones fluidas
- [x] Confetti al completar objetivos difíciles
- [x] Sistema de notificaciones Toast
- [x] Diseño responsive mobile-first
- [x] Fuentes premium (Orbitron + Inter)

### ✅ Persistencia
- [x] Auto-save en localStorage cada 30s
- [x] Exportar progreso a JSON
- [x] Importar progreso desde JSON
- [x] Botón de reinicio completo

---

## 🛠️ Tecnologías Utilizadas

### Core
- **HTML5**: Estructura semántica
- **CSS3**: Sistema de diseño con variables CSS
- **JavaScript ES6+**: Lógica de la aplicación

### Librerías (CDN)
- **[vis-network](https://visjs.github.io/vis-network/)**: Renderizado de grafos interactivos
- **[canvas-confetti](https://github.com/catdad/canvas-confetti)**: Animaciones de celebración

### Fuentes
- **[Orbitron](https://fonts.google.com/specimen/Orbitron)**: Títulos y elementos display
- **[Inter](https://fonts.google.com/specimen/Inter)**: Texto del cuerpo

---

## 🎨 Paleta de Colores

```css
/* Backgrounds */
--bg-primary:    #0f172a  /* Fondo principal */
--bg-secondary:  #1e293b  /* Fondo secundario */
--bg-tertiary:   #334155  /* Fondo terciario */

/* Acentos */
--accent-primary:   #3b82f6  /* Azul principal */
--accent-secondary: #8b5cf6  /* Púrpura */
--accent-success:   #10b981  /* Verde éxito */
--accent-warning:   #f59e0b  /* Amarillo advertencia */
--accent-danger:    #ef4444  /* Rojo peligro */

/* Texto */
--text-primary:   #f1f5f9  /* Texto principal */
--text-secondary: #cbd5e1  /* Texto secundario */
--text-muted:     #64748b  /* Texto apagado */
```

---

## 📱 Responsive Design

La aplicación está optimizada para:
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

### Breakpoints
```css
@media (max-width: 768px) {
  /* Ajustes para móvil */
}
```

---

## 🔧 Personalización

### Agregar Nuevos Capítulos

Edita `app.js` y agrega un nuevo objeto al array `gameData.chapters`:

```javascript
{
  id: 'ch4',
  title: 'Tu Nuevo Capítulo',
  description: 'Descripción...',
  icon: '🚀',
  objectives: [...]
}
```

### Modificar Pesos de Dificultad

Ajusta el objeto `DIFFICULTY_WEIGHTS` en `app.js`:

```javascript
const DIFFICULTY_WEIGHTS = {
    easy: 1,
    medium: 3,  // Cambiar a 3 unidades
    hard: 6     // Cambiar a 6 unidades
};
```

### Cambiar Tema de Colores

Modifica las variables CSS en `:root` dentro de `styles.css`:

```css
:root {
    --bg-primary: #tu-color;
    --accent-primary: #tu-acento;
}
```

---

## 🐛 Troubleshooting

### El progreso no se guarda
- **Solución**: Verifica que localStorage esté habilitado en tu navegador
- **Chrome**: `chrome://settings/content/cookies` → Permitir cookies

### El gráfico no se renderiza
- **Solución**: Asegúrate de tener conexión a internet (vis-network se carga desde CDN)
- **Alternativa**: Descarga vis-network localmente

### Las animaciones van lentas
- **Solución**: Reduce el número de objetivos por capítulo o desactiva animaciones en CSS

---

## 🚀 Roadmap Futuro

### Funcionalidades Planeadas
- [ ] Sistema de recompensas y logros
- [ ] Modo colaborativo (múltiples usuarios)
- [ ] Sincronización con la nube
- [ ] Estadísticas avanzadas y gráficos
- [ ] Recordatorios y notificaciones
- [ ] Temas personalizables
- [ ] Modo Pomodoro integrado
- [ ] Exportar a PDF/Imagen
- [ ] Sistema de tags y filtros
- [ ] Vista de calendario/timeline

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Siéntete libre de usar, modificar y distribuir.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 👨‍💻 Autor

**Desarrollado con ❤️ usando Vanilla JavaScript**

Para soporte o preguntas, abre un issue en el repositorio.

---

## 📸 Screenshots

### Vista de Capítulos
![Capítulos](https://via.placeholder.com/800x450/0f172a/3b82f6?text=Vista+de+Capitulos)

### Árbol de Habilidades
![Skill Tree](https://via.placeholder.com/800x450/0f172a/8b5cf6?text=Arbol+de+Habilidades)

### Detalle de Objetivo
![Detalle](https://via.placeholder.com/800x450/0f172a/10b981?text=Detalle+de+Objetivo)

---

## 🙏 Agradecimientos

- **vis-network**: Por el excelente motor de grafos
- **canvas-confetti**: Por las animaciones de celebración
- **Google Fonts**: Por las tipografías premium
- **Comunidad Open Source**: Por la inspiración y recursos

---

<div align="center">

**⚡ Life Progress Vision** - Gamifica tu vida, alcanza tus metas

[Reportar Bug](https://github.com/tu-usuario/life-progress-vision/issues) · [Solicitar Feature](https://github.com/tu-usuario/life-progress-vision/issues) · [Documentación](https://github.com/tu-usuario/life-progress-vision/wiki)

</div>
