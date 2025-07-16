/**
 * Sistema de Control de Cabinas
 * Archivo JavaScript principal
 * Contiene todas las funcionalidades para las diferentes interfaces del sistema
 */

// ========== DATOS LOCALES ==========
// Datos de ejemplo para máquinas
let machinesData = [
    { id: 1, name: "Cabina 1", status: "inactive", start_time: null, time_used: 0, paid: false, faults: {cpu: false, monitor: false, keyboard: false, mouse: false}, created_at: "2025-07-13 05:58:06.89838", is_deleted: false },
    { id: 2, name: "Cabina 2", status: "inactive", start_time: null, time_used: 0, paid: false, faults: {cpu: false, monitor: false, keyboard: false, mouse: false}, created_at: "2025-07-13 05:58:06.89838", is_deleted: false },
    { id: 3, name: "Cabina 3", status: "inactive", start_time: null, time_used: 0, paid: false, faults: {cpu: false, monitor: false, keyboard: false, mouse: false}, created_at: "2025-07-13 05:58:06.89838", is_deleted: false },
    { id: 4, name: "Cabina 4", status: "inactive", start_time: null, time_used: 0, paid: false, faults: {cpu: false, monitor: false, keyboard: false, mouse: false}, created_at: "2025-07-13 05:58:06.89838", is_deleted: false },
    { id: 5, name: "Cabina 5", status: "inactive", start_time: null, time_used: 0, paid: false, faults: {cpu: false, monitor: false, keyboard: false, mouse: false}, created_at: "2025-07-13 05:58:06.89838", is_deleted: false }
];

// Datos de ejemplo para tipos de máquinas
let machineTypesData = [
    { id: 1, name: "PC Estándar" },
    { id: 2, name: "PC Gaming" },
    { id: 3, name: "PC Multimedia" }
];

// Datos de ejemplo para usuarios
let usersData = [
    { id: 1, name: "Administrador", email: "admin@example.com", phone: "123456789", role: "Administrador", password: "admin123", created_at: "2025-07-13 05:58:06.89838", is_deleted: false },
    { id: 2, name: "Empleado", email: "empleado@example.com", phone: "987654321", role: "Empleado", password: "empleado123", created_at: "2025-07-13 05:58:06.89838", is_deleted: false },
    { id: 3, name: "Cliente", email: "cliente@example.com", phone: "555555555", role: "Cliente", password: "cliente123", created_at: "2025-07-13 05:58:06.89838", is_deleted: false }
];

// Datos de ejemplo para auditoría
let auditLogsData = [];

// Datos de ejemplo para alquileres
let rentalsData = [];

// ========== FUNCIONES GENERALES ==========

/**
 * Inicializa la aplicación según la página actual
 */
function initApp() {
    // Detectar la página actual basada en el nombre del archivo
    const currentPage = window.location.pathname.split('/').pop();
    
    // Inicializar componentes según la página
    if (currentPage === 'index.html' || currentPage === '') {
        initLoginPage();
    } else if (currentPage === 'pagina1.html') {
        initDashboardPage();
    } else if (currentPage === 'machines.html') {
        initMachinesPage();
    } else if (currentPage === 'users.html') {
        initUsersPage();
    } else if (currentPage === 'rentals.html') {
        initRentalsPage();
    }
}

/**
 * Muestra una alerta personalizada usando SweetAlert2
 * @param {string} title - Título de la alerta
 * @param {string} text - Texto de la alerta
 * @param {string} icon - Icono de la alerta (success, error, warning, info, question)
 * @param {Function} callback - Función a ejecutar después de cerrar la alerta
 */
function showAlert(title, text, icon = 'info', callback = null) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary',
            popup: 'animated fadeIn'
        }
    }).then(() => {
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
}

// ========== PÁGINA DE LOGIN ==========

/**
 * Inicializa la página de login
 */
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

/**
 * Maneja el envío del formulario de login
 * @param {Event} event - Evento de envío del formulario
 */
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí deberías integrar la lógica de autenticación real con una base de datos.
    // Por ahora, usaremos credenciales fijas para el ejemplo.
    const adminUsername = 'karla32';
    const adminPassword = '123456';

    if (username === adminUsername && password === adminPassword) {
        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso.',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            // Redirigir al panel de administrador o a la página principal
            window.location.href = 'pagina1.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.',
            confirmButtonText: 'Entendido'
        });
    }
}

// ========== PÁGINA DEL DASHBOARD ==========

/**
 * Inicializa la página del dashboard
 */
function initDashboardPage() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.getElementById('toggle-btn');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }

    // Activar enlace del sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animación de entrada para las cards
    animateCards();
}

/**
 * Alterna la visibilidad del sidebar
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const navbar = document.getElementById('navbar');
    
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    navbar.classList.toggle('collapsed');
}

/**
 * Muestra alerta de bienvenida
 */
function showWelcomeAlert() {
    Swal.fire({
        title: '¡Bienvenido al Panel de Administración!',
        text: 'Gestiona tu cibercafé con estilo y eficiencia.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary',
            popup: 'animated bounceIn'
        }
    });
}

/**
 * Muestra alerta por sección
 * @param {string} section - Nombre de la sección
 */
function showSectionAlert(section) {
    Swal.fire({
        title: `Sección: ${section}`,
        text: `Estás accediendo a la sección de ${section}.`,
        icon: 'info',
        confirmButtonText: 'Continuar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-primary',
            popup: 'animated fadeIn'
        }
    });
}

/**
 * Anima las tarjetas con efecto de entrada
 */
function animateCards() {
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ========== PÁGINA DE MÁQUINAS ==========

/**
 * Inicializa la página de máquinas
 */
function initMachinesPage() {
    // Cargar tipos de máquinas y listado de máquinas
    loadMachineTypes();
    loadMachines();

    // Configurar el formulario de creación
    const createForm = document.getElementById('create-machine-form');
    if (createForm) {
        createForm.addEventListener('submit', createMachine);
    }
    
    // Cargar tabla de máquinas activas al iniciar (para la versión anterior)
    if (document.getElementById('active-machines-table')) {
        loadTable(true);
    }
    
    // Configurar el toggle del sidebar
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    // Activar enlace del sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Carga los tipos de máquinas desde los datos locales
 */
function loadMachineTypes() {
    const machineTypeSelect = document.getElementById('machine-type');
    if (!machineTypeSelect) return;

    machineTypeSelect.innerHTML = '<option value="">Seleccione un tipo</option>';
    machineTypesData.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.name;
        machineTypeSelect.appendChild(option);
    });
}

/**
 * Carga las máquinas desde los datos locales
 */
