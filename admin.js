// ============================================================================
// ADMIN PANEL - Sistema de CRUD para   
// ============================================================================

// ============================================================================
// 1. ESTADO DEL ADMIN Y SISTEMA DE UNDO
// ============================================================================

// Estado del panel de administrador (global para acceso desde app.js)
window.adminState = {
    currentChapterId: null,
    currentObjectiveId: null,
    emojiPickerTarget: null,
    undoBuffer: [], // Máximo 10 acciones
    contextMenuData: null
};

const UNDO_BUFFER_MAX = 10;

// ============================================================================
// 2. UTILIDADES
// ============================================================================

function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function addToUndoBuffer(action) {
    adminState.undoBuffer.unshift(action);
    if (adminState.undoBuffer.length > UNDO_BUFFER_MAX) {
        adminState.undoBuffer.pop();
    }
    updateUndoButton();
}

function updateUndoButton() {
    const undoBtn = document.getElementById('undoBtn');
    const undoCount = document.getElementById('undoCount');

    if (adminState.undoBuffer.length > 0) {
        undoBtn.disabled = false;
        undoCount.textContent = `${adminState.undoBuffer.length}/${UNDO_BUFFER_MAX}`;
    } else {
        undoBtn.disabled = true;
        undoCount.textContent = `0/${UNDO_BUFFER_MAX}`;
    }
}

function performUndo() {
    if (adminState.undoBuffer.length === 0) return;

    const action = adminState.undoBuffer.shift();

    switch (action.type) {
        case 'deleteChapter':
            gameData.chapters.splice(action.index, 0, action.data);
            break;
        case 'deleteObjective':
            const chapter = gameData.chapters.find(ch => ch.id === action.chapterId);
            if (chapter) {
                chapter.objectives.splice(action.index, 0, action.data);
            }
            break;
        case 'deleteMiniObjective':
            const ch = gameData.chapters.find(c => c.id === action.chapterId);
            const obj = ch?.objectives.find(o => o.id === action.objectiveId);
            if (obj) {
                obj.miniObjectives.splice(action.index, 0, action.data);
            }
            break;
        case 'editChapter':
            const chapterToRestore = gameData.chapters.find(ch => ch.id === action.chapterId);
            if (chapterToRestore) {
                Object.assign(chapterToRestore, action.previousData);
            }
            break;
        case 'editObjective':
            const chEdit = gameData.chapters.find(c => c.id === action.chapterId);
            const objEdit = chEdit?.objectives.find(o => o.id === action.objectiveId);
            if (objEdit) {
                Object.assign(objEdit, action.previousData);
            }
            break;
    }

    markDataAsChanged();
    updateUndoButton();
    renderAdminChaptersList();

    if (adminState.currentChapterId) {
        renderAdminChapterEditor(adminState.currentChapterId);
    }

    showToast('Acción deshecha', 'success');
}

// ============================================================================
// 3. CRUD - CAPÍTULOS
// ============================================================================

function createChapter(title, description, icon) {
    const newChapter = {
        id: generateId('ch'),
        title: title,
        description: description,
        icon: icon,
        objectives: []
    };

    gameData.chapters.push(newChapter);
    markDataAsChanged();
    renderAdminChaptersList();
    showToast('Capítulo creado exitosamente', 'success');
    return newChapter;
}

function updateChapter(chapterId, updates) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const previousData = { ...chapter };
    Object.assign(chapter, updates);

    addToUndoBuffer({
        type: 'editChapter',
        chapterId: chapterId,
        previousData: previousData
    });

    markDataAsChanged();
    renderAdminChaptersList();
    renderChaptersView(); // Actualizar vista principal
    showToast('Capítulo actualizado', 'success');
}

function deleteChapter(chapterId) {
    const index = gameData.chapters.findIndex(ch => ch.id === chapterId);
    if (index === -1) return;

    const chapter = gameData.chapters[index];
    const objectivesCount = chapter.objectives.length;

    if (!confirm(`¿Eliminar el capítulo "${chapter.title}"?\n\nEsto también eliminará ${objectivesCount} objetivo(s).`)) {
        return;
    }

    const deleted = gameData.chapters.splice(index, 1)[0];

    addToUndoBuffer({
        type: 'deleteChapter',
        index: index,
        data: deleted
    });

    markDataAsChanged();
    adminState.currentChapterId = null;
    renderAdminChaptersList();
    showAdminWelcome();
    showToast('Capítulo eliminado', 'success');
}

