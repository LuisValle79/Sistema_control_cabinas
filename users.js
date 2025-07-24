
    // Inicializar el cliente Supabase
    const { createClient } = window.supabase;
    const supabaseUrl = 'https://jbirpporhcxssduqwvge.supabase.co'; // Tu Project URL
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaXJwcG9yaGN4c3NkdXF3dmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNzYzNTEsImV4cCI6MjA2ODc1MjM1MX0.5rvXuuYdA95MsRAtpfiT-7R8SxdHh0sOm4ZsxvjeMUg'; // Tu anon key
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Función de depuración
    function log(message) {
        console.log(`[${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] ${message}`);
    }

    // Inicializar la página con autenticación
    async function initUsersPage() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
            log('No hay sesión activa: ' + (error ? error.message : 'Sin sesión'));
            showAlert('Error', 'Debes iniciar sesión como administrador.', 'error');
            window.location.href = 'login.html';
            return;
        }
        log(`Sesión activa. User ID: ${session.user.id}`);

        loadUserTable(true); // Usuarios activos
        loadUserTable(false); // Usuarios inactivos o eliminados

        const toggleBtn = document.getElementById('toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleSidebar);
        }

        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveUser();
            });
        }
    }

    // Resto de las funciones (loadUserTable, openCreateUserModal, etc.) como en tu código original
    // Asegúrate de incluir todas las funciones que ya tenías

    // Inicializar al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        initUsersPage();
    });

    function showAlert(title, message, type) {
        Swal.fire({
            title: title,
            text: message,
            icon: type,
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary',
                popup: 'animated fadeIn'
            }
        });
    }