function loadMachines() {
    const tableBody = document.getElementById('machines-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const activeMachines = machinesData.filter(machine => !machine.is_deleted);
    
    activeMachines.forEach(machine => {
        // Encontrar el tipo de máquina correspondiente
        const machineType = machineTypesData.find(type => type.id === machine.machine_type_id) || { name: 'Desconocido' };
        
        const faultsText = Object.keys(machine.faults).length > 0 ?
            Object.keys(machine.faults).filter(key => machine.faults[key]).join(', ') : 'Ninguno';
        
        const row = document.createElement('tr');
        row.className = 'table-row';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${machine.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${machine.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${machineType.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${machine.maintenance_status === 'operational' ? 'Operativa' : machine.maintenance_status === 'in_maintenance' ? 'En Mantenimiento' : 'Fuera de Servicio'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(machine.created_at).toLocaleString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${faultsText}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="toggleEditForm(${machine.id})" class="text-blue-500 hover:underline">Editar</button>
                <button onclick="deleteMachine(${machine.id})" class="text-red-500 hover:underline ml-2">Eliminar</button>
            </td>
        `;
        
        const editForm = document.createElement('tr');
        editForm.id = `edit-form-${machine.id}`;
        editForm.className = 'edit-form';
        editForm.innerHTML = `
            <td colspan="7" class="px-6 py-4">
                <form id="edit-machine-form-${machine.id}" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" id="edit-machine-name-${machine.id}" value="${machine.name}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tipo de Cabina</label>
                        <select id="edit-machine-type-${machine.id}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="">Seleccione un tipo</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Estado de Mantenimiento</label>
                        <select id="edit-maintenance-status-${machine.id}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="operational" ${machine.maintenance_status === 'operational' ? 'selected' : ''}>Operativa</option>
                            <option value="in_maintenance" ${machine.maintenance_status === 'in_maintenance' ? 'selected' : ''}>En Mantenimiento</option>
                            <option value="out_of_service" ${machine.maintenance_status === 'out_of_service' ? 'selected' : ''}>Fuera de Servicio</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Fallos</label>
                        <div class="mt-2 space-y-2">
                            <label class="flex items-center">
                                <input type="checkbox" id="edit-fault-cpu-${machine.id}" ${machine.faults.cpu ? 'checked' : ''}> CPU
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="edit-fault-monitor-${machine.id}" ${machine.faults.monitor ? 'checked' : ''}> Monitor
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="edit-fault-keyboard-${machine.id}" ${machine.faults.keyboard ? 'checked' : ''}> Teclado
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="edit-fault-mouse-${machine.id}" ${machine.faults.mouse ? 'checked' : ''}> Mouse
                            </label>
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <button type="button" onclick="updateMachine(${machine.id})" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar</button>
                    </div>
                </form>
            </td>
        `;
        
        tableBody.appendChild(row);
        tableBody.appendChild(editForm);

        // Cargar tipos de cabina en el formulario de edición
        loadMachineTypesForEdit(machine.id, machine.machine_type_id);
    });
}

/**
 * Carga los tipos de máquinas para el formulario de edición desde datos locales
 * @param {number} machineId - ID de la máquina
 * @param {number} selectedTypeId - ID del tipo seleccionado
 */
function loadMachineTypesForEdit(machineId, selectedTypeId) {
    const select = document.getElementById(`edit-machine-type-${machineId}`);
    if (!select) return;

    select.innerHTML = '<option value="">Seleccione un tipo</option>';
    machineTypesData.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.name;
        if (type.id === selectedTypeId) option.selected = true;
        select.appendChild(option);
    });
}

/**
 * Crea una nueva máquina
 * @param {Event} e - Evento de envío del formulario
 */
function createMachine(e) {
    e.preventDefault();
    
    const name = document.getElementById('machine-name').value;
    const machineTypeId = document.getElementById('machine-type').value;
    const maintenanceStatus = document.getElementById('maintenance-status').value;
    const faults = {
        cpu: document.getElementById('fault-cpu').checked,
        monitor: document.getElementById('fault-monitor').checked,
        keyboard: document.getElementById('fault-keyboard').checked,
        mouse: document.getElementById('fault-mouse').checked
    };

    if (!name || !machineTypeId) {
        Swal.fire('Error', 'El nombre y el tipo de cabina son obligatorios.', 'error');
        return;
    }

    // Obtener el ID máximo para generar uno nuevo
    const maxId = machinesData.length > 0 ? Math.max(...machinesData.map(machine => machine.id)) : 0;
    const newId = maxId + 1;

    // Crear la nueva máquina
    const newMachine = {
        id: newId,
        name,
        created_at: new Date().toISOString(),
        status: 'inactive',
        start_time: null,
        time_used: 0,
        paid: false,
        faults,
        machine_type_id: parseInt(machineTypeId),
        maintenance_status: maintenanceStatus,
        last_maintenance: null,
        is_deleted: false
    };

    // Agregar la máquina a los datos locales
    machinesData.push(newMachine);

    // Registrar en el log de auditoría local
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'machines',
        record_id: newId,
        action: 'insert',
        changes: { name, machine_type_id: parseInt(machineTypeId), maintenance_status },
        created_at: new Date().toISOString()
    });

    // Limpiar formulario y recargar lista
    document.getElementById('create-machine-form').reset();
    showAlert('Éxito', 'Cabina creada correctamente', 'success');
    loadMachines();
}

/**
 * Actualiza una máquina existente
 * @param {number} id - ID de la máquina a actualizar
 */
function updateMachine(id) {
    const name = document.getElementById(`edit-machine-name-${id}`).value;
    const machineTypeId = document.getElementById(`edit-machine-type-${id}`).value;
    const maintenanceStatus = document.getElementById(`edit-maintenance-status-${id}`).value;
    const faults = {
        cpu: document.getElementById(`edit-fault-cpu-${id}`).checked,
        monitor: document.getElementById(`edit-fault-monitor-${id}`).checked,
        keyboard: document.getElementById(`edit-fault-keyboard-${id}`).checked,
        mouse: document.getElementById(`edit-fault-mouse-${id}`).checked
    };

    if (!name || !machineTypeId) {
        Swal.fire('Error', 'El nombre y el tipo de cabina son obligatorios.', 'error');
        return;
    }

    // Encontrar la máquina en los datos locales
    const machineIndex = machinesData.findIndex(machine => machine.id === id);
    if (machineIndex === -1) {
        Swal.fire('Error', 'No se encontró la máquina.', 'error');
        return;
    }

    // Guardar los datos anteriores para el registro de auditoría
    const oldData = { ...machinesData[machineIndex] };

    // Actualizar la máquina en los datos locales
    machinesData[machineIndex] = {
        ...machinesData[machineIndex],
        name,
        faults,
        machine_type_id: parseInt(machineTypeId),
        maintenance_status: maintenanceStatus
    };

    // Registrar en el log de auditoría local
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'machines',
        record_id: id,
        action: 'update',
        changes: { name, faults, machine_type_id: parseInt(machineTypeId), maintenance_status },
        created_at: new Date().toISOString()
    });

    Swal.fire('Éxito', 'Cabina actualizada correctamente.', 'success');

    // Recargar lista y cerrar formulario
    loadMachines();
    toggleEditForm(id);
}

/**
 * Elimina lógicamente una máquina
 * @param {number} id - ID de la máquina a eliminar
 */
function deleteMachine(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar lógicamente',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Encontrar la máquina en los datos locales
            const machineIndex = machinesData.findIndex(machine => machine.id === id);
            if (machineIndex === -1) {
                Swal.fire('Error', 'No se encontró la cabina.', 'error');
                return;
            }
            
            // Realizar eliminación lógica en los datos locales
            machinesData[machineIndex].is_deleted = true;
            
            // Registrar en el log de auditoría local
            auditLogsData.push({
                id: auditLogsData.length + 1,
                table_name: 'machines',
                record_id: id,
                action: 'delete',
                changes: { is_deleted: true },
                created_at: new Date().toISOString()
            });

            Swal.fire('Eliminada', 'La cabina ha sido eliminada lógicamente.', 'success');
            loadMachines(); // Recargar la lista de cabinas
        }
    });
}

/**
 * Alterna la visibilidad del formulario de edición
 * @param {number} id - ID de la máquina
 */
function toggleEditForm(id) {
    const form = document.getElementById(`edit-form-${id}`);
    if (form) {
        form.classList.toggle('open');
    }
}

/**
 * Funciones para la versión anterior de la página de máquinas
 * Estas funciones se mantienen para compatibilidad con la interfaz anterior
 */

// Datos de ejemplo para la versión anterior
let machines = [
    { id: 1, name: "PC-01", status: "Disponible", location: "Zona A", specs: "Intel i5, 16GB RAM, GTX 1650", lastUpdated: new Date().toLocaleString(), isActive: true },
    { id: 2, name: "PC-02", status: "Ocupada", location: "Zona B", specs: "Intel i7, 32GB RAM, RTX 3060", lastUpdated: new Date().toLocaleString(), isActive: true },
    { id: 3, name: "PC-03", status: "En Mantenimiento", location: "Zona C", specs: "AMD Ryzen 5, 8GB RAM, GTX 1050", lastUpdated: new Date().toLocaleString(), isActive: false }
];
let editMode = false;

/**
 * Carga tabla según estado (activas o inactivas) para la versión anterior
 * @param {boolean} showActive - Indica si se muestran máquinas activas o inactivas
 */
function loadTable(showActive) {
    const tableBody = showActive ? document.getElementById('active-machines-table') : document.getElementById('inactive-machines-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    const filteredMachines = machines.filter(machine => machine.isActive === showActive);
    filteredMachines.forEach((machine, index) => {
        const row = `
            <tr style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease ${index * 0.1}s">
                <td>${machine.id}</td>
                <td>${machine.name}</td>
                <td>${machine.status}</td>
                <td>${machine.location}</td>
                <td>${machine.specs}</td>
                <td>${machine.lastUpdated}</td>
                <td>
                    ${showActive ? `
                        <button class="btn btn-primary btn-sm me-2" onclick="openEditModal(${machine.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger btn-sm" onclick="deactivateMachine(${machine.id})"><i class="fas fa-trash"></i></button>
                    ` : `
                        <button class="btn btn-success btn-sm" onclick="restoreMachine(${machine.id})"><i class="fas fa-undo"></i></button>
                    `}
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });
    // Aplicar animación de entrada
    setTimeout(() => {
        tableBody.querySelectorAll('tr').forEach(row => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        });
    }, 100);
}

/**
 * Abrir modal para crear máquina (versión anterior)
 */
function openCreateModal() {
    editMode = false;
    document.getElementById('machineModalLabel').textContent = 'Agregar Máquina';
    document.getElementById('machineForm').reset();
    document.getElementById('machineId').value = '';
    new bootstrap.Modal(document.getElementById('machineModal')).show();
}

/**
 * Abrir modal para editar máquina (versión anterior)
 * @param {number} id - ID de la máquina a editar
 */
function openEditModal(id) {
    editMode = true;
    const machine = machines.find(m => m.id === id);
    document.getElementById('machineModalLabel').textContent = 'Editar Máquina';
    document.getElementById('machineId').value = machine.id;
    document.getElementById('machineName').value = machine.name;
    document.getElementById('machineStatus').value = machine.status;
    document.getElementById('machineLocation').value = machine.location;
    document.getElementById('machineSpecs').value = machine.specs;
    new bootstrap.Modal(document.getElementById('machineModal')).show();
}

/**
 * Guardar máquina (versión anterior)
 */
function saveMachine() {
    const id = document.getElementById('machineId').value;
    const machine = {
        id: editMode ? parseInt(id) : machines.length + 1,
        name: document.getElementById('machineName').value,
        status: document.getElementById('machineStatus').value,
        location: document.getElementById('machineLocation').value,
        specs: document.getElementById('machineSpecs').value,
        lastUpdated: new Date().toLocaleString(),
        isActive: true
    };

    if (!machine.name || !machine.location || !machine.specs) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            customClass: { confirmButton: 'btn btn-primary', popup: 'animated shake' }
        });
        return;
    }

    if (editMode) {
        const index = machines.findIndex(m => m.id === parseInt(id));
        machines[index] = { ...machine, isActive: machines[index].isActive };
    } else {
        machines.push(machine);
    }

    loadTable(true);
    bootstrap.Modal.getInstance(document.getElementById('machineModal')).hide();
    Swal.fire({
        title: editMode ? 'Máquina Actualizada' : 'Máquina Agregada',
        text: `La máquina ${machine.name} ha sido ${editMode ? 'actualizada' : 'agregada'} correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated bounceIn' }
    });
}

/**
 * Desactivar máquina (eliminado lógico) (versión anterior)
 * @param {number} id - ID de la máquina a desactivar
 */
function deactivateMachine(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'La máquina se marcará como inactiva.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Desactivar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-danger me-2',
            cancelButton: 'btn btn-secondary',
            popup: 'animated fadeIn'
        }
    }).then(result => {
        if (result.isConfirmed) {
            const index = machines.findIndex(m => m.id === id);
            machines[index].isActive = false;
            machines[index].lastUpdated = new Date().toLocaleString();
            loadTable(true);
            Swal.fire({
                title: 'Desactivada',
                text: 'La máquina ha sido desactivada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                buttonsStyling: false,
                customClass: { confirmButton: 'btn btn-primary', popup: 'animated bounceIn' }
            });
        }
    });
}

/**
 * Restaurar máquina (versión anterior)
 * @param {number} id - ID de la máquina a restaurar
 */
function restoreMachine(id) {
    Swal.fire({
        title: '¿Restaurar máquina?',
        text: 'La máquina se marcará como activa nuevamente.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Restaurar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-success me-2',
            cancelButton: 'btn btn-secondary',
            popup: 'animated fadeIn'
        }
    }).then(result => {
        if (result.isConfirmed) {
            const index = machines.findIndex(m => m.id === id);
            machines[index].isActive = true;
            machines[index].lastUpdated = new Date().toLocaleString();
            loadTable(false);
            Swal.fire({
                title: 'Restaurada',
                text: 'La máquina ha sido restaurada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                buttonsStyling: false,
                customClass: { confirmButton: 'btn btn-primary', popup: 'animated bounceIn' }
            });
        }
    });
}

// ========== FUNCIONES PARA GESTIÓN DE USUARIOS ==========

/**
 * Inicializa la página de usuarios
 */
function initUsersPage() {
    // Cargar listado de usuarios
    loadUsers();

    // Configurar el formulario de creación
    const createForm = document.getElementById('userForm');
    if (createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser();
        });
    }
    
    // Cargar tabla de usuarios activos al iniciar
    if (document.getElementById('active-users-table')) {
        loadUserTable(true);
    }
    
    // Configurar el toggle del sidebar
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    // Activar enlace del sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Inicializa la página de control de alquileres
 */
function initRentalsPage() {
    // Cargar datos necesarios
    loadActiveMachines();
    loadRentalsHistory();
    loadClientsForRental();
    loadAvailableMachines();
    
    // Iniciar el temporizador para actualizar los tiempos
    startRentalTimers();
    
    // Configurar eventos
    const toggleBtn = document.getElementById('toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    const rentalTime = document.getElementById('rental-time');
    if (rentalTime) {
        rentalTime.addEventListener('input', calculateRentalAmount);
    }
    
    const rentalRate = document.getElementById('rental-rate');
    if (rentalRate) {
        rentalRate.addEventListener('input', calculateRentalAmount);
    }
    
    const finishPayment = document.getElementById('finish-payment');
    if (finishPayment) {
        finishPayment.addEventListener('input', calculateChange);
    }
    
 if (typeof $ !== 'undefined' && $.fn.DataTable) {
    $('#rentals-table').DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
        columns: [
            { data: 'id' },
            { data: 'client_name' },
            { data: 'machine_name' },
            { data: 'start_time' },
            { data: 'end_time' },
            { data: 'time_used' },
            { data: 'status' },
            { data: 'amount' },
            { 
                data: 'actions', 
                orderable: false, 
                searchable: false 
            }
        ],
        order: [[0, 'desc']],
        pageLength: 10,
        data: [] // Inicialmente vacío, se llenará dinámicamente
    });
}
}

/**
 * Carga las máquinas activas en el panel superior
 */
function loadActiveMachines() {
    const container = document.getElementById('active-machines-container');
    if (!container) return;
    
    // Limpiar el contenedor
    container.innerHTML = '';
    
    // Filtrar máquinas activas (en uso)
    const activeMachines = machinesData.filter(machine => 
        !machine.is_deleted && machine.status === 'active'
    );
    
    if (activeMachines.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-info-circle fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No hay cabinas en uso actualmente</h5>
            </div>
        `;
        return;
    }
    
    // Obtener los alquileres activos para cada máquina
    activeMachines.forEach(machine => {
        const activeRental = rentalsData.find(rental => 
            rental.machine_id === machine.id && rental.status === 'active'
        );
        
        if (!activeRental) return;
        
        // Obtener información del cliente
        const client = usersData.find(user => user.id === activeRental.client_id);
        const clientName = client ? client.name : 'Cliente desconocido';
        const clientInitial = clientName.charAt(0).toUpperCase();
        
        // Calcular tiempo restante
        const startTime = new Date(activeRental.start_time);
        const currentTime = new Date();
        const elapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
        const remainingMinutes = Math.max(0, activeRental.total_time - elapsedMinutes);
        
        // Calcular porcentaje de tiempo usado
        const percentUsed = Math.min(100, Math.round((elapsedMinutes / activeRental.total_time) * 100));
        
        // Determinar clase de estado basado en el porcentaje usado
        let statusClass = '';
        if (percentUsed > 90) {
            statusClass = 'danger';
        } else if (percentUsed > 75) {
            statusClass = 'warning';
        }
        
        // Crear tarjeta para la máquina activa
        const machineCard = document.createElement('div');
        machineCard.className = 'col-md-4 col-lg-3 mb-4';
        machineCard.innerHTML = `
            <div class="card h-100 machine-card ${statusClass}" id="machine-card-${machine.id}">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h6 class="mb-0">${machine.name}</h6>
                    <span class="badge ${percentUsed > 75 ? 'bg-danger' : 'bg-success'}">${remainingMinutes} min</span>
                </div>
                <div class="card-body">
                    <div class="client-info">
                        <div class="client-avatar">${clientInitial}</div>
                        <div>
                            <h6 class="mb-0">${clientName}</h6>
                            <small class="text-muted">Cliente</small>
                        </div>
                    </div>
                    
                    <div class="time-info">
                        <div class="time-item">
                            <div class="time-value">${formatTime(startTime)}</div>
                            <small>Inicio</small>
                        </div>
                        <div class="time-item">
                            <div class="time-value">${elapsedMinutes}</div>
                            <small>Minutos usados</small>
                        </div>
                        <div class="time-item">
                            <div class="time-value">${activeRental.total_time}</div>
                            <small>Total minutos</small>
                        </div>
                    </div>
                    
                    <div class="progress">
                        <div class="progress-bar ${percentUsed > 75 ? 'bg-danger' : 'bg-success'}" role="progressbar" style="width: ${percentUsed}%" aria-valuenow="${percentUsed}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-center mt-2 small">${elapsedMinutes} min de ${activeRental.total_time} min (${percentUsed}%)</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-sm btn-outline-primary" onclick="openTransferModal(${activeRental.id})"><i class="fas fa-exchange-alt me-1"></i>Transferir</button>
                    <button class="btn btn-sm btn-outline-success" onclick="openFinishRentalModal(${activeRental.id})"><i class="fas fa-check-circle me-1"></i>Finalizar</button>
                </div>
            </div>
        `;
        
        container.appendChild(machineCard);
    });
}

/**
 * Carga el historial de alquileres del día
 */
/**
 * Carga el historial de alquileres del día
 */
function loadRentalsHistory() {
    const tableBody = document.getElementById('rentals-table-body');
    if (!tableBody) return;
    
    // Limpiar la tabla
    tableBody.innerHTML = '';
    
    // Obtener la fecha actual (solo año, mes, día)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filtrar alquileres del día actual
    const todayRentals = rentalsData.filter(rental => {
        const rentalDate = new Date(rental.start_time);
        rentalDate.setHours(0, 0, 0, 0);
        return rentalDate.getTime() === today.getTime();
    });
    
    if (todayRentals.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="9" class="text-center">No hay registros de alquileres para hoy</td>`;
        tableBody.appendChild(row);
        return;
    }
    
    // Ordenar por ID descendente (más recientes primero)
    todayRentals.sort((a, b) => b.id - a.id);
    
    // Crear filas para cada alquiler
    todayRentals.forEach(rental => {
        // Obtener información del cliente y la máquina
        const client = usersData.find(user => user.id === rental.client_id);
        const machine = machinesData.find(m => m.id === rental.machine_id);
        
        const clientName = client ? client.name : 'Cliente desconocido';
        const machineName = machine ? machine.name : 'Cabina desconocida';
        
        // Formatear horas
        const startTime = new Date(rental.start_time);
        const endTime = rental.end_time ? new Date(rental.end_time) : null;
        
        // Calcular tiempo total en minutos
        let timeUsed;
        if (rental.status === 'active') {
            const currentTime = new Date();
            timeUsed = Math.floor((currentTime - startTime) / (1000 * 60));
        } else {
            timeUsed = rental.time_used;
        }
        
        // Formatear estado
        let statusBadge;
        switch (rental.status) {
            case 'active':
                statusBadge = '<span class="badge bg-success">Activo</span>';
                break;
            case 'completed':
                statusBadge = '<span class="badge bg-primary">Completado</span>';
                break;
            case 'transferred':
                statusBadge = '<span class="badge bg-info">Transferido</span>';
                break;
            case 'cancelled':
                statusBadge = '<span class="badge bg-danger">Cancelado</span>';
                break;
            default:
                statusBadge = '<span class="badge bg-secondary">Desconocido</span>';
        }
        
        // Crear objeto de datos para la fila
        const rowData = {
            id: rental.id,
            client_name: clientName,
            machine_name: machineName,
            start_time: formatTime(startTime),
            end_time: endTime ? formatTime(endTime) : '-',
            time_used: `${timeUsed} min`,
            status: statusBadge,
            amount: `S/ ${rental.amount.toFixed(2)}`,
            actions: rental.status === 'active' ? `
                <button class="btn btn-sm btn-outline-primary me-1" onclick="openTransferModal(${rental.id})" title="Transferir"><i class="fas fa-exchange-alt"></i></button>
                <button class="btn btn-sm btn-outline-success" onclick="openFinishRentalModal(${rental.id})" title="Finalizar"><i class="fas fa-check-circle"></i></button>
            ` : `
                <button class="btn btn-sm btn-outline-secondary" onclick="viewRentalDetails(${rental.id})" title="Ver detalles"><i class="fas fa-eye"></i></button>
            `
        };
        
        // Crear fila con DataTables
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowData.id}</td>
            <td>${rowData.client_name}</td>
            <td>${rowData.machine_name}</td>
            <td>${rowData.start_time}</td>
            <td>${rowData.end_time}</td>
            <td>${rowData.time_used}</td>
            <td>${rowData.status}</td>
            <td>${rowData.amount}</td>
            <td>${rowData.actions}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Reinicializar DataTable si existe
    if (typeof $ !== 'undefined' && $.fn.DataTable) {
        const table = $('#rentals-table').DataTable();
        if (table) {
            table.destroy();
        }
        $('#rentals-table').DataTable({
            responsive: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            columns: [
                { data: 'id' },
                { data: 'client_name' },
                { data: 'machine_name' },
                { data: 'start_time' },
                { data: 'end_time' },
                { data: 'time_used' },
                { data: 'status' },
                { data: 'amount' },
                { 
                    data: 'actions', 
                    orderable: false, 
                    searchable: false 
                }
            ],
            order: [[0, 'desc']],
            pageLength: 10
        });
    }
}



/**
 * Carga los clientes disponibles para el selector de alquiler
 */
function loadClientsForRental() {
    const clientSelect = document.getElementById('client-select');
    if (!clientSelect) return;
    
    // Limpiar opciones existentes excepto la primera
    while (clientSelect.options.length > 1) {
        clientSelect.remove(1);
    }
    
    // Filtrar usuarios activos con rol de Cliente
    const clients = usersData.filter(user => 
        !user.is_deleted && user.role === 'Cliente'
    );
    
    // Agregar opciones para cada cliente
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        clientSelect.appendChild(option);
    });
}

/**
 * Carga las máquinas disponibles para el selector de alquiler
 */
function loadAvailableMachines() {
    const machineSelect = document.getElementById('machine-select');
    if (!machineSelect) return;
    
    // Limpiar opciones existentes excepto la primera
    while (machineSelect.options.length > 1) {
        machineSelect.remove(1);
    }
    
    // Filtrar máquinas activas y disponibles
    const availableMachines = machinesData.filter(machine => 
        !machine.is_deleted && machine.status === 'inactive'
    );
    
    // Agregar opciones para cada máquina disponible
    availableMachines.forEach(machine => {
        const option = document.createElement('option');
        option.value = machine.id;
        option.textContent = machine.name;
        machineSelect.appendChild(option);
    });
}

/**
 * Abre el modal para un nuevo alquiler
 */
function openNewRentalModal() {
    // Limpiar formulario
    document.getElementById('rental-form').reset();
    
    // Cargar clientes y máquinas disponibles
    loadClientsForRental();
    loadAvailableMachines();
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('rentalModal'));
    modal.show();
}

/**
 * Calcula el monto del alquiler basado en el tiempo y la tarifa
 */
function calculateRentalAmount() {
    const time = parseFloat(document.getElementById('rental-time').value) || 0;
    const rate = parseFloat(document.getElementById('rental-rate').value) || 0;
    
    // Calcular monto (tarifa por hora, convertida a minutos)
    const amount = (time / 60) * rate;
    
    // Actualizar campo de monto si existe
    const amountField = document.getElementById('rental-amount');
    if (amountField) {
        amountField.value = amount.toFixed(2);
    }
    
    return amount;
}

/**
 * Inicia un nuevo alquiler
 */
function startRental() {
    // Obtener valores del formulario
    const clientId = parseInt(document.getElementById('client-select').value);
    const machineId = parseInt(document.getElementById('machine-select').value);
    const time = parseInt(document.getElementById('rental-time').value);
    const rate = parseFloat(document.getElementById('rental-rate').value);
    const notes = document.getElementById('rental-notes').value;
    
    // Validar campos requeridos
    if (!clientId || !machineId || !time || !rate) {
        showAlert('Error', 'Por favor, complete todos los campos requeridos.', 'error');
        return;
    }
    
    // Validar que la máquina esté disponible
    const machine = machinesData.find(m => m.id === machineId);
    if (!machine || machine.status === 'active') {
        showAlert('Error', 'La cabina seleccionada no está disponible.', 'error');
        loadAvailableMachines(); // Recargar lista de máquinas disponibles
        return;
    }
    
    // Calcular monto
    const amount = (time / 60) * rate;
    
    // Generar ID para el nuevo alquiler
    const newId = rentalsData.length > 0 ? Math.max(...rentalsData.map(rental => rental.id)) + 1 : 1;
    
    // Crear nuevo alquiler
    const newRental = {
        id: newId,
        client_id: clientId,
        machine_id: machineId,
        start_time: new Date().toISOString(),
        end_time: null,
        total_time: time,
        time_used: 0,
        rate: rate,
        amount: amount,
        status: 'active',
        notes: notes,
        payment_received: 0,
        created_at: new Date().toISOString()
    };
    
    // Agregar a los datos de alquileres
    rentalsData.push(newRental);
    
    // Actualizar estado de la máquina
    const machineIndex = machinesData.findIndex(m => m.id === machineId);
    if (machineIndex !== -1) {
        machinesData[machineIndex].status = 'active';
        machinesData[machineIndex].start_time = new Date().toISOString();
    }
    
    // Registrar en el log de auditoría
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'rentals',
        record_id: newId,
        action: 'insert',
        changes: { client_id: clientId, machine_id: machineId, total_time: time, amount: amount },
        created_at: new Date().toISOString()
    });
    
    // Cerrar modal y mostrar mensaje de éxito
    const modal = bootstrap.Modal.getInstance(document.getElementById('rentalModal'));
    if (modal) {
        modal.hide();
    }
    
    showAlert('Éxito', 'Alquiler iniciado correctamente.', 'success');
    
    // Recargar datos
    loadActiveMachines();
    loadRentalsHistory();
    loadAvailableMachines();
}

/**
 * Abre el modal para transferir tiempo entre máquinas
 * @param {number} rentalId - ID del alquiler a transferir
 */
function openTransferModal(rentalId) {
    // Buscar el alquiler
    const rental = rentalsData.find(r => r.id === rentalId && r.status === 'active');
    if (!rental) {
        showAlert('Error', 'No se encontró el alquiler activo.', 'error');
        return;
    }
    
    // Buscar la máquina actual
    const sourceMachine = machinesData.find(m => m.id === rental.machine_id);
    if (!sourceMachine) {
        showAlert('Error', 'No se encontró la máquina de origen.', 'error');
        return;
    }
    
    // Calcular tiempo restante
    const startTime = new Date(rental.start_time);
    const currentTime = new Date();
    const elapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    const remainingMinutes = Math.max(0, rental.total_time - elapsedMinutes);
    
    // Configurar campos del formulario
    document.getElementById('source-rental-id').value = rental.id;
    document.getElementById('source-machine').value = sourceMachine.name;
    document.getElementById('remaining-time').value = `${remainingMinutes} minutos`;
    
    // Cargar máquinas disponibles para transferir
    const targetMachineSelect = document.getElementById('target-machine');
    
    // Limpiar opciones existentes excepto la primera
    while (targetMachineSelect.options.length > 1) {
        targetMachineSelect.remove(1);
    }
    
    // Filtrar máquinas activas y disponibles (diferentes a la actual)
    const availableMachines = machinesData.filter(machine => 
        !machine.is_deleted && 
        machine.status === 'inactive' && 
        machine.id !== sourceMachine.id
    );
    
    // Agregar opciones para cada máquina disponible
    availableMachines.forEach(machine => {
        const option = document.createElement('option');
        option.value = machine.id;
        option.textContent = machine.name;
        targetMachineSelect.appendChild(option);
    });
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('transferModal'));
    modal.show();
}

/**
 * Transfiere el tiempo restante de un alquiler a otra máquina
 */
function transferRental() {
    // Obtener valores del formulario
    const rentalId = parseInt(document.getElementById('source-rental-id').value);
    const targetMachineId = parseInt(document.getElementById('target-machine').value);
    
    // Validar campos requeridos
    if (!rentalId || !targetMachineId) {
        showAlert('Error', 'Por favor, seleccione una máquina de destino.', 'error');
        return;
    }
    
    // Buscar el alquiler original
    const rentalIndex = rentalsData.findIndex(r => r.id === rentalId && r.status === 'active');
    if (rentalIndex === -1) {
        showAlert('Error', 'No se encontró el alquiler activo.', 'error');
        return;
    }
    
    const sourceRental = rentalsData[rentalIndex];
    const sourceMachineId = sourceRental.machine_id;
    
    // Calcular tiempo restante
    const startTime = new Date(sourceRental.start_time);
    const currentTime = new Date();
    const elapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    const remainingMinutes = Math.max(0, sourceRental.total_time - elapsedMinutes);
    
    if (remainingMinutes <= 0) {
        showAlert('Error', 'No hay tiempo restante para transferir.', 'error');
        return;
    }
    
    // Validar que la máquina destino esté disponible
    const targetMachine = machinesData.find(m => m.id === targetMachineId && m.status === 'inactive');
    if (!targetMachine) {
        showAlert('Error', 'La máquina de destino no está disponible.', 'error');
        return;
    }
    
    // Actualizar el alquiler original
    rentalsData[rentalIndex].end_time = currentTime.toISOString();
    rentalsData[rentalIndex].time_used = elapsedMinutes;
    rentalsData[rentalIndex].status = 'transferred';
    
    // Liberar la máquina de origen
    const sourceMachineIndex = machinesData.findIndex(m => m.id === sourceMachineId);
    if (sourceMachineIndex !== -1) {
        machinesData[sourceMachineIndex].status = 'inactive';
        machinesData[sourceMachineIndex].start_time = null;
    }
    
    // Crear nuevo alquiler para la máquina destino
    const newRentalId = rentalsData.length > 0 ? Math.max(...rentalsData.map(rental => rental.id)) + 1 : 1;
    
    const newRental = {
        id: newRentalId,
        client_id: sourceRental.client_id,
        machine_id: targetMachineId,
        start_time: currentTime.toISOString(),
        end_time: null,
        total_time: remainingMinutes,
        time_used: 0,
        rate: sourceRental.rate,
        amount: (remainingMinutes / 60) * sourceRental.rate,
        status: 'active',
        notes: `Transferido desde ${sourceMachineId} (Alquiler #${rentalId})`,
        payment_received: 0,
        created_at: currentTime.toISOString(),
        transferred_from: rentalId
    };
    
    // Agregar nuevo alquiler
    rentalsData.push(newRental);
    
    // Actualizar estado de la máquina destino
    const targetMachineIndex = machinesData.findIndex(m => m.id === targetMachineId);
    if (targetMachineIndex !== -1) {
        machinesData[targetMachineIndex].status = 'active';
        machinesData[targetMachineIndex].start_time = currentTime.toISOString();
    }
    
    // Registrar en el log de auditoría
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'rentals',
        record_id: newRentalId,
        action: 'transfer',
        changes: { 
            source_rental_id: rentalId, 
            target_machine_id: targetMachineId, 
            remaining_minutes: remainingMinutes 
        },
        created_at: currentTime.toISOString()
    });
    
    // Cerrar modal y mostrar mensaje de éxito
    const modal = bootstrap.Modal.getInstance(document.getElementById('transferModal'));
    if (modal) {
        modal.hide();
    }
    
    showAlert('Éxito', 'Tiempo transferido correctamente.', 'success');
    
    // Recargar datos
    loadActiveMachines();
    loadRentalsHistory();
    loadAvailableMachines();
}

/**
 * Abre el modal para finalizar un alquiler
 * @param {number} rentalId - ID del alquiler a finalizar
 */
function openFinishRentalModal(rentalId) {
    // Buscar el alquiler
    const rental = rentalsData.find(r => r.id === rentalId && r.status === 'active');
    if (!rental) {
        showAlert('Error', 'No se encontró el alquiler activo.', 'error');
        return;
    }
    
    // Buscar cliente y máquina
    const client = usersData.find(user => user.id === rental.client_id);
    const machine = machinesData.find(m => m.id === rental.machine_id);
    
    if (!client || !machine) {
        showAlert('Error', 'No se encontró la información completa del alquiler.', 'error');
        return;
    }
    
    // Calcular tiempo usado
    const startTime = new Date(rental.start_time);
    const currentTime = new Date();
    const timeUsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    
    // Calcular monto a pagar (basado en tiempo real usado)
    const amount = (timeUsedMinutes / 60) * rental.rate;
    
    // Configurar campos del formulario
    document.getElementById('finish-rental-id').value = rental.id;
    document.getElementById('finish-client').value = client.name;
    document.getElementById('finish-machine').value = machine.name;
    document.getElementById('finish-time-used').value = `${timeUsedMinutes} minutos`;
    document.getElementById('finish-amount').value = amount.toFixed(2);
    document.getElementById('finish-payment').value = amount.toFixed(2);
    document.getElementById('finish-change').value = '0.00';
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('finishRentalModal'));
    modal.show();
}