// ============================================================================
// 4. CRUD - OBJETIVOS
// ============================================================================

function createObjective(chapterId, data) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const newObjective = {
        id: generateId('obj'),
        title: data.title,
        description: data.description,
        icon: data.icon,
        difficulty: data.difficulty,
        category: data.category || 'learn',
        dependencies: [],
        miniObjectives: [
            { id: generateId('mini'), text: 'Primer mini-objetivo', completed: false }
        ]
    };

    chapter.objectives.push(newObjective);
    markDataAsChanged();
    renderAdminChapterEditor(chapterId);
    showToast('Objetivo creado', 'success');
    return newObjective;
}

function updateObjective(chapterId, objectiveId, updates) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    const objective = chapter?.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    const previousData = { ...objective };
    Object.assign(objective, updates);

    addToUndoBuffer({
        type: 'editObjective',
        chapterId: chapterId,
        objectiveId: objectiveId,
        previousData: previousData
    });

    markDataAsChanged();
    renderAdminChapterEditor(chapterId);
    updateAllProgress();
    showToast('Objetivo actualizado', 'success');
}

function deleteObjective(chapterId, objectiveId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const index = chapter.objectives.findIndex(obj => obj.id === objectiveId);
    if (index === -1) return;

    const objective = chapter.objectives[index];

    // Verificar si otros objetivos dependen de este
    const dependents = chapter.objectives.filter(obj =>
        obj.dependencies.includes(objectiveId)
    );

    const confirmMsg = dependents.length > 0
        ? `¿Eliminar "${objective.title}"?\n\nAdvertencia: ${dependents.length} objetivo(s) dependen de este. Sus dependencias serán removidas.`
        : `¿Eliminar "${objective.title}"?`;

    if (!confirm(confirmMsg)) return;

    // Remover dependencias
    chapter.objectives.forEach(obj => {
        const depIndex = obj.dependencies.indexOf(objectiveId);
        if (depIndex > -1) {
            obj.dependencies.splice(depIndex, 1);
        }
    });

    const deleted = chapter.objectives.splice(index, 1)[0];

    addToUndoBuffer({
        type: 'deleteObjective',
        chapterId: chapterId,
        index: index,
        data: deleted
    });

    markDataAsChanged();
    renderAdminChapterEditor(chapterId);
    showToast('Objetivo eliminado', 'success');
}

// ============================================================================
// 5. CRUD - MINI-OBJETIVOS
// ============================================================================

function createMiniObjective(chapterId, objectiveId, text) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    const objective = chapter?.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    const newMini = {
        id: generateId('mini'),
        text: text,
        completed: false
    };

    objective.miniObjectives.push(newMini);
    markDataAsChanged();
    renderAdminChapterEditor(chapterId);
    showToast('Mini-objetivo agregado', 'success');
}

function updateMiniObjective(chapterId, objectiveId, miniId, text) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    const objective = chapter?.objectives.find(obj => obj.id === objectiveId);
    const mini = objective?.miniObjectives.find(m => m.id === miniId);
    if (!mini) return;

    mini.text = text;
    markDataAsChanged();
}

function deleteMiniObjective(chapterId, objectiveId, miniId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    const objective = chapter?.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    const index = objective.miniObjectives.findIndex(m => m.id === miniId);
    if (index === -1) return;

    const deleted = objective.miniObjectives.splice(index, 1)[0];

    addToUndoBuffer({
        type: 'deleteMiniObjective',
        chapterId: chapterId,
        objectiveId: objectiveId,
        index: index,
        data: deleted
    });

    markDataAsChanged();
    renderAdminChapterEditor(chapterId);
    showToast('Mini-objetivo eliminado', 'success');
}

// ============================================================================
// 6. GESTIÓN DE DEPENDENCIAS
// ============================================================================

