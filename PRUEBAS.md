# 🎯 Lista de Pruebas - Sistema de Objetivos Diarios y Logros

## ✅ Fase 1 y 2: Mejoras Completadas

### **Mejoras Visuales y Funcionales**

1. **Color de Porcentaje (Blanco Puro)**
   - ✓ Ir a panel de días → Calendario mensual
   - ✓ Verificar que los porcentajes de cada día se ven en blanco puro (#ffffff)

2. **Días Vacíos en Gris**
   - ✓ Crear un día nuevo sin añadir tareas (solo acceder y salir)
   - ✓ Ver calendario mensual -  debería aparecer en GRIS con "--" en lugar de porcentaje
   - ✓ Verificar que NO suma en las estadísticas del mes

3. **4to Objetivo Pre-cargado**
   - ✓ Refrescar la página o abrir día actual
   - ✓ Debe haber 4 objetivos: Meditar, Hacer ejercicio, Leer, **Horario de sueño 7-8h**

4. **Eliminar Objetivos Pre-cargados**
   - ✓ En cualquier día, hacer click en la X de "Meditar" o cualquier otro
   - ✓ Debe eliminarse correctamente (ahora se pueden eliminar TODOS)

5. **Gráfica Mensual**
   - ✓ Ir a vista de calendario mensual
   - ✓ Debajo del calendario debe aparecer gráfica con línea azul
   - ✓ Puntos de colores según progreso:
     - 🟡 Dorado = 100%
     - 🔵 Azul claro = >80%
     - 🟠 Naranja = >60%
     - 🟣 Morado = <60%
   - ✓ Solo muestra días CON tareas (días vacíos no aparecen)
   - ✓ Si no hay datos, dice "No hay datos para mostrar"

### **Estadísticas**

6. **Verificar Cálculo sin Días Vacíos**
   - ✓ Crear 3 días con tareas al 100%
   - ✓ Crear 2 días vacíos (sin tareas)
   - ✓ Estadísticas del mes deben mostrar "3 días perfectos" (no 5)
   - ✓ Promedio debe calcularse solo sobre días con tareas

---

## 🏆 SISTEMA DE LOGROS (Por Implementar en Siguientes Fases)

El sistema de 35+ logros requiere implementación adicional. Las fases incluirán:

### Fase 3: Estructura de Datos de Logros
- Definición de todos los achievements
- Sistema de condiciones y progreso

### Fase 4: Funciones Helper
- Detectores automáticos de logros
- Cálculo de rachas y estadísticas

### Fase 5: UI de Logros
- Panel de logros accesible desde header
- Notificaciones popup
- Progreso visual

### Fase 6: Integración Completa
- Conexión con skill tree
- Testing de todos los logros

---

## 📋 Pruebas Generales

1. **Persistencia**
   - ✓ Hacer cambios en días
   - ✓ Refrescar página
   - ✓ Todo debe mantenerse guardado

2. **Navegación**
   - ✓ Meses → Calendario → Día → volver
   - ✓ Todo debe fluir sin errores

3. **Responsividad**
   - ✓ Probar en ventana pequeña
   - ✓ Gráfica y calendario deben ajustarse

---

**Estado Actual:** Fases 1-2 completadas ✅
**Pendiente:** Sistema completo de logros (Fases 3-6)