/**
 * Calcula el cambio a devolver
 */
function calculateChange() {
    const amount = parseFloat(document.getElementById('finish-amount').value) || 0;
    const payment = parseFloat(document.getElementById('finish-payment').value) || 0;
    const change = Math.max(0, payment - amount);
    
    document.getElementById('finish-change').value = change.toFixed(2);
}

/**
 * Finaliza un alquiler y registra el pago
 */
function completeRental() {
    // Obtener valores del formulario
    const rentalId = parseInt(document.getElementById('finish-rental-id').value);
    const payment = parseFloat(document.getElementById('finish-payment').value);
    const amount = parseFloat(document.getElementById('finish-amount').value);
    
    // Validar campos requeridos
    if (!rentalId || isNaN(payment)) {
        showAlert('Error', 'Por favor, ingrese el monto recibido.', 'error');
        return;
    }
    
    // Validar que el pago sea suficiente
    if (payment < amount) {
        showAlert('Error', 'El pago recibido es menor que el monto a pagar.', 'error');
        return;
    }
    
    // Buscar el alquiler
    const rentalIndex = rentalsData.findIndex(r => r.id === rentalId && r.status === 'active');
    if (rentalIndex === -1) {
        showAlert('Error', 'No se encontró el alquiler activo.', 'error');
        return;
    }
    
    const rental = rentalsData[rentalIndex];
    const machineId = rental.machine_id;
    
    // Calcular tiempo usado
    const startTime = new Date(rental.start_time);
    const currentTime = new Date();
    const timeUsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    
    // Actualizar el alquiler
    rentalsData[rentalIndex].end_time = currentTime.toISOString();
    rentalsData[rentalIndex].time_used = timeUsedMinutes;
    rentalsData[rentalIndex].amount = amount;
    rentalsData[rentalIndex].payment_received = payment;
    rentalsData[rentalIndex].status = 'completed';
    
    // Liberar la máquina
    const machineIndex = machinesData.findIndex(m => m.id === machineId);
    if (machineIndex !== -1) {
        machinesData[machineIndex].status = 'inactive';
        machinesData[machineIndex].start_time = null;
    }
    
    // Registrar en el log de auditoría
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'rentals',
        record_id: rentalId,
        action: 'complete',
        changes: { 
            time_used: timeUsedMinutes, 
            amount: amount, 
            payment_received: payment 
        },
        created_at: currentTime.toISOString()
    });
    
    // Cerrar modal y mostrar mensaje de éxito
    const modal = bootstrap.Modal.getInstance(document.getElementById('finishRentalModal'));
    if (modal) {
        modal.hide();
    }
    
    showAlert('Éxito', 'Alquiler finalizado correctamente.', 'success');
    
    // Recargar datos
    loadActiveMachines();
    loadRentalsHistory();
    loadAvailableMachines();
}