function openDependencyEditor(chapterId, objectiveId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    const objective = chapter?.objectives.find(obj => obj.id === objectiveId);
    if (!objective) return;

    adminState.currentObjectiveId = objectiveId;

    const dependencyList = document.getElementById('dependencyList');
    dependencyList.innerHTML = "";

    chapter.objectives.forEach(obj => {
        if (obj.id === objectiveId) return; // No puede depender de sí mismo

        const isChecked = objective.dependencies.includes(obj.id);

        const item = document.createElement('div');
        item.className = 'dependency-checkbox-item';
        item.innerHTML = `
            <input type="checkbox" id="dep_${obj.id}" ${isChecked ? 'checked' : ''} data-objid="${obj.id}">
            <label class="dependency-checkbox-label" for="dep_${obj.id}">
                <span class="dependency-checkbox-icon">${obj.icon}</span>
                <div class="dependency-checkbox-text">
                    <div class="dependency-checkbox-title">${obj.title}</div>
                    <div class="dependency-checkbox-difficulty">
                        ${obj.difficulty === 'easy' ? 'Fácil' : obj.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                    </div>
                </div>
            </label>
        `;

        // Detectar dependencias circulares
        const checkbox = item.querySelector('input');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                if (wouldCreateCircularDependency(chapterId, objectiveId, obj.id)) {
                    document.getElementById('circularWarning').classList.remove('hidden');
                } else {
                    document.getElementById('circularWarning').classList.add('hidden');
                }
            } else {
                document.getElementById('circularWarning').classList.add('hidden');
            }
        });

        dependencyList.appendChild(item);
    });

    document.getElementById('dependencyModal').classList.add('active');
}

function wouldCreateCircularDependency(chapterId, fromObjId, toObjId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return false;

    // BFS para detectar ciclos
    const visited = new Set();
    const queue = [toObjId];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current === fromObjId) {
            return true; // Ciclo detectado
        }

        if (visited.has(current)) continue;
        visited.add(current);

        const currentObj = chapter.objectives.find(o => o.id === current);
        if (currentObj) {
            queue.push(...currentObj.dependencies);
        }
    }

    return false;
}

function saveDependencies() {
    const chapter = gameData.chapters.find(ch => ch.id === adminState.currentChapterId);
    const objective = chapter?.objectives.find(obj => obj.id === adminState.currentObjectiveId);
    if (!objective) return;

    const checkboxes = document.querySelectorAll('#dependencyList input[type="checkbox"]');
    const newDependencies = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            newDependencies.push(checkbox.dataset.objid);
        }
    });

    objective.dependencies = newDependencies;
    markDataAsChanged();

    document.getElementById('dependencyModal').classList.remove('active');
    renderAdminChapterEditor(adminState.currentChapterId);
    updateAllProgress();
    showToast('Dependencias actualizadas', 'success');
}

// ============================================================================
// 7. EMOJI PICKER
// ============================================================================

const EMOJIS = {
    all: ['😊', '🎯', '⚡', '🔥', '💡', '⭐', '🎨', '💪', '🏆', '🎉', '🚀', '💼', '📚', '🌟', '💎', '🎸', '⚽', '🎭', '🎬', '🎤', '🌈', '🌸', '🌺', '🌻', '🌼', '🌵', '🌴', '🌳', '🌲', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🍕', '🍔', '🍟', '🌭', '🍿', '🧁', '🍰', '🎂', '🍪', '⚙️', '🔧', '🔨', '⚡', '💻', '📱', '🖥️', '⌨️', '🖱️', '❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '✈️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '📖', '📝', '📚', '📓', '📔', '📒', '📕', '📗', '📘'],
    smileys: ['😊', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😍', '🥰', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤'],
    objects: ['🎯', '⚡', '🔥', '💡', '⭐', '🎨', '🏆', '🎉', '🚀', '💼', '📚', '🌟', '💎', '🎸', '⚽', '🎭', '🎬', '🎤', '⚙️', '🔧', '🔨', '💻', '📱', '🖥️', '⌨️', '🖱️', '📖', '📝', '📓', '📔'],
    symbols: ['❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '💯', '✅', '❌', '⭕', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚪', '⚫', '🟤'],
    nature: ['🌈', '🌸', '🌺', '🌻', '🌼', '🌵', '🌴', '🌳', '🌲', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐮', '🐷', '🐸', '🐵'],
    activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳']
};

function openEmojiPicker(target) {
    adminState.emojiPickerTarget = target;

    renderEmojiGrid('all');

    // Search functionality
    document.getElementById('emojiSearch').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm) {
            const allEmojis = Object.values(EMOJIS).flat();
            const filtered = allEmojis.filter(emoji => {
                // Simple search - could be enhanced with emoji Names
                return true; // Muestra todos por ahora
            });
            renderEmojiGrid('all', filtered);
        } else {
            const activeCategory = document.querySelector('.emoji-category-btn.active').dataset.category;
            renderEmojiGrid(activeCategory);
        }
    });

    // Category buttons
    document.querySelectorAll('.emoji-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.emoji-category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEmojiGrid(btn.dataset.category);
        });
    });

    document.getElementById('emojiPickerModal').classList.add('active');
}

