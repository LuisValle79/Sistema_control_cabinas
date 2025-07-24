// main.js
// Inicializar el cliente Supabase
// const { createClient } = window.supabase;
const supabaseUrl = 'https://jbirpporhcxssduqwvge.supabase.co'; // Tu Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaXJwcG9yaGN4c3NkdXF3dmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNzYzNTEsImV4cCI6MjA2ODc1MjM1MX0.5rvXuuYdA95MsRAtpfiT-7R8SxdHh0sOm4ZsxvjeMUg'; // Tu anon key
//const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://jbirpporhcxssduqwvge.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiaXJwcG9yaGN4c3NkdXF3dmdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzE3NjM1MSwiZXhwIjoyMDY4NzUyMzUxfQ.iObi4kpkOMv77knKVGKUNaVPOz_Ny2hE1evEPcsyx6I'); // Usa tu service role key, no anon key

async function registerAdmin() {
    const { data, error } = await supabase.auth.admin.createUser({
        email: 'luis.valle33@gmail.com',
        password: '46713781',
        user_metadata: { role: 'Administrador' }
    });
    if (error) console.error('Error:', error.message);
    else console.log('Usuario registrado:', data);
}

registerAdmin();

// Función de depuración
function log(message) {
    console.log(`[${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}] ${message}`);
}

// Manejar el formulario de login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            log('Intentando iniciar sesión...');

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor, complete todos los campos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    buttonsStyling: false,
                    customClass: { confirmButton: 'btn btn-primary' }
                });
                return;
            }

            try {
                // Autenticar al usuario con Supabase Auth
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: username, // Asumiendo que 'username' es el email
                    password: password
                });

                if (error) {
                    log(`Error de autenticación: ${error.message}`);
                    Swal.fire({
                        title: 'Error',
                        text: `Fallo al iniciar sesión: ${error.message}`,
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        buttonsStyling: false,
                        customClass: { confirmButton: 'btn btn-primary' }
                    });
                    return;
                }

                log(`Autenticación exitosa. User ID: ${data.user.id}`);

                // Verificar que el usuario sea administrador
                const { data: userData, error: userError } = await supabase
                    .from('public.users')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                if (userError || !userData) {
                    log(`Error al verificar rol: ${userError ? userError.message : 'Usuario no encontrado'}`);
                    Swal.fire({
                        title: 'Error',
                        text: 'Usuario no encontrado o no tiene permisos.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        buttonsStyling: false,
                        customClass: { confirmButton: 'btn btn-primary' }
                    });
                    await supabase.auth.signOut();
                    return;
                }

                if (userData.role !== 'Administrador') {
                    log('Usuario no es administrador.');
                    Swal.fire({
                        title: 'Error',
                        text: 'Solo los administradores pueden iniciar sesión.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        buttonsStyling: false,
                        customClass: { confirmButton: 'btn btn-primary' }
                    });
                    await supabase.auth.signOut();
                    return;
                }

                log('Usuario verificado como administrador. Redirigiendo...');
                // Redirigir a la página de gestión de usuarios
                window.location.href = 'users.html';
            } catch (error) {
                log(`Error general: ${error.message}`);
                Swal.fire({
                    title: 'Error',
                    text: `Ocurrió un error: ${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    buttonsStyling: false,
                    customClass: { confirmButton: 'btn btn-primary' }
                });
            }
        });
    } else {
        log('Formulario de login no encontrado.');
    }
});