/**
 * Ver detalles de un alquiler
 * @param {number} rentalId - ID del alquiler
 */
function viewRentalDetails(rentalId) {
    // Buscar el alquiler
    const rental = rentalsData.find(r => r.id === rentalId);
    if (!rental) {
        showAlert('Error', 'No se encontró el alquiler.', 'error');
        return;
    }
    
    // Buscar cliente y máquina
    const client = usersData.find(user => user.id === rental.client_id);
    const machine = machinesData.find(m => m.id === rental.machine_id);
    
    const clientName = client ? client.name : 'Cliente desconocido';
    const machineName = machine ? machine.name : 'Cabina desconocida';
    
    // Formatear fechas
    const startTime = new Date(rental.start_time);
    const endTime = rental.end_time ? new Date(rental.end_time) : null;
    
    // Crear contenido HTML para el modal
    let content = `
        <div class="table-responsive">
            <table class="table table-bordered">
                <tr>
                    <th>ID de Alquiler:</th>
                    <td>${rental.id}</td>
                </tr>
                <tr>
                    <th>Cliente:</th>
                    <td>${clientName}</td>
                </tr>
                <tr>
                    <th>Cabina:</th>
                    <td>${machineName}</td>
                </tr>
                <tr>
                    <th>Hora de Inicio:</th>
                    <td>${formatDateTime(startTime)}</td>
                </tr>
                <tr>
                    <th>Hora de Fin:</th>
                    <td>${endTime ? formatDateTime(endTime) : '-'}</td>
                </tr>
                <tr>
                    <th>Tiempo Total:</th>
                    <td>${rental.total_time} minutos</td>
                </tr>
                <tr>
                    <th>Tiempo Usado:</th>
                    <td>${rental.time_used} minutos</td>
                </tr>
                <tr>
                    <th>Tarifa:</th>
                    <td>S/ ${rental.rate.toFixed(2)} por hora</td>
                </tr>
                <tr>
                    <th>Monto:</th>
                    <td>S/ ${rental.amount.toFixed(2)}</td>
                </tr>
                <tr>
                    <th>Pago Recibido:</th>
                    <td>S/ ${rental.payment_received ? rental.payment_received.toFixed(2) : '0.00'}</td>
                </tr>
                <tr>
                    <th>Estado:</th>
                    <td>${getStatusText(rental.status)}</td>
                </tr>
            </table>
        </div>
    `;
    
    // Si fue transferido, mostrar información adicional
    if (rental.status === 'transferred' && rental.transferred_to) {
        const targetRental = rentalsData.find(r => r.id === rental.transferred_to);
        if (targetRental) {
            const targetMachine = machinesData.find(m => m.id === targetRental.machine_id);
            content += `
                <div class="alert alert-info mt-3">
                    <strong>Transferido a:</strong> ${targetMachine ? targetMachine.name : 'Cabina desconocida'} (Alquiler #${targetRental.id})
                </div>
            `;
        }
    }
    
    if (rental.transferred_from) {
        const sourceRental = rentalsData.find(r => r.id === rental.transferred_from);
        if (sourceRental) {
            const sourceMachine = machinesData.find(m => m.id === sourceRental.machine_id);
            content += `
                <div class="alert alert-info mt-3">
                    <strong>Transferido desde:</strong> ${sourceMachine ? sourceMachine.name : 'Cabina desconocida'} (Alquiler #${sourceRental.id})
                </div>
            `;
        }
    }
    
    // Mostrar notas si existen
    if (rental.notes) {
        content += `
            <div class="mt-3">
                <strong>Notas:</strong>
                <p>${rental.notes}</p>
            </div>
        `;
    }
    
    // Mostrar modal con los detalles
    Swal.fire({
        title: 'Detalles del Alquiler',
        html: content,
        width: '600px',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#3b82f6'
    });
}