function renderEmojiGrid(category, customEmojis = null) {
    const grid = document.getElementById('emojiGrid');
    grid.innerHTML = '';

    const emojis = customEmojis || EMOJIS[category] || EMOJIS.all;

    emojis.forEach(emoji => {
        const option = document.createElement('div');
        option.className = 'emoji-option';
        option.textContent = emoji;
        option.addEventListener('click', () => selectEmoji(emoji));
        grid.appendChild(option);
    });
}

function selectEmoji(emoji) {
    const target = adminState.emojiPickerTarget;
    if (target) {
        document.getElementById(target).value = emoji;
    }

    document.getElementById('emojiPickerModal').classList.remove('active');
}

// ============================================================================
// 8. CONTEXT MENU (Right-Click)
// ============================================================================

function showContextMenu(x, y, chapterId, objectiveId) {
    const menu = document.getElementById('contextMenu');
    adminState.contextMenuData = { chapterId, objectiveId };

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.classList.remove('hidden');

    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', hideContextMenu, { once: true });
    }, 100);
}

function hideContextMenu() {
    document.getElementById('contextMenu').classList.add('hidden');
}

// ============================================================================
// 9. GESTIÓN DE CATEGORÍAS
// ============================================================================

function createCategory(name, color) {
    const newCategory = {
        id: generateId('cat'),
        name: name,
        color: color
    };

    gameData.categories.push(newCategory);
    markDataAsChanged();
    renderCategoriesManager(); // Re-renderizar panel de categorías
    showToast('Categoría creada', 'success');
}

function deleteCategory(categoryId) {
    if (gameData.categories.length <= 1) {
        showToast('Debe haber al menos una categoría', 'error');
        return;
    }

    // Verificar si está en uso
    let inUse = false;
    for (const ch of gameData.chapters) {
        for (const obj of ch.objectives) {
            if (obj.category === categoryId) {
                inUse = true;
                break;
            }
        }
        if (inUse) break;
    }

    if (inUse) {
        showToast('No se puede eliminar: Categoría en uso', 'error');
        return;
    }

    if (!confirm('¿Eliminar esta categoría?')) return;

    gameData.categories = gameData.categories.filter(c => c.id !== categoryId);
    markDataAsChanged();
    renderCategoriesManager();
    showToast('Categoría eliminada', 'success');
}

function updateCategorySelect() {
    const select = document.getElementById('objectiveCategorySelect');
    if (!select) return;

    // Guardar selección actual si existe
    const currentVal = select.value;

    select.innerHTML = '';

    // Asegurar que existan categorías
    if (!gameData.categories) {
        gameData.categories = [
            { id: 'cat_learn', name: 'Learn', color: '#4ade80' },
            { id: 'cat_physic', name: 'Physic', color: '#06b6d4' },
            { id: 'cat_social', name: 'Social', color: '#a855f7' },
            { id: 'cat_mental', name: 'Mental', color: '#f472b6' },
            { id: 'cat_work', name: 'Work', color: '#84cc16' },
            { id: 'cat_purpose', name: 'Purpose', color: '#eab308' }
        ];
    }

    gameData.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        // Intentar mostrar color en el option (soporte limitado en navegadores)
        option.style.backgroundColor = cat.color;
        select.appendChild(option);
    });

    // Restaurar valor si aun existe, sino seleccionar el primero
    if (gameData.categories.some(c => c.id === currentVal)) {
        select.value = currentVal;
    } else if (gameData.categories.length > 0) {
        select.value = gameData.categories[0].id; // Default al primero
    }
}

function renderCategoriesManager() {
    const list = document.getElementById('adminCategoriesList');
    if (!list) return;

    list.innerHTML = '';

    // Asegurar que existan categorías
    if (!gameData.categories) {
        gameData.categories = [
            { id: 'cat_learn', name: 'Learn', color: '#4ade80' },
            { id: 'cat_physic', name: 'Physic', color: '#06b6d4' },
            { id: 'cat_social', name: 'Social', color: '#a855f7' },
            { id: 'cat_mental', name: 'Mental', color: '#f472b6' },
            { id: 'cat_work', name: 'Work', color: '#84cc16' },
            { id: 'cat_purpose', name: 'Purpose', color: '#eab308' }
        ];
    }

    // Actualizar el select también
    updateCategorySelect();

    gameData.categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'panel-item';
        item.innerHTML = `
            <div class="panel-item-content">
                <div class="category-dot" style="background-color: ${cat.color}"></div>
                <span class="panel-item-title">${cat.name}</span>
            </div>
            <div class="panel-item-actions">
                <button class="panel-action-btn edit-cat-btn" title="Editar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="panel-action-btn danger delete-cat-btn" title="Eliminar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        item.querySelector('.edit-cat-btn').addEventListener('click', () => {
            openCategoryModal(cat.id);
        });

        item.querySelector('.delete-cat-btn').addEventListener('click', () => {
            deleteCategory(cat.id);
        });

        list.appendChild(item);
    });
}

function openCategoryModal(categoryId = null) {
    const modal = document.getElementById('categoryModal');
    const nameInput = document.getElementById('categoryNameInput');
    const colorInput = document.getElementById('categoryColorInput');
    const colorDisplay = document.getElementById('categoryColorHex');
    const title = modal.querySelector('h3');

    if (categoryId) {
        const category = gameData.categories.find(c => c.id === categoryId);
        if (category) {
            title.textContent = 'Editar Categoría';
            nameInput.value = category.name;
            colorInput.value = category.color;
            colorDisplay.textContent = category.color;
        }
    } else {
        title.textContent = 'Nueva Categoría';
        nameInput.value = '';
        colorInput.value = '#4ade80';
        colorDisplay.textContent = '#4ade80';
    }

    modal.dataset.categoryId = categoryId || '';
    modal.classList.add('active');
}

// ============================================================================
// 10. RENDERIZADO
// ============================================================================

function renderAdminChaptersList() {
    const list = document.getElementById('adminChaptersList');
    if (!list) {
        console.error('Element adminChaptersList not found in DOM');
        // Reintentar con un ligero retraso si el DOM no está listo
        setTimeout(() => renderAdminChaptersList(), 200);
        return;
    }

    list.innerHTML = '';

    // Renderizar categorías también para que aparezcan al cargar
    try {
        renderCategoriesManager();
    } catch (error) {
        console.error('Error rendering categories:', error);
    }

    // Validar datos
    if (!gameData || !gameData.chapters || !Array.isArray(gameData.chapters)) {
        console.warn('gameData.chapters is not available or invalid:', gameData?.chapters);
        list.innerHTML = `
            <div style="padding: var(--spacing-md); color: var(--text-secondary); text-align: center;">
                <p>No hay capítulos disponibles.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Haz clic en "+ Nuevo" para crear uno.</p>
            </div>
        `;
        return;
    }

    if (gameData.chapters.length === 0) {
        console.log('No chapters found in gameData');
        list.innerHTML = `
            <div style="padding: var(--spacing-md); color: var(--text-secondary); text-align: center;">
                <p>No hay capítulos todavía.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">¡Crea tu primer capítulo!</p>
            </div>
        `;
        return;
    }

    gameData.chapters.forEach(chapter => {
        const item = document.createElement('div');
        item.className = `panel-item ${adminState.currentChapterId === chapter.id ? 'active' : ''}`;
        item.innerHTML = `
            <div class="panel-item-content">
                <span class="panel-item-icon">${chapter.icon}</span>
                <span class="panel-item-title">${chapter.title}</span>
            </div>
            <div class="panel-item-actions">
                <button class="panel-action-btn edit-chapter-btn" title="Editar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="panel-action-btn danger delete-chapter-btn" title="Eliminar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        item.querySelector('.panel-item-content').addEventListener('click', () => {
            adminState.currentChapterId = chapter.id;
            renderAdminChaptersList();
            renderAdminChapterEditor(chapter.id);
        });

        item.querySelector('.edit-chapter-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            openChapterModal(chapter.id);
        });

        item.querySelector('.delete-chapter-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteChapter(chapter.id);
        });

        list.appendChild(item);
    });
}

function renderAdminChapterEditor(chapterId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const mainArea = document.getElementById('adminMain');
    mainArea.innerHTML = `
        <div class="admin-chapter-editor">
            <div class="admin-chapter-header">
                <h3>${chapter.icon} ${chapter.title}</h3>
                <button class="btn-add" id="addObjectiveBtn">+ Nuevo Objetivo</button>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: var(--spacing-xl);">${chapter.description}</p>
            <div class="admin-objectives-list" id="adminObjectivesList">
                <!-- Objectives rendered here -->
            </div>
        </div>
    `;

    document.getElementById('addObjectiveBtn').addEventListener('click', () => {
        openObjectiveModal(chapterId);
    });

    renderAdminObjectivesList(chapterId);
}