/**
 * Inicia los temporizadores para actualizar los tiempos de las cabinas activas
 */
function startRentalTimers() {
    // Actualizar cada minuto
    setInterval(() => {
        loadActiveMachines();
    }, 60000); // 60 segundos
}

/**
 * Formatea una fecha para mostrar solo la hora (HH:MM)
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Hora formateada
 */
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Formatea una fecha completa (DD/MM/YYYY HH:MM)
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha y hora formateadas
 */
function formatDateTime(date) {
    return date.toLocaleString([], { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

/**
 * Obtiene el texto descriptivo para un estado de alquiler
 * @param {string} status - Código de estado
 * @returns {string} - Texto descriptivo
 */
function getStatusText(status) {
    switch (status) {
        case 'active': return 'Activo';
        case 'completed': return 'Completado';
        case 'transferred': return 'Transferido';
        case 'cancelled': return 'Cancelado';
        default: return 'Desconocido';
    }
}

/**
 * Carga los usuarios desde los datos locales
 */
function loadUsers() {
    const tableBody = document.getElementById('active-users-table');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const activeUsers = usersData.filter(user => !user.is_deleted);
    
    activeUsers.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.phone || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.role}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(user.created_at).toLocaleString()}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="openEditUserModal(${user.id})" class="text-blue-500 hover:underline">Editar</button>
                <button onclick="deleteUser(${user.id})" class="text-red-500 hover:underline ml-2">Eliminar</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

/**
 * Crea un nuevo usuario
 */
function createUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const role = document.getElementById('userRole').value;
    const password = document.getElementById('userPassword').value;

    if (!name || !email || !role || !password) {
        Swal.fire('Error', 'Todos los campos son obligatorios excepto el teléfono.', 'error');
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire('Error', 'El formato del email no es válido.', 'error');
        return;
    }

    // Obtener el ID máximo para generar uno nuevo
    const maxId = usersData.reduce((max, user) => Math.max(max, user.id), 0);
    const newId = maxId + 1;

    // Crear el nuevo usuario en los datos locales
    const newUser = {
        id: newId,
        name,
        email,
        phone,
        role,
        password, // En un sistema real, esto debería estar hasheado
        created_at: new Date().toISOString(),
        is_deleted: false
    };
    
    // Añadir a los datos locales
    usersData.push(newUser);

    // Registrar en el log de auditoría local
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'users',
        record_id: newId,
        action: 'create',
        changes: { name, email, phone, role },
        created_at: new Date().toISOString()
    });

    showAlert('Éxito', 'Usuario creado correctamente', 'success');
    document.getElementById('userForm').reset();
    loadUsers();
    bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
}

/**
 * Actualiza un usuario existente
 * @param {number} id - ID del usuario a actualizar
 */
function updateUser(id) {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const role = document.getElementById('userRole').value;
    const password = document.getElementById('userPassword').value;

    if (!name || !email || !role) {
        Swal.fire('Error', 'El nombre, email y rol son obligatorios.', 'error');
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Swal.fire('Error', 'El formato del email no es válido.', 'error');
        return;
    }

    // Encontrar el usuario en los datos locales
    const userIndex = usersData.findIndex(user => user.id === id);
    if (userIndex === -1) {
        Swal.fire('Error', 'No se encontró el usuario.', 'error');
        return;
    }

    // Guardar los datos anteriores para el registro de auditoría
    const oldData = { ...usersData[userIndex] };

    // Preparar objeto de actualización
    const updateData = {
        name,
        email,
        phone,
        role
    };

    // Agregar contraseña solo si se ha proporcionado una nueva
    if (password) {
        updateData.password = password; // En un sistema real, esto debería estar hasheado
    }

    // Actualizar el usuario en los datos locales
    usersData[userIndex] = {
        ...usersData[userIndex],
        ...updateData
    };

    // Registrar en el log de auditoría local
    auditLogsData.push({
        id: auditLogsData.length + 1,
        table_name: 'users',
        record_id: id,
        action: 'update',
        changes: updateData,
        created_at: new Date().toISOString()
    });

    Swal.fire('Éxito', 'Usuario actualizado correctamente.', 'success');
    loadUsers();
    bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
}