function renderAdminObjectivesList(chapterId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const list = document.getElementById('adminObjectivesList');
    list.innerHTML = '';

    chapter.objectives.forEach(obj => {
        const card = document.createElement('div');
        card.className = 'admin-objective-card';
        card.innerHTML = `
            <div class="admin-objective-header">
                <div class="admin-objective-info">
                    <span class="admin-objective-icon">${obj.icon}</span>
                    <div class="admin-objective-details">
                        <h4>${obj.title}</h4>
                        <div class="admin-objective-meta">
                            <span class="difficulty-badge ${obj.difficulty}">${obj.difficulty === 'easy' ? 'Fácil' : obj.difficulty === 'medium' ? 'Medio' : 'Difícil'}</span>
                            <span class="status-badge">${obj.dependencies.length} dependencias</span>
                            ${(() => {
                const catId = obj.category || 'learn';
                const cat = gameData.categories ? gameData.categories.find(c => c.id === catId) : null;
                return cat ? `<span class="category-badge" style="--cat-color: ${cat.color}">${cat.name}</span>` : '';
            })()}
                        </div>
                    </div>
                </div>
                <div class="admin-chapter-actions">
                    <button class="btn-icon-small edit-obj-btn" title="Editar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon-small edit-deps-btn" title="Dependencias">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6"></path>
                        </svg>
                    </button>
                    <button class="btn-icon-small danger delete-obj-btn" title="Eliminar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="admin-mini-objectives">
                <strong style="font-size: 0.9rem; color: var(--text-secondary);">Mini-Objetivos:</strong>
                <div class="admin-mini-objectives-list" id="miniList_${obj.id}">
                    <!-- Mini objectives rendered here -->
                </div>
                <button class="btn-add" style="margin-top: var(--spacing-sm); font-size: 0.85rem;" data-objid="${obj.id}">+ Agregar Mini-Objetivo</button>
            </div>
        `;

        card.querySelector('.edit-obj-btn').addEventListener('click', () => {
            openObjectiveModal(chapterId, obj.id);
        });

        card.querySelector('.edit-deps-btn').addEventListener('click', () => {
            openDependencyEditor(chapterId, obj.id);
        });

        card.querySelector('.delete-obj-btn').addEventListener('click', () => {
            deleteObjective(chapterId, obj.id);
        });

        card.querySelector('.btn-add').addEventListener('click', (e) => {
            const text = prompt('Texto del mini-objetivo:');
            if (text) {
                createMiniObjective(chapterId, e.target.dataset.objid, text);
            }
        });

        list.appendChild(card);

        // Render mini objectives
        renderAdminMiniObjectives(chapterId, obj.id);
    });
}