/**
 * Elimina lógicamente un usuario
 * @param {number} id - ID del usuario a eliminar
 */
function deleteUser(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar lógicamente',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Encontrar el usuario en los datos locales
            const userIndex = usersData.findIndex(user => user.id === id);
            if (userIndex === -1) {
                Swal.fire('Error', 'No se encontró el usuario.', 'error');
                return;
            }
            
            // Realizar eliminación lógica en los datos locales
            usersData[userIndex].is_deleted = true;
            
            // Registrar en el log de auditoría local
            auditLogsData.push({
                id: auditLogsData.length + 1,
                table_name: 'users',
                record_id: id,
                action: 'delete',
                changes: { is_deleted: true },
                created_at: new Date().toISOString()
            });

            Swal.fire('Eliminado', 'El usuario ha sido eliminado lógicamente.', 'success');
            loadUsers(); // Recargar la lista de usuarios
        }
    });
}

/**
 * Restaura un usuario eliminado lógicamente
 * @param {number} id - ID del usuario a restaurar
 */
function restoreUser(id) {
    Swal.fire({
        title: '¿Restaurar usuario?',
        text: 'El usuario se marcará como activo nuevamente.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Restaurar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            // Encontrar el usuario en los datos locales
            const userIndex = usersData.findIndex(user => user.id === id);
            if (userIndex === -1) {
                Swal.fire('Error', 'No se encontró el usuario.', 'error');
                return;
            }
            
            // Realizar restauración en los datos locales
            usersData[userIndex].is_deleted = false;
            
            // Registrar en el log de auditoría local
            auditLogsData.push({
                id: auditLogsData.length + 1,
                table_name: 'users',
                record_id: id,
                action: 'restore',
                changes: { is_deleted: false },
                created_at: new Date().toISOString()
            });

            Swal.fire('Restaurado', 'El usuario ha sido restaurado correctamente.', 'success');
            loadUsers(); // Recargar la lista de usuarios
        }
    });
}

/**
 * Abre el modal para crear un nuevo usuario
 */
function openCreateUserModal() {
    document.getElementById('userModalLabel').textContent = 'Agregar Usuario';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userPassword').required = true;
    document.getElementById('userPassword').parentElement.style.display = 'block';
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

/**
 * Abre el modal para editar un usuario existente
 * @param {number} id - ID del usuario a editar
 */
function openEditUserModal(id) {
    // Buscar el usuario en los datos locales
    const user = usersData.find(user => user.id === id);
    
    if (!user) {
        showAlert('Error', 'No se pudo encontrar la información del usuario', 'error');
        return;
    }

    document.getElementById('userModalLabel').textContent = 'Editar Usuario';
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone || '';
    document.getElementById('userRole').value = user.role;
    
    // La contraseña no se muestra por seguridad, pero se permite cambiarla
    document.getElementById('userPassword').value = '';
    document.getElementById('userPassword').required = false;
    document.getElementById('userPassword').placeholder = 'Dejar en blanco para mantener la actual';

    new bootstrap.Modal(document.getElementById('userModal')).show();
}

/**
 * Guarda un usuario (crea nuevo o actualiza existente)
 */
function saveUser() {
    const userId = document.getElementById('userId').value;
    
    if (userId) {
        updateUser(parseInt(userId));
    } else {
        createUser();
    }
}

/**
 * Carga tabla según estado (activos o inactivos)
 * @param {boolean} showActive - Indica si se muestran usuarios activos o inactivos
 */
function loadUserTable(showActive) {
    // Filtrar usuarios según su estado
    const filteredUsers = usersData.filter(user => user.is_deleted !== showActive);

    const tableBody = showActive ? 
        document.getElementById('active-users-table') : 
        document.getElementById('inactive-users-table');
    
    if (!tableBody) return;

    tableBody.innerHTML = '';
    filteredUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone || 'N/A'}</td>
            <td>${user.role}</td>
            <td>${new Date(user.created_at).toLocaleString()}</td>
            <td>
                ${showActive ? `
                    <button class="btn btn-primary btn-sm me-2" onclick="openEditUserModal(${user.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                ` : `
                    <button class="btn btn-success btn-sm" onclick="restoreUser(${user.id})"><i class="fas fa-undo"></i></button>
                `}
            </td>
        `;
        
        tableBody.appendChild(row);
    });

    // Aplicar animación de entrada
    setTimeout(() => {
        tableBody.querySelectorAll('tr').forEach(row => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        });
    }, 100);
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);