function renderAdminMiniObjectives(chapterId, objectiveId) {
    const chapter = gameData.chapters.find(ch => ch.id === chapterId);
    const objective = chapter?.objectives.find(o => o.id === objectiveId);
    if (!objective) return;

    const miniList = document.getElementById(`miniList_${objectiveId}`);
    miniList.innerHTML = '';

    objective.miniObjectives.forEach(mini => {
        const item = document.createElement('div');
        item.className = 'admin-mini-objective-item';
        item.innerHTML = `
            <input type="text" value="${mini.text}" data-miniid="${mini.id}" />
            <button class="btn-icon-small danger delete-mini-btn" title="Eliminar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;

        const input = item.querySelector('input');
        input.addEventListener('blur', () => {
            updateMiniObjective(chapterId, objectiveId, mini.id, input.value);
        });

        item.querySelector('.delete-mini-btn').addEventListener('click', () => {
            deleteMiniObjective(chapterId, objectiveId, mini.id);
        });

        miniList.appendChild(item);
    });
}

function showAdminWelcome() {
    const mainArea = document.getElementById('adminMain');
    mainArea.innerHTML = `
        <div class="admin-welcome">
            <h3>👋 Bienvenido al Panel de Administración</h3>
            <p>Selecciona un capítulo de la lista para comenzar a editar, o crea uno nuevo.</p>
            <div class="admin-tips">
                <h4>💡 Consejos:</h4>
                <ul>
                    <li>Haz <strong>click derecho</strong> en un objetivo para editar dependencias</li>
                    <li>Puedes <strong>deshacer</strong> hasta 10 acciones recientes</li>
                    <li>Los cambios se <strong>guardan automáticamente</strong> cada 5 minutos</li>
                </ul>
            </div>
        </div>
    `;
}

// ============================================================================
// 10. MODALS
// ============================================================================

function openChapterModal(chapterId = null) {
    const modal = document.getElementById('chapterModal');
    const title = document.getElementById('chapterModalTitle');
    const iconInput = document.getElementById('chapterIconInput');
    const titleInput = document.getElementById('chapterTitleInput');
    const descInput = document.getElementById('chapterDescInput');

    if (chapterId) {
        const chapter = gameData.chapters.find(ch => ch.id === chapterId);
        if (chapter) {
            title.textContent = 'Editar Capítulo';
            iconInput.value = chapter.icon;
            titleInput.value = chapter.title;
            descInput.value = chapter.description;
        }
    } else {
        title.textContent = 'Crear Capítulo';
        iconInput.value = '🎯';
        titleInput.value = '';
        descInput.value = '';
    }

    modal.dataset.chapterId = chapterId || '';
    modal.classList.add('active');
}

function openObjectiveModal(chapterId, objectiveId = null) {
    const modal = document.getElementById('objectiveModal');
    const title = document.getElementById('objectiveModalTitle');
    const iconInput = document.getElementById('objectiveIconInput');
    const titleInput = document.getElementById('objectiveTitleInput');
    const descInput = document.getElementById('objectiveDescInput');
    const difficultySelect = document.getElementById('objectiveDifficultySelect');
    const categorySelect = document.getElementById('objectiveCategorySelect');

    if (objectiveId) {
        const chapter = gameData.chapters.find(ch => ch.id === chapterId);
        const objective = chapter?.objectives.find(o => o.id === objectiveId);
        if (objective) {
            title.textContent = 'Editar Objetivo';
            iconInput.value = objective.icon;
            titleInput.value = objective.title;
            descInput.value = objective.description;
            difficultySelect.value = objective.difficulty;
            categorySelect.value = objective.category || 'learn';
        }
    } else {
        title.textContent = 'Crear Objetivo';
        iconInput.value = '🎯';
        titleInput.value = '';
        descInput.value = '';
        difficultySelect.value = 'medium';
        categorySelect.value = 'learn';
    }

    modal.dataset.chapterId = chapterId;
    modal.dataset.objectiveId = objectiveId || '';
    modal.classList.add('active');
}

// ============================================================================
// 11. TOGGLE ADMIN VIEW
// ============================================================================

// Función global para alternar vista de administrador (accesible desde app.js)
window.toggleAdminView = function () {
    if (appState.currentView === 'adminView') {
        switchView('chaptersView');
        renderChaptersView();
    } else {
        // Forzar recarga de datos desde localStorage antes de mostrar admin
        try {
            const saved = localStorage.getItem('lifeProgressVision');
            if (saved) {
                const parsedData = JSON.parse(saved);
                // Solo actualizar si hay datos válidos
                if (parsedData && parsedData.chapters && Array.isArray(parsedData.chapters)) {
                    gameData = parsedData;
                    console.log('Admin: Datos recargados desde localStorage, capítulos:', gameData.chapters.length);
                }
            }
        } catch (e) {
            console.error('Error recargando datos para admin:', e);
        }

        switchView('adminView');

        // Delay para asegurar que el DOM está completamente listo
        setTimeout(() => {
            console.log('Admin: Renderizando lista de capítulos...');
            console.log('Admin: gameData.chapters =', gameData?.chapters);
            renderAdminChaptersList();
            if (adminState.currentChapterId) {
                renderAdminChapterEditor(adminState.currentChapterId);
            } else {
                showAdminWelcome();
            }
            updateUndoButton();
        }, 100);
    }
}

// ============================================================================
// 12. INICIALIZACIÓN DEL ADMIN PANEL
// ============================================================================

function initAdminPanel() {
    // Undo button
    document.getElementById('undoBtn').addEventListener('click', performUndo);

    // Add chapter button
    document.getElementById('addChapterBtn').addEventListener('click', () => {
        openChapterModal();
    });

    // Back from admin
    document.getElementById('backFromAdmin').addEventListener('click', () => {
        toggleAdminView();
    });

    // Chapter modal
    document.getElementById('closeChapterModal').addEventListener('click', () => {
        document.getElementById('chapterModal').classList.remove('active');
    });

    document.getElementById('cancelChapterEdit').addEventListener('click', () => {
        document.getElementById('chapterModal').classList.remove('active');
    });

    document.getElementById('saveChapter').addEventListener('click', () => {
        const modal = document.getElementById('chapterModal');
        const chapterId = modal.dataset.chapterId;
        const icon = document.getElementById('chapterIconInput').value;
        const title = document.getElementById('chapterTitleInput').value;
        const desc = document.getElementById('chapterDescInput').value;

        if (!title) {
            showToast('El título es obligatorio', 'error');
            return;
        }

        if (chapterId) {
            updateChapter(chapterId, { title, description: desc, icon });
        } else {
            const newChapter = createChapter(title, desc, icon);
            adminState.currentChapterId = newChapter.id;
            renderAdminChapterEditor(newChapter.id);
        }

        modal.classList.remove('active');
    });

    document.getElementById('chooseChapterIcon').addEventListener('click', () => {
        openEmojiPicker('chapterIconInput');
    });

    // Objective modal
    document.getElementById('closeObjectiveModal').addEventListener('click', () => {
        document.getElementById('objectiveModal').classList.remove('active');
    });

    document.getElementById('cancelObjectiveEdit').addEventListener('click', () => {
        document.getElementById('objectiveModal').classList.remove('active');
    });

    document.getElementById('saveObjective').addEventListener('click', () => {
        const modal = document.getElementById('objectiveModal');
        const chapterId = modal.dataset.chapterId;
        const objectiveId = modal.dataset.objectiveId;
        const icon = document.getElementById('objectiveIconInput').value;
        const title = document.getElementById('objectiveTitleInput').value;
        const desc = document.getElementById('objectiveDescInput').value;
        const difficulty = document.getElementById('objectiveDifficultySelect').value;
        const category = document.getElementById('objectiveCategorySelect').value;

        if (!title) {
            showToast('El título es obligatorio', 'error');
            return;
        }

        if (objectiveId) {
            updateObjective(chapterId, objectiveId, { title, description: desc, icon, difficulty, category });
        } else {
            createObjective(chapterId, { title, description: desc, icon, difficulty, category });
        }

        modal.classList.remove('active');
    });

    document.getElementById('chooseObjectiveIcon').addEventListener('click', () => {
        openEmojiPicker('objectiveIconInput');
    });

    // Dependency modal
    document.getElementById('closeDependencyModal').addEventListener('click', () => {
        document.getElementById('dependencyModal').classList.remove('active');
    });

    document.getElementById('cancelDependencyEdit').addEventListener('click', () => {
        document.getElementById('dependencyModal').classList.remove('active');
    });

    document.getElementById('saveDependencies').addEventListener('click', saveDependencies);

    // Emoji picker modal
    document.getElementById('closeEmojiPicker').addEventListener('click', () => {
        document.getElementById('emojiPickerModal').classList.remove('active');
    });

    // Context menu actions
    document.querySelectorAll('.context-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            const { chapterId, objectiveId } = adminState.contextMenuData || {};

            if (!chapterId || !objectiveId) return;

            switch (action) {
                case 'edit':
                    openObjectiveModal(chapterId, objectiveId);
                    break;
                case 'dependencies':
                    openDependencyEditor(chapterId, objectiveId);
                    break;
                case 'delete':
                    deleteObjective(chapterId, objectiveId);
                    break;
            }

            hideContextMenu();
        });
    });

    // Right-click on skill tree nodes (se conectará desde app.js)

    // category Management
    const addCatBtn = document.getElementById('addCategoryBtn');
    if (addCatBtn) {
        addCatBtn.addEventListener('click', () => openCategoryModal());
    }

    document.getElementById('closeCategoryModal').addEventListener('click', () => {
        document.getElementById('categoryModal').classList.remove('active');
    });

    document.getElementById('cancelCategoryEdit').addEventListener('click', () => {
        document.getElementById('categoryModal').classList.remove('active');
    });

    document.getElementById('categoryColorInput').addEventListener('input', (e) => {
        document.getElementById('categoryColorHex').textContent = e.target.value;
    });

    document.getElementById('saveCategory').addEventListener('click', () => {
        const modal = document.getElementById('categoryModal');
        const categoryId = modal.dataset.categoryId;
        const name = document.getElementById('categoryNameInput').value;
        const color = document.getElementById('categoryColorInput').value;

        if (!name) {
            showToast('El nombre es obligatorio', 'error');
            return;
        }

        if (categoryId) {
            const cat = gameData.categories.find(c => c.id === categoryId);
            if (cat) {
                cat.name = name;
                cat.color = color;
                markDataAsChanged();
                renderCategoriesManager();
                // Actualizar colores en la vista si es necesario
                showToast('Categoría actualizada', 'success');
            }
        } else {
            createCategory(name, color);
        }

        modal.classList.remove('active');
    });

    console.log('✅ Admin Panel initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
} else {
    initAdminPanel();
